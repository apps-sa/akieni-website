import { SITE } from "@/lib/seo";

/**
 * Site-wide structured data: Organization + WebSite.
 * Rendered once in the locale layout so it appears on every page.
 */
export function SiteJsonLd({ lang }: Readonly<{ lang: string }>) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    logo: `${SITE.url}/images/akieni-logo.png`,
    image: `${SITE.url}/images/akieni-logo.png`,
    description:
      "Akieni is a digital transformation firm building national-scale technology platforms for governments, finance and health across Central Africa.",
    foundingDate: "2023",
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    areaServed: { "@type": "Place", name: "Central Africa" },
    sameAs: [
      "https://www.linkedin.com/company/akieni",
      "https://twitter.com/akieni",
    ],
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    inLanguage: lang === "fr" ? "fr-FR" : "en-US",
    publisher: { "@id": `${SITE.url}/#organization` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD is trusted, statically generated content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
