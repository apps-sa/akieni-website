import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailPage } from "@/components/sections/product-detail-page";
import { getAllProductSlugs, getProductBySlug } from "@/lib/queries/products";
import { buildMetadata } from "@/lib/seo";
import { getDictionary, hasLocale, LOCALES } from "../../dictionaries";

const DICT_SLUGS = ["akienipay", "cartracking", "biometrie"] as const;
type DictSlug = (typeof DICT_SLUGS)[number];
const isDictSlug = (s: string): s is DictSlug => (DICT_SLUGS as readonly string[]).includes(s);

export const revalidate = 60;

export async function generateStaticParams() {
  const sanitySlugs = await getAllProductSlugs();
  const slugs = sanitySlugs.length > 0 ? sanitySlugs : [...DICT_SLUGS];
  return LOCALES.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ lang: string; slug: string }>;
}>): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const [sanity, dict] = await Promise.all([
    getProductBySlug(slug, lang),
    getDictionary(lang),
  ]);
  const meta = sanity?.meta ?? (isDictSlug(slug) ? dict.productDetails[slug].meta : null);
  if (!meta) return {};
  return buildMetadata({
    lang,
    pathWithoutLocale: `/products/${slug}`,
    title: meta.title,
    description: meta.description,
  });
}

export default async function ProductDetailRoute({
  params,
}: Readonly<{ params: Promise<{ lang: string; slug: string }> }>) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const [sanity, dict] = await Promise.all([
    getProductBySlug(slug, lang),
    getDictionary(lang),
  ]);
  const strings = sanity ?? (isDictSlug(slug) ? dict.productDetails[slug] : null);
  if (!strings) notFound();
  return <ProductDetailPage lang={lang} strings={strings} />;
}
