import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

export type ApproachStrings = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lede: string;
  steps: ReadonlyArray<{
    number: string;
    title: string;
    desc: string;
  }>;
};

export function Approach({ strings }: Readonly<{ strings: ApproachStrings }>) {
  return (
    <Section>
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
      <div className="grid grid-cols-1 gap-0 border-y border-line-light min-[721px]:grid-cols-2 lg:grid-cols-4">
        {strings.steps.map((step, i) => {
          const isLastCol = (i + 1) % 4 === 0;
          return (
            <div
              key={step.number}
              className={[
                "relative flex flex-col gap-s4 p-[2rem_1.6rem_2.6rem]",
                "border-line-light",
                "lg:border-r",
                isLastCol ? "lg:border-r-0" : "",
                "border-b min-[721px]:border-b lg:border-b-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className="font-mono text-sm tracking-widest text-cyan-teal">
                {step.number}
              </span>
              <h3 className="text-xl font-bold tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="text-md text-muted">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
