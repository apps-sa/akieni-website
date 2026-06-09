import { BlurImage } from "@/components/shared/blur-image";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type LeadershipStrings = Dictionary["team"]["leadership"];

export type LeaderMember = {
  name: string;
  role: string;
  bio: string;
  photoLabel: string;
  photoUrl: string | null;
};

export function TeamLeadership({
  strings,
  members,
}: Readonly<{ strings: LeadershipStrings; members?: LeaderMember[] }>) {
  const items: LeaderMember[] = members && members.length > 0
    ? members
    : strings.items.map((m) => ({ ...m, photoUrl: null }));

  return (
    <Section variant="paper">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 gap-s5 min-[601px]:grid-cols-2 min-[901px]:grid-cols-3">
        {items.map((leader) => (
          <article
            key={leader.name}
            className="flex flex-col overflow-hidden border border-line-light bg-white transition-colors duration-2 ease-akieni"
          >
            <div className="relative aspect-4/5 w-full overflow-hidden">
              {leader.photoUrl ? (
                <BlurImage
                  src={leader.photoUrl}
                  alt={leader.photoLabel}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              ) : (
                <PlaceholderMedia aspect="4/5" surface="dark" label={leader.photoLabel} />
              )}
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
