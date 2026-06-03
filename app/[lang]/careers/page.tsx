import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CareersOpenings } from "@/components/sections/careers/openings";
import { CareersProcess } from "@/components/sections/careers/process";
import { CareersWhy } from "@/components/sections/careers/why";
import { Cta } from "@/components/sections/cta";
import { PageHero } from "@/components/shared/page-hero";
import { getJobOpenings } from "@/lib/queries/careers";
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
    pathWithoutLocale: "/careers",
    title: dict.careers.meta.title,
    description: dict.careers.meta.description,
  });
}

export default async function CareersPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, openings] = await Promise.all([
    getDictionary(lang),
    getJobOpenings(lang),
  ]);
  const t = dict.careers;

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
        actions={[
          { label: t.hero.ctaPrimary, href: "#openings", variant: "primary" },
          { label: t.hero.ctaSecondary, href: `/${lang}/academy`, variant: "ghost" },
        ]}
      />
      <CareersWhy strings={t.why} />
      <CareersOpenings lang={lang} strings={t.openings} items={openings} />
      <CareersProcess strings={t.process} />
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
