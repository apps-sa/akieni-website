import type { ReactNode } from "react";

export function Badge({
  children,
  surface = "light",
  className = "",
}: Readonly<{
  children: ReactNode;
  surface?: "light" | "dark";
  className?: string;
}>) {
  return (
    <span
      className={[
        "inline-flex items-center gap-2 border px-[0.9rem] py-[0.55rem] font-mono text-sm tracking-[0.04em]",
        "before:block before:h-1.5 before:w-1.5 before:rounded-full before:bg-cyan-teal",
        surface === "dark"
          ? "border-line bg-ink-2 text-white"
          : "border-line-light bg-white text-ink",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
