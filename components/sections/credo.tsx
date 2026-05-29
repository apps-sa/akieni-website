import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type CredoStrings = Dictionary["home"]["credo"];

export function Credo({
  strings,
}: Readonly<{ strings: CredoStrings }>) {
  return (
    <Section variant="dark">
      <div className="grid grid-cols-1 items-start gap-s7 lg:[grid-template-columns:1fr_2fr]">
        <div className="flex flex-col gap-s4">
          <Eyebrow accent>{strings.eyebrow}</Eyebrow>
          <div className="font-mono text-sm text-muted-2">
            {strings.attribution}
          </div>
        </div>
        <blockquote className="text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
          {strings.quoteLine1}{" "}
          <em className="not-italic text-cyan-teal">{strings.quoteAccent}</em>
          {strings.quoteLine2}
        </blockquote>
      </div>
    </Section>
  );
}
