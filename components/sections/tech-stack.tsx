import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Badge } from "@/components/shared/badge";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type TechStackStrings = Dictionary["services"]["stack"];

export function TechStack({
  strings,
}: Readonly<{ strings: TechStackStrings }>) {
  return (
    <Section variant="paper">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2 lg:grid-cols-3">
        {strings.groups.map((group) => (
          <div key={group.heading} className="flex flex-col gap-4">
            <h4 className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {group.heading}
            </h4>
            <div className="flex flex-wrap gap-[0.6rem]">
              {group.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
