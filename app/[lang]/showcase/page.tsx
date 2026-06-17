import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta";
import { ShowcaseExplorer } from "@/components/sections/showcase-explorer";
import { PageHero } from "@/components/shared/page-hero";
import { getAllShowcaseItems } from "@/lib/queries/showcaseItems";
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
    pathWithoutLocale: "/showcase",
    title: dict.showcase.meta.title,
    description: dict.showcase.meta.description,
    robots: { index: false, follow: false },
  });
}

export default async function ShowcasePage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, sanityItems] = await Promise.all([
    getDictionary(lang),
    getAllShowcaseItems(lang),
  ]);
  const t = dict.showcase;
  const items = sanityItems.length > 0 ? sanityItems : t.items;

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
      <ShowcaseExplorer strings={t.explorer} items={items} />
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
