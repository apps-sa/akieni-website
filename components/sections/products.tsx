import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ProductsStrings = Dictionary["home"]["products"];
type ChipVariant = "default" | "green" | "blue";

export function Products({
  lang,
  strings,
}: Readonly<{ lang: string; strings: ProductsStrings }>) {
  return (
    <Section variant="paper">
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
        link={{ label: strings.all, href: `/${lang}/products` }}
      />
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2 lg:grid-cols-3">
        {strings.items.map((item) => (
          <article
            key={item.slug}
            className="relative flex flex-col overflow-hidden border border-line-light bg-white transition-all duration-2 ease-akieni hover:border-black"
          >
            <div className="border-b border-line-light">
              <PlaceholderMedia
                aspect="16/10"
                chip={item.chip}
                chipVariant={item.chipVariant as ChipVariant}
                mark={item.mark}
                label={item.mediaLabel}
              />
            </div>
            <div className="flex flex-1 flex-col gap-s3 p-[1.6rem]">
              <span className="font-mono text-xs uppercase tracking-[0.14em] text-cyan-teal">
                {item.number}
              </span>
              <h3 className="flex items-baseline gap-[0.4rem] text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
                {item.name}
                {item.version && (
                  <small className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-cyan-teal">
                    {item.version}
                  </small>
                )}
              </h3>
              <p className="flex-1 text-md text-muted">{item.desc}</p>
              <ul className="flex flex-col gap-[0.4rem] text-sm text-muted">
                {item.features.map((f) => (
                  <li key={f} className="flex items-baseline gap-[0.55rem]">
                    <span
                      aria-hidden
                      className="font-mono font-semibold text-cyan-teal"
                    >
                      +
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-between border-t border-line-light px-[1.6rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em] text-muted">
              <Link
                href={`/${lang}/products/${item.slug}`}
                className="transition-colors duration-1 ease-akieni hover:text-cyan-teal"
              >
                {item.learnMore}
              </Link>
              <span>{item.model}</span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
