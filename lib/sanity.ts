import { createImageUrlBuilder } from "@sanity/image-url";
import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export const sanityClient = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  // Never use the CDN — Next.js ISR controls the cache lifecycle.
  // The CDN would add an independent stale layer that bypasses revalidation.
  useCdn: false,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = createImageUrlBuilder(sanityClient as any);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const urlFor = (source: any) => builder.image(source);

export const isSanityConfigured = Boolean(projectId);
