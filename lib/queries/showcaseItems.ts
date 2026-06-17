import type { Locale } from "@/app/[lang]/dictionaries";
import { isSanityConfigured, sanityClient, urlFor } from "../sanity";

export type ShowcaseItem = {
  id: string;
  title: string;
  brief: string;
  link: string;
  // "rnd" | "beta" | "live" | "internal" — kept as `string` (not a literal union)
  // so the JSON-typed dictionary fallback items stay structurally assignable.
  stage: string;
  categories: string[];
  image: string | null;
  mediaLabel?: string;
};

export async function getAllShowcaseItems(lang: Locale): Promise<ShowcaseItem[]> {
  if (!isSanityConfigured) return [];
  try {
    const items = await sanityClient.fetch<
      Array<{
        id: string;
        title: string;
        brief: string;
        link: string;
        stage: string;
        categories: string[] | null;
        image: { asset: { _ref: string }; alt?: string } | null;
        mediaLabel: string | null;
      }>
    >(
      `*[_type == "showcaseItem" && isPublished == true] | order(order asc) {
        "id": _id,
        "title": coalesce(title[$lang], title.en),
        "brief": coalesce(brief[$lang], brief.en),
        link,
        stage,
        categories,
        image,
        "mediaLabel": coalesce(image.alt, title.en),
      }`,
      { lang }
    );

    return items.map((it) => ({
      id: it.id,
      title: it.title,
      brief: it.brief,
      link: it.link,
      stage: it.stage,
      categories: it.categories ?? [],
      image: it.image ? urlFor(it.image).width(800).url() : null,
      mediaLabel: it.mediaLabel ?? undefined,
    }));
  } catch {
    return [];
  }
}
