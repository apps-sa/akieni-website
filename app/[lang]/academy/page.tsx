import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcademyBento } from "@/components/sections/academy/bento";
import { AcademyCohorts } from "@/components/sections/academy/cohorts";
import { AcademyCurriculum } from "@/components/sections/academy/curriculum";
import { AcademyTaas } from "@/components/sections/academy/taas";
import { Cta } from "@/components/sections/cta";
import { PageHero } from "@/components/shared/page-hero";
import { getCohorts } from "@/lib/queries/academy";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "../dictionaries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    pathWithoutLocale: "/academy",
    title: dict.academy.meta.title,
    description: dict.academy.meta.description,
  });
}

export default async function AcademyPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, cohorts] = await Promise.all([
    getDictionary(lang),
    getCohorts(lang),
  ]);
  const t = dict.academy;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        eyebrowAccent
        caption={t.hero.caption}
        secondGlow
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        titleAccent={t.hero.titleAccent}
        titleLine3={t.hero.titleLine3}
        lede={t.hero.lede}
        minHeight="82vh"
        actions={[
          { label: t.hero.ctaPrimary, href: `/${lang}/contact`, variant: "primary" },
          { label: t.hero.ctaSecondary, href: "#curriculum", variant: "ghost" },
        ]}
      />
      <AcademyBento strings={t.bento} />
      <AcademyCurriculum strings={t.curriculum} />
      <AcademyCohorts lang={lang} strings={t.cohorts} items={cohorts} />
      <AcademyTaas strings={t.taas} />
      <Cta
        lang={lang}
        strings={{
          title: t.cta.title,
          primary: t.cta.primary,
          secondary: t.cta.secondary,
          secondaryHref: t.cta.secondaryHref,
        }}
      />
    </>
  );
}
