import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/contact-form";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/primitives";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";
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
    pathWithoutLocale: "/contact",
    title: dict.contact.meta.title,
    description: dict.contact.meta.description,
  });
}

export default async function ContactPage({
  params,
}: Readonly<{ params: Promise<{ lang: string }> }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);
  const t = dict.contact;
  const withLang = (href: string) =>
    href.startsWith("/") ? `/${lang}${href}` : href;

  return (
    <>
      {/* Hero */}
      <Container className="pb-s7 pt-[calc(var(--nav-h)+6rem)]">
        <RevealGroup stagger={0.1}>
          <RevealItem className="mb-s5 flex flex-wrap items-center justify-between gap-s4">
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {t.caption}
            </span>
          </RevealItem>
          <RevealItem
            as="h1"
            className="max-w-[14ch] text-display font-bold leading-[0.92] tracking-[-0.045em] max-[720px]:text-[clamp(2.25rem,11vw,4rem)]"
          >
            {t.titleLead}
            <span className="text-cyan-teal">{t.titleAccent}</span>
          </RevealItem>
          <RevealItem
            as="p"
            className="mt-s6 max-w-[52ch] text-lg leading-normal text-muted"
          >
            {t.lede}
          </RevealItem>
        </RevealGroup>
      </Container>

      {/* Form + info */}
      <Container className="grid grid-cols-1 gap-s8 pb-section-y min-[901px]:[grid-template-columns:1.2fr_1fr]">
        <Reveal>
          <ContactForm strings={t.form} />
        </Reveal>

        <Reveal as="aside" delay={0.1}>
          <dl className="flex flex-col gap-s5 border border-line bg-ink-2 p-8 text-white">
            {t.info.items.map((item) => (
              <div key={item.label}>
                <dt className="mb-[0.3rem] font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  {item.label}
                </dt>
                <dd className="m-0 text-lg">
                  {item.href ? (
                    <a href={item.href} className="text-cyan-teal">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div
            aria-hidden
            className="relative mt-s5 aspect-[16/10] overflow-hidden border border-line [background:linear-gradient(180deg,#0a0a09_0%,#15161a_100%)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
            <div className="absolute inset-x-0 bottom-0 top-[60%] border-t border-cyan-teal/30 [background:linear-gradient(180deg,rgba(15,64,248,0.18),rgba(18,235,214,0.08))]" />
            <div className="absolute left-[38%] top-[45%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-[0.4rem]">
              <div className="h-[14px] w-[14px] animate-mappin rounded-full bg-cyan-teal shadow-[0_0_0_6px_rgba(18,235,214,0.2),0_0_0_14px_rgba(18,235,214,0.08)]" />
              <div className="border border-line bg-black/60 px-[0.55rem] py-[0.3rem] font-mono text-xs tracking-[0.16em] text-white">
                {t.info.mapLabel}
              </div>
            </div>
            <div className="absolute right-[0.8rem] top-[0.8rem] font-mono text-xs tracking-[0.14em] text-muted-2">
              {t.info.mapCompass}
            </div>
            <div className="absolute bottom-[0.8rem] left-[0.8rem] font-mono text-xs tracking-[0.14em] text-muted-2">
              {t.info.mapLegend}
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Other channels */}
      <Section variant="dark">
        <SectionHead
          eyebrow={t.channels.eyebrow}
          eyebrowAccent
          title={
            <>
              {t.channels.titleLine1}
              <br />
              {t.channels.titleLine2}
            </>
          }
          lede={t.channels.lede}
          variant="dark"
        />
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-3">
          {t.channels.items.map((c) => (
            <article
              key={c.number}
              className="flex flex-col gap-s3 border border-line bg-ink-2 p-[1.6rem] text-white"
            >
              <span className="font-mono text-sm tracking-widest text-cyan-teal">
                {c.number}
              </span>
              <h3 className="text-xl leading-[1.15] tracking-[-0.02em] font-bold">
                {c.title}
              </h3>
              <p className="text-muted-2">{c.desc}</p>
              <Link
                href={withLang(c.href)}
                className="mt-[0.6rem] inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold uppercase tracking-[0.05em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
              >
                {c.linkLabel}
                <span aria-hidden>→</span>
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
