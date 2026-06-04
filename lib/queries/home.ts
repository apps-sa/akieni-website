import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient } from "../sanity";

export type CredoData = {
  attribution: string;
  quoteLine1: string;
  quoteAccent: string;
  quoteLine2: string;
};

export async function getHomeCredo(lang: Locale): Promise<CredoData | null> {
  if (!isSanityConfigured) return null;
  try {
    const result = await sanityClient.fetch<CredoData | null>(
      `*[_type == "homeCredo"][0] {
        attribution,
        "quoteLine1": coalesce(quoteLine1[$lang], quoteLine1.en),
        "quoteAccent": coalesce(quoteAccent[$lang], quoteAccent.en),
        "quoteLine2": coalesce(quoteLine2[$lang], quoteLine2.en),
      }`,
      { lang }
    );
    return result ?? null;
  } catch {
    return null;
  }
}
