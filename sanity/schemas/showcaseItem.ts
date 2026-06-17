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
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title.en", subtitle: "stage", media: "image" },
  },
});
