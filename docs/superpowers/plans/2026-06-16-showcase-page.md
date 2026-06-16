# Showcase Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an unlisted, noindex, bilingual `/[lang]/showcase` page that lists Akieni's live products and R&D builds — each with a brief and an external "access" link — filterable by stage.

**Architecture:** A new Sanity `showcaseItem` type with a `getAllShowcaseItems` query (dictionary fallback, same pattern as projects). A server page (`PageHero` → `ShowcaseExplorer` → `Cta`) reusing the existing design system; a client `ShowcaseExplorer` (stage filter) renders `ShowcaseCard`s that link out in a new tab. noindex via `buildMetadata({ robots })`; unlisted via sitemap omission.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind 4, Sanity (next-sanity), motion.

**Testing note:** No unit-test framework exists. The per-task gate is `./node_modules/.bin/tsc --noEmit` (also enforces en/fr dictionary parity via the `Dictionary = typeof en` derivation). Final task = `next build` + Playwright behavioral verification.

---

### Task 1: Sanity `showcaseItem` schema + registration

**Files:**
- Create: `sanity/schemas/showcaseItem.ts`
- Modify: `sanity/schemas/index.ts`

- [ ] **Step 1: Create the schema**

```ts
// sanity/schemas/showcaseItem.ts
import { defineField, defineType } from "sanity";

const localeString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en", title: "English", type: "string" }),
      defineField({ name: "fr", title: "French", type: "string" }),
    ],
  });

const localeText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en", title: "English", type: "text" }),
      defineField({ name: "fr", title: "French", type: "text" }),
    ],
  });

const STAGES = [
  { title: "R&D", value: "rnd" },
  { title: "Beta", value: "beta" },
  { title: "Live", value: "live" },
  { title: "Internal", value: "internal" },
];

export const showcaseItem = defineType({
  name: "showcaseItem",
  title: "Showcase Item",
  type: "document",
  fields: [
    localeString("title", "Title"),
    localeText("brief", "Brief"),
    defineField({
      name: "link",
      title: "Access URL",
      type: "url",
      validation: (r) => r.required().uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "stage",
      title: "Stage",
      type: "string",
      options: { list: STAGES, layout: "radio" },
      initialValue: "live",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      initialValue: 99,
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title.en", subtitle: "stage", media: "image" },
  },
});
```

- [ ] **Step 2: Register it** — modify `sanity/schemas/index.ts`

```ts
import { academyCohort } from "./academyCohort";
import { department } from "./department";
import { homeCredo } from "./homeCredo";
import { jobRole } from "./jobRole";
import { product } from "./product";
import { project } from "./project";
import { showcaseItem } from "./showcaseItem";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";

export const schemaTypes = [siteSettings, jobRole, teamMember, department, academyCohort, project, product, showcaseItem, homeCredo];
```

- [ ] **Step 3: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(showcase): add showcaseItem Sanity schema"`

---

### Task 2: Query function

**Files:**
- Create: `lib/queries/showcaseItems.ts`

- [ ] **Step 1: Create the query**

```ts
// lib/queries/showcaseItems.ts
import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient, urlFor } from "../sanity";

export type ShowcaseItem = {
  id: string;
  title: string;
  brief: string;
  link: string;
  stage: string; // "rnd" | "beta" | "live" | "internal" — kept as string for fallback assignability
  categories: string[];
  image: string | null;
  mediaLabel?: string;
};

export async function getAllShowcaseItems(lang: Locale): Promise<ShowcaseItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const items = await sanityClient.fetch<
      Array<{
        id: string;
        title: string;
        brief: string;
        link: string;
        stage: string;
        categories: string[] | null;
        image: { asset: { _ref: string }; alt?: string } | null;
        mediaLabel: string | null;
      }>
    >(
      `*[_type == "showcaseItem" && isPublished == true] | order(order asc) {
        "id": _id,
        "title": coalesce(title[$lang], title.en),
        "brief": coalesce(brief[$lang], brief.en),
        link,
        stage,
        categories,
        image,
        "mediaLabel": coalesce(image.alt, title.en),
      }`,
      { lang }
    );

    return items.map((it) => ({
      id: it.id,
      title: it.title,
      brief: it.brief,
      link: it.link,
      stage: it.stage,
      categories: it.categories ?? [],
      image: it.image ? urlFor(it.image).width(800).url() : null,
      mediaLabel: it.mediaLabel ?? undefined,
    }));
  } catch {
    return [];
  }
}
```

