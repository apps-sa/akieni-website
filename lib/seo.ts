import type { Metadata } from "next";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://www.akieni.com";
// Normalise: no trailing slash so `${SITE.url}/path` never doubles up.
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");

export const SITE = {
  url: SITE_URL,
  name: "Akieni",
  shortName: "Akieni",
  legalName: "Akieni",
  tagline: "Digital Transformation for Africa",
  email: "contact@akieni.com",
  phone: "+242056961889",
  twitter: "@akieni",
  locales: ["en", "fr"] as const,
  defaultLocale: "en" as const,
  address: {
    street: "Impasse Eugène-Etienne, Avenue Général De Gaulle, Plateau-Ville",
    city: "Brazzaville",
    region: "Brazzaville",
    country: "CG",
    countryName: "Republic of Congo",
  },
  geo: { latitude: -4.2634, longitude: 15.2429 },
} as const;

type Locale = (typeof SITE.locales)[number];

export const KEYWORDS: Record<Locale, string[]> = {
  en: [
    "Akieni",
    "digital transformation Africa",
    "digital transformation Central Africa",
    "software development Brazzaville",
    "software development Congo",
    "national-scale platforms",
    "government technology Africa",
    "fintech Central Africa",
    "biometric identification Africa",
    "electronic invoicing Congo",
    "universal health coverage platform",
    "social security software",
    "PKI",
    "Kubernetes",
    "AkieniPay",
    "CarTracking",
    "Biometrie",
    "SFEC",
    "CAMU",
    "CNSS",
    "Akieni Academy",
    "tech talent Africa",
    "Brazzaville software company",
    "Republic of Congo IT services",
  ],
  fr: [
    "Akieni",
    "transformation numérique Afrique",
    "transformation numérique Afrique centrale",
    "développement logiciel Brazzaville",
    "développement logiciel Congo",
    "plateformes à l'échelle nationale",
    "technologie gouvernementale Afrique",
    "fintech Afrique centrale",
    "identification biométrique Afrique",
    "facturation électronique Congo",
    "couverture santé universelle",
    "logiciel sécurité sociale",
    "PKI",
    "Kubernetes",
    "AkieniPay",
    "CarTracking",
    "Biometrie",
    "SFEC",
    "CAMU",
    "CNSS",
    "Académie Akieni",
    "talent tech Afrique",
    "entreprise logicielle Brazzaville",
    "services informatiques République du Congo",
  ],
};

/** Build the language-alternate map for a given path (without locale prefix). */
export function languageAlternates(
  pathWithoutLocale: string,
): Record<string, string> {
  const clean = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  return {
    en: `${SITE.url}/en${clean}`,
    fr: `${SITE.url}/fr${clean}`,
    "x-default": `${SITE.url}/${SITE.defaultLocale}${clean}`,
  };
}

/**
 * Builds a complete Metadata object for a page: canonical, hreflang
 * alternates, OpenGraph and Twitter cards — consistently across the site.
 */
export function buildMetadata({
  lang,
  pathWithoutLocale,
  title,
  description,
  keywords,
}: {
  lang: Locale;
  pathWithoutLocale: string;
  title: string;
  description: string;
  keywords?: string[];
}): Metadata {
  const clean = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  const canonical = `${SITE.url}/${lang}${clean}`;

  return {
    title,
    description,
    keywords: keywords ?? KEYWORDS[lang],
    alternates: {
      canonical,
      languages: languageAlternates(pathWithoutLocale),
    },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      locale: lang === "fr" ? "fr_FR" : "en_US",
      url: canonical,
      title,
      description,
    },
    twitter: {
      card: "summary_large_image",
      site: SITE.twitter,
      title,
      description,
    },
  };
}
