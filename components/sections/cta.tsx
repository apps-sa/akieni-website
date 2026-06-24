import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

export type CtaStrings = {
  eyebrow?: string;
  title?: string;
  titleNode?: ReactNode;
  lede?: string;
  primary: string;
  email?: string;
  secondary?: string;
  secondaryHref?: string;
  wordmark?: string;
};

type Theme = "dark-bg" | "default-bg";
type ButtonStyle = "primary" | "dark";
type ButtonSize = "default" | "lg";

const PRIMARY_SIZE: Record<ButtonSize, string> = {
  default: "px-[1.4rem] py-[0.95rem] text-sm",
  lg: "px-[1.7rem] py-[1.1rem] text-base",
};

const PRIMARY_STYLE: Record<ButtonStyle, string> = {
  primary:
    "border border-cyan-teal bg-cyan-teal text-black hover:border-green hover:bg-green",
  dark: "border border-black bg-black text-white hover:border-ink hover:bg-ink hover:text-cyan-teal",
};

const GHOST_CLS =
  "inline-flex items-center gap-[0.65rem] border border-current bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-white hover:bg-white hover:text-black";

export function Cta({
  lang,
  strings,
  theme = "dark-bg",
  buttonStyle = "primary",
  buttonSize = "default",
  primaryHref,
}: Readonly<{
  lang: string;
  strings: CtaStrings;
  theme?: Theme;
  buttonStyle?: ButtonStyle;
  buttonSize?: ButtonSize;
  primaryHref?: string;
}>) {
  const withLang = (href: string) => {
    if (!href.startsWith("/")) return href;
    if (href === "/") return `/${lang}`;
    return `/${lang}${href}`;
  };

  const titleContent = strings.titleNode ?? strings.title;
  const isDarkBg = theme === "dark-bg";

  const sectionVariant = isDarkBg ? "dark" : "default";
  const ledeColor = isDarkBg ? "text-muted-2" : "text-muted";
  const showWordmark = isDarkBg && Boolean(strings.wordmark);

  const primaryCls = [
    "group inline-flex items-center gap-[0.65rem] font-semibold uppercase tracking-[0.02em] transition-[background-color,border-color,color] duration-3 ease-akieni",
    PRIMARY_SIZE[buttonSize],
    PRIMARY_STYLE[buttonStyle],
  ].join(" ");

  const primaryTarget = withLang(primaryHref ?? "/contact");

  return (
    <Section variant={sectionVariant} className="pb-s6">
      <div className="flex flex-wrap items-end justify-between gap-s7">
        <div className="flex max-w-[52ch] flex-col gap-s3 lg:flex-1 lg:basis-[34rem]">
          {strings.eyebrow && <Eyebrow accent={isDarkBg}>{strings.eyebrow}</Eyebrow>}
          {titleContent && (
            <h2 className="text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.05] tracking-[-0.03em] text-balance">
              {titleContent}
            </h2>
          )}
        </div>
        <div className="flex max-w-[46ch] flex-col gap-s5 lg:flex-1 lg:basis-[28rem]">
          {strings.lede && (
            <p className={["text-lg leading-normal", ledeColor].join(" ")}>
              {strings.lede}
            </p>
          )}
          <div className="flex flex-wrap gap-[0.8rem]">
            <Link href={primaryTarget} className={primaryCls}>
              {strings.primary}
              <span
                aria-hidden
                className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
            {strings.email && (
              <a href={`mailto:${strings.email}`} className={GHOST_CLS}>
                {strings.email}
              </a>
            )}
            {strings.secondary && strings.secondaryHref && (
              <Link href={withLang(strings.secondaryHref)} className={GHOST_CLS}>
                {strings.secondary}
              </Link>
            )}
          </div>
        </div>
      </div>

      {showWordmark && (
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
