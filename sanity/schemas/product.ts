import { defineField, defineType } from "sanity";

const ls = (name: string, title: string) =>
  defineField({
    name, title, type: "object",
    fields: [
      defineField({ name: "en", title: "English", type: "string" }),
      defineField({ name: "fr", title: "French", type: "string" }),
    ],
  });

const lt = (name: string, title: string) =>
  defineField({
    name, title, type: "object",
    fields: [
      defineField({ name: "en", title: "English", type: "text" }),
      defineField({ name: "fr", title: "French", type: "text" }),
    ],
  });

const la = (name: string, title: string) =>
  defineField({
    name, title, type: "object",
    fields: [
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "fr", title: "French", type: "array", of: [{ type: "string" }] }),
    ],
  });

const kvItem = defineField({
  name: "kv", title: "Key-value item", type: "object",
  fields: [
    defineField({ name: "k", title: "Key", type: "string" }),
    defineField({ name: "v", title: "Value", type: "string" }),
  ],
  preview: { select: { title: "k", subtitle: "v" } },
});

const pillItem = defineField({
  name: "pill", title: "Pill", type: "object",
  fields: [
    defineField({ name: "label", type: "string" }),
    defineField({ name: "variant", type: "string", options: { list: ["default", "green", "blue"] } }),
  ],
  preview: { select: { title: "label" } },
});

const featureItem = defineField({
  name: "feature", title: "Feature", type: "object",
  fields: [
    defineField({ name: "num", type: "string" }),
    ls("title", "Title"),
    ls("desc", "Description"),
  ],
  preview: { select: { title: "num" } },
});

const stepItem = defineField({
  name: "step", title: "Step", type: "object",
  fields: [
    defineField({ name: "num", type: "string" }),
    ls("title", "Title"),
    ls("desc", "Description"),
  ],
  preview: { select: { title: "num" } },
});

const caseItem = defineField({
  name: "case", title: "Use case", type: "object",
  fields: [
    defineField({ name: "icon", type: "string" }),
    ls("title", "Title"),
    ls("desc", "Description"),
  ],
  preview: { select: { title: "icon" } },
});

const relatedItem = defineField({
  name: "related", title: "Related product", type: "object",
  fields: [
    defineField({ name: "slug", type: "string" }),
    defineField({ name: "tag", type: "string" }),
    ls("title", "Title"),
    ls("desc", "Description"),
    ls("cta", "CTA label"),
  ],
  preview: { select: { title: "slug" } },
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "card", title: "Card (listing)" },
    { name: "detail", title: "Detail page" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ── Card ──────────────────────────────────────────────────────────────────
    defineField({
      name: "slug", title: "Slug", type: "slug", group: "card",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "name", title: "Product name", type: "string", group: "card" }),
    defineField({ name: "version", title: "Version badge", type: "string", group: "card" }),
    lt("desc", "Card description"),
    la("features", "Card feature bullets"),
    defineField({ name: "model", title: "Deployment model (e.g. SaaS · 2024 →)", type: "string", group: "card" }),
    defineField({ name: "chip", title: "Status chip label", type: "string", group: "card" }),
    defineField({
      name: "chipVariant", title: "Status chip colour", type: "string", group: "card",
      options: { list: ["default", "green", "blue"] },
    }),
    defineField({ name: "mark", title: "Background mark text", type: "string", group: "card" }),
    defineField({ name: "mediaLabel", title: "Image alt / media label", type: "string", group: "card" }),
    defineField({
      name: "image", title: "Card image", type: "image", group: "card",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),

    // ── Detail – Hero ─────────────────────────────────────────────────────────
    ls("heroTitle", "Hero title"),
    ls("heroTitleAccent", "Hero title accent"),
    lt("heroLede", "Hero lede"),
    defineField({
      name: "heroPills", title: "Hero pills", type: "array", group: "detail",
      of: [pillItem],
    }),
    ls("heroCtaPrimary", "Hero CTA primary"),
    ls("heroCtaSecondary", "Hero CTA secondary"),
    ls("heroGlanceLabel", "At-a-glance label"),
    defineField({
      name: "heroKv", title: "At-a-glance key-values", type: "array", group: "detail",
      of: [kvItem],
    }),

    // ── Detail – Overview ──────────────────────────────────────────────────────
    ls("overviewEyebrow", "Overview eyebrow"),
    ls("overviewTitle", "Overview title"),
    lt("overviewLede", "Overview lede"),
    defineField({
      name: "overviewFeats", title: "Overview feature pairs", type: "array", group: "detail",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "key", type: "string" }),
          defineField({ name: "value", type: "string" }),
        ],
        preview: { select: { title: "key", subtitle: "value" } },
      }],
    }),

    // ── Detail – Features ──────────────────────────────────────────────────────
    ls("featuresEyebrow", "Features eyebrow"),
    ls("featuresTitle", "Features title"),
    lt("featuresLede", "Features lede"),
    defineField({
      name: "featuresItems", title: "Feature cards", type: "array", group: "detail",
      of: [featureItem],
    }),

    // ── Detail – Flow ──────────────────────────────────────────────────────────
    ls("flowEyebrow", "Flow eyebrow"),
    ls("flowTitle", "Flow title"),
    lt("flowLede", "Flow lede"),
    defineField({
      name: "flowSteps", title: "Flow steps", type: "array", group: "detail",
      of: [stepItem],
    }),

    // ── Detail – Cases ─────────────────────────────────────────────────────────
    ls("casesEyebrow", "Cases eyebrow"),
    ls("casesTitle", "Cases title"),
    lt("casesLede", "Cases lede"),
    defineField({
      name: "casesItems", title: "Use cases", type: "array", group: "detail",
      of: [caseItem],
    }),

    // ── Detail – API / Standards ───────────────────────────────────────────────
    ls("apiEyebrow", "API section eyebrow"),
    ls("apiTitle", "API section title"),
    lt("apiLede", "API section lede"),
    defineField({
      name: "apiBadges", title: "API badges", type: "array", group: "detail",
      of: [{ type: "string" }],
    }),
    la("apiPoints", "API bullet points"),
    ls("apiCta", "API CTA label"),
    defineField({ name: "apiCode", title: "API code sample", type: "text", group: "detail" }),

    // ── Detail – Related ───────────────────────────────────────────────────────
    ls("relatedEyebrow", "Related eyebrow"),
    ls("relatedTitle", "Related title"),
    lt("relatedLede", "Related lede"),
    defineField({
      name: "relatedItems", title: "Related products", type: "array", group: "detail",
      of: [relatedItem],
    }),

    // ── Detail – CTA ──────────────────────────────────────────────────────────
    ls("ctaEyebrow", "CTA eyebrow"),
    ls("ctaTitle", "CTA title"),
    lt("ctaLede", "CTA lede"),
    ls("ctaPrimary", "CTA primary label"),
    defineField({ name: "ctaEmail", title: "CTA email", type: "string", group: "detail" }),

    // ── Meta ──────────────────────────────────────────────────────────────────
    defineField({
      name: "meta", title: "SEO meta", type: "object", group: "detail",
      fields: [
        defineField({ name: "en", title: "English", type: "object", fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "description", type: "text" }),
        ]}),
        defineField({ name: "fr", title: "French", type: "object", fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "description", type: "text" }),
        ]}),
      ],
    }),

    // ── Settings ──────────────────────────────────────────────────────────────
    defineField({ name: "order", title: "Display order", type: "number", group: "settings", initialValue: 99 }),
    defineField({ name: "isPublished", title: "Published", type: "boolean", group: "settings", initialValue: true }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "model", media: "image" } },
});
