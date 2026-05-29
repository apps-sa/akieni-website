import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Section } from "@/components/shared/section";
import { SectionHead } from "@/components/shared/section-head";

type BentoStrings = Dictionary["academy"]["bento"];

const CELL_BASE =
  "flex flex-col gap-[0.8rem] border border-line bg-ink-2 p-[1.8rem] text-white";

export function AcademyBento({
  strings,
}: Readonly<{ strings: BentoStrings }>) {
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
        variant="dark"
      />

      <div className="grid grid-cols-1 gap-s4 min-[901px]:grid-cols-6">
        <div className={[CELL_BASE, "min-[901px]:col-span-4"].join(" ")}>
          <span className="font-mono text-xs tracking-[0.14em] text-cyan-teal">
            {strings.mission.label}
          </span>
          <h3 className="text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1] tracking-[-0.025em]">
            {strings.mission.title}
          </h3>
          <p className="mt-[0.5rem] text-muted-2">{strings.mission.desc}</p>
        </div>

        <div className="flex flex-col gap-[0.8rem] border border-cyan-teal bg-cyan-teal p-[1.8rem] text-black min-[901px]:col-span-2">
          <span className="font-mono text-xs tracking-[0.14em]">
            {strings.highlight.label}
          </span>
          <div className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {strings.highlight.value}
          </div>
          <p className="text-md">{strings.highlight.desc}</p>
        </div>

        {strings.cells.map((cell) => (
          <div
            key={cell.label}
            className={[CELL_BASE, "min-[901px]:col-span-2"].join(" ")}
          >
            <span className="font-mono text-xs tracking-[0.14em] text-muted-2">
              {cell.label}
            </span>
            <div className="text-[clamp(3rem,8vw,6rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              {cell.accent ? (
                <span className="text-cyan-teal">{cell.value}</span>
              ) : (
                cell.value
              )}
            </div>
            <p className="text-muted-2">{cell.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
