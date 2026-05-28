import type { Dictionary } from "@/app/[lang]/dictionaries";
import { InfoCard } from "@/components/shared/info-card";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ValuesStrings = Dictionary["about"]["values"];

export function AboutValues({
  strings,
}: Readonly<{ strings: ValuesStrings }>) {
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
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2 lg:grid-cols-3">
        {strings.items.map((v) => (
          <InfoCard
            key={v.number}
            number={v.number}
            title={v.title}
            desc={v.desc}
          />
        ))}
      </div>
    </Section>
  );
}
