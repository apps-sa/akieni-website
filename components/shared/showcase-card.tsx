import { MotionCard } from "@/components/motion/primitives";
import { BlurImage } from "@/components/shared/blur-image";
import { PlaceholderMedia } from "@/components/shared/placeholder-media";
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
  surface = "paper",
}: Readonly<{
  item: ShowcaseItem;
  stageLabel: string;
  surface?: "paper" | "dark";
}>) {
  const isDark = surface === "dark";

  const cardCls = [
    "group relative flex flex-col overflow-hidden border transition-colors duration-2 ease-akieni",
    isDark
      ? "bg-ink-2 border-line text-white hover:border-cyan-teal"
      : "bg-white border-line-light text-black hover:border-black",
  ].join(" ");

  const briefCls = isDark ? "text-md text-muted-2" : "text-md text-muted";
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
        {item.image ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <BlurImage
              src={item.image}
              alt={item.mediaLabel ?? item.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <PlaceholderMedia
            aspect="4/3"
            surface={isDark ? "dark" : "light"}
            label={item.mediaLabel ?? item.title}
          />
        )}

        <div className="flex flex-1 flex-col gap-s3 p-[1.6rem_1.6rem_1.8rem]">
          <div className="flex items-start justify-between gap-s4">
            <h3 className="text-2xl font-bold leading-[1.05] tracking-[-0.02em]">
              {item.title}
            </h3>
            <StagePill stage={item.stage} label={stageLabel} isDark={isDark} />
          </div>
          {item.brief && <p className={briefCls}>{item.brief}</p>}
          {item.categories.length > 0 && (
            <div className="flex flex-wrap gap-[0.4rem]">
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
            "flex items-center justify-between border-t px-[1.6rem] py-[1rem] font-mono text-xs uppercase tracking-[0.12em]",
            footBorderCls,
            footTextCls,
          ].join(" ")}
        >
          <span className="truncate">{hostnameOf(item.link)}</span>
          <span
            aria-hidden
            className="ml-2 shrink-0 text-cyan-teal transition-transform duration-2 ease-akieni group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          >
            ↗
          </span>
        </div>
      </a>
    </MotionCard>
  );
}
