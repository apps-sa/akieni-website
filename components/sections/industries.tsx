import type { Dictionary } from "@/app/[lang]/dictionaries";
import { InfoCard } from "@/components/shared/info-card";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type IndustriesStrings = Dictionary["services"]["industries"];

export function Industries({
  strings,
}: Readonly<{ strings: IndustriesStrings }>) {
  return (
    <Section>
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 gap-s6 min-[721px]:grid-cols-2 lg:grid-cols-4">
        {strings.items.map((item) => (
          <InfoCard
            key={item.number}
            number={item.number}
            title={item.title}
            desc={item.desc}
          />
        ))}
      </div>
    </Section>
  );
}
