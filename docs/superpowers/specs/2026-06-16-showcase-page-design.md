# Showcase page — design spec

**Date:** 2026-06-16
**Branch:** `feat/showcase-page`
**Status:** Approved (design), ready for implementation plan

## 1. Goal

An **unlisted, non-indexed** page that showcases Akieni's R&D products and other live
projects/products worked on. Each item shows a short brief and a link to **access** the
live thing. Items are **filterable by stage**. The page reuses the site's existing look
and feel and has clear, simple UX ("see all projects and products" at a glance).

## 2. Decisions (locked)

| Topic | Decision |
|---|---|
| Access | **Unlisted + noindex.** No nav/footer link, omitted from sitemap, `noindex` meta. No auth. |
| Data source | **Sanity CMS** (new `showcaseItem` type) with **dictionary fallback** (same pattern as projects/home). |
| Links | **External live URLs only**, open in a new tab. **No per-item detail pages.** |
| Filter | **By stage:** `All · R&D · Beta · Live · Internal`. Single filter row. |
| Categories | Shown as tags on each card, **not** a second filter dimension in v1. |
| Route | `/[lang]/showcase` (bilingual, under the existing `[lang]` layout). |

### noindex mechanism — deliberate choice

Use the page's `generateMetadata` to emit `robots: { index: false, follow: false }`
(same precedent as `/dashboard`). **Do not** add `/showcase` to `robots.txt` `disallow`.
A `robots.txt` block prevents crawling, which means a crawler never fetches the page and
never sees the `noindex` directive — the URL can then linger in the index as a bare link.
The correct way to keep a page *out of the index* is to allow crawling and serve
`noindex`. The page is also unlisted (no inbound links, not in sitemap), so `noindex`
alone is robust. (If "never fetch it at all" is later preferred, add the `disallow` and
accept that tradeoff.)

## 3. Data model

### Sanity document type `showcaseItem`

Follows the existing schema conventions (`defineType`/`defineField`, `localeString`/
`localeText` helpers, `groups`, `order`, `isPublished`, `preview`, `orderings`).

| Field | Type | Notes |
|---|---|---|
| `title` | `localeString` (en/fr) | item name |
| `brief` | `localeText` (en/fr) | 1–2 sentence summary |
| `link` | `url` | external "access" URL; `validation: r.required().uri({ scheme: ['http','https'] })` |
| `stage` | `string` w/ `options.list` | `rnd` · `beta` · `live` · `internal`; required |
| `categories` | `array of string` | display tags (language-neutral, e.g. "Fintech"); optional |
| `image` | `image` (hotspot + alt) | optional cover |
| `order` | `number` | sort (asc), `initialValue: 99` |
| `isPublished` | `boolean` | publish gate, `initialValue: true` |

No `slug` field — links are external and there are no detail pages, so `_id` is the only
identity needed (used as the React key via `"id": _id`).

### Runtime type (shared)

```ts
export type ShowcaseItem = {
  id: string;
  title: string;
  brief: string;
  link: string;
  stage: string;            // "rnd" | "beta" | "live" | "internal" — kept as `string`
  categories: string[];     //   (not a literal union) so the JSON-typed dictionary
  image: string | null;     //   fallback items stay assignable, matching how
  mediaLabel?: string;      //   projects types `statusLabel`/`categories` as plain strings.
};
```

Both the Sanity query result (`image: string | null`) and the dictionary-fallback items
(`image: string`, `stage: string`) are structurally assignable to `ShowcaseItem`, so the
page can do `sanityItems.length ? sanityItems : dict.showcase.items` with **no cast**.
`StagePill` narrows `stage` at render time via a `Record<string, …>` lookup with a safe
default (unknown stage → muted dot, raw label).

### Query — `lib/queries/showcaseItems.ts`

