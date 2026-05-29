import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type IsoStrings = Dictionary["about"]["iso"];

function IsoCol({
  heading,
  items,
  variant,
}: Readonly<{
  heading: string;
  items: ReadonlyArray<string>;
  variant: "is" | "isNot";
}>) {
  const isNot = variant === "isNot";
  return (
    <div className="flex flex-col gap-s3 p-8 min-[721px]:[&:not(:first-child)]:border-l border-line-light">
      <p className="mb-2 font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {heading}
      </p>
      <ul className="flex flex-col gap-[0.6rem]">
        {items.map((item) => (
          <li
            key={item}
            className={[
              "flex items-baseline gap-[0.6rem] text-lg font-semibold",
              isNot ? "text-muted line-through decoration-black/20" : "",
            ].join(" ")}
          >
            <span
              aria-hidden
              className={[
                "block h-2 w-2 flex-none",
                isNot
                  ? "border border-muted-2 bg-line-light"
                  : "bg-green",
              ].join(" ")}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutIso({
  strings,
}: Readonly<{ strings: IsoStrings }>) {
  return (
    <Section variant="paper" flushTop>
      <SectionHead
        eyebrow={strings.eyebrow}
        title={strings.title}
        lede={strings.lede}
      />
      <div className="grid grid-cols-1 border border-line-light min-[721px]:grid-cols-2">
        <IsoCol
          heading={strings.is.heading}
          items={strings.is.items}
          variant="is"
        />
        <IsoCol
          heading={strings.isNot.heading}
          items={strings.isNot.items}
          variant="isNot"
        />
      </div>
    </Section>
  );
}
