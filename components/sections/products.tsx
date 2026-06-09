import { BlurImage } from "@/components/shared/blur-image";
import Link from "next/link";
import { MotionCard } from "@/components/motion/primitives";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type ChipVariant = "default" | "green" | "blue";

export type ProductsStrings = {
  eyebrow: string;
  titleLine1: string;
  titleLine2: string;
  lede: string;
  items: ReadonlyArray<{
    slug: string;
    number: string;
    name: string;
    version: string;
    desc: string;
    features: ReadonlyArray<string>;
    model: string;
    chip: string;
    chipVariant: string;
    mark: string;
    mediaLabel: string;
    image?: string;
    imageUrl?: string | null;
    learnMore: string;
  }>;
};

export function Products({
  lang,
  strings,
  surface = "light",
  link,
}: Readonly<{
  lang: string;
  strings: ProductsStrings;
  surface?: "light" | "dark";
  link?: { label: string; href: string };
}>) {
  const isDark = surface === "dark";

  const sectionVariant = isDark ? "dark" : "paper";
  const cardCls = isDark
    ? "border-line bg-ink-2 text-white"
    : "border-line-light bg-white";
  const descCls = isDark ? "text-md text-muted-2" : "text-md text-muted";
  const featCls = isDark ? "text-sm text-muted-2" : "text-sm text-muted";
  const footBorder = isDark ? "border-line" : "border-line-light";
  const footText = isDark ? "text-muted-2" : "text-muted";

  return (
    <Section variant={sectionVariant}>
      <SectionHead
        eyebrow={strings.eyebrow}
        eyebrowAccent={isDark}
        title={
          <>
            {strings.titleLine1}
            <br />
            {strings.titleLine2}
          </>
        }
        lede={strings.lede}
        link={link}
        variant={isDark ? "dark" : "light"}
      />
      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2 lg:grid-cols-3">
        {strings.items.map((item) => (
          <MotionCard
            key={item.slug}
            className={[
              "relative flex flex-col overflow-hidden border transition-colors duration-2 ease-akieni",
              cardCls,
            ].join(" ")}
          >
            <div
              className={["relative border-b overflow-hidden", footBorder].join(
                " ",
              )}
            >
              {(item.imageUrl ?? item.image) ? (
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <BlurImage
                    src={(item.imageUrl ?? item.image)!}
                    alt={item.mediaLabel}
                    fill
                    className="object-cover"
                    sizes="(max-width: 720px) 100vw, 33vw"
                  />
                  {item.chip && (
                    <span className="absolute left-4 top-4 inline-flex items-center gap-[0.4rem] border border-white/[0.18] bg-black/35 px-[0.55rem] py-[0.35rem] font-mono text-xs uppercase tracking-[0.14em] text-white backdrop-blur-[6px]">
                      <span
                        aria-hidden
                        className={[
                          "h-1.5 w-1.5 rounded-full",
                          item.chipVariant === "green"
                            ? "bg-green shadow-[0_0_0_3px_rgba(56,240,115,0.18)]"
                            : item.chipVariant === "blue"
                              ? "bg-blue shadow-[0_0_0_3px_rgba(15,64,248,0.18)]"
                              : "bg-cyan-teal shadow-[0_0_0_3px_rgba(18,235,214,0.18)]",
                        ].join(" ")}
                      />
                      {item.chip}
                    </span>
                  )}
                </div>
              ) : (
                <PlaceholderMedia
                  aspect="16/10"
                  chip={item.chip}
                  chipVariant={item.chipVariant as ChipVariant}
                  mark={item.mark}
                  label={item.mediaLabel}
                />
              )}
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
              <p className={["flex-1", descCls].join(" ")}>{item.desc}</p>
              <ul className={["flex flex-col gap-[0.4rem]", featCls].join(" ")}>
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
            <div
              className={[
                "flex items-center justify-between border-t px-[1.6rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em]",
                footBorder,
                footText,
              ].join(" ")}
            >
              <Link
                href={`/${lang}/products/${item.slug}`}
                className="transition-colors duration-1 ease-akieni hover:text-cyan-teal"
              >
                {item.learnMore}
              </Link>
              <span>{item.model}</span>
            </div>
          </MotionCard>
        ))}
      </div>
    </Section>
  );
}
