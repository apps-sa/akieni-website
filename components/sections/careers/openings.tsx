import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type OpeningsStrings = Dictionary["careers"]["openings"];

export type JobOpeningRow = {
  slug?: string;
  href?: string;
  dept: string;
  title: string;
  loc: string;
  type: string;
};

export function CareersOpenings({
  lang,
  strings,
  items,
}: Readonly<{ lang: string; strings: OpeningsStrings; items?: JobOpeningRow[] }>) {
  const jobs: JobOpeningRow[] = items && items.length > 0
    ? items
    : strings.items.map((j) => ({ ...j, slug: j.href?.replace("/careers/", "") }));

  return (
    <Section variant="dark" id="openings">
      <SectionHead
        eyebrow={strings.eyebrow}
        eyebrowAccent
        title={strings.title}
        lede={strings.lede}
        variant="dark"
      />
      <div className="flex flex-col border-t border-line">
        {jobs.map((job) => (
          <Link
            key={job.title}
            href={job.slug ? `/${lang}/careers/${job.slug}` : `/${lang}${job.href ?? ""}`}
            className="group grid items-center gap-s4 border-b border-line px-s3 py-[1.4rem] text-white transition-[background-color,padding] duration-2 ease-akieni hover:bg-ink-2 hover:pl-s5 max-[760px]:grid-cols-[1fr_auto] min-[761px]:grid-cols-[minmax(220px,1fr)_1.4fr_auto_auto_auto]"
          >
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-2 max-[760px]:col-start-1">
              {job.dept}
            </span>
            <span className="text-lg font-semibold tracking-[-0.01em]">
              {job.title}
            </span>
            <span className="text-sm text-muted-2 max-[760px]:col-start-1">
              {job.loc}
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal max-[760px]:col-start-1">
              {job.type}
            </span>
            <span
              aria-hidden
              className="justify-self-end text-cyan-teal transition-transform duration-2 ease-akieni group-hover:translate-x-1.5"
            >
              →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
