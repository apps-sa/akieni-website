import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} · ${SITE.tagline}`,
    short_name: SITE.shortName,
    description:
      "Akieni builds national-scale technology platforms for governments, finance and health across Central Africa.",
    start_url: `/${SITE.defaultLocale}`,
    display: "standalone",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [
      { src: "/images/akieni-icon.png", sizes: "any", type: "image/png" },
      {
        src: "/images/akieni-icon-white.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