- [ ] **Step 2: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(showcase): add getAllShowcaseItems query"`

---

### Task 3: Dictionary `showcase` block (en + fr)

**Files:**
- Modify: `app/[lang]/dictionaries/en.json` (add top-level `showcase` key)
- Modify: `app/[lang]/dictionaries/fr.json` (identical structure, FR copy)

- [ ] **Step 1: Add `showcase` to `en.json`** (top-level key)

```json
"showcase": {
  "meta": {
    "title": "Showcase · Akieni",
    "description": "A working catalogue of Akieni's live products and R&D builds, each with a direct link."
  },
  "hero": {
    "eyebrow": "Showcase",
    "caption": "Unlisted · Internal",
    "titleLine1": "What we've",
    "titleLine2": "shipped, and what we're ",
    "titleAccent": "building next.",
    "lede": "One place to see every Akieni product and project — live platforms, betas and R&D — each with a link to try it."
  },
  "explorer": {
    "counterSuffix": "items",
    "allLabel": "All",
    "stageLabels": { "live": "Live", "beta": "Beta", "rnd": "R&D", "internal": "Internal" },
    "emptyLabel": "Nothing here yet."
  },
  "items": [
    { "id": "akienipay", "title": "AkieniPay", "brief": "Mobile money, card and cash payments with automatic reconciliation — live across the Congo.", "link": "https://www.akieni.com/en/products/akienipay", "stage": "live", "categories": ["Fintech", "Payments"], "image": "", "mediaLabel": "AkieniPay" },
    { "id": "cartracking", "title": "CarTracking", "brief": "Real-time fleet tracking — GPS, geofencing and driver behaviour for corporate and public fleets.", "link": "https://www.akieni.com/en/products/cartracking", "stage": "live", "categories": ["IoT", "Logistics"], "image": "", "mediaLabel": "CarTracking" },
    { "id": "biometrie", "title": "Biometrie", "brief": "Multi-modal biometric identification — fingerprint, face and iris — to ANSSI / ICAO grade.", "link": "https://www.akieni.com/en/products/biometrie", "stage": "live", "categories": ["Identity", "Security"], "image": "", "mediaLabel": "Biometrie" },
    { "id": "ged", "title": "GED — Document Management", "brief": "Electronic document management and archival for public administrations. In private beta.", "link": "https://example.com/akieni-ged", "stage": "beta", "categories": ["GovTech", "Documents"], "image": "", "mediaLabel": "GED" },
    { "id": "ai-assistant", "title": "Service Assistant", "brief": "An AI assistant for citizen services, grounded in public-sector knowledge. Early research prototype.", "link": "https://example.com/akieni-assistant", "stage": "rnd", "categories": ["AI", "Public services"], "image": "", "mediaLabel": "Service Assistant" }
  ],
  "cta": {
    "primary": "Get in touch",
    "titleLine1": "Want a closer",
    "titleLine2": "look at any of ",
    "titleAccent": "these?"
  }
}
```

- [ ] **Step 2: Add identical `showcase` to `fr.json`** (FR copy)

