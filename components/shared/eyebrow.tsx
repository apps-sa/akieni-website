import type { ReactNode } from "react";

export function Eyebrow({
  children,
  accent = false,
  className = "",
}: Readonly<{
  children: ReactNode;
  accent?: boolean;
  className?: string;
}>) {
  return (
    <span
      className={[
        "inline-flex items-center gap-[0.6rem] font-mono text-xs font-medium uppercase tracking-[0.14em]",
        "before:block before:h-px before:w-[18px] before:bg-current before:opacity-60",
        accent ? "text-cyan-teal" : "text-muted",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
