import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Badge } from "@/components/shared/badge";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ProductDetailStrings = Dictionary["productDetails"]["akienipay"];
type Pill = ProductDetailStrings["hero"]["pills"][number];

const PILL_DOT: Record<string, string> = {
  default: "bg-cyan-teal",
  green: "bg-green",
  blue: "bg-blue",
};

function HeroPill({ pill }: Readonly<{ pill: Pill }>) {
  return (
    <span className="inline-flex items-center gap-2 border border-line px-[0.7rem] py-[0.35rem] font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
      <span
        aria-hidden
        className={[
          "h-1.5 w-1.5 rounded-full",
          PILL_DOT[pill.variant] ?? PILL_DOT.default,
        ].join(" ")}
      />
      {pill.label}
    </span>
  );
}

export function ProductDetailPage({
  lang,
  strings,
}: Readonly<{ lang: string; strings: ProductDetailStrings }>) {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black pb-s8 pt-[calc(var(--nav-h)+3.5rem)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_85%)]"
        />
        <Container className="relative z-2 grid grid-cols-1 items-end gap-s7 lg:[grid-template-columns:1.4fr_1fr]">
          <div>
            <Link
              href={`/${lang}/products`}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
            >
              <span aria-hidden>←</span> {strings.hero.backLabel}
            </Link>
            <h1 className="my-s5 text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              {strings.hero.title}
              {strings.hero.titleAccent && (
                <span className="text-cyan-teal">
                  {" "}
                  {strings.hero.titleAccent}
                </span>
              )}
            </h1>
            <p className="max-w-[52ch] text-lg text-muted-2">
              {strings.hero.lede}
            </p>
            <div className="mt-s5 flex flex-wrap gap-2">
              {strings.hero.pills.map((p) => (
                <HeroPill key={p.label} pill={p} />
              ))}
            </div>
            <div className="mt-s5 flex flex-wrap gap-[0.8rem]">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-[0.65rem] border border-cyan-teal bg-cyan-teal px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-green hover:bg-green"
              >
                {strings.hero.ctaPrimary}
              </Link>
              <a
                href="#docs"
                className="inline-flex items-center gap-[0.65rem] border border-current bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-white hover:bg-white hover:text-black"
              >
                {strings.hero.ctaSecondary}
              </a>
            </div>
          </div>

          <aside
            aria-label={strings.hero.glanceLabel}
            className="flex flex-col gap-s3 border border-line bg-ink-2 p-s5"
          >
            <h4 className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-cyan-teal">
              {strings.hero.glanceLabel}
            </h4>
            <div className="grid grid-cols-2 gap-x-[0.8rem] gap-y-4">
              {strings.hero.kv.map((kv) => (
                <div key={kv.k} className="flex flex-col gap-[0.2rem]">
                  <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                    {kv.k}
                  </span>
                  <span className="text-md font-semibold">{kv.v}</span>
                </div>
              ))}
            </div>
          </aside>
        </Container>
      </section>

      {/* Anchor bar */}
      <nav
        aria-label="Section navigation"
        className="sticky top-nav-h z-20 border-y border-line bg-ink-2 font-mono text-xs uppercase tracking-[0.14em]"
      >
        <Container className="flex gap-s5 overflow-x-auto">
          {strings.anchors.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="whitespace-nowrap border-b-2 border-transparent py-4 text-muted-2 transition-colors duration-1 ease-akieni hover:text-white"
            >
              {a.label}
            </a>
          ))}
        </Container>
      </nav>

      {/* Overview */}
      <Section variant="paper" id="overview">
        <SectionHead
          eyebrow={strings.overview.eyebrow}
          title={strings.overview.title}
          lede={strings.overview.lede}
        />
        <FeatureGrid items={strings.overview.feats} surface="light" />
      </Section>

      {/* Features */}
      <Section variant="dark" id="features">
        <SectionHead
          eyebrow={strings.features.eyebrow}
          eyebrowAccent
          title={strings.features.title}
          lede={strings.features.lede}
          variant="dark"
        />
        <div className="grid grid-cols-1 border border-line min-[641px]:grid-cols-2 lg:grid-cols-3">
          {strings.features.items.map((f) => (
            <div
              key={f.num}
              className="flex flex-col gap-[0.55rem] border-b border-r border-line p-[1.6rem_1.4rem] last:border-b-0"
            >
              <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
                {f.num}
              </span>
              <h3 className="text-xl tracking-[-0.02em] font-bold">{f.title}</h3>
              <p className="text-sm text-muted-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section variant="paper" id="flow">
        <SectionHead
          eyebrow={strings.flow.eyebrow}
          title={strings.flow.title}
          lede={strings.flow.lede}
        />
        <div className="grid grid-cols-1 gap-0 border-y border-line-light min-[721px]:grid-cols-2 lg:grid-cols-4">
          {strings.flow.steps.map((step, i) => {
            const isLastCol = (i + 1) % 4 === 0;
            return (
              <div
                key={step.num}
                className={[
                  "flex flex-col gap-s2 p-[1.8rem_1.4rem] border-line-light",
                  "lg:border-r",
                  isLastCol ? "lg:border-r-0" : "",
                  "border-b min-[721px]:border-b lg:border-b-0",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold tracking-[-0.01em]">
                  {step.title}
                </h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Use cases */}
      <Section variant="dark" id="cases">
        <SectionHead
          eyebrow={strings.cases.eyebrow}
          eyebrowAccent
          title={strings.cases.title}
          lede={strings.cases.lede}
          variant="dark"
        />
        <div className="grid grid-cols-1 gap-s5 min-[641px]:grid-cols-2 lg:grid-cols-3">
          {strings.cases.items.map((c) => (
            <article
              key={c.title}
              className="flex flex-col gap-s3 border border-line bg-ink-2 p-s5 text-white"
            >
              <span
                aria-hidden
                className="flex h-[38px] w-[38px] items-center justify-center border border-cyan-teal font-mono text-sm font-bold text-cyan-teal"
              >
                {c.icon}
              </span>
              <h3 className="text-xl tracking-[-0.02em] font-bold">{c.title}</h3>
              <p className="text-md text-muted-2">{c.desc}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* API / docs */}
      <Section variant="paper" id="docs">
        <SectionHead
          eyebrow={strings.api.eyebrow}
          title={strings.api.title}
          lede={strings.api.lede}
        />
        <div className="grid grid-cols-1 items-stretch gap-s6 lg:[grid-template-columns:1fr_1.4fr]">
          <div className="flex flex-col gap-s4">
            <div className="flex flex-wrap gap-[0.6rem]">
              {strings.api.badges.map((b) => (
                <Badge key={b}>{b}</Badge>
              ))}
            </div>
            <ul className="flex flex-col gap-[0.6rem] text-md text-muted">
              {strings.api.points.map((p) => (
                <li key={p} className="flex items-baseline gap-[0.55rem]">
                  <span
                    aria-hidden
                    className="h-1.5 w-1.5 flex-none translate-y-[-2px] bg-cyan-teal"
                  />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              href={`/${lang}/contact`}
              className="inline-flex w-fit items-center gap-[0.65rem] border border-black bg-black px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-white transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-ink hover:bg-ink hover:text-cyan-teal"
            >
              {strings.api.cta}
            </Link>
          </div>
          <pre className="overflow-x-auto bg-ink p-s5 font-mono text-sm leading-[1.6] text-muted-2">
            {strings.api.code}
          </pre>
        </div>
      </Section>

      {/* Related products */}
      <Section variant="dark" id="related">
        <SectionHead
          eyebrow={strings.related.eyebrow}
          eyebrowAccent
          title={strings.related.title}
          lede={strings.related.lede}
          variant="dark"
        />
        <div className="grid grid-cols-1 gap-s5 min-[761px]:grid-cols-2">
          {strings.related.items.map((r) => (
            <Link
              key={r.slug}
              href={`/${lang}/products/${r.slug}`}
              className="flex flex-col gap-s3 border border-line bg-ink-2 p-s6 text-white transition-colors duration-2 ease-akieni hover:border-cyan-teal"
            >
              <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
                {r.tag}
              </span>
              <h3 className="text-2xl tracking-[-0.02em] font-bold">
                {r.title}
              </h3>
              <p className="text-md text-muted-2">{r.desc}</p>
              <span className="font-mono text-sm uppercase tracking-[0.12em] text-cyan-teal">
                {r.cta}
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section variant="paper" className="pb-s6">
        <div className="flex flex-wrap items-end justify-between gap-s7">
          <div className="flex max-w-[30ch] flex-col gap-s3">
            <Eyebrow>{strings.cta.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
              {strings.cta.title}
            </h2>
          </div>
          <div className="flex max-w-[46ch] flex-col gap-s5">
            <p className="text-lg leading-normal text-muted">
              {strings.cta.lede}
            </p>
            <div className="flex flex-wrap gap-[0.8rem]">
              <Link
                href={`/${lang}/contact`}
                className="group inline-flex items-center gap-[0.65rem] border border-black bg-black px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-white transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-ink hover:bg-ink hover:text-cyan-teal"
              >
                {strings.cta.primary}
              </Link>
              <a
                href={`mailto:${strings.cta.email}`}
                className="inline-flex items-center gap-[0.65rem] border border-black bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:bg-black hover:text-white"
              >
                {strings.cta.email}
              </a>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
