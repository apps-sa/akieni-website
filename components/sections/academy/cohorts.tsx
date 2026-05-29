import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type CohortsStrings = Dictionary["academy"]["cohorts"];

export function AcademyCohorts({
  lang,
  strings,
}: Readonly<{ lang: string; strings: CohortsStrings }>) {
  return (
    <Section variant="dark">
      <SectionHead
        eyebrow={strings.eyebrow}
        eyebrowAccent
        title={strings.title}
        lede={strings.lede}
        variant="dark"
      />
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2">
        {strings.items.map((cohort) => (
          <div
            key={cohort.year}
            className="flex flex-col gap-[0.8rem] border border-line bg-ink-2 p-[2rem]"
          >
            <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
              {cohort.year}
            </span>
            <div className="text-[4rem] font-bold leading-[0.95] tracking-[-0.04em]">
              {cohort.numAccent ? (
                <span className="text-cyan-teal">{cohort.num}</span>
              ) : (
                cohort.num
              )}
            </div>
            <h3 className="text-2xl tracking-[-0.02em]">{cohort.title}</h3>
            <p className="text-muted-2">{cohort.desc}</p>
            {cohort.link && (
              <Link
                href={`/${lang}/contact`}
                className="mt-4 inline-flex w-fit items-center gap-2 border-b border-cyan-teal pb-0.5 text-sm font-semibold uppercase tracking-[0.05em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
              >
                {cohort.link}
                <span aria-hidden>→</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
