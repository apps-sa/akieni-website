import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Cta } from "@/components/sections/cta";
import { ProductDetail } from "@/components/sections/product-detail";
import { Products } from "@/components/sections/products";
import { PageHero } from "@/components/shared/page-hero";
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
    pathWithoutLocale: "/products",
    title: dict.products.meta.title,
    description: dict.products.meta.description,
  });
}

export default async function ProductsPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.products;

  return (
    <>
      <PageHero
        eyebrow={t.hero.eyebrow}
        eyebrowAccent
        caption={t.hero.caption}
        backgroundMark={t.hero.backgroundMark}
        titleLine1={t.hero.titleLine1}
        titleLine2={t.hero.titleLine2}
        titleAccent={t.hero.titleAccent}
        lede={t.hero.lede}
        actions={[
          {
            label: t.hero.ctaPrimary,
            href: "#akienipay",
            variant: "primary",
          },
          {
            label: t.hero.ctaSecondary,
            href: `/${lang}/contact`,
            variant: "ghost",
          },
        ]}
      />
      <Products lang={lang} strings={t.summary} surface="dark" />
      {t.details.map((d) => (
        <ProductDetail
          key={d.slug}
          slug={d.slug}
          variant={d.variant as "paper" | "dark"}
          mediaSide={d.mediaSide as "left" | "right"}
          number={d.number}
          titleAccent={d.titleAccent}
          lede={d.lede}
          features={d.features}
          ctaLabel={d.ctaLabel}
          ctaHref={`/${lang}/contact`}
          mock={d.mock}
        />
      ))}
      <Cta lang={lang} strings={t.cta} />
    </>
  );
}
