import { SITE } from "@/lib/seo";

/**
 * Home-page structured data: LocalBusiness (anchored to the Organization)
 * plus an ItemList of the core service lines for richer results.
 */
export function HomeJsonLd({ lang }: Readonly<{ lang: string }>) {
  const services =
    lang === "fr"
      ? [
          "Transformation numérique",
          "Développement logiciel",
          "Intégration logicielle",
          "Conseil & gestion de programmes",
        ]
      : [
          "Digital Transformation",
          "Software Development",
          "Software Integration",
          "Consulting & Programme Management",
        ];

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE.url}/#localbusiness`,
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}/images/akieni-logo.png`,
    email: SITE.email,
    telephone: SITE.phone,
    priceRange: "$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: SITE.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.geo.latitude,
      longitude: SITE.geo.longitude,
    },
    areaServed: { "@type": "Place", name: "Central Africa" },
    parentOrganization: { "@id": `${SITE.url}/#organization` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: lang === "fr" ? "Services Akieni" : "Akieni Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: service },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