```json
"showcase": {
  "meta": {
    "title": "Vitrine · Akieni",
    "description": "Un catalogue vivant des produits en production et des travaux de R&D d'Akieni, chacun avec un lien direct."
  },
  "hero": {
    "eyebrow": "Vitrine",
    "caption": "Non répertorié · Interne",
    "titleLine1": "Ce que nous avons",
    "titleLine2": "livré, et ce que nous ",
    "titleAccent": "construisons.",
    "lede": "Un seul endroit pour voir chaque produit et projet Akieni — plateformes en production, bêtas et R&D — chacun avec un lien pour l'essayer."
  },
  "explorer": {
    "counterSuffix": "éléments",
    "allLabel": "Tous",
    "stageLabels": { "live": "En production", "beta": "Bêta", "rnd": "R&D", "internal": "Interne" },
    "emptyLabel": "Rien ici pour l'instant."
  },
  "items": [
    { "id": "akienipay", "title": "AkieniPay", "brief": "Paiements mobile money, carte et espèces avec réconciliation automatique — en production à travers le Congo.", "link": "https://www.akieni.com/fr/products/akienipay", "stage": "live", "categories": ["Fintech", "Paiements"], "image": "", "mediaLabel": "AkieniPay" },
    { "id": "cartracking", "title": "CarTracking", "brief": "Suivi de flotte en temps réel — GPS, géorepérage et comportement de conduite pour flottes publiques et privées.", "link": "https://www.akieni.com/fr/products/cartracking", "stage": "live", "categories": ["IoT", "Logistique"], "image": "", "mediaLabel": "CarTracking" },
    { "id": "biometrie", "title": "Biometrie", "brief": "Identification biométrique multimodale — empreinte, visage et iris — aux normes ANSSI / ICAO.", "link": "https://www.akieni.com/fr/products/biometrie", "stage": "live", "categories": ["Identité", "Sécurité"], "image": "", "mediaLabel": "Biometrie" },
    { "id": "ged", "title": "GED — Gestion documentaire", "brief": "Gestion électronique et archivage de documents pour les administrations publiques. En bêta privée.", "link": "https://example.com/akieni-ged", "stage": "beta", "categories": ["GovTech", "Documents"], "image": "", "mediaLabel": "GED" },
    { "id": "ai-assistant", "title": "Assistant de service", "brief": "Un assistant IA pour les services aux citoyens, ancré dans la connaissance du secteur public. Prototype de recherche.", "link": "https://example.com/akieni-assistant", "stage": "rnd", "categories": ["IA", "Services publics"], "image": "", "mediaLabel": "Assistant de service" }
  ],
  "cta": {
    "primary": "Nous contacter",
    "titleLine1": "Envie d'un",
    "titleLine2": "aperçu plus proche de ",
    "titleAccent": "l'un d'eux ?"
  }
}
```

> All fallback items carry the same keys and a non-empty `categories` array so `typeof en` infers a single, clean element type (`categories: string[]`, `stage: string`, `image: string`).

- [ ] **Step 3: Validate JSON + typecheck** — `node -e "JSON.parse(require('fs').readFileSync('app/[lang]/dictionaries/en.json','utf8'))"` for both files, then `./node_modules/.bin/tsc --noEmit` → 0 errors.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(showcase): add showcase dictionary block (en/fr)"`

---

### Task 4: `ShowcaseCard` component (+ inline `StagePill`)

