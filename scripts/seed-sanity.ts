/**
 * Seed script — reads en.json + fr.json and uploads all dynamic content to Sanity.
 * Run once after setting up the Sanity project:
 *   pnpm tsx scripts/seed-sanity.ts
 *
 * Requires in .env.local:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID=...
 *   NEXT_PUBLIC_SANITY_DATASET=production
 *   SANITY_API_WRITE_TOKEN=...  (Editor token from Sanity dashboard)
 */

import fs from "fs";
import path from "path";
import { createClient } from "next-sanity";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
});

const dictDir = path.resolve(process.cwd(), "app/[lang]/dictionaries");
const en = JSON.parse(fs.readFileSync(path.join(dictDir, "en.json"), "utf-8"));
const fr = JSON.parse(fs.readFileSync(path.join(dictDir, "fr.json"), "utf-8"));
const publicDir = path.resolve(process.cwd(), "public");

// ── Helpers ───────────────────────────────────────────────────────────────────

function localeStr(enVal: string, frVal: string) {
  return { en: enVal ?? "", fr: frVal ?? "" };
}

function localeArr(enVal: string[], frVal: string[]) {
  return { en: enVal ?? [], fr: frVal ?? [] };
}

async function uploadImage(imagePath: string): Promise<{ _type: "reference"; _ref: string } | null> {
  if (!imagePath) return null;
  // imagePath is like "/images/foo.jpg"
  const localPath = path.join(publicDir, imagePath);
  if (!fs.existsSync(localPath)) {
    console.warn(`  ⚠ Image not found locally: ${localPath}`);
    return null;
  }
  const ext = path.extname(imagePath).replace(".", "").toLowerCase();
  const mimeMap: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
  };
  const mimeType = mimeMap[ext] ?? "image/jpeg";
  const stream = fs.createReadStream(localPath);
  const asset = await client.assets.upload("image", stream, {
    filename: path.basename(imagePath),
    contentType: mimeType,
  });
  console.log(`  ✓ Uploaded image: ${path.basename(imagePath)}`);
  return { _type: "reference", _ref: asset._id };
}

// ── 1. Job Roles ──────────────────────────────────────────────────────────────

async function seedJobRoles() {
  console.log("\n📋 Seeding job roles...");
  const enItems = en.roles?.items ?? {};
  const frItems = fr.roles?.items ?? {};
  const slugs = Object.keys(enItems);

  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const e = enItems[slug];
    const f = frItems[slug] ?? {};

    const doc = {
      _id: `jobRole-${slug}`,
      _type: "jobRole",
      slug: { _type: "slug", current: slug },
      dept: e.dept,
      type: localeStr(e.type, f.type),
      status: localeStr(e.status, f.status),
      title: localeStr(e.title, f.title),
      tagline: localeStr(e.tagline, f.tagline),
      team: localeStr(e.team, f.team),
      loc: localeStr(e.loc, f.loc),
      contract: localeStr(e.contract, f.contract),
      start: localeStr(e.start, f.start),
      mission: localeStr(e.mission, f.mission),
      responsibilities: localeArr(e.responsibilities, f.responsibilities),
      profile: localeArr(e.profile, f.profile),
      stack: e.stack ?? [],
      isActive: true,
      order: i + 1,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${slug}`);
  }
}

// ── 2. Team Members ───────────────────────────────────────────────────────────

async function seedTeamMembers() {
  console.log("\n👥 Seeding team members...");
  const enItems: Array<{ name: string; role: string; bio: string; photoLabel: string }> =
    en.team?.leadership?.items ?? [];
  const frItems: Array<{ name: string; role: string; bio: string; photoLabel: string }> =
    fr.team?.leadership?.items ?? [];

  for (let i = 0; i < enItems.length; i++) {
    const e = enItems[i];
    const f = frItems[i] ?? {};
    const slugId = e.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const doc: Record<string, unknown> = {
      _id: `teamMember-${slugId}`,
      _type: "teamMember",
      name: e.name,
      role: localeStr(e.role, (f as typeof e).role),
      bio: localeStr(e.bio, (f as typeof e).bio),
      isLeadership: true,
      order: i + 1,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${e.name}`);
  }
}

// ── 3. Academy Cohorts ────────────────────────────────────────────────────────

