import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type MissionVisionStrings = Dictionary["about"]["missionVision"];

export function AboutMissionVision({
  strings,
}: Readonly<{ strings: MissionVisionStrings }>) {
  const blocks = [strings.mission, strings.vision];
  return (
    <Section variant="dark">
      <div className="grid grid-cols-1 gap-s8 lg:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.eyebrow}>
            <Eyebrow accent>{block.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
              {block.title}
            </h2>
            <p className="mt-s6 text-lg leading-[1.5] text-muted-2">
              {block.lede}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
