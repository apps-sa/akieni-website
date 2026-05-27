import type { ReactNode } from "react";

type ChipVariant = "default" | "green" | "blue";

const CHIP_DOT: Record<ChipVariant, string> = {
  default: "bg-cyan-teal shadow-[0_0_0_3px_rgba(18,235,214,0.18)]",
  green: "bg-green shadow-[0_0_0_3px_rgba(56,240,115,0.18)]",
  blue: "bg-blue shadow-[0_0_0_3px_rgba(15,64,248,0.18)]",
};

export function PlaceholderMedia({
  label,
  chip,
  chipVariant = "default",
  mark,
  aspect = "16/10",
  className = "",
}: Readonly<{
  label?: string;
  chip?: string;
  chipVariant?: ChipVariant;
  mark?: ReactNode;
  aspect?: string;
  className?: string;
}>) {
  return (
    <div
      style={{ aspectRatio: aspect }}
      className={[
        "relative flex w-full items-center justify-center overflow-hidden",
        "[background:repeating-linear-gradient(135deg,rgba(255,255,255,0.05)_0_6px,rgba(255,255,255,0.02)_6px_14px),linear-gradient(180deg,#1a1a19,#0c0c0b)]",
        className,
      ].join(" ")}
    >
      {chip && (
        <span className="absolute left-4 top-4 inline-flex items-center gap-[0.4rem] border border-white/[0.18] bg-black/35 px-[0.55rem] py-[0.35rem] font-mono text-xs uppercase tracking-[0.14em] text-white backdrop-blur-[6px]">
          <span
            aria-hidden
            className={["h-1.5 w-1.5 rounded-full", CHIP_DOT[chipVariant]].join(
              " ",
            )}
          />
          {chip}
        </span>
      )}
      {mark && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex select-none items-center justify-center font-mono text-[clamp(2.4rem,6vw,4rem)] font-bold tracking-[-0.04em] text-white/[0.08]"
        >
          {mark}
        </span>
      )}
      {label && (
        <span className="relative inline-block border border-white/[0.18] bg-black/35 px-[0.7rem] py-[0.4rem] font-mono text-[0.7rem] uppercase tracking-[0.16em] text-white/55 backdrop-blur-[6px]">
          {label}
        </span>
      )}
    </div>
  );
}
