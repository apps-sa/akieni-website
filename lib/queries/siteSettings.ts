import { isSanityConfigured, sanityClient } from "../sanity";

export type SiteSettings = {
  email: string;
  website: string;
  office: string;
  hours: string;
};

export async function getSiteSettings(lang: string): Promise<SiteSettings | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch<SiteSettings | null>(
      `*[_type == "siteSettings"][0] {
        email,
        website,
        "office": coalesce(office[$lang], office.en),
        "hours": coalesce(hours[$lang], hours.en),
      }`,
      { lang }
    );
  } catch {
    return null;
  }
}