**Files:**
- Create: `components/shared/showcase-card.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/shared/showcase-card.tsx
import { MotionCard } from "@/components/motion/primitives";
import { BlurImage } from "@/components/shared/blur-image";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Tag } from "@/components/shared/tag";
import type { ShowcaseItem } from "@/lib/queries/showcaseItems";

// Stage → dot colour, reusing the existing chip dot + glow pattern.
const STAGE_DOT: Record<string, string> = {
  live: "bg-green shadow-[0_0_0_3px_rgba(56,240,115,0.18)]",
  beta: "bg-cyan-teal shadow-[0_0_0_3px_rgba(18,235,214,0.18)]",
  rnd: "bg-blue shadow-[0_0_0_3px_rgba(15,64,248,0.18)]",
  internal: "bg-muted",
};

function StagePill({
  stage,
  label,
  isDark,
}: Readonly<{ stage: string; label: string; isDark: boolean }>) {
  const dot = STAGE_DOT[stage] ?? "bg-muted";
  const text = isDark ? "text-muted-2" : "text-muted";
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-[0.4rem] font-mono text-[0.7rem] uppercase tracking-[0.14em]",
        text,
      ].join(" ")}
    >
      <span aria-hidden className={["h-1.5 w-1.5 rounded-full", dot].join(" ")} />
      {label}
    </span>
  );
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ShowcaseCard({
  item,
  stageLabel,
  surface = "paper",
}: Readonly<{
  item: ShowcaseItem;
  stageLabel: string;
  surface?: "paper" | "dark";
}>) {
  const isDark = surface === "dark";

  const cardCls = [
    "group relative flex flex-col overflow-hidden border transition-colors duration-2 ease-akieni",
    isDark
      ? "bg-ink-2 border-line text-white hover:border-cyan-teal"
      : "bg-white border-line-light text-black hover:border-black",
  ].join(" ");

  const briefCls = isDark ? "text-md text-muted-2" : "text-md text-muted";
  const footBorderCls = isDark ? "border-line" : "border-line-light";
  const footTextCls = isDark ? "text-muted-2" : "text-muted";

  return (
    <MotionCard className={cardCls}>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col"
      >
        {item.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <BlurImage
              src={item.image}
              alt={item.mediaLabel ?? item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <PlaceholderMedia
            aspect="4/3"
            surface={isDark ? "dark" : "light"}
            label={item.mediaLabel ?? item.title}
          />
        )}

        <div className="flex flex-1 flex-col gap-s3 p-[1.6rem_1.6rem_1.8rem]">
          <div className="flex items-start justify-between gap-s4">
            <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
              {item.title}
            </h3>
            <StagePill stage={item.stage} label={stageLabel} isDark={isDark} />
          </div>
          {item.brief && <p className={briefCls}>{item.brief}</p>}
          {item.categories.length > 0 && (
            <div className="flex flex-wrap gap-[0.4rem]">
              {item.categories.map((c) => (
                <Tag key={c} surface={isDark ? "dark" : "light"}>
                  {c}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <div
          className={[
            "flex items-center justify-between border-t px-[1.6rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em]",
            footBorderCls,
            footTextCls,
          ].join(" ")}
        >
          <span className="truncate">{hostnameOf(item.link)}</span>
          <span
            aria-hidden
            className="ml-2 shrink-0 text-cyan-teal transition-transform duration-2 ease-akieni group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </div>
      </a>
    </MotionCard>
  );
}
```

- [ ] **Step 2: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(showcase): add ShowcaseCard component"`

---

### Task 5: `ShowcaseExplorer` (client, stage filter)

**Files:**
- Create: `components/sections/showcase-explorer.tsx`

- [ ] **Step 1: Create the component**

