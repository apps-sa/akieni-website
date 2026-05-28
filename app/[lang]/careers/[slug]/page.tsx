import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleDetail } from "@/components/sections/role-detail";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";

const SLUGS = [
  "senior-backend-go",
  "senior-frontend-react",
  "platform-engineer",
  "security-engineer",
  "programme-manager",
  "qa-lead",
] as const;
type Slug = (typeof SLUGS)[number];

const isSlug = (s: string): s is Slug => (SLUGS as readonly string[]).includes(s);

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};
  const dict = await getDictionary(lang);
  const role = dict.roles.items[slug];
  const meta = buildMetadata({
    lang,
    pathWithoutLocale: `/careers/${slug}`,
    title: role.title,
    description: `${dict.roles.meta.descriptionPrefix}${role.tagline}`,
  });
  // The layout template appends "· Akieni"; keep the role title as the page
  // title (no extra "· Careers" suffix needed) so it reads "Role · Akieni".
  return meta;
}

export default async function RoleDetailRoute({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();
  const dict = await getDictionary(lang);
  return (
    <RoleDetail
      lang={lang}
      role={dict.roles.items[slug]}
      shared={dict.roles.shared}
      form={dict.roles.form}
    />
  );
}
