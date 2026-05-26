import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/shared/footer";
import { Header } from "@/components/shared/header";
import { MobileMenu } from "@/components/shared/mobile-menu";
import { getDictionary, hasLocale, LOCALES } from "./dictionaries";

export const metadata: Metadata = {
  title: "Akieni · Digital Transformation for Africa",
  description:
    "Akieni delivers high-impact technology solutions for governments, finance, and health across Central Africa. Brazzaville, Republic of Congo.",
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
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-white text-black font-sans">
        <Header strings={dict.header} />
        <MobileMenu strings={dict.header} />
        {children}
        <Footer lang={lang} strings={dict.footer} />
      </body>
    </html>
  );
}