```tsx
// components/sections/showcase-explorer.tsx
"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/shared/section";
import { ShowcaseCard } from "@/components/shared/showcase-card";
import type { ShowcaseItem } from "@/lib/queries/showcaseItems";

export type ShowcaseExplorerStrings = {
  counterSuffix: string;
  allLabel: string;
  stageLabels: Record<string, string>;
  emptyLabel: string;
};

// Tab order; only stages actually present in the data are shown.
const STAGE_ORDER = ["live", "beta", "rnd", "internal"];

export function ShowcaseExplorer({
  strings,
  items,
}: Readonly<{
  strings: ShowcaseExplorerStrings;
  items: ReadonlyArray<ShowcaseItem>;
}>) {
  const [active, setActive] = useState("all");

  const filters = useMemo(() => {
    const present = new Set(items.map((i) => i.stage));
    const stageTabs = STAGE_ORDER.filter((s) => present.has(s)).map((s) => ({
      id: s,
      label: strings.stageLabels[s] ?? s,
    }));
    return [{ id: "all", label: strings.allLabel }, ...stageTabs];
  }, [items, strings.allLabel, strings.stageLabels]);

  const filtered =
    active === "all" ? items : items.filter((it) => it.stage === active);
  const count = String(filtered.length).padStart(2, "0");

  return (
    <Section variant="paper">
      <div className="mb-s7 flex flex-wrap items-center justify-between gap-s5">
        <div
          role="tablist"
          aria-label="Showcase stage filter"
          className="flex flex-wrap gap-2"
        >
          {filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={[
                  "cursor-pointer border px-[0.9rem] py-[0.55rem] font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-1 ease-akieni",
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-line-light bg-transparent text-ink hover:border-black",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <span>{count}</span>&nbsp;&nbsp;{strings.counterSuffix}
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted">
          {strings.emptyLabel}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2">
          {filtered.map((item) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              stageLabel={strings.stageLabels[item.stage] ?? item.stage}
              surface="paper"
            />
          ))}
        </div>
      )}
    </Section>
  );
}
```

- [ ] **Step 2: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(showcase): add ShowcaseExplorer stage filter"`

---

### Task 6: `buildMetadata` optional `robots`

**Files:**
- Modify: `lib/seo.ts`

- [ ] **Step 1: Add `robots` to the param type** (in `buildMetadata`'s destructured signature)

```ts
export function buildMetadata({
  lang,
  pathWithoutLocale,
  title,
  description,
  keywords,
  robots,
}: {
  lang: Locale;
  pathWithoutLocale: string;
  title: string;
  description: string;
  keywords?: string[];
  robots?: Metadata["robots"];
}): Metadata {
```

- [ ] **Step 2: Merge it into the returned object** — add `...(robots && { robots }),` as the last property before the closing `}` of the returned `Metadata` object (after the `twitter: {...}` block).

```ts
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      title,
      description,
    },
    ...(robots && { robots }),
  };
}
```

- [ ] **Step 3: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(seo): support optional robots in buildMetadata"`

---

### Task 7: The page

**Files:**
- Create: `app/[lang]/showcase/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
// app/[lang]/showcase/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta";
import { ShowcaseExplorer } from "@/components/sections/showcase-explorer";
import { PageHero } from "@/components/shared/page-hero";
import { getAllShowcaseItems } from "@/lib/queries/showcaseItems";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "../dictionaries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    pathWithoutLocale: "/showcase",
    title: dict.showcase.meta.title,
    description: dict.showcase.meta.description,
    robots: { index: false, follow: false },
  });
}

export default async function ShowcasePage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, sanityItems] = await Promise.all([
    getDictionary(lang),
    getAllShowcaseItems(lang),
  ]);
  const t = dict.showcase;
  const items = sanityItems.length > 0 ? sanityItems : t.items;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        eyebrowAccent
        caption={t.hero.caption}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        titleAccent={t.hero.titleAccent}
        lede={t.hero.lede}
      />
      <ShowcaseExplorer strings={t.explorer} items={items} />
      <Cta
        lang={lang}
        strings={{
          primary: t.cta.primary,
          titleNode: (
            <>
              {t.cta.titleLine1}
              <br />
              {t.cta.titleLine2}
              <span className="text-cyan-teal">{t.cta.titleAccent}</span>
            </>
          ),
        }}
      />
    </>
  );
}
```

- [ ] **Step 2: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors. (Confirms `items` union — `ShowcaseItem[] | dict.showcase.items` — is assignable to `ReadonlyArray<ShowcaseItem>` with no cast.)
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat(showcase): add /[lang]/showcase page (noindex)"`

---

### Task 8: Seed support

**Files:**
- Modify: `scripts/seed-sanity.ts`

- [ ] **Step 1: Add `seedShowcaseItems()`** (place after `seedHomeCredo`, before `main`)

```ts
// ── 9. Showcase items ─────────────────────────────────────────────────────────

async function seedShowcaseItems() {
  console.log("\n✨ Seeding showcase items...");
  const enItems: Array<{
    id: string; title: string; brief: string; link: string;
    stage: string; categories: string[]; image?: string; mediaLabel?: string;
  }> = en.showcase?.items ?? [];
  const frItems: typeof enItems = fr.showcase?.items ?? [];

  for (let i = 0; i < enItems.length; i++) {
    const e = enItems[i];
    const f = frItems[i] ?? ({} as typeof e);

    let imageRef = null;
    if (e.image) imageRef = await uploadImage(e.image);

    const doc = {
      _id: `showcaseItem-${e.id}`,
      _type: "showcaseItem",
      title: localeStr(e.title, f.title ?? e.title),
      brief: localeStr(e.brief, f.brief ?? e.brief),
      link: e.link,
      stage: e.stage,
      categories: e.categories ?? [],
      image: imageRef ? { _type: "image", asset: imageRef, alt: e.mediaLabel ?? e.title } : undefined,
      isPublished: true,
      order: i + 1,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${e.id}`);
  }
}
```

- [ ] **Step 2: Call it in `main()`** — add `await seedShowcaseItems();` after `await seedHomeCredo();`.

- [ ] **Step 3: Typecheck** — `./node_modules/.bin/tsc --noEmit` → 0 errors. (Do NOT run the seed — it needs `SANITY_API_WRITE_TOKEN`; it's for the team to run.)
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat(showcase): seed showcase items from dictionaries"`

