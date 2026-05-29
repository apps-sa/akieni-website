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
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale } from "./dictionaries";

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
  const dict = await getDictionary(lang);

  return (
    <>
      <HomeJsonLd lang={lang} />
      <Hero lang={lang} strings={dict.home.hero} />
      <Marquee strings={dict.home.marquee} />
      <Services lang={lang} strings={dict.home.services} />
      <FeaturedProjects lang={lang} strings={dict.home.featuredProjects} />
      <Products
        lang={lang}
        strings={dict.home.products}
        link={{ label: dict.home.products.all, href: `/${lang}/products` }}
      />
      <Stats strings={dict.home.stats} />
      <Credo strings={dict.home.credo} />
      <Approach strings={dict.home.approach} />
      <Cta lang={lang} strings={dict.home.cta} />
    </>
  );
}
