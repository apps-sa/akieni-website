import { defineField, defineType } from "sanity";

// Bilingual short string (one line)
const ls = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name, title, type: "object",
    description,
    group,
    fields: [
      defineField({ name: "en", title: "🇬🇧 English", type: "string" }),
      defineField({ name: "fr", title: "🇫🇷 French", type: "string" }),
    ],
  });

// Bilingual long text (paragraph)
const lt = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name, title, type: "object",
    description,
    group,
    fields: [
      defineField({ name: "en", title: "🇬🇧 English", type: "text", rows: 3 }),
      defineField({ name: "fr", title: "🇫🇷 French", type: "text", rows: 3 }),
    ],
  });

// Bilingual list of strings
const la = (name: string, title: string, description?: string, group?: string) =>
  defineField({
    name, title, type: "object",
    description,
    group,
    fields: [
      defineField({ name: "en", title: "🇬🇧 English", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "fr", title: "🇫🇷 French", type: "array", of: [{ type: "string" }] }),
    ],
  });

// "At a glance" stat row (e.g. "SLA" → "99.95%")
const kvItem = defineField({
  name: "kv", title: "Stat", type: "object",
  fields: [
    defineField({ name: "k", title: "Label", type: "string", description: 'Short label shown in small caps above the value. Example: "SLA"' }),
    defineField({ name: "v", title: "Value", type: "string", description: 'The value shown in bold. Example: "99.95 %"' }),
  ],
  preview: { select: { title: "k", subtitle: "v" } },
});

