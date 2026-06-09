import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Approach } from "@/components/sections/approach";
import { Cta } from "@/components/sections/cta";
import { Credo } from "@/components/sections/credo";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Products } from "@/components/sections/products";
import { Services } from "@/components/sections/services";
import { Stats } from "@/components/sections/stats";
import { HomeJsonLd } from "@/components/shared/home-json-ld";
import { getHomeCredo } from "@/lib/queries/home";
import { getAllProducts } from "@/lib/queries/products";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "./dictionaries";

export const revalidate = 60;

export async function generateMetadata({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);
  return buildMetadata({
    lang,
    pathWithoutLocale: "/",
    title: dict.home.meta.title,
    description: dict.home.meta.description,
  });
}

export default async function Home({
  params,
}: Readonly<{
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, credoData, sanityProducts] = await Promise.all([
    getDictionary(lang),
    getHomeCredo(lang),
    getAllProducts(lang),
  ]);

  return (
    <>
      <HomeJsonLd lang={lang} />
      <Hero lang={lang} strings={dict.home.hero} />
      <Marquee strings={dict.home.marquee} />
      <Services lang={lang} strings={dict.home.services} />
      <FeaturedProjects lang={lang} strings={dict.home.featuredProjects} />
      <Products
        lang={lang}
        strings={{
          ...dict.home.products,
          items: sanityProducts.length > 0
            ? sanityProducts
            : dict.home.products.items,
        }}
        link={{ label: dict.home.products.all, href: `/${lang}/products` }}
      />
      <Stats strings={dict.home.stats} />
      <Credo strings={dict.home.credo} data={credoData} />
      <Approach strings={dict.home.approach} />
      <Cta lang={lang} strings={dict.home.cta} />
    </>
  );
}
