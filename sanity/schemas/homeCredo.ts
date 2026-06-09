import { defineField, defineType } from "sanity";

export const homeCredo = defineType({
  name: "homeCredo",
  title: "Home – Credo",
  type: "document",
  fields: [
    defineField({
      name: "attribution",
      title: "Attribution (e.g. Frédéric Nzé, CEO)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "quoteLine1",
      title: "Quote – opening line",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({
      name: "quoteAccent",
      title: "Quote – accented phrase",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({
      name: "quoteLine2",
      title: "Quote – closing line",
      type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
  ],
  preview: {
    select: { title: "attribution" },
  },
});
