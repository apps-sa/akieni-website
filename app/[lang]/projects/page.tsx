import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta";
import { ProjectsExplorer } from "@/components/sections/projects-explorer";
import { PageHero } from "@/components/shared/page-hero";
import { getAllProjects } from "@/lib/queries/projects";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    pathWithoutLocale: "/projects",
    title: dict.projects.meta.title,
    description: dict.projects.meta.description,
  });
}

export default async function ProjectsPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, sanityProjects] = await Promise.all([
    getDictionary(lang),
    getAllProjects(lang),
  ]);
  const t = dict.projects;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        eyebrowAccent
        caption={t.hero.caption}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        titleAccent={t.hero.titleAccent}
        lede={t.hero.lede}
      />
      <ProjectsExplorer lang={lang} strings={t.explorer} sanityItems={sanityProjects} />
      <Cta
        lang={lang}
        strings={{
          primary: t.cta.primary,
          titleNode: (
            <>
              {t.cta.titleLine1}
              <br />
              {t.cta.titleLine2}
              <span className="text-cyan-teal">{t.cta.titleAccent}</span>
            </>
          ),
        }}
      />
    </>
  );
}
