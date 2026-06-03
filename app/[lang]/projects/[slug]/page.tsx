import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDetailPage } from "@/components/sections/project-detail-page";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/queries/projects";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = await getProjectBySlug(slug, lang);
  if (!project) return {};
  return buildMetadata({
    lang,
    pathWithoutLocale: `/projects/${slug}`,
    title: project.meta.title,
    description: project.meta.description,
  });
}

export default async function ProjectDetailRoute({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, project] = await Promise.all([
    getDictionary(lang),
    getProjectBySlug(slug, lang),
  ]);
  if (!project) notFound();
  return <ProjectDetailPage lang={lang} strings={project} dict={dict} />;
}