---

### Task 9: End-to-end verification

**Files:** none (verification only)

- [ ] **Step 1: Production build** — `./node_modules/.bin/next build`. Expected: success; output lists `/[lang]/showcase`.
- [ ] **Step 2: Start dev** — `./node_modules/.bin/next dev` (background). Wait for "Ready".
- [ ] **Step 3: Smoke routes** — `curl -s -o /dev/null -w "%{http_code}" http://localhost:<port>/en/showcase` → 200; same for `/fr/showcase`.
- [ ] **Step 4: noindex check** — `curl -s http://localhost:<port>/en/showcase | grep -i 'name="robots"'` → contains `noindex`.
- [ ] **Step 5: Sitemap exclusion** — `curl -s http://localhost:<port>/sitemap.xml | grep -c showcase` → `0`.
- [ ] **Step 6: Playwright (both locales)** — render `/en/showcase` and `/fr/showcase`:
  - localized hero + filter tabs (All + present stages only),
  - clicking a stage tab filters the grid + updates the count,
  - cards have `target="_blank"`, `rel="noopener noreferrer"`, the `↗`, and the hostname,
  - no console errors.
- [ ] **Step 7: No nav link** — confirm header/footer contain no `/showcase` link.
- [ ] **Step 8: Final commit (if any verification fixes)** — `git add -A && git commit -m "test(showcase): verification fixes"` (skip if clean).

---

## Self-Review

**Spec coverage:** route + noindex (T6/T7) · Sanity type (T1) · query + fallback (T2/T7) · dictionaries en/fr (T3) · ShowcaseCard external link + StagePill (T4) · stage filter explorer (T5) · seed (T8) · unlisted via sitemap omission + no robots.txt change (no task needed; verified T9 S5/S7) · verification (T9). All spec sections map to a task. ✓

**Placeholder scan:** No TBD/TODO; every code step shows full code; `example.com` links are intentional R&D placeholders (documented in spec §5). ✓

**Type consistency:** `ShowcaseItem` (T2) used identically in T4/T5/T7; `stage: string` throughout (no literal union) so dictionary fallback stays assignable; `ShowcaseExplorerStrings` (T5) matches `dict.showcase.explorer` shape (T3); `buildMetadata` `robots` param (T6) matches page call (T7). ✓
