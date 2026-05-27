import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Counter } from "@/components/shared/counter";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type StatsStrings = Dictionary["home"]["stats"];

export function Stats({
  strings,
}: Readonly<{ strings: StatsStrings }>) {
  return (
    <Section variant="paper">
      <div className="mb-s7 flex flex-wrap items-end justify-between gap-s4">
        <h2 className="max-w-[18ch] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
          {strings.title}
        </h2>
        <Eyebrow>{strings.eyebrow}</Eyebrow>
      </div>
      <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
        {strings.items.map((item, i) => {
          const isLastCol = (i + 1) % 4 === 0;
          return (
            <div
              key={item.label}
              className={[
                "flex flex-col gap-s2 p-[2.5rem_1.6rem]",
                "border-line-light",
                // Right border between columns (light surface)
                "lg:border-r",
                isLastCol ? "lg:border-r-0" : "",
                // Row separator on 2-col layout
                "border-b min-[721px]:border-b lg:border-b-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <div className="text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-[-0.04em]">
                <Counter target={item.value} suffix={item.suffix} />
                {item.accent && (
                  <span className="text-cyan-teal"> {item.accent}</span>
                )}
              </div>
              <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
