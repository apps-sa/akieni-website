import type { Dictionary } from "@/app/[lang]/dictionaries";
import { InfoCard } from "@/components/shared/info-card";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type WhyStrings = Dictionary["careers"]["why"];

export function CareersWhy({
  strings,
}: Readonly<{ strings: WhyStrings }>) {
  return (
    <Section variant="paper">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2 lg:grid-cols-3">
        {strings.items.map((item) => (
          <InfoCard
            key={item.number}
            number={item.number}
            title={item.title}
            desc={item.desc}
            surface="light"
          />
        ))}
      </div>
    </Section>
  );
}
