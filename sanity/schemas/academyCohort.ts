import { defineField, defineType } from "sanity";

export const academyCohort = defineType({
  name: "academyCohort",
  title: "Academy Cohort",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Year label",
      type: "object",
      description: 'e.g. "COHORT 01 · 2025 · CLOSED"',
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({
      name: "num",
      title: "Count display",
      type: "string",
      description: 'e.g. "11 / 11" or "Open"',
    }),
    defineField({
      name: "numAccent",
      title: "Highlight count in accent colour",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({
      name: "desc",
      title: "Description",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "text" }),
        defineField({ name: "fr", title: "French", type: "text" }),
      ],
    }),
    defineField({
      name: "link",
      title: "CTA link text (empty = no CTA)",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
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
    select: { title: "year.en", subtitle: "title.en" },
  },
});
