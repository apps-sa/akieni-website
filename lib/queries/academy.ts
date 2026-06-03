import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient } from "../sanity";

export async function getCohorts(lang: Locale) {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch<
      Array<{
        year: string;
        num: string;
        numAccent: boolean;
        title: string;
        desc: string;
        link: string;
      }>
    >(
      `*[_type == "academyCohort"] | order(order asc) {
        "year": coalesce(year[$lang], year.en),
        num,
        numAccent,
        "title": coalesce(title[$lang], title.en),
        "desc": coalesce(desc[$lang], desc.en),
        "link": coalesce(link[$lang], link.en),
      }`,
      { lang }
    );
  } catch {
    return [];
  }
}