Mirrors `getAllProjects`: `isSanityConfigured` guard → GROQ with `coalesce(field[$lang],
field.en)` → `try/catch` returning `[]`. Resolves the Sanity image to a URL string named
`image` (so it unifies with the dictionary fallback, which uses a `/public` path string —
no field renaming needed downstream).

```
*[_type == "showcaseItem" && isPublished == true] | order(order asc) {
  "id": _id,
  "title": coalesce(title[$lang], title.en),
  "brief": coalesce(brief[$lang], brief.en),
  link, stage, categories, image, order,
}
```
Post-process: `image: row.image ? urlFor(row.image).width(800).url() : null`,
`categories: row.categories ?? []`.

## 4. Components

All built from existing primitives + tokens; **no new CSS files**.

### `components/shared/showcase-card.tsx`
- `<a href={item.link} target="_blank" rel="noopener noreferrer">` wrapped in `MotionCard`
  (reuse hover-lift/reveal). Mirrors `ProjectCard`'s structure/classes (`surface="paper"`).
- Media: `BlurImage` (fill, object-cover) when `image`, else `PlaceholderMedia`
  (`aspect="4/3"`, `surface="light"`, `label={mediaLabel}`).
- Content: title (`h3`, same classes as ProjectCard) + brief (`text-md text-muted`) +
  a **StagePill** (top-right of the title row) + category `Tag`s.
- Footer (border-top, mono xs): the link **hostname** + an **↗** affordance
  (`aria-hidden`; up-right arrow distinguishes external from the internal `→`).
  Hostname computed safely (guarded `try/catch` around `new URL()`).

### StagePill (inline in showcase-card)
Small mono pill with a colored dot, color-coded with existing tokens (reusing the dot+glow
pattern from `PlaceholderMedia.CHIP_DOT` / `Tag` status):

| Stage | Label | Dot color | Token |
|---|---|---|---|
| `live` | Live | green | `bg-green` (+glow) |
| `beta` | Beta | cyan | `bg-cyan-teal` (+glow) |
| `rnd` | R&D | blue | `bg-blue` (+glow) |
| `internal` | Internal | muted | `bg-muted` (no glow) |

Labels come from `showcase.explorer.stageLabels` (localized).

### `components/sections/showcase-explorer.tsx` (client)
- Copies the `projects-explorer` tablist verbatim (active `border-black bg-black
  text-white`, inactive `border-line-light … hover:border-black`, `role="tablist"`,
  zero-padded count on the right).
- Tabs = **All + only the stages present in `items`** (no empty filters), in the order
  `live, beta, rnd, internal`. Default `all`. Filters `items` by `stage` with `useState`.
- Grid: `grid-cols-1 gap-s5 min-[721px]:grid-cols-2` (same as projects).
- Empty state: if `items` is empty, render `showcase.explorer.emptyLabel`.

### `app/[lang]/showcase/page.tsx`
`PageHero` → `ShowcaseExplorer` → `Cta` (same skeleton as the projects page).
- `export const revalidate = 60;`
- `generateMetadata`: `hasLocale` guard, `buildMetadata({ …, pathWithoutLocale:
  "/showcase", robots: { index: false, follow: false } })`.
- Body: `hasLocale` guard → `notFound()`; load dict + `getAllShowcaseItems(lang)`;
  `const items = sanityItems.length ? sanityItems : dict.showcase.items;` pass to explorer.

## 5. i18n & content

Add a top-level **`showcase`** block to **both** `en.json` and `fr.json` (structurally
identical — `Dictionary = typeof en`):

```jsonc
"showcase": {
  "meta": { "title": "...", "description": "..." },
  "hero": { "eyebrow": "...", "caption": "...", "titleLine1": "...", "titleLine2": "...", "titleAccent": "...", "lede": "..." },
  "explorer": {
    "counterSuffix": "RESULTS",
    "allLabel": "All",
    "stageLabels": { "live": "Live", "beta": "Beta", "rnd": "R&D", "internal": "Internal" },
    "emptyLabel": "Nothing here yet."
  },
  "items": [
    { "id": "akienipay", "title": "AkieniPay", "brief": "...", "link": "https://...", "stage": "live", "categories": ["Fintech","Payments"], "image": "/images/ged.png", "mediaLabel": "AkieniPay" }
    // + cartracking, biometrie (live), + 1–2 clearly-marked R&D placeholders
  ],
  "cta": { "primary": "...", "titleLine1": "...", "titleLine2": "...", "titleAccent": "..." }
}
```

