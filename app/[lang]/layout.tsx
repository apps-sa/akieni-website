import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { LazyMotionProvider } from "@/components/motion/lazy-motion-provider";
import { PageTransition } from "@/components/motion/page-transition";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { MobileMenu } from "@/components/shared/mobile-menu";
import { ScrollBehavior } from "@/components/shared/scroll-behavior";
import { SiteJsonLd } from "@/components/shared/site-json-ld";
import { getSiteSettings } from "@/lib/queries/siteSettings";
import { SITE } from "@/lib/seo";
import { getDictionary, hasLocale, LOCALES } from "./dictionaries";
import { Analytics } from "@vercel/analytics/react";
import { Matomo } from "@/components/analytics/matomo";

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  applicationName: SITE.name,
  description:
    "Akieni delivers high-impact technology solutions for governments, finance, and health across Central Africa. Brazzaville, Republic of Congo.",
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: { email: false, address: false, telephone: false },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const [dict, siteSettings] = await Promise.all([
    getDictionary(lang),
    getSiteSettings(lang),
  ]);

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-black font-sans">
        <ScrollBehavior />
        <SiteJsonLd lang={lang} />
        <LazyMotionProvider>
          <Header strings={dict.header} />
          <MobileMenu strings={dict.header} />
          <PageTransition>{children}</PageTransition>
          <Footer lang={lang} strings={dict.footer} siteSettings={siteSettings} />
        </LazyMotionProvider>
        <Analytics />
        <Matomo />
      </body>
    </html>
  );
}
