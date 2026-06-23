import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ServicesDetailStrings = Dictionary["services"]["detail"];

export function ServicesDetail({
  lang,
  strings,
}: Readonly<{ lang: string; strings: ServicesDetailStrings }>) {
  return (
    <Section variant="paper">
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2">
        {strings.items.map((item) => (
          <Link
            key={item.slug}
            href={`/${lang}/services/${item.slug}`}
            className="group relative flex flex-col gap-s4 border border-line border-l-[3px] border-l-cyan-teal bg-ink-2 p-[2rem_1.8rem_2.2rem] text-white transition-all duration-2 ease-akieni hover:border-l-green hover:bg-black"
          >
            <span className="font-mono text-sm tracking-widest text-muted-2">
              {item.number}
            </span>
            <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
              {item.title}
            </h3>
            <p className="text-md text-muted-2">{item.desc}</p>
            <ul className="flex flex-col gap-[0.4rem] text-md text-muted-2">
              {item.bullets.map((b) => (
                <li key={b} className="flex items-baseline gap-[0.55rem]">
                  <span
                    aria-hidden
                    className="font-mono font-semibold text-cyan-teal"
                  >
                    +
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-cyan-teal transition-all duration-2 ease-akieni group-hover:gap-[0.85rem]">
              {strings.readMore} <span aria-hidden>→</span>
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
