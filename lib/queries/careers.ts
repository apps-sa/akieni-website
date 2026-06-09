import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient } from "../sanity";

export async function getJobOpenings(lang: Locale) {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch<
      Array<{
        slug: string;
        dept: string;
        title: string;
        loc: string;
        type: string;
      }>
    >(
      `*[_type == "jobRole" && isActive == true] | order(order asc) {
        "slug": slug.current,
        dept,
        "title": coalesce(title[$lang], title.en),
        "loc": coalesce(loc[$lang], loc.en),
        "type": coalesce(type[$lang], type.en),
      }`,
      { lang }
    );
  } catch {
    return [];
  }
}

export async function getAllRoleSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  try {
    const results = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "jobRole" && isActive == true]{ "slug": slug.current }`
    );
    return results.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getRoleBySlug(slug: string, lang: Locale) {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch<{
      dept: string;
      type: string;
      status: string;
      title: string;
      tagline: string;
      team: string;
      loc: string;
      contract: string;
      start: string;
      mission: string;
      responsibilities: string[];
      profile: string[];
      stack: string[];
    } | null>(
      `*[_type == "jobRole" && slug.current == $slug][0] {
        dept,
        "type": coalesce(type[$lang], type.en),
        "status": coalesce(status[$lang], status.en),
        "title": coalesce(title[$lang], title.en),
        "tagline": coalesce(tagline[$lang], tagline.en),
        "team": coalesce(team[$lang], team.en),
        "loc": coalesce(loc[$lang], loc.en),
        "contract": coalesce(contract[$lang], contract.en),
        "start": coalesce(start[$lang], start.en),
        "mission": coalesce(mission[$lang], mission.en),
        "responsibilities": coalesce(responsibilities[$lang], responsibilities.en),
        "profile": coalesce(profile[$lang], profile.en),
        stack,
      }`,
      { slug, lang }
    );
  } catch {
    return null;
  }
}
