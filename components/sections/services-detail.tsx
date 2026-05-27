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
          <article
            key={item.slug}
            className="relative flex flex-col gap-s4 border border-line border-l-[3px] border-l-cyan-teal bg-ink-2 p-[2rem_1.8rem_2.2rem] text-white transition-all duration-2 ease-akieni hover:border-l-green hover:bg-black"
          >
            <div className="flex items-center justify-between gap-s4">
              <span className="font-mono text-sm tracking-widest text-muted-2">
                {item.number}
              </span>
              <Link
                href={`/${lang}/services/${item.slug}`}
                className="group inline-flex items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold uppercase tracking-[0.05em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
              >
                {strings.readMore}
                <span aria-hidden>→</span>
              </Link>
            </div>
            <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
              <Link
                href={`/${lang}/services/${item.slug}`}
                className="transition-colors duration-1 ease-akieni hover:text-cyan-teal"
              >
                {item.title}
              </Link>
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
          </article>
        ))}
      </div>
    </Section>
  );
}
