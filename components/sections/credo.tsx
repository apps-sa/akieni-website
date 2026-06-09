import type { Dictionary } from "@/app/[lang]/dictionaries";
import type { CredoData } from "@/lib/queries/home";
import { Eyebrow } from "@/components/shared/eyebrow";
import { Section } from "@/components/shared/section";

type CredoStrings = Dictionary["home"]["credo"];

export function Credo({
  strings,
  data,
}: Readonly<{ strings: CredoStrings; data?: CredoData | null }>) {
  const attribution = data?.attribution ?? strings.attribution;
  const quoteLine1 = data?.quoteLine1 ?? strings.quoteLine1;
  const quoteAccent = data?.quoteAccent ?? strings.quoteAccent;
  const quoteLine2 = data?.quoteLine2 ?? strings.quoteLine2;

  return (
    <Section variant="dark">
      <div className="grid grid-cols-1 items-start gap-s7 lg:grid-cols-[1fr_2fr]">
        <div className="flex flex-col gap-s4">
          <Eyebrow accent>{strings.eyebrow}</Eyebrow>
          <div className="font-mono text-sm text-muted-2">{attribution}</div>
        </div>
        <blockquote className="text-[clamp(1.75rem,3.6vw,3rem)] font-bold leading-[1.1] tracking-[-0.025em]">
          {quoteLine1}{" "}
          <em className="not-italic text-cyan-teal">{quoteAccent}</em>
          {quoteLine2}
        </blockquote>
      </div>
    </Section>
  );
}
