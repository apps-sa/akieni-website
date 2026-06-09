import { isSanityConfigured, sanityClient } from "../sanity";

export type SiteSettings = {
  email: string;
  website: string;
  office: string;
  hours: string;
  orgRootName: string;
  orgRootRole: string;
};

export type DepartmentData = {
  number: string;
  name: string;
  lead: string;
  size: string;
  desc: string;
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
        orgRootName,
        "orgRootRole": coalesce(orgRootRole[$lang], orgRootRole.en),
      }`,
      { lang }
    );
  } catch {
    return null;
  }
}

export async function getDepartments(lang: string): Promise<DepartmentData[]> {
  if (!isSanityConfigured) return [];
  try {
    return await sanityClient.fetch<DepartmentData[]>(
      `*[_type == "department"] | order(order asc) {
        number,
        "name": coalesce(name[$lang], name.en),
        lead,
        size,
        "desc": coalesce(desc[$lang], desc.en),
      }`,
      { lang }
    );
  } catch {
    return [];
  }
}
