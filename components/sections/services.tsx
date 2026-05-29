import type { Dictionary } from "@/app/[lang]/dictionaries";
import { MotionCard } from "@/components/motion/primitives";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";
import { Tag } from "@/components/shared/tag";

type ServicesStrings = Dictionary["home"]["services"];

export function Services({
  lang,
  strings,
}: Readonly<{ lang: string; strings: ServicesStrings }>) {
  return (
    <Section variant="paper" id="services">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={
          <>
            {strings.titleLine1}
            <br />
            {strings.titleLine2}
          </>
        }
        lede={strings.lede}
        link={{ label: strings.all, href: `/${lang}/services` }}
      />
      <div className="grid grid-cols-1 gap-s6 min-[721px]:grid-cols-2 lg:grid-cols-4">
        {strings.items.map((item) => (
          <MotionCard
            key={item.id}
            className="relative flex min-h-[320px] flex-col gap-s4 border border-line border-l-[3px] border-l-cyan-teal bg-ink-2 p-[2rem_1.8rem_2.2rem] text-white transition-colors duration-2 ease-akieni hover:border-l-green hover:bg-black"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm tracking-[0.1em] text-muted-2">
                {item.number}
              </span>
              <span aria-hidden className="text-cyan-teal">
                ◆
              </span>
            </div>
            <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="flex-1 text-md text-muted-2">{item.desc}</p>
            <div className="flex flex-wrap gap-[0.4rem]">
              {item.tags.map((t) => (
                <Tag key={t} surface="dark">
                  {t}
                </Tag>
              ))}
            </div>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