async function seedCohorts() {
  console.log("\n🎓 Seeding academy cohorts...");
  const enItems: Array<{ year: string; num: string; numAccent: boolean; title: string; desc: string; link: string }> =
    en.academy?.cohorts?.items ?? [];
  const frItems: typeof enItems = fr.academy?.cohorts?.items ?? [];

  for (let i = 0; i < enItems.length; i++) {
    const e = enItems[i];
    const f = frItems[i] ?? {};

    const doc = {
      _id: `academyCohort-${i + 1}`,
      _type: "academyCohort",
      year: localeStr(e.year, (f as typeof e).year),
      num: e.num,
      numAccent: e.numAccent ?? false,
      title: localeStr(e.title, (f as typeof e).title),
      desc: localeStr(e.desc, (f as typeof e).desc),
      link: localeStr(e.link ?? "", (f as typeof e).link ?? ""),
      order: i + 1,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ Cohort ${i + 1}: ${e.year}`);
  }
}

// ── 4. Projects ───────────────────────────────────────────────────────────────

async function seedProjects() {
  console.log("\n🏗  Seeding projects...");
  const enExplorer: Array<{
    slug: string; categories: string[]; client: string; title: string;
    desc: string; tags: string[]; years: string; statusLabel: string;
    mediaLabel: string; image?: string;
  }> = en.projects?.explorer?.items ?? [];
  const frExplorer: typeof enExplorer = fr.projects?.explorer?.items ?? [];
  const enDetails = en.projectDetails ?? {};
  const frDetails = fr.projectDetails ?? {};

  for (let i = 0; i < enExplorer.length; i++) {
    const eCard = enExplorer[i];
    const fCard = frExplorer[i] ?? {};
    const slug = eCard.slug;
    if (!slug) {
      console.log(`  ⏭ Skipping confidential card (no slug)`);
      continue;
    }

    const eDetail = enDetails[slug] ?? {};
    const fDetail = frDetails[slug] ?? {};

    // Upload cover image
    let imageRef = null;
    if (eCard.image) {
      imageRef = await uploadImage(eCard.image);
    }

    // Upload gallery images
    const gallery = (eDetail.solution?.gallery ?? []).map(
      (g: { label: string; image?: string }) => ({ label: g.label, image: g.image })
    );
    const galleryDocs = [];
    for (const g of gallery) {
      const gImageRef = g.image ? await uploadImage(g.image) : null;
      const enGallery = eDetail.solution?.gallery?.find((x: { label: string }) => x.label === g.label) ?? {};
      const frGallery = fDetail.solution?.gallery?.find((x: { label: string }) => x.label === g.label) ?? {};
      galleryDocs.push({
        _key: g.label.replace(/[^a-z0-9]/gi, "-").toLowerCase(),
        label: localeStr(enGallery.label ?? g.label, frGallery.label ?? g.label),
        image: gImageRef ? { _type: "image", asset: gImageRef } : undefined,
      });
    }

    // Build overview rows
    const enOverview: Array<{ label: string; value: string; accent?: boolean }> = eDetail.overview ?? [];
    const frOverview: typeof enOverview = fDetail.overview ?? [];
    const overviewDocs = enOverview.map((row, ri) => ({
      _key: `overview-${ri}`,
      label: localeStr(row.label, frOverview[ri]?.label ?? row.label),
      value: localeStr(row.value, frOverview[ri]?.value ?? row.value),
      accent: row.accent ?? false,
    }));

    // Build stack groups
    const enGroups: Array<{ heading: string; items: string[] }> = eDetail.stack?.groups ?? [];
    const frGroups: typeof enGroups = fDetail.stack?.groups ?? [];
    const stackGroups = enGroups.map((g, gi) => ({
      _key: `group-${gi}`,
      heading: localeStr(g.heading, frGroups[gi]?.heading ?? g.heading),
      items: g.items,
    }));

    // Build impact cells
    const enCells: Array<{ num: string; desc: string }> = eDetail.impact?.cells ?? [];
    const frCells: typeof enCells = fDetail.impact?.cells ?? [];
    const cells = enCells.map((c, ci) => ({
      _key: `cell-${ci}`,
      num: c.num,
      desc: localeStr(c.desc, frCells[ci]?.desc ?? c.desc),
    }));

    const doc = {
      _id: `project-${slug}`,
      _type: "project",
      slug: { _type: "slug", current: slug },
      categories: eCard.categories,
      client: eCard.client,
      title: localeStr(eCard.title, (fCard as typeof eCard).title ?? eCard.title),
      desc: localeStr(eCard.desc, (fCard as typeof eCard).desc ?? eCard.desc),
      tags: eCard.tags,
      years: eCard.years,
      statusLabel: localeStr(eCard.statusLabel, (fCard as typeof eCard).statusLabel ?? eCard.statusLabel),
      image: imageRef ? { _type: "image", asset: imageRef, alt: eCard.mediaLabel } : undefined,
      meta: {
        en: { title: eDetail.meta?.title ?? "", description: eDetail.meta?.description ?? "" },
        fr: { title: fDetail.meta?.title ?? "", description: fDetail.meta?.description ?? "" },
      },
      heroLede: localeStr(eDetail.hero?.lede ?? "", fDetail.hero?.lede ?? ""),
      overview: overviewDocs,
      challenge: {
        eyebrow: localeStr(eDetail.challenge?.eyebrow ?? "", fDetail.challenge?.eyebrow ?? ""),
        title: localeStr(eDetail.challenge?.title ?? "", fDetail.challenge?.title ?? ""),
        paragraphs: localeArr(eDetail.challenge?.paragraphs ?? [], fDetail.challenge?.paragraphs ?? []),
      },
      solution: {
        eyebrow: localeStr(eDetail.solution?.eyebrow ?? "", fDetail.solution?.eyebrow ?? ""),
        title: localeStr(eDetail.solution?.title ?? "", fDetail.solution?.title ?? ""),
        lede: localeStr(eDetail.solution?.lede ?? "", fDetail.solution?.lede ?? ""),
        items: localeArr(eDetail.solution?.items ?? [], fDetail.solution?.items ?? []),
        gallery: galleryDocs,
      },
      stack: {
        eyebrow: localeStr(eDetail.stack?.eyebrow ?? "", fDetail.stack?.eyebrow ?? ""),
        titleLine1: localeStr(eDetail.stack?.titleLine1 ?? "", fDetail.stack?.titleLine1 ?? ""),
        titleLine2: localeStr(eDetail.stack?.titleLine2 ?? "", fDetail.stack?.titleLine2 ?? ""),
        lede: localeStr(eDetail.stack?.lede ?? "", fDetail.stack?.lede ?? ""),
        groups: stackGroups,
      },
      impact: {
        eyebrow: localeStr(eDetail.impact?.eyebrow ?? "", fDetail.impact?.eyebrow ?? ""),
        titleLine1: localeStr(eDetail.impact?.titleLine1 ?? "", fDetail.impact?.titleLine1 ?? ""),
        titleLine2: localeStr(eDetail.impact?.titleLine2 ?? "", fDetail.impact?.titleLine2 ?? ""),
        lede: localeStr(eDetail.impact?.lede ?? "", fDetail.impact?.lede ?? ""),
        cells,
      },
      nav: {
        allLabel: localeStr(eDetail.nav?.allLabel ?? "", fDetail.nav?.allLabel ?? ""),
        allTitle: localeStr(eDetail.nav?.allTitle ?? "", fDetail.nav?.allTitle ?? ""),
        nextLabel: localeStr(eDetail.nav?.nextLabel ?? "", fDetail.nav?.nextLabel ?? ""),
        nextSlug: eDetail.nav?.nextSlug ?? "",
        nextTitle: localeStr(eDetail.nav?.nextTitle ?? "", fDetail.nav?.nextTitle ?? ""),
      },
      ctaTitle: localeStr(eDetail.cta?.title ?? "", fDetail.cta?.title ?? ""),
      ctaPrimary: localeStr(eDetail.cta?.primary ?? "", fDetail.cta?.primary ?? ""),
      isPublished: true,
      order: i + 1,
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ ${slug}`);
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🚀 Akieni Sanity seed script");
  console.log(`   Project: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`   Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"}`);

  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error("❌ NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local");
    process.exit(1);
  }
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("❌ SANITY_API_WRITE_TOKEN is not set in .env.local");
    process.exit(1);
  }

  await seedJobRoles();
  await seedTeamMembers();
  await seedCohorts();
  await seedProjects();

  console.log("\n✅ Seed complete! Open your Sanity studio to verify the data.");
  console.log("   Remember to remove SANITY_API_WRITE_TOKEN from .env.local after seeding.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
