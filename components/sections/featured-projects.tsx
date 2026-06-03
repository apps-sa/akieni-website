import type { Dictionary } from "@/app/[lang]/dictionaries";
import { ProjectCard } from "@/components/shared/project-card";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type FeaturedProjectsStrings = Dictionary["home"]["featuredProjects"];

export function FeaturedProjects({
  lang,
  strings,
}: Readonly<{ lang: string; strings: FeaturedProjectsStrings }>) {
  return (
    <Section variant="dark">
      <SectionHead
        eyebrow={strings.eyebrow}
        eyebrowAccent
        title={
          <>
            {strings.titleLine1}
            <br />
            {strings.titleLine2}
          </>
        }
        lede={strings.lede}
        link={{ label: strings.all, href: `/${lang}/projects` }}
        variant="dark"
      />
      <div className="grid grid-cols-1 gap-s4 lg:grid-cols-12">
        {strings.items.map((item) => (
          <ProjectCard
            key={item.slug}
            project={{
              slug: item.slug,
              client: item.client,
              title: item.title,
              tags: item.tags,
              years: item.years || undefined,
              statusLabel: item.statusLabel,
              mediaLabel: item.mediaLabel,
              image: item.image,
            }}
            lang={lang}
            surface="dark"
            size={item.size as "lg" | "sm" | "full"}
          />
        ))}
      </div>
    </Section>
  );
}
