import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/sections/product-detail-page";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";

const SLUGS = ["akienipay", "cartracking", "biometrie"] as const;
type Slug = (typeof SLUGS)[number];

const isSlug = (s: string): s is Slug => (SLUGS as readonly string[]).includes(s);

export function generateStaticParams() {
  return LOCALES.flatMap((lang) => SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) return {};
  const dict = await getDictionary(lang);
  const t = dict.productDetails[slug];
  return buildMetadata({
    lang,
    pathWithoutLocale: `/products/${slug}`,
    title: t.meta.title,
    description: t.meta.description,
  });
}

export default async function ProductDetailRoute({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang) || !isSlug(slug)) notFound();
  const dict = await getDictionary(lang);
  return <ProductDetailPage lang={lang} strings={dict.productDetails[slug]} />;
}
