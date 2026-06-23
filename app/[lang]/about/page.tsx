import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AboutMissionVision } from "@/components/sections/about/mission-vision";
import { AboutStory } from "@/components/sections/about/story";
import { AboutTimeline } from "@/components/sections/about/timeline";
import { AboutValues } from "@/components/sections/about/values";
import { TeamLeadership } from "@/components/sections/team/leadership";
import { PageHero } from "@/components/shared/page-hero";
import { getLeadership } from "@/lib/queries/team";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "../dictionaries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    pathWithoutLocale: "/about",
    title: dict.about.meta.title,
    description: dict.about.meta.description,
  });
}

export default async function AboutPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, leaders] = await Promise.all([
    getDictionary(lang),
    getLeadership(lang),
  ]);
  const t = dict.about;

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
        minHeight="78vh"
      />
      <AboutStory strings={t.story} />
      <AboutMissionVision strings={t.missionVision} />
      <AboutValues strings={t.values} />
      <AboutTimeline strings={t.timeline} />
      <TeamLeadership strings={dict.team.leadership} members={leaders} />
    </>
  );
}
