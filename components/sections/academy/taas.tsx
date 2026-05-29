import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type TaasStrings = Dictionary["academy"]["taas"];

export function AcademyTaas({
  strings,
}: Readonly<{ strings: TaasStrings }>) {
  return (
    <Section variant="paper">
      <div className="grid grid-cols-1 items-start gap-s7 lg:[grid-template-columns:1fr_2fr]">
        <Eyebrow>{strings.eyebrow}</Eyebrow>
        <blockquote className="text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
          {strings.quoteLine1}
          <em className="not-italic text-cyan-teal">{strings.quoteAccent}</em>
          {strings.quoteLine2}
        </blockquote>
      </div>
    </Section>
  );
}
