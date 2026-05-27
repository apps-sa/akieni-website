import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Approach } from "@/components/sections/approach";
import { Cta } from "@/components/sections/cta";
import { Industries } from "@/components/sections/industries";
import { ServicesDetail } from "@/components/sections/services-detail";
import { TechStack } from "@/components/sections/tech-stack";
import { PageHero } from "@/components/shared/page-hero";
import { getDictionary, hasLocale } from "../dictionaries";

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    title: dict.services.meta.title,
    description: dict.services.meta.description,
  };
}

export default async function ServicesPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.services;

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
        actions={[
          {
            label: t.hero.ctaPrimary,
            href: `/${lang}/contact`,
            variant: "primary",
          },
        ]}
      />
      <ServicesDetail lang={lang} strings={t.detail} />
      <Approach strings={t.process} />
      <TechStack strings={t.stack} />
      <Industries strings={t.industries} />
      <Cta lang={lang} strings={t.cta} />
    </>
  );
}
