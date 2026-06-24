import type { MetadataRoute } from "next";
import { languageAlternates, SITE } from "@/lib/seo";

const SERVICE_SLUGS = [
  "digital-transformation",
  "software-development",
  "software-integration",
  "consulting",
];
const PRODUCT_SLUGS = ["akienipay", "cartracking", "biometrie"];
const PROJECT_SLUGS = ["sfec", "camu", "cnss"];
const ROLE_SLUGS = [
  "senior-backend-go",
  "senior-frontend-react",
  "platform-engineer",
  "security-engineer",
  "programme-manager",
  "qa-lead",
];

type Entry = { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] };

const ENTRIES: Entry[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/products", priority: 0.9, changeFrequency: "monthly" },
  { path: "/projects", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about/team", priority: 0.6, changeFrequency: "monthly" },
  { path: "/academy", priority: 0.8, changeFrequency: "monthly" },
  { path: "/careers", priority: 0.8, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  ...SERVICE_SLUGS.map((s) => ({
    path: `/services/${s}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  ...PRODUCT_SLUGS.map((s) => ({
    path: `/products/${s}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  ...PROJECT_SLUGS.map((s) => ({
    path: `/projects/${s}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  ...ROLE_SLUGS.map((s) => ({
    path: `/careers/${s}`,
    priority: 0.6,
    changeFrequency: "weekly" as const,
  })),
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  { path: "/cookies", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ENTRIES.map((entry) => ({
    url: `${SITE.url}/${SITE.defaultLocale}${entry.path === "/" ? "" : entry.path}`,
    lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    alternates: { languages: languageAlternates(entry.path) },
  }));
}
