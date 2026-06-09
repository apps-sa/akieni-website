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

export const jobRole = defineType({
  name: "jobRole",
  title: "Job Role",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title.en" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dept",
      title: "Department",
      type: "string",
      options: {
        list: ["Engineering", "Delivery", "Academy", "Operations", "Administration"],
      },
      validation: (r) => r.required(),
    }),
    localeString("type", "Employment Type"),
    localeString("status", "Status"),
    localeString("title", "Title"),
    localeString("tagline", "Tagline"),
    localeString("team", "Team"),
    localeString("loc", "Location"),
    localeString("contract", "Contract"),
    localeString("start", "Start Date"),
    localeText("mission", "Mission"),
    localeStringArray("responsibilities", "Responsibilities"),
    localeStringArray("profile", "Profile / Requirements"),
    defineField({
      name: "stack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "isActive",
      title: "Show on site",
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
    select: { title: "title.en", subtitle: "dept" },
  },
});
