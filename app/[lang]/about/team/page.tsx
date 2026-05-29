import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamDepartments } from "@/components/sections/team/departments";
import { TeamJoinCta } from "@/components/sections/team/join-cta";
import { TeamLeadership } from "@/components/sections/team/leadership";
import { PageHero } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "../../dictionaries";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    pathWithoutLocale: "/about/team",
    title: dict.team.meta.title,
    description: dict.team.meta.description,
  });
}

export default async function TeamPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.team;

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
        minHeight="70vh"
      />
      <TeamLeadership strings={t.leadership} />
      <TeamDepartments strings={t.departments} />
      <TeamJoinCta lang={lang} strings={t.joinCta} />
    </>
  );
}
