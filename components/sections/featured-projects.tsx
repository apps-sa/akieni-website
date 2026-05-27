import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";
import { Tag } from "@/components/shared/tag";

type FeaturedProjectsStrings = Dictionary["home"]["featuredProjects"];

const SIZE_SPAN: Record<string, string> = {
  lg: "lg:col-span-7",
  sm: "lg:col-span-5",
  full: "lg:col-span-12",
};

const SIZE_ASPECT: Record<string, string> = {
  lg: "16/10",
  sm: "4/3",
  full: "21/6",
};

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
          <article
            key={item.slug}
            className={[
              "relative flex flex-col overflow-hidden border border-line bg-ink-2 text-white transition-all duration-2 ease-akieni hover:border-cyan-teal",
              SIZE_SPAN[item.size] ?? "lg:col-span-12",
            ].join(" ")}
          >
            <Link
              href={`/${lang}/projects/${item.slug}`}
              className="flex flex-1 flex-col"
            >
              <PlaceholderMedia
                aspect={SIZE_ASPECT[item.size] ?? "16/10"}
                label={item.mediaLabel}
              />
              <div className="flex flex-1 flex-col gap-s3 p-[1.6rem_1.6rem_1.8rem]">
                {item.size === "full" ? (
                  <div className="flex flex-wrap items-start justify-between gap-s4">
                    <div className="flex max-w-[60ch] flex-col gap-2">
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal">
                        {item.client}
                      </span>
                      <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
                        {item.title}
                      </h3>
                    </div>
                    <div className="flex flex-col items-end gap-[0.6rem]">
                      <div className="flex flex-wrap justify-end gap-[0.4rem]">
                        {item.tags.map((t) => (
                          <Tag key={t} surface="dark">
                            {t}
                          </Tag>
                        ))}
                      </div>
                      <Tag variant="status" surface="dark">
                        {item.statusLabel}
                      </Tag>
                    </div>
                  </div>
                ) : (
                  <>
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal">
                      {item.client}
                    </span>
                    <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
                      {item.title}
                    </h3>
                    <div className="flex flex-wrap gap-[0.4rem]">
                      {item.tags.map((t) => (
                        <Tag key={t} surface="dark">
                          {t}
                        </Tag>
                      ))}
                    </div>
                  </>
                )}
              </div>
              {item.size !== "full" && (
                <div className="flex items-center justify-between border-t border-line px-[1.6rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em] text-muted-2">
                  <span>{item.years}</span>
                  <Tag variant="status" surface="dark">
                    {item.statusLabel}
                  </Tag>
                </div>
              )}
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
}
