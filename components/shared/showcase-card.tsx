import { MotionCard } from "@/components/motion/primitives";
import { Tag } from "@/components/shared/tag";
import type { ShowcaseItem } from "@/lib/queries/showcaseItems";

// Stage → dot colour, reusing the existing chip dot + glow pattern.
const STAGE_DOT: Record<string, string> = {
  live: "bg-green shadow-[0_0_0_3px_rgba(56,240,115,0.18)]",
  beta: "bg-cyan-teal shadow-[0_0_0_3px_rgba(18,235,214,0.18)]",
  rnd: "bg-blue shadow-[0_0_0_3px_rgba(15,64,248,0.18)]",
  internal: "bg-muted",
};

function StagePill({
  stage,
  label,
  isDark,
}: Readonly<{ stage: string; label: string; isDark: boolean }>) {
  const dot = STAGE_DOT[stage] ?? "bg-muted";
  const text = isDark ? "text-muted-2" : "text-muted";
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center gap-[0.4rem] font-mono text-[0.7rem] uppercase tracking-[0.14em]",
        text,
      ].join(" ")}
    >
      <span aria-hidden className={["h-1.5 w-1.5 rounded-full", dot].join(" ")} />
      {label}
    </span>
  );
}

function hostnameOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function ShowcaseCard({
  item,
  stageLabel,
  linkLabel,
  surface = "paper",
}: Readonly<{
  item: ShowcaseItem;
  stageLabel: string;
  linkLabel: string;
  surface?: "paper" | "dark";
}>) {
  const isDark = surface === "dark";

  const cardCls = [
    "group relative flex flex-col overflow-hidden border transition-colors duration-2 ease-akieni",
    isDark
      ? "bg-ink-2 border-line text-white hover:border-cyan-teal"
      : "bg-white border-line-light text-black hover:border-black",
  ].join(" ");

  const briefCls = isDark
    ? "text-md leading-relaxed text-muted-2"
    : "text-md leading-relaxed text-muted";
  const footBorderCls = isDark ? "border-line" : "border-line-light";
  const footTextCls = isDark ? "text-muted-2" : "text-muted";

  return (
    <MotionCard className={cardCls}>
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col"
      >
        <div className="flex flex-1 flex-col gap-s4 p-[1.8rem]">
          <StagePill stage={item.stage} label={stageLabel} isDark={isDark} />

          <div className="flex flex-col gap-s3">
            <h3 className="text-[1.6rem] font-bold leading-[1.1] tracking-[-0.02em]">
              {item.title}
            </h3>
            {item.brief && <p className={briefCls}>{item.brief}</p>}
          </div>

          {item.categories.length > 0 && (
            <div className="mt-auto flex flex-wrap gap-[0.4rem]">
              {item.categories.map((c) => (
                <Tag key={c} surface={isDark ? "dark" : "light"}>
                  {c}
                </Tag>
              ))}
            </div>
          )}
        </div>

        <div
          className={[
            "flex items-center justify-between border-t px-[1.8rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em]",
            footBorderCls,
            footTextCls,
          ].join(" ")}
        >
          <span className="truncate">{hostnameOf(item.link)}</span>
          <span className="ml-2 flex shrink-0 items-center gap-[0.35rem] text-cyan-teal transition-transform duration-2 ease-akieni group-hover:translate-x-0.5">
            {linkLabel}
            <span aria-hidden>↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
        </div>
      </a>
    </MotionCard>
  );
}
