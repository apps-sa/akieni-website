import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Eyebrow } from "@/components/shared/eyebrow";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";

type StoryStrings = Dictionary["about"]["story"];

export function AboutStory({
  strings,
}: Readonly<{ strings: StoryStrings }>) {
  return (
    <Section variant="paper">
      <div className="grid grid-cols-1 gap-s7 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow>{strings.eyebrow}</Eyebrow>
          <h2 className="mt-4 max-w-[14ch] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
            {strings.title}
          </h2>
        </div>
        <div className="flex flex-col gap-s5 lg:col-span-7">
          {strings.paragraphs.map((p, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "text-lg leading-[1.5]"
                  : "text-md text-muted"
              }
            >
              {p}
            </p>
          ))}
          <div className="mt-s3 flex flex-col gap-s4 min-[721px]:flex-row">
            {strings.tiles.map((t) => (
              <div key={t.label} className="flex-1">
                <PlaceholderMedia
                  aspect="4/3"
                  surface="light"
                  label={t.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
