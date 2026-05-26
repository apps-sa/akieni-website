import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Container } from "@/components/shared/container";

type HeroStrings = Dictionary["home"]["hero"];

type Peak = { w: string; h: string };
type MotifRow = {
  id: string;
  cls: string;
  peaks: ReadonlyArray<Peak>;
};

const MOTIF_ROWS: ReadonlyArray<MotifRow> = [
  {
    id: "e",
    cls: "bottom-[40vh] opacity-30 max-[720px]:hidden",
    peaks: [
      { w: "2.2vw", h: "3.5vh" },
      { w: "2.4vw", h: "3.5vh" },
      { w: "2.7vw", h: "3.5vh" },
      { w: "3.1vw", h: "3.5vh" },
      { w: "3.7vw", h: "3.5vh" },
      { w: "4.5vw", h: "3.5vh" },
      { w: "5.6vw", h: "3.5vh" },
      { w: "7.2vw", h: "3.5vh" },
      { w: "9.5vw", h: "3.5vh" },
      { w: "12.6vw", h: "3.5vh" },
      { w: "17vw", h: "3.5vh" },
      { w: "22vw", h: "3.5vh" },
    ],
  },
  {
    id: "d",
    cls: "bottom-[29vh] opacity-40 max-[720px]:hidden",
    peaks: [
      { w: "2.4vw", h: "4.5vh" },
      { w: "2.6vw", h: "4.5vh" },
      { w: "3vw", h: "4.5vh" },
      { w: "3.5vw", h: "4.5vh" },
      { w: "4.2vw", h: "4.5vh" },
      { w: "5.2vw", h: "4.5vh" },
      { w: "6.6vw", h: "4.5vh" },
      { w: "8.6vw", h: "4.5vh" },
      { w: "11.4vw", h: "4.5vh" },
      { w: "15vw", h: "4.5vh" },
      { w: "20vw", h: "4.5vh" },
      { w: "26vw", h: "4.5vh" },
    ],
  },
  {
    id: "c",
    cls: "bottom-[19vh] opacity-55 max-[720px]:hidden",
    peaks: [
      { w: "2.6vw", h: "6vh" },
      { w: "2.8vw", h: "6vh" },
      { w: "3.2vw", h: "6vh" },
      { w: "3.8vw", h: "6vh" },
      { w: "4.6vw", h: "6vh" },
      { w: "5.8vw", h: "6vh" },
      { w: "7.4vw", h: "6vh" },
      { w: "9.6vw", h: "6vh" },
      { w: "12.8vw", h: "6vh" },
      { w: "17vw", h: "6vh" },
      { w: "22vw", h: "6vh" },
      { w: "28vw", h: "6vh" },
    ],
  },
  {
    id: "b",
    cls: "bottom-[9vh] opacity-85",
    peaks: [
      { w: "2.4vw", h: "8vh" },
      { w: "2.8vw", h: "8vh" },
      { w: "3.4vw", h: "8vh" },
      { w: "4.2vw", h: "8vh" },
      { w: "5.4vw", h: "8vh" },
      { w: "7vw", h: "8vh" },
      { w: "9.4vw", h: "8vh" },
      { w: "12.6vw", h: "8vh" },
      { w: "17vw", h: "8vh" },
      { w: "23vw", h: "8vh" },
      { w: "30vw", h: "8vh" },
    ],
  },
  {
    id: "a",
    cls: "-bottom-[1vh]",
    peaks: [
      { w: "2.6vw", h: "11vh" },
      { w: "3.2vw", h: "11vh" },
      { w: "4vw", h: "11vh" },
      { w: "5vw", h: "11vh" },
      { w: "6.4vw", h: "11vh" },
      { w: "8.4vw", h: "11vh" },
      { w: "11.2vw", h: "11vh" },
      { w: "15vw", h: "11vh" },
      { w: "20vw", h: "11vh" },
      { w: "30vw", h: "11vh" },
    ],
  },
];

