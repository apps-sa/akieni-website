import { BlurImage } from "@/components/shared/blur-image";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

const LEADER_PHOTOS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=750&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=600&h=750&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=750&fit=crop&crop=faces",
];

type LeadershipStrings = Dictionary["team"]["leadership"];

export function TeamLeadership({
  strings,
}: Readonly<{ strings: LeadershipStrings }>) {
  return (
    <Section variant="paper">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 gap-s5 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3">
        {strings.items.map((leader, i) => (
          <article
            key={leader.name}
            className="flex flex-col overflow-hidden border border-line-light bg-white transition-colors duration-2 ease-akieni"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden">
              <BlurImage
                src={LEADER_PHOTOS[i]}
                alt={leader.photoLabel}
                fill
                className="object-cover object-top"
                sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col gap-[0.4rem] p-[1.4rem]">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {leader.role}
              </span>
              <h3 className="text-xl tracking-[-0.02em] font-bold">
                {leader.name}
              </h3>
              <p className="mt-[0.4rem] text-sm text-muted">{leader.bio}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
