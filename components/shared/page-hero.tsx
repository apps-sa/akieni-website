import Link from "next/link";
import { Container } from "./container";
import { Eyebrow } from "./eyebrow";

export type PageHeroAction = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

const PRIMARY_CLS =
  "group inline-flex items-center gap-[0.65rem] border border-cyan-teal bg-cyan-teal px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-green hover:bg-green";

const GHOST_CLS =
  "inline-flex items-center gap-[0.65rem] border border-current bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] transition-[background-color,border-color,color] duration-3 ease-akieni hover:border-white hover:bg-white hover:text-black";

export function PageHero({
  eyebrow,
  eyebrowAccent = true,
  caption,
  backgroundMark,
  titleLine1,
  titleLine2,
  titleAccent,
  lede,
  actions,
  minHeight = "74vh",
}: Readonly<{
  eyebrow: string;
  eyebrowAccent?: boolean;
  caption?: string;
  backgroundMark?: string;
  titleLine1: string;
  titleLine2?: string;
  titleAccent?: string;
  lede?: string;
  actions?: PageHeroAction[];
  minHeight?: string;
}>) {
  return (
    <section
      style={{ minHeight }}
      className="relative flex items-end overflow-hidden bg-black pb-s9 pt-[calc(var(--nav-h)+2rem)] text-white"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_85%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20vmax] right-[-20vmax] h-[60vmax] w-[60vmax] rounded-full opacity-35 blur-[120px] [background:radial-gradient(circle,var(--cyan-teal)_0%,transparent_60%)]"
      />
      {backgroundMark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        >
          <span className="font-mono text-[clamp(8rem,22vw,22rem)] font-bold tracking-[-0.05em] text-white/[0.04]">
            {backgroundMark}
          </span>
        </div>
      )}

      <Container className="relative z-2 grid w-full grid-cols-1 gap-s7">
        <div className="flex flex-wrap items-start justify-between gap-s4">
          <Eyebrow accent={eyebrowAccent}>{eyebrow}</Eyebrow>
          {caption && (
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
              {caption}
            </span>
          )}
        </div>

        <h1 className="max-w-[16ch] text-display font-bold leading-[0.92] tracking-[-0.045em] text-balance max-[720px]:text-[clamp(2.25rem,11vw,4rem)]">
          {titleLine1}
          {titleLine2 && (
            <>
              <br />
              {titleLine2}
            </>
          )}
          {titleAccent && <span className="text-cyan-teal">{titleAccent}</span>}
        </h1>

        {(lede || (actions && actions.length > 0)) && (
          <div className="flex flex-wrap items-end justify-between gap-s5">
            {lede && (
              <p className="max-w-[48ch] text-lg text-muted-2">{lede}</p>
            )}
            {actions && actions.length > 0 && (
              <div className="flex flex-wrap gap-s3">
                {actions.map((a) => (
                  <Link
                    key={a.href}
                    href={a.href}
                    className={a.variant === "ghost" ? GHOST_CLS : PRIMARY_CLS}
                  >
                    {a.label}
                    {a.variant !== "ghost" && (
                      <span
                        aria-hidden
                        className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1"
                      >
                        →
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
