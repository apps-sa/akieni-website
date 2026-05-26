import { notFound } from "next/navigation";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { getDictionary, hasLocale } from "./dictionaries";

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
      <Hero lang={lang} strings={dict.home.hero} />
      <Marquee strings={dict.home.marquee} />
    </>
  );
}
