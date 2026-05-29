import type { ReactNode } from "react";

type Variant = "default" | "accent" | "solid" | "status";
type Surface = "light" | "dark";

export function Tag({
  children,
  variant = "default",
  surface = "light",
  className = "",
}: Readonly<{
  children: ReactNode;
  variant?: Variant;
  surface?: Surface;
  className?: string;
}>) {
  const base =
    "inline-flex items-center gap-[0.4rem] px-[0.6rem] py-[0.3rem] font-mono text-[0.7rem] uppercase tracking-[0.1em]";

  const variantCls: Record<Variant, string> = {
    default:
      surface === "dark"
        ? "border border-line text-muted-2 bg-transparent"
        : "border border-line-light text-muted bg-transparent",
    accent: "border border-cyan-teal text-cyan-teal bg-transparent",
    solid: "border border-cyan-teal bg-cyan-teal text-black",
    status:
      (surface === "dark"
        ? "border border-line text-muted-2 "
        : "border border-line-light text-muted ") +
      "bg-transparent",
  };

  return (
    <span className={[base, variantCls[variant], className].join(" ")}>
      {variant === "status" && (
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full bg-green shadow-[0_0_0_3px_rgba(56,240,115,0.18)]"
        />
      )}
      {children}
    </span>
  );
}
