import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type JoinCtaStrings = Dictionary["team"]["joinCta"];

export function TeamJoinCta({
  lang,
  strings,
}: Readonly<{ lang: string; strings: JoinCtaStrings }>) {
  const withLang = (href: string) =>
    href.startsWith("/") ? `/${lang}${href === "/" ? "" : href}` : href;

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-s7">
        <div className="max-w-[36ch]">
          <Eyebrow>{strings.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
            {strings.title}
          </h2>
          <p className="mt-s6 text-lg leading-normal text-muted">
            {strings.lede}
          </p>
        </div>
        <div className="flex flex-wrap gap-[0.8rem]">
          <Link
            href={withLang(strings.primaryHref)}
            className="group inline-flex items-center gap-[0.65rem] border border-black bg-black px-[1.7rem] py-[1.1rem] text-base font-semibold uppercase tracking-[0.02em] text-white transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-ink hover:bg-ink hover:text-cyan-teal"
          >
            {strings.primary}
            <span
              aria-hidden
              className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
          <Link
            href={withLang(strings.secondaryHref)}
            className="inline-flex items-center gap-[0.65rem] border border-black bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:bg-black hover:text-white"
          >
            {strings.secondary}
          </Link>
        </div>
      </div>
    </Section>
  );
}
