import { BlurImage } from "@/components/shared/blur-image";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Badge } from "@/components/shared/badge";
import { Container } from "@/components/shared/container";
import { Eyebrow } from "@/components/shared/eyebrow";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type DictStrings = Dictionary["projectDetails"]["sfec"];

export type ProjectDetailStrings = {
  meta: { title: string; description: string };
  hero: {
    backLabel: string;
    caption: string;
    title: string;
    lede: string;
    mediaLabel: string;
    image?: string | null | { asset: { _ref: string } };
  };
  overview: ReadonlyArray<{ label: string; value: string; accent?: boolean }>;
  challenge: { eyebrow: string; title: string; paragraphs: string[] };
  solution: {
    eyebrow: string;
    title: string;
    lede: string;
    items: string[];
    gallery: Array<{ label: string; image?: string | null | { asset: { _ref: string } } }>;
  };
  stack: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    groups: Array<{ heading: string; items: string[] }>;
  };
  impact: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lede: string;
    cells: Array<{ num: string; desc: string }>;
  };
  nav: {
    allLabel: string;
    allTitle: string;
    nextLabel: string;
    nextSlug: string;
    nextTitle: string;
  };
  cta: { title: string; primary: string };
};

function getImageSrc(image: ProjectDetailStrings["hero"]["image"]): string | null {
  if (!image) return null;
  if (typeof image === "string") return image;
  return null;
}

