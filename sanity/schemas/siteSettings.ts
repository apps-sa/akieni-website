import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Primary contact email",
      type: "string",
      validation: (r) => r.required().email(),
    }),
    defineField({
      name: "website",
      title: "Website display URL (e.g. www.akieni.com)",
      type: "string",
    }),
    defineField({
      name: "office",
      title: "Office location",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({
      name: "hours",
      title: "Office hours",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "email" },
  },
});
