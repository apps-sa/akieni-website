import type { ReactNode } from "react";
import { Container } from "./container";

type Variant = "default" | "paper" | "dark" | "ink";

const VARIANT_CLS: Record<Variant, string> = {
  default: "",
  paper: "bg-paper text-black",
  dark: "bg-black text-white",
  ink: "bg-ink text-white",
};

export function Section({
  variant = "default",
  flushTop = false,
  flushBot = false,
  id,
  className = "",
  innerClassName = "",
  children,
}: Readonly<{
  variant?: Variant;
  flushTop?: boolean;
  flushBot?: boolean;
  id?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}>) {
  return (
    <section
      id={id}
      data-variant={variant}
      className={[
        "py-section-y",
        flushTop ? "pt-0" : "",
        flushBot ? "pb-0" : "",
        VARIANT_CLS[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <Container className={innerClassName}>{children}</Container>
    </section>
  );
}
