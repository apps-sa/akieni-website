import type { ElementType, ReactNode } from "react";

export function Container({
  as,
  className = "",
  children,
}: Readonly<{
  as?: ElementType;
  className?: string;
  children: ReactNode;
}>) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={["mx-auto w-full max-w-page px-gutter", className].join(" ")}
    >
      {children}
    </Tag>
  );
}
