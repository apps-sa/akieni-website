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

const localeStringArray = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "object",
    fields: [
      defineField({ name: "en", title: "English", type: "array", of: [{ type: "string" }] }),
      defineField({ name: "fr", title: "French", type: "array", of: [{ type: "string" }] }),
    ],
  });

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "listing", title: "Listing card" },
    { name: "detail", title: "Detail page" },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    // ── Listing card ──────────────────────────────────────────
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "listing",
      options: { source: "title.en" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "listing",
      of: [{ type: "string" }],
      options: {
        list: ["government", "finance", "health", "social", "future"],
      },
    }),
    defineField({ name: "client", title: "Client", type: "string", group: "listing" }),
    localeString("title", "Title"),
    localeText("desc", "Description"),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "listing",
      of: [{ type: "string" }],
    }),
    defineField({ name: "years", title: "Years", type: "string", group: "listing" }),
    localeString("statusLabel", "Status label"),
    defineField({
      name: "image",
      title: "Cover image",
      type: "image",
      group: "listing",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),

    // ── Detail page ───────────────────────────────────────────
    defineField({
      name: "meta",
      title: "SEO meta",
      type: "object",
      group: "detail",
      fields: [
        defineField({
          name: "en",
          title: "English",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        }),
        defineField({
          name: "fr",
          title: "French",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "heroLede",
      title: "Hero lede",
      type: "object",
      group: "detail",
      fields: [
        defineField({ name: "en", title: "English", type: "text" }),
        defineField({ name: "fr", title: "French", type: "text" }),
      ],
    }),
    defineField({
      name: "overview",
      title: "Overview strip",
      type: "array",
      group: "detail",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "object", fields: [
              defineField({ name: "en", type: "string" }),
              defineField({ name: "fr", type: "string" }),
            ]}),
            defineField({ name: "value", type: "object", fields: [
              defineField({ name: "en", type: "string" }),
              defineField({ name: "fr", type: "string" }),
            ]}),
            defineField({ name: "accent", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "label.en", subtitle: "value.en" } },
        },
      ],
    }),
    defineField({
      name: "challenge",
      title: "Challenge section",
      type: "object",
      group: "detail",
      fields: [
        localeString("eyebrow", "Eyebrow"),
        localeString("title", "Title"),
        localeStringArray("paragraphs", "Paragraphs"),
      ],
    }),
    defineField({
      name: "solution",
      title: "Solution section",
      type: "object",
      group: "detail",
      fields: [
        localeString("eyebrow", "Eyebrow"),
        localeString("title", "Title"),
        localeText("lede", "Lede"),
        localeStringArray("items", "Items"),
        defineField({
          name: "gallery",
          title: "Gallery",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", type: "object", fields: [
                  defineField({ name: "en", type: "string" }),
                  defineField({ name: "fr", type: "string" }),
                ]}),
                defineField({
                  name: "image",
                  type: "image",
                  options: { hotspot: true },
                  fields: [defineField({ name: "alt", type: "string" })],
                }),
              ],
              preview: { select: { title: "label.en", media: "image" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "stack",
      title: "Tech stack section",
      type: "object",
      group: "detail",
      fields: [
        localeString("eyebrow", "Eyebrow"),
        localeString("titleLine1", "Title line 1"),
        localeString("titleLine2", "Title line 2"),
        localeText("lede", "Lede"),
        defineField({
          name: "groups",
          title: "Stack groups",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "heading", type: "object", fields: [
                  defineField({ name: "en", type: "string" }),
                  defineField({ name: "fr", type: "string" }),
                ]}),
                defineField({ name: "items", type: "array", of: [{ type: "string" }] }),
              ],
              preview: { select: { title: "heading.en" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "impact",
      title: "Impact section",
      type: "object",
      group: "detail",
      fields: [
        localeString("eyebrow", "Eyebrow"),
        localeString("titleLine1", "Title line 1"),
        localeString("titleLine2", "Title line 2"),
        localeText("lede", "Lede"),
        defineField({
          name: "cells",
          title: "Stat cells",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "num", type: "string", title: "Number / stat" }),
                defineField({ name: "desc", type: "object", fields: [
                  defineField({ name: "en", type: "string" }),
                  defineField({ name: "fr", type: "string" }),
                ]}),
              ],
              preview: { select: { title: "num", subtitle: "desc.en" } },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "nav",
      title: "Next project nav",
      type: "object",
      group: "detail",
      fields: [
        localeString("allLabel", "All label"),
        localeString("allTitle", "All title"),
        localeString("nextLabel", "Next label"),
        defineField({ name: "nextSlug", type: "string", title: "Next project slug" }),
        localeString("nextTitle", "Next project title"),
      ],
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA title",
      type: "object",
      group: "detail",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaPrimary",
      title: "CTA primary label",
      type: "object",
      group: "detail",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),

    // ── Settings ──────────────────────────────────────────────
    defineField({
      name: "isPublished",
      title: "Published",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "settings",
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.en", subtitle: "client", media: "image" },
  },
});