export function ProjectDetailPage({
  lang,
  strings,
  dict,
}: Readonly<{ lang: string; strings: ProjectDetailStrings | DictStrings; dict?: Dictionary }>) {
  const s = strings as ProjectDetailStrings;
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-black pb-s8 pt-[calc(var(--nav-h)+3.5rem)] text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_85%)]"
        />
        <Container className="relative z-2 flex flex-col gap-s5">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-2">
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.05em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
            >
              <span aria-hidden>←</span> {s.hero.backLabel}
            </Link>
            <span className="font-mono text-xs tracking-[0.14em]">
              {s.hero.caption}
            </span>
          </div>
          <h1 className="text-display font-bold leading-[0.92] tracking-[-0.045em] max-[720px]:text-[clamp(2.25rem,11vw,4rem)]">
            {s.hero.title}
          </h1>
          <p className="max-w-[46ch] text-lg text-muted-2">
            {s.hero.lede}
          </p>
          <div className="mt-s5 aspect-21/10 w-full overflow-hidden border border-line">
            {getImageSrc(s.hero.image) ? (
              <div className="relative h-full w-full">
                <BlurImage
                  src={getImageSrc(s.hero.image)!}
                  alt={s.hero.mediaLabel}
                  fill
                  className="object-cover object-top"
                  sizes="100vw"
                  priority
                />
              </div>
            ) : (
              <PlaceholderMedia
                aspect="21/8"
                className="h-full"
                label={s.hero.mediaLabel}
              />
            )}
          </div>
        </Container>
      </section>

      {/* Overview strip */}
      <section className="bg-black text-white">
        <Container>
          <dl className="grid grid-cols-2 gap-s6 border-y border-line py-s6 lg:grid-cols-4">
            {s.overview.map((row) => (
              <div key={row.label}>
                <dt className="mb-[0.3rem] font-mono text-xs uppercase tracking-[0.14em] text-muted-2">
                  {row.label}
                </dt>
                <dd
                  className={[
                    "m-0 text-lg font-semibold",
                    row.accent ? "text-cyan-teal" : "",
                  ].join(" ")}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Challenge */}
      <Section variant="paper">
        <div className="grid grid-cols-1 gap-s7 lg:[grid-template-columns:1fr_1.4fr]">
          <div>
            <Eyebrow>{s.challenge.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
              {s.challenge.title}
            </h2>
          </div>
          <div className="flex flex-col gap-s4">
            {s.challenge.paragraphs.map((p, i) => (
              <p key={p} className={i === 0 ? "text-lg" : "text-md text-muted"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Solution */}
      <Section variant="dark">
        <div className="grid grid-cols-1 gap-s7 lg:[grid-template-columns:1fr_1.4fr]">
          <div>
            <Eyebrow accent>{s.solution.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
              {s.solution.title}
            </h2>
          </div>
          <div className="flex flex-col gap-s4">
            <p className="text-lg">{s.solution.lede}</p>
            <ul className="flex flex-col gap-[0.6rem] text-md text-muted-2">
              {s.solution.items.map((item) => (
                <li key={item} className="flex items-baseline gap-[0.55rem]">
                  <span aria-hidden className="text-cyan-teal">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-s7 grid grid-cols-1 gap-s4 min-[721px]:grid-cols-3">
          {s.solution.gallery.map((item, i) => (
            <div key={item.label} className={i === 0 ? "min-[721px]:col-span-1" : ""}>
              {getImageSrc(item.image) ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <BlurImage
                    src={getImageSrc(item.image)!}
                    alt={item.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <PlaceholderMedia aspect="4/3" label={item.label} />
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Tech stack */}
      <Section variant="paper">
        <div className="grid grid-cols-1 gap-s7 lg:grid-cols-2">
          <div>
            <Eyebrow>{s.stack.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
              {s.stack.titleLine1}
              <br />
              {s.stack.titleLine2}
            </h2>
            <p className="mt-s6 max-w-[60ch] text-lg text-muted">
              {s.stack.lede}
            </p>
          </div>
          <div className="flex flex-col gap-s5">
            {s.stack.groups.map((group) => (
              <div key={group.heading}>
                <p className="mb-[0.8rem] font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  {group.heading}
                </p>
                <div className="flex flex-wrap gap-[0.6rem]">
                  {group.items.map((b) => (
                    <Badge key={b}>{b}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Impact */}
      <Section variant="dark">
        <SectionHead
          eyebrow={s.impact.eyebrow}
          eyebrowAccent
          title={
            <>
              {s.impact.titleLine1}
              <br />
              {s.impact.titleLine2}
            </>
          }
          lede={s.impact.lede}
          variant="dark"
        />
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-3">
          {s.impact.cells.map((cell) => (
            <div
              key={cell.desc}
              className="border border-line bg-ink-2 p-[1.6rem]"
            >
              <div className="text-[2.6rem] font-bold tracking-[-0.03em]">
                <span className="text-cyan-teal">{cell.num}</span>
              </div>
              <p className="mt-4 text-muted-2">{cell.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Next project nav */}
      <section className="bg-black text-white">
        <Container>
          <div className="grid grid-cols-1 border-t border-line min-[721px]:grid-cols-2">
            <Link
              href={`/${lang}/projects`}
              className="flex flex-col gap-[0.5rem] border-line p-[2rem_1.5rem] transition-colors duration-2 ease-akieni hover:bg-ink-2 hover:text-cyan-teal min-[721px]:border-r"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
                {s.nav.allLabel}
              </span>
              <span className="mt-[0.4rem] text-xl leading-[1.15] tracking-[-0.02em] font-bold">
                {s.nav.allTitle}
              </span>
            </Link>
            <Link
              href={`/${lang}/projects/${s.nav.nextSlug}`}
              className="flex flex-col gap-[0.5rem] p-[2rem_1.5rem] transition-colors duration-2 ease-akieni hover:bg-ink-2 hover:text-cyan-teal min-[721px]:items-end min-[721px]:text-right"
            >
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
                {s.nav.nextLabel}
              </span>
              <span className="mt-[0.4rem] text-xl leading-[1.15] tracking-[-0.02em] font-bold">
                {s.nav.nextTitle}
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Section variant="ink">
        <div className="flex flex-wrap items-end justify-between gap-s7">
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
            {s.cta.title}
          </h2>
          <Link
            href={`/${lang}/contact`}
            className="group inline-flex items-center gap-[0.65rem] border border-cyan-teal bg-cyan-teal px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-green hover:bg-green"
          >
            {s.cta.primary}
            <span
              aria-hidden
              className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </Section>
    </>
  );
}
