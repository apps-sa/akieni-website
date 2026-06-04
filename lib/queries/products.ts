import { isSanityConfigured, sanityClient, urlFor } from "../sanity";

// ── Shared types ──────────────────────────────────────────────────────────────

export type ProductCard = {
  slug: string;
  number: string;
  name: string;
  version: string;
  desc: string;
  features: string[];
  model: string;
  chip: string;
  chipVariant: string;
  mark: string;
  mediaLabel: string;
  imageUrl: string | null;
  learnMore: string;
};

export type ProductDetail = {
  meta: { title: string; description: string };
  hero: {
    backLabel: string;
    title: string;
    titleAccent: string;
    lede: string;
    pills: Array<{ label: string; variant: string }>;
    ctaPrimary: string;
    ctaSecondary: string;
    glanceLabel: string;
    kv: Array<{ k: string; v: string }>;
  };
  anchors: Array<{ label: string; href: string }>;
  overview: { eyebrow: string; title: string; lede: string; feats: Array<{ key: string; value: string }> };
  features: { eyebrow: string; title: string; lede: string; items: Array<{ num: string; title: string; desc: string }> };
  flow: { eyebrow: string; title: string; lede: string; steps: Array<{ num: string; title: string; desc: string }> };
  cases: { eyebrow: string; title: string; lede: string; items: Array<{ icon: string; title: string; desc: string }> };
  api: { eyebrow: string; title: string; lede: string; badges: string[]; points: string[]; cta: string; code: string };
  related: {
    eyebrow: string; title: string; lede: string;
    items: Array<{ slug: string; tag: string; title: string; desc: string; cta: string }>;
  };
  cta: { eyebrow: string; title: string; lede: string; primary: string; email: string };
};

// ── Helpers ───────────────────────────────────────────────────────────────────

const coalesce = (field: string) => `coalesce(${field}[$lang], ${field}.en)`;
const ls = (field: string) => coalesce(field);
const lt = (field: string) => coalesce(field);
const la = (field: string) => `coalesce(${field}[$lang], ${field}.en)`;

// ── Queries ───────────────────────────────────────────────────────────────────

export async function getAllProducts(lang: string): Promise<ProductCard[]> {
  if (!isSanityConfigured) return [];
  try {
    const raw = await sanityClient.fetch<Array<{
      slug: string; name: string; version: string; desc: string;
      features: string[]; model: string; chip: string; chipVariant: string;
      mark: string; mediaLabel: string;
      image: { asset: { _ref: string } } | null;
      order: number;
    }>>(
      `*[_type == "product" && isPublished == true] | order(order asc) {
        "slug": slug.current,
        name,
        version,
        "desc": ${lt("desc")},
        "features": ${la("features")},
        model,
        chip,
        chipVariant,
        mark,
        "mediaLabel": coalesce(image.alt, mediaLabel, name),
        image,
        order,
      }`,
      { lang }
    );
    return raw.map((p, i) => ({
      ...p,
      number: `0${i + 1} / Product`,
      learnMore: lang === "fr" ? "En savoir plus →" : "Learn more →",
      imageUrl: p.image ? urlFor(p.image).width(900).url() : null,
    }));
  } catch {
    return [];
  }
}

export async function getAllProductSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return [];
  try {
    const res = await sanityClient.fetch<{ slug: string }[]>(
      `*[_type == "product" && isPublished == true]{ "slug": slug.current }`
    );
    return res.map((r) => r.slug).filter(Boolean);
  } catch {
    return [];
  }
}

export async function getProductBySlug(slug: string, lang: string): Promise<ProductDetail | null> {
  if (!isSanityConfigured) return null;
  try {
    return await sanityClient.fetch<ProductDetail | null>(
      `*[_type == "product" && slug.current == $slug][0] {
        "meta": {
          "title": coalesce(meta[$lang].title, meta.en.title),
          "description": coalesce(meta[$lang].description, meta.en.description),
        },
        "hero": {
          "backLabel": select($lang == "fr" => "Tous les produits", "All products"),
          "title": ${ls("heroTitle")},
          "titleAccent": ${ls("heroTitleAccent")},
          "lede": ${lt("heroLede")},
          "pills": heroPills[]{ label, variant },
          "ctaPrimary": ${ls("heroCtaPrimary")},
          "ctaSecondary": ${ls("heroCtaSecondary")},
          "glanceLabel": ${ls("heroGlanceLabel")},
          "kv": heroKv[]{ k, v },
        },
        "anchors": [
          { "label": select($lang == "fr" => "Vue d'ensemble", "Overview"), "href": "#overview" },
          { "label": select($lang == "fr" => "Fonctionnalités", "Features"), "href": "#features" },
          { "label": select($lang == "fr" => "Comment ça marche", "How it works"), "href": "#flow" },
          { "label": select($lang == "fr" => "Cas d'usage", "Use cases"), "href": "#cases" },
          { "label": ${ls("apiEyebrow")}, "href": "#docs" },
          { "label": select($lang == "fr" => "En lien", "Related"), "href": "#related" },
        ],
        "overview": {
          "eyebrow": ${ls("overviewEyebrow")},
          "title": ${ls("overviewTitle")},
          "lede": ${lt("overviewLede")},
          "feats": overviewFeats[]{ key, value },
        },
        "features": {
          "eyebrow": ${ls("featuresEyebrow")},
          "title": ${ls("featuresTitle")},
          "lede": ${lt("featuresLede")},
          "items": featuresItems[]{ num, "title": ${ls("title")}, "desc": ${ls("desc")} },
        },
        "flow": {
          "eyebrow": ${ls("flowEyebrow")},
          "title": ${ls("flowTitle")},
          "lede": ${lt("flowLede")},
          "steps": flowSteps[]{ num, "title": ${ls("title")}, "desc": ${ls("desc")} },
        },
        "cases": {
          "eyebrow": ${ls("casesEyebrow")},
          "title": ${ls("casesTitle")},
          "lede": ${lt("casesLede")},
          "items": casesItems[]{ icon, "title": ${ls("title")}, "desc": ${ls("desc")} },
        },
        "api": {
          "eyebrow": ${ls("apiEyebrow")},
          "title": ${ls("apiTitle")},
          "lede": ${lt("apiLede")},
          "badges": apiBadges,
          "points": ${la("apiPoints")},
          "cta": ${ls("apiCta")},
          "code": apiCode,
        },
        "related": {
          "eyebrow": ${ls("relatedEyebrow")},
          "title": ${ls("relatedTitle")},
          "lede": ${lt("relatedLede")},
          "items": relatedItems[]{ slug, tag, "title": ${ls("title")}, "desc": ${ls("desc")}, "cta": ${ls("cta")} },
        },
        "cta": {
          "eyebrow": ${ls("ctaEyebrow")},
          "title": ${ls("ctaTitle")},
          "lede": ${lt("ctaLede")},
          "primary": ${ls("ctaPrimary")},
          "email": ctaEmail,
        },
      }`,
      { slug, lang }
    );
  } catch {
    return null;
  }
}
