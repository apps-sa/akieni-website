import { defineField, defineType } from "sanity";

export const department = defineType({
  name: "department",
  title: "Department",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Label (e.g. DEPT · 01)", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "name", title: "Name", type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({ name: "lead", title: "Lead name", type: "string" }),
    defineField({ name: "size", title: "Team size (e.g. ~25)", type: "string" }),
    defineField({
      name: "desc", title: "Description", type: "object",
      fields: [
        defineField({ name: "en", title: "English", type: "string" }),
        defineField({ name: "fr", title: "French", type: "string" }),
      ],
    }),
    defineField({ name: "order", title: "Display order", type: "number", initialValue: 99 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name.en", subtitle: "lead" } },
});
