import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas";

const plugins = [structureTool()];

// Vision (GROQ playground) only in development
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { visionTool } = require("@sanity/vision");
  plugins.push(visionTool());
}

export default defineConfig({
  name: "akieni-website",
  title: "Akieni Website",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  basePath: "/studio",
  plugins,
  schema: { types: schemaTypes },
});