// Hero badge pill (e.g. "Live in production" with a green dot)
const pillItem = defineField({
  name: "pill", title: "Badge", type: "object",
  fields: [
    defineField({ name: "label", title: "Badge text", type: "string", description: 'What the badge says. Example: "Live in production"' }),
    defineField({
      name: "variant", title: "Dot colour", type: "string",
      description: "Colour of the small dot on the left of the badge.",
      options: {
        list: [
          { title: "Cyan (default)", value: "default" },
          { title: "Green (live / active)", value: "green" },
          { title: "Blue (preview / coming soon)", value: "blue" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: { select: { title: "label", subtitle: "variant" } },
});

// Feature card (numbered item in the Features section)
const featureItem = defineField({
  name: "feature", title: "Feature", type: "object",
  fields: [
    defineField({ name: "num", title: "Number / code", type: "string", description: 'Short code shown above the title. Example: "01 / API"' }),
    ls("title", "Feature title"),
    ls("desc", "Feature description"),
  ],
  preview: { select: { title: "num" } },
});

// Step card (numbered item in the How it works section)
const stepItem = defineField({
  name: "step", title: "Step", type: "object",
  fields: [
    defineField({ name: "num", title: "Step code", type: "string", description: 'Step code shown in small caps. Example: "01 / INIT"' }),
    ls("title", "Step title"),
    ls("desc", "Step description"),
  ],
  preview: { select: { title: "num" } },
});

// Use case card
const caseItem = defineField({
  name: "case", title: "Use case", type: "object",
  fields: [
    defineField({ name: "icon", title: "Icon (symbol)", type: "string", description: "A single character or symbol displayed as the icon. Example: $ or ⌂" }),
    ls("title", "Use case title"),
    ls("desc", "Use case description"),
  ],
  preview: { select: { title: "icon" } },
});

// Related product link card
const relatedItem = defineField({
  name: "related", title: "Related product", type: "object",
  fields: [
    defineField({ name: "slug", title: "Product slug", type: "string", description: 'The URL slug of the linked product. Example: "akienipay"' }),
    defineField({ name: "tag", title: "Tag line", type: "string", description: 'Small label shown above the title. Example: "01 / Product · AkieniPay"' }),
    ls("title", "Product name"),
    ls("desc", "Short description"),
    ls("cta", "Link label", 'Text of the link. Example: "View AkieniPay →"'),
  ],
  preview: { select: { title: "slug" } },
});

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  groups: [
    { name: "card", title: "📋 Product card" },
    { name: "hero", title: "🖼 Hero section" },
    { name: "content", title: "📝 Page content" },
    { name: "cta", title: "📣 Call to action" },
    { name: "seo", title: "🔍 SEO" },
    { name: "settings", title: "⚙️ Settings" },
  ],
  fields: [

    // ── PRODUCT CARD (shown on listing pages) ─────────────────────────────────

    defineField({
      name: "slug", title: "URL slug", type: "slug", group: "card",
      description: 'Unique identifier used in the URL. Example: "akienipay" → /products/akienipay',
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "name", title: "Product name", type: "string", group: "card",
      description: "The product's display name shown on the card and page title.",
    }),
    defineField({
      name: "version", title: "Version badge", type: "string", group: "card",
      description: "Optional short version label shown next to the product name. Leave blank if not needed.",
    }),
    lt("desc", "Card description", "Short description shown on the product card in listings. Keep it to 1–2 sentences.", "card"),
    la("features", "Card feature bullets", "3 short bullet points shown on the product card. Start each with a short noun phrase.", "card"),
    defineField({
      name: "model", title: "Deployment model", type: "string", group: "card",
      description: 'Shown at the bottom of the card. Example: "SaaS · 2024 →" or "On-prem · 2025 →"',
    }),
    defineField({
      name: "mark", title: "Background watermark text", type: "string", group: "card",
      description: "Very faint text displayed as a background watermark on the card. Usually a short product code.",
    }),
    defineField({
      name: "mediaLabel", title: "Image description (alt text)", type: "string", group: "card",
      description: "Describes the card image for accessibility and SEO. Example: \"AkieniPay · Console screenshot\"",
    }),
    defineField({
      name: "image", title: "Card image", type: "image", group: "card",
      description: "Main image displayed at the top of the product card. Recommended: 16:10 ratio, at least 900 px wide.",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),

    // ── HERO SECTION ──────────────────────────────────────────────────────────

    ls("heroTitle", "Page title", "Large title shown at the top of the product detail page. Usually just the product name.", "hero"),
    ls("heroTitleAccent", "Title accent (highlighted word)", "Optional word shown in cyan after the main title. Leave blank for most products.", "hero"),
    lt("heroLede", "Page subtitle", "1–2 sentence summary shown below the title. This is the first thing visitors read — make it count.", "hero"),
    defineField({
      name: "heroPills", title: "Status badges", type: "array", group: "hero",
      description: "Small badges shown below the subtitle. Typically: product number, status (Live/Preview), and deployment model.",
      of: [pillItem],
    }),
    ls("heroCtaPrimary", "Primary button label", 'Label on the main call-to-action button. Example: "Request a demo →"', "hero"),
    ls("heroCtaSecondary", "Secondary button label", 'Label on the secondary button. Example: "View the API"', "hero"),
    ls("heroGlanceLabel", '"At a glance" heading', 'Heading above the stat box. Example: "At a glance"', "hero"),
    defineField({
      name: "heroKv", title: "Key stats", type: "array", group: "hero",
      description: "Up to 6 key stats shown in the info box on the right (e.g. SLA, latency, currencies). Each has a label and a value.",
      of: [kvItem],
      validation: (r) => r.max(6),
    }),

    // ── PAGE CONTENT ──────────────────────────────────────────────────────────

    // Overview
    ls("overviewEyebrow", "Overview — eyebrow label", 'Small label above the overview title. Example: "Overview"', "content"),
    ls("overviewTitle", "Overview — title", "Main title of the overview section.", "content"),
    lt("overviewLede", "Overview — subtitle", "1–2 sentence introduction to the overview section.", "content"),
    defineField({
      name: "overviewFeats", title: "Overview — feature pairs", type: "array", group: "content",
      description: "Grid of label/value pairs summarising the product's key specs. Up to 6 items.",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "key", title: "Label", type: "string", description: 'Short label. Example: "Deployment"' }),
          defineField({ name: "value", title: "Value", type: "string", description: 'Value. Example: "SaaS · on-prem"' }),
        ],
        preview: { select: { title: "key", subtitle: "value" } },
      }],
      validation: (r) => r.max(6),
    }),

    // Features
    ls("featuresEyebrow", "Features — eyebrow label", 'Small label above the features title. Example: "Features"', "content"),
    ls("featuresTitle", "Features — title", "Main title of the features section.", "content"),
    lt("featuresLede", "Features — subtitle", "1–2 sentence introduction to the features section.", "content"),
    defineField({
      name: "featuresItems", title: "Features — feature cards", type: "array", group: "content",
      description: "Up to 6 numbered feature cards. Each has a code, title, and short description.",
      of: [featureItem],
      validation: (r) => r.max(6),
    }),

    // How it works
    ls("flowEyebrow", "How it works — eyebrow label", 'Small label above the section title. Example: "How it works"', "content"),
    ls("flowTitle", "How it works — title", "Main title of the process section.", "content"),
    lt("flowLede", "How it works — subtitle", "1–2 sentence introduction to the process section.", "content"),
    defineField({
      name: "flowSteps", title: "How it works — steps", type: "array", group: "content",
      description: "Numbered steps showing how the product works end-to-end. Typically 4 steps.",
      of: [stepItem],
      validation: (r) => r.max(4),
    }),

    // Use cases
    ls("casesEyebrow", "Use cases — eyebrow label", 'Small label above the section title. Example: "Use cases"', "content"),
    ls("casesTitle", "Use cases — title", "Main title of the use cases section.", "content"),
    lt("casesLede", "Use cases — subtitle", "1–2 sentence introduction to the use cases section.", "content"),
    defineField({
      name: "casesItems", title: "Use cases — cards", type: "array", group: "content",
      description: "Up to 3 use case cards, each with an icon, title, and description.",
      of: [caseItem],
      validation: (r) => r.max(3),
    }),

    // Technical / API section
    ls("apiEyebrow", "Technical section — eyebrow label", 'Small label above the section title. Example: "Documentation" or "Standards"', "content"),
    ls("apiTitle", "Technical section — title", "Main title of the API or standards section.", "content"),
    lt("apiLede", "Technical section — subtitle", "1–2 sentence introduction to the technical section.", "content"),
    defineField({
      name: "apiBadges", title: "Technical badges", type: "array", group: "content",
      description: 'Short technology or standard labels shown as pills. Example: "REST · JSON", "OpenAPI 3.1", "HMAC SHA-256"',
      of: [{ type: "string" }],
    }),
    la("apiPoints", "Technical bullet points", "Up to 4 bullet points highlighting key technical capabilities.", "content"),
    ls("apiCta", "Technical section — button label", 'Label on the button in the technical section. Example: "Request API access →"', "content"),
    defineField({
      name: "apiCode", title: "Code sample", type: "text", group: "content",
      description: "Code snippet shown in the technical section. Use plain text — it will be displayed in a monospace box.",
      rows: 20,
    }),

    // Related products
    ls("relatedEyebrow", "Related products — eyebrow label", 'Small label above the section title. Example: "More products"', "content"),
    ls("relatedTitle", "Related products — title", "Main title of the related products section.", "content"),
    lt("relatedLede", "Related products — subtitle", "1–2 sentence introduction to the related products section.", "content"),
    defineField({
      name: "relatedItems", title: "Related products", type: "array", group: "content",
      description: "Up to 2 product cards linking to other products in the catalogue.",
      of: [relatedItem],
      validation: (r) => r.max(2),
    }),

    // ── CALL TO ACTION ────────────────────────────────────────────────────────

    ls("ctaEyebrow", "CTA — eyebrow label", 'Small label above the CTA title. Example: "Talk to us"', "cta"),
    ls("ctaTitle", "CTA — title", "Main title of the bottom call-to-action section.", "cta"),
    lt("ctaLede", "CTA — description", "1–2 sentences describing what happens when the visitor gets in touch.", "cta"),
    ls("ctaPrimary", "CTA — primary button label", 'Label on the main button. Example: "Request a demo →"', "cta"),
    defineField({
      name: "ctaEmail", title: "CTA — contact email", type: "string", group: "cta",
      description: 'Product-specific email address shown as a secondary contact option. Example: "akienipay@akieni.com"',
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────

    defineField({
      name: "meta", title: "SEO metadata", type: "object", group: "seo",
      description: "Title and description shown in search engine results and browser tabs.",
      fields: [
        defineField({
          name: "en", title: "🇬🇧 English", type: "object", fields: [
            defineField({ name: "title", title: "Page title", type: "string", description: 'Shown in the browser tab and search results. Example: "AkieniPay · Akieni"' }),
            defineField({ name: "description", title: "Meta description", type: "text", rows: 2, description: "1–2 sentence summary for search engines. Keep it under 160 characters." }),
          ],
        }),
        defineField({
          name: "fr", title: "🇫🇷 French", type: "object", fields: [
            defineField({ name: "title", title: "Page title", type: "string" }),
            defineField({ name: "description", title: "Meta description", type: "text", rows: 2 }),
          ],
        }),
      ],
    }),

    // ── SETTINGS ─────────────────────────────────────────────────────────────

    defineField({
      name: "order", title: "Display order", type: "number", group: "settings",
      description: "Controls the order in which products appear. Lower numbers appear first.",
      initialValue: 99,
    }),
    defineField({
      name: "isPublished", title: "Published", type: "boolean", group: "settings",
      description: "Unpublished products are hidden from the website but remain editable here.",
      initialValue: true,
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "model", media: "image" } },
});