function Eyebrow({
  children,
  accent = false,
}: Readonly<{ children: ReactNode; accent?: boolean }>) {
  return (
    <span
      className={[
        "inline-flex items-center gap-[0.6rem] font-mono text-xs font-medium uppercase tracking-[0.14em]",
        "before:block before:h-px before:w-[18px] before:bg-current before:opacity-60",
        accent ? "text-cyan-teal" : "text-muted",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function peakStyle(p: Peak) {
  return { "--w": p.w, "--h": p.h } as CSSProperties;
}

function colPeakStyle(h: string) {
  return { "--h": h } as CSSProperties;
}

export function Hero({
  lang,
  strings,
}: Readonly<{ lang: string; strings: HeroStrings }>) {
  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-black text-white pb-s9 pt-[calc(var(--nav-h)+2rem)] max-[720px]:min-h-screen max-[720px]:pb-s7">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px] mask-[radial-gradient(ellipse_80%_60%_at_50%_40%,black,transparent_85%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute top-[-20vmax] right-[-20vmax] h-[60vmax] w-[60vmax] rounded-full opacity-35 blur-[120px] [background:radial-gradient(circle,var(--cyan-teal)_0%,transparent_60%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-25vmax] left-[-20vmax] h-[60vmax] w-[60vmax] rounded-full opacity-[0.18] blur-[120px] [background:radial-gradient(circle,var(--blue)_0%,transparent_60%)]"
      />

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-1 overflow-hidden mask-[radial-gradient(ellipse_62%_55%_at_28%_38%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_45%,rgba(0,0,0,0.9)_78%,rgba(0,0,0,1)_100%)]"
      >
        <div className="absolute right-[-4vw] top-[8vh] flex w-[32vw] flex-col gap-[2vh] opacity-60 max-[720px]:hidden">
          {[11, 9, 7, 5.5, 4].map((h, i) => (
            <span
              key={`index-${i + 1}`}
              className="peak w-full! opacity-[0.13]!"
              style={colPeakStyle(`${h}vh`)}
            />
          ))}
        </div>

        {MOTIF_ROWS.map((row) => (
          <div
            key={row.id}
            className={`absolute left-0 right-[-6vw] flex w-[106vw] items-end ${row.cls}`}
          >
            {row.peaks.map((p, i) => (
              <span key={`${i + 1}`} className="peak" style={peakStyle(p)} />
            ))}
          </div>
        ))}
      </div>

      <Container className="relative z-2 grid w-full grid-cols-1 gap-s7">
        <div className="flex flex-wrap items-start justify-between gap-s4">
          <Eyebrow accent>{strings.eyebrow}</Eyebrow>
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
            {strings.version}
          </span>
        </div>

        <h1 className="max-w-[14ch] text-display font-bold leading-[0.92] tracking-[-0.045em] wrap-break-word max-[720px]:max-w-full max-[720px]:text-[clamp(2.25rem,11vw,4rem)]">
          {strings.titleLine1}
          <br />
          {strings.titleLine2}
          <br />
          <span className="text-cyan-teal">{strings.titleAccent}</span>
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-s5">
          <p className="max-w-[48ch] text-lg text-muted-2">{strings.lede}</p>
          <div className="flex flex-wrap gap-s3">
            <Link
              href={`/${lang}/services`}
              className="group inline-flex items-center gap-[0.65rem] border border-cyan-teal bg-cyan-teal px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] text-black shadow-[0_0_0_rgba(56,240,115,0)] transition-[background-color,border-color,color,transform,box-shadow] duration-3 ease-akieni hover:-translate-y-px hover:border-green hover:bg-green hover:shadow-[0_10px_24px_-12px_rgba(56,240,115,0.55)]"
            >
              {strings.ctaPrimary}
              <span className="inline-block transition-transform duration-3 ease-akieni group-hover:translate-x-1">
                →
              </span>
            </Link>
            <Link
              href={`/${lang}/projects`}
              className="inline-flex items-center gap-[0.65rem] border border-current bg-transparent px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] shadow-[0_0_0_rgba(255,255,255,0)] transition-[background-color,border-color,color,transform,box-shadow] duration-3 ease-akieni hover:-translate-y-px hover:border-white hover:bg-white hover:text-black hover:shadow-[0_10px_24px_-12px_rgba(255,255,255,0.35)]"
            >
              {strings.ctaSecondary}
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-s5 border-t border-line pt-s5 max-[720px]:gap-s4">
          <div>
            <Eyebrow>{strings.deployingLabel}</Eyebrow>
            <div className="mt-2 max-w-[36ch] text-lg">
              {strings.deployingText}
            </div>
          </div>
          <div className="flex flex-wrap gap-8 max-[720px]:gap-[1.4rem]">
            {Object.values(strings.stats).map((s) => (
              <div key={s.label}>
                <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
                  {s.label}
                </div>
                <div className="text-2xl font-bold tracking-[-0.02em]">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
