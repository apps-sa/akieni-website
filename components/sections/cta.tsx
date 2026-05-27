import Link from "next/link";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

export type CtaStrings = {
  eyebrow: string;
  title: string;
  lede?: string;
  primary: string;
  email?: string;
  secondary?: string;
  secondaryHref?: string;
  wordmark?: string;
};

const PRIMARY_CLS =
  "group inline-flex items-center gap-[0.65rem] border border-cyan-teal bg-cyan-teal px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-green hover:bg-green";

const GHOST_CLS =
  "inline-flex items-center gap-[0.65rem] border border-current bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-white hover:bg-white hover:text-black";

export function Cta({
  lang,
  strings,
}: Readonly<{ lang: string; strings: CtaStrings }>) {
  const withLang = (href: string) => {
    if (!href.startsWith("/")) return href;
    if (href === "/") return `/${lang}`;
    return `/${lang}${href}`;
  };

  return (
    <Section variant="dark" className="pb-s6">
      <div className="flex flex-wrap items-end justify-between gap-s7">
        <div className="flex max-w-[34ch] flex-col gap-s3 lg:flex-1 lg:basis-[28rem]">
          <Eyebrow accent>{strings.eyebrow}</Eyebrow>
          <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
            {strings.title}
          </h2>
        </div>
        <div className="flex max-w-[46ch] flex-col gap-s5 lg:flex-1 lg:basis-[28rem]">
          {strings.lede && (
            <p className="text-lg leading-normal text-muted-2">
              {strings.lede}
            </p>
          )}
          <div className="flex flex-wrap gap-[0.8rem]">
            <Link href={`/${lang}/contact`} className={PRIMARY_CLS}>
              {strings.primary}
              <span
                aria-hidden
                className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            {strings.email && (
              <a
                href={`mailto:${strings.email}`}
                className={GHOST_CLS}
              >
                {strings.email}
              </a>
            )}
            {strings.secondary && strings.secondaryHref && (
              <Link
                href={withLang(strings.secondaryHref)}
                className={GHOST_CLS}
              >
                {strings.secondary}
              </Link>
            )}
          </div>
        </div>
      </div>

      {strings.wordmark && (
        <div
          aria-hidden
          className="pointer-events-none mt-s7 select-none overflow-hidden text-[clamp(4rem,14vw,14rem)] font-bold leading-[0.85] tracking-[-0.05em] text-ink-2"
        >
          {strings.wordmark}
        </div>
      )}
    </Section>
  );
}
