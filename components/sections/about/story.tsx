import { BlurImage } from "@/components/shared/blur-image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

const STORY_IMAGES = [
  "/images/IMG_2918.jpeg",
  "/images/PGSFEC Formation 7.jpeg",
];

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
            {strings.tiles.map((t, i) => (
              <div key={t.label} className="relative flex-1 aspect-4/3 overflow-hidden">
                <BlurImage
                  src={STORY_IMAGES[i]}
                  alt={t.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 720px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
