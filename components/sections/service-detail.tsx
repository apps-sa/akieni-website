import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Cta } from "@/components/sections/cta";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ServiceDetailStrings = Dictionary["serviceDetails"]["software-integration"];

export function ServiceDetail({
  lang,
  strings,
}: Readonly<{ lang: string; strings: ServiceDetailStrings }>) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex items-end overflow-hidden bg-black pb-s9 pt-[calc(var(--nav-h)+4rem)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_85%)]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-20vmax] right-[-20vmax] h-[60vmax] w-[60vmax] rounded-full opacity-35 blur-[120px] [background:radial-gradient(circle,var(--cyan-teal)_0%,transparent_60%)]"
        />
        <Container className="relative z-2 flex flex-col gap-s6">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-2">
            <Link
              href={`/${lang}/services`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.05em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
            >
              <span aria-hidden>←</span> {strings.backLabel}
            </Link>
          </div>
          <h1 className="text-display font-bold leading-[0.92] tracking-[-0.045em] max-[720px]:text-[clamp(2.25rem,11vw,4rem)]">
            {strings.title}
          </h1>
          <p className="max-w-[54ch] text-lg text-muted-2">{strings.lede}</p>
        </Container>
      </section>

      {/* Overview strip */}
      <section className="bg-black text-white">
        <Container>
          <dl className="grid grid-cols-1 gap-s6 border-y border-line py-s6 min-[721px]:grid-cols-3">
            {strings.overview.map((row) => (
              <div key={row.label}>
                <dt className="mb-[0.3rem] font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  {row.label}
                </dt>
                <dd className="m-0 text-lg font-semibold">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* What we do */}
      <Section variant="paper">
        <div className="grid grid-cols-1 gap-s7 lg:[grid-template-columns:1fr_1.4fr]">
          <div>
            <Eyebrow>{strings.what.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
              {strings.what.title}
            </h2>
          </div>
          <div className="flex flex-col gap-s4">
            {strings.what.paragraphs.map((p, i) => (
              <p
                key={p}
                className={i === 0 ? "text-lg" : "text-md text-muted"}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section variant="dark">
        <SectionHead
          eyebrow={strings.benefits.eyebrow}
          eyebrowAccent
          title={strings.benefits.title}
          lede={strings.benefits.lede}
          variant="dark"
        />
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2 lg:grid-cols-4">
          {strings.benefits.items.map((b) => (
            <div key={b.num} className="flex flex-col gap-[0.6rem]">
              <span className="font-mono text-sm tracking-widest text-cyan-teal">
                {b.num}
              </span>
              <h3 className="text-xl tracking-[-0.02em] font-bold">{b.title}</h3>
              <p className="text-sm text-muted-2">{b.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section variant="paper">
        <SectionHead
          eyebrow={strings.approach.eyebrow}
          title={
            <>
              {strings.approach.titleLine1}
              <br />
              {strings.approach.titleLine2}
            </>
          }
          lede={strings.approach.lede}
        />
        <div className="grid grid-cols-1 gap-0 border-y border-line-light min-[721px]:grid-cols-2 lg:grid-cols-4">
          {strings.approach.steps.map((step, i) => {
            const isLastCol = (i + 1) % 4 === 0;
            return (
              <div
                key={step.num}
                className={[
                  "flex flex-col gap-s4 p-[2rem_1.6rem_2.6rem] border-line-light",
                  "lg:border-r",
                  isLastCol ? "lg:border-r-0" : "",
                  "border-b min-[721px]:border-b lg:border-b-0",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="font-mono text-sm tracking-widest text-cyan-teal">
                  {step.num}
                </span>
                <h3 className="text-xl tracking-[-0.02em] font-bold">
                  {step.title}
                </h3>
                <p className="text-md text-muted">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Related projects */}
      <Section>
        <SectionHead
          eyebrow={strings.related.eyebrow}
          title={strings.related.title}
          link={{ label: strings.related.all, href: `/${lang}/projects` }}
        />
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2">
          {strings.related.items.map((proj) => (
            <Link
              key={proj.slug}
              href={`/${lang}/projects/${proj.slug}`}
              className="flex flex-col overflow-hidden border border-line-light bg-white transition-colors duration-2 ease-akieni hover:border-black"
            >
              <PlaceholderMedia aspect="16/10" label={proj.mediaLabel} />
              <div className="flex flex-col gap-2 p-[1.6rem]">
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal">
                  {proj.client}
                </span>
                <h3 className="text-xl tracking-[-0.02em] font-bold">
                  {proj.title}
                </h3>
                {proj.desc && (
                  <p className="text-sm leading-relaxed text-muted line-clamp-2">
                    {proj.desc}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Cta
        lang={lang}
        strings={{
          title: strings.cta.title,
          primary: strings.cta.primary,
          secondary: strings.cta.secondary,
          secondaryHref: strings.cta.secondaryHref,
        }}
      />
    </>
  );
}
