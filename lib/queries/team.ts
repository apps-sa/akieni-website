import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient, urlFor } from "../sanity";

export async function getLeadership(lang: Locale) {
  if (!isSanityConfigured) return [];
  try {
    const members = await sanityClient.fetch<
      Array<{
        name: string;
        role: string;
        bio: string;
        photo: { asset: { _ref: string }; alt?: string } | null;
        photoUrl: string | null;
        photoLabel: string;
      }>
    >(
      `*[_type == "teamMember" && isLeadership == true] | order(order asc) {
        name,
        "role": coalesce(role[$lang], role.en),
        "bio": coalesce(bio[$lang], bio.en),
        photo,
        "photoLabel": coalesce(photo.alt, name),
      }`,
      { lang }
    );

    return members.map((m) => ({
      ...m,
      photoUrl: m.photo ? urlFor(m.photo).width(600).height(750).fit("crop").url() : null,
    }));
  } catch {
    return [];
  }
}