Seed fallback items: the three live products (AkieniPay, CarTracking, Biometrie) as
`live`, plus 1–2 placeholder R&D entries (clearly marked `https://example.com/...`) for
the team to replace with real briefs + links.

## 6. Seeding

Extend `scripts/seed-sanity.ts` with `seedShowcaseItems()` (called from `main()`),
mirroring `seedProjects`: read `en.showcase.items` / `fr.showcase.items`, upload optional
images via `uploadImage`, `client.createOrReplace({ _id: \`showcaseItem-${item.id}\`,
_type: "showcaseItem", title: localeStr(...), brief: localeStr(...), link, stage,
categories, image, isPublished: true, order: i+1 })`.

## 7. SEO / routing

- `lib/seo.ts`: add optional `robots?: Metadata["robots"]` param to `buildMetadata`,
  merged via `...(robots && { robots })`. Backward-compatible (all existing calls unaffected).
- `app/sitemap.ts`: **no change** — omission keeps it unlisted.
- `app/robots.ts`: **no change** (see §2 rationale).
- `proxy.ts`: **no change** — the matcher already locale-redirects any new `[lang]` route.
- `next.config.ts`: **no change** — `cdn.sanity.io` already whitelisted.

## 8. Files

**Create**
- `sanity/schemas/showcaseItem.ts`
- `lib/queries/showcaseItems.ts`
- `components/shared/showcase-card.tsx`
- `components/sections/showcase-explorer.tsx`
- `app/[lang]/showcase/page.tsx`

**Edit**
- `sanity/schemas/index.ts` (register `showcaseItem`)
- `scripts/seed-sanity.ts` (add `seedShowcaseItems()` + call)
- `lib/seo.ts` (optional `robots` param)
- `app/[lang]/dictionaries/en.json` (+ `showcase` block)
- `app/[lang]/dictionaries/fr.json` (+ identical `showcase` block, FR copy)

**No change:** `proxy.ts`, `app/sitemap.ts`, `app/robots.ts`, `next.config.ts`

## 9. Verification (no test framework exists)

1. `./node_modules/.bin/tsc --noEmit` → 0 errors (proves en/fr dictionary parity + types).
2. `./node_modules/.bin/next build` → succeeds; `/[lang]/showcase` builds.
3. Run dev (`./node_modules/.bin/next dev`) and drive with Playwright:
   - `/en/showcase` & `/fr/showcase` render; localized hero + tabs.
   - Stage filter narrows the grid; count updates; only present stages shown.
   - External cards have `target="_blank"`, `rel="noopener noreferrer"`, `↗`.
   - View source: `<meta name="robots" content="noindex, nofollow">` present.
   - No console errors.
4. Confirm `/showcase` is **absent** from `/sitemap.xml` and there is **no** nav/footer link.

## 10. Out of scope (v1)

- Per-item detail pages, category filtering, URL-synced filter state, auth gate,
  pagination/search, OG images for the showcase route.

## 11. Risks / edge cases

- **en/fr drift**: caught by `tsc` (type derived from `en.json`). Keep blocks identical.
- **Invalid `link`**: hostname extraction guarded; schema validates URL on input.
- **Empty data**: dictionary fallback guarantees a non-empty page in local dev.
- **Guessable URL**: acceptable per "unlisted + noindex (no auth)" decision.
- **Stage list growth**: adding a stage requires updating the enum, the `ShowcaseStage`
  union, the StagePill color map, and `stageLabels` in both dictionaries.
