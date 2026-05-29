import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ProcessStrings = Dictionary["careers"]["process"];

export function CareersProcess({
  strings,
}: Readonly<{ strings: ProcessStrings }>) {
  return (
    <Section variant="paper">
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
      <div className="grid grid-cols-1 gap-s4 min-[721px]:grid-cols-2 lg:grid-cols-4">
        {strings.steps.map((step) => (
          <div
            key={step.number}
            className="flex flex-col gap-[0.5rem] border border-line-light p-[1.6rem]"
          >
            <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
              {step.number}
            </span>
            <h3 className="text-lg font-semibold tracking-[-0.01em]">
              {step.title}
            </h3>
            <p className="text-sm text-muted">{step.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
