import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type TimelineStrings = Dictionary["about"]["timeline"];

export function AboutTimeline({
  strings,
}: Readonly<{ strings: TimelineStrings }>) {
  return (
    <Section variant="dark">
      <SectionHead
        eyebrow={strings.eyebrow}
        eyebrowAccent
        title={
          <>
            {strings.titleLine1}
            <br />
            {strings.titleLine2}
          </>
        }
        lede={strings.lede}
        variant="dark"
      />
      <div className="relative grid grid-cols-1 gap-s5 pt-s6 min-[721px]:grid-cols-2 lg:grid-cols-4 lg:before:content-[''] lg:before:absolute lg:before:inset-x-0 lg:before:top-s6 lg:before:h-px lg:before:bg-line">
        {strings.items.map((m) => (
          <div
            key={m.year}
            className="relative flex flex-col gap-s3 pt-s5 before:content-[''] before:absolute before:-top-1 before:left-0 before:block before:h-[9px] before:w-[9px] before:rounded-full before:bg-cyan-teal"
          >
            <span className="font-mono text-sm tracking-[0.1em] text-cyan-teal">
              {m.year}
            </span>
            <h3 className="text-lg font-semibold leading-[1.2]">{m.title}</h3>
            <p className="text-sm text-muted-2">{m.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
