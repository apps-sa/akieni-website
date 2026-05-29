import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalPage } from "@/components/sections/legal-page";
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
    pathWithoutLocale: "/terms",
    title: dict.legal.terms.meta.title,
    description: dict.legal.terms.meta.description,
  });
}

export default async function TermsPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  return (
    <LegalPage
      strings={{
        ...dict.legal.terms,
        contentsLabel: dict.legal.contentsLabel,
      }}
    />
  );
}
