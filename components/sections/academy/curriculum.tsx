import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type CurriculumStrings = Dictionary["academy"]["curriculum"];

export function AcademyCurriculum({
  strings,
}: Readonly<{ strings: CurriculumStrings }>) {
  return (
    <Section variant="paper" id="curriculum">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={
          <>
            {strings.titleLine1}
            <br />
            {strings.titleLine2}
          </>
        }
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 border border-line-light min-[721px]:grid-cols-3">
        {strings.phases.map((phase, i) => {
          const isLastCol = i === strings.phases.length - 1;
          return (
            <div
              key={phase.phase}
              className={[
                "flex flex-col gap-[0.6rem] p-[1.8rem]",
                "border-line-light",
                "border-b min-[721px]:border-b-0",
                "min-[721px]:border-r",
                isLastCol ? "min-[721px]:border-r-0" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
                {phase.phase}
              </span>
              <h3 className="text-lg font-semibold">{phase.title}</h3>
              <ul className="flex flex-col gap-[0.35rem] text-sm text-muted">
                {phase.items.map((item) => (
                  <li key={item}>
                    <span aria-hidden className="text-cyan-teal">
                      ·{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
