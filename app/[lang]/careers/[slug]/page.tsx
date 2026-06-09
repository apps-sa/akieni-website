import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { RoleDetail } from "@/components/sections/role-detail";
import { getAllRoleSlugs, getRoleBySlug } from "@/lib/queries/careers";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";

// Re-render at most every 60 s; new job slugs added in Sanity are served on first request.
export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllRoleSlugs();
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const [dict, role] = await Promise.all([
    getDictionary(lang),
    getRoleBySlug(slug, lang),
  ]);
  if (!role) return {};
  return buildMetadata({
    lang,
    pathWithoutLocale: `/careers/${slug}`,
    title: role.title,
    description: `${dict.roles.meta.descriptionPrefix}${role.tagline}`,
  });
}

export default async function RoleDetailRoute({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, role] = await Promise.all([
    getDictionary(lang),
    getRoleBySlug(slug, lang),
  ]);
  if (!role) notFound();
  return (
    <RoleDetail
      lang={lang}
      role={role}
      shared={dict.roles.shared}
      form={dict.roles.form}
    />
  );
}
