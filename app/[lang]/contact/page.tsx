import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/forms/contact-form";
import {
  Reveal,
  RevealGroup,
  RevealItem,
} from "@/components/motion/primitives";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";
import { getSiteSettings } from "@/lib/queries/siteSettings";
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
  const [dict, siteSettings] = await Promise.all([
    getDictionary(lang),
    getSiteSettings(lang),
  ]);
  const t = dict.contact;

  // Override info items with live Sanity data when available
  const infoItems = siteSettings
    ? t.info.items.map((item) => {
        if (item.label === "Email" || item.label === "Courriel") {
          return { ...item, value: siteSettings.email, href: `mailto:${siteSettings.email}` };
        }
        if (item.label === "Website" || item.label === "Site web") {
          return { ...item, value: siteSettings.website, href: undefined };
        }
        if (item.label === "Office" || item.label === "Bureau") {
          return { ...item, value: siteSettings.office };
        }
        if (item.label === "Hours" || item.label === "Horaires") {
          return { ...item, value: siteSettings.hours };
        }
        return item;
      })
    : t.info.items;

  // Override channels lede + first channel link with live email
  const channelsLede = siteSettings
    ? t.channels.lede.replaceAll("contact@akieni.com", siteSettings.email)
    : t.channels.lede;
  const channelItems = siteSettings
    ? t.channels.items.map((c) =>
        c.href?.startsWith("mailto:") ? { ...c, linkLabel: siteSettings.email, href: `mailto:${siteSettings.email}` } : c
      )
    : t.channels.items;
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
            {infoItems.map((item) => (
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

          <div className="relative mt-s5 aspect-16/10 overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.8563123034637!2d15.300872175894856!3d-4.248206446039178!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a6a3300014c6cb1%3A0x3746c27680954617!2sAkieni!5e0!3m2!1sfr!2scg!4v1780512408444!5m2!1sfr!2scg"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t.info.mapLabel}
            ></iframe>
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
          lede={channelsLede}
          variant="dark"
        />
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-3">
          {channelItems.map((c) => (
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
