import Link from "next/link";
import { FeatureGrid } from "@/components/shared/feature-grid";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
import { Section } from "@/components/shared/section";

export type ProductDetailProps = {
  slug: string;
  variant: "paper" | "dark";
  mediaSide: "left" | "right";
  number: string;
  titleAccent: string;
  lede: string;
  features: ReadonlyArray<{ key: string; value: string }>;
  ctaLabel: string;
  ctaHref: string;
  mock: { chip: string; mark: string; label: string };
};

export function ProductDetail({
  slug,
  variant,
  mediaSide,
  number,
  titleAccent,
  lede,
  features,
  ctaLabel,
  ctaHref,
  mock,
}: Readonly<ProductDetailProps>) {
  const ledeColor = variant === "dark" ? "text-muted-2" : "text-muted";
  return (
    <Section id={slug} variant={variant}>
      <div className="grid items-start gap-s7 max-[980px]:grid-cols-1 max-[980px]:gap-s6 lg:[grid-template-columns:1.05fr_1fr]">
        <div
          className={[
            "flex flex-col gap-s4",
            mediaSide === "left" ? "lg:order-2" : "lg:order-1",
          ].join(" ")}
        >
          <h2 className="text-[clamp(2.6rem,6vw,4.4rem)] font-bold leading-none tracking-[-0.035em]">
            <small className="mb-[0.8rem] block font-mono text-sm font-medium uppercase tracking-[0.16em] text-cyan-teal">
              {number}
            </small>
            {titleAccent}
          </h2>
          <p className={["text-lg max-w-[50ch]", ledeColor].join(" ")}>
            {lede}
          </p>
          <FeatureGrid
            items={features}
            surface={variant === "dark" ? "dark" : "light"}
          />
          <Link
            href={ctaHref}
            className="mt-s4 inline-flex w-fit items-center gap-2 border-b border-cyan-teal pb-0.5 font-mono text-sm uppercase tracking-[0.14em] text-cyan-teal transition-all duration-2 ease-akieni hover:gap-[0.85rem]"
          >
            {ctaLabel}
          </Link>
        </div>
        <div
          className={mediaSide === "left" ? "lg:order-1" : "lg:order-2"}
        >
          <PlaceholderMedia
            aspect="4/3"
            chip={mock.chip}
            mark={mock.mark}
            label={mock.label}
            labelPosition="bottom-right"
          />
        </div>
      </div>
    </Section>
  );
}
