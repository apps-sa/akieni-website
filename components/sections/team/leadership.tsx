import type { Dictionary } from "@/app/[lang]/dictionaries";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

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
        {strings.items.map((leader) => (
          <article
            key={leader.name}
            className="flex flex-col overflow-hidden border border-line-light bg-white transition-colors duration-2 ease-akieni"
          >
            <PlaceholderMedia
              aspect="4/5"
              surface="dark"
              label={leader.photoLabel}
            />
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
