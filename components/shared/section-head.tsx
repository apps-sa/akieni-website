import Link from "next/link";
import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

export function SectionHead({
  eyebrow,
  eyebrowAccent = false,
  title,
  lede,
  link,
  variant = "light",
}: Readonly<{
  eyebrow: string;
  eyebrowAccent?: boolean;
  title: ReactNode;
  lede?: string;
  link?: { label: string; href: string };
  variant?: "light" | "dark";
}>) {
  const ledeColor = variant === "dark" ? "text-muted-2" : "text-muted";

  return (
    <header className="mb-s7 grid grid-cols-1 items-end gap-s7 lg:grid-cols-2">
      <div>
        <Eyebrow accent={eyebrowAccent}>{eyebrow}</Eyebrow>
        <h2 className="mt-[0.6rem] text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-none tracking-[-0.03em]">
          {title}
        </h2>
      </div>
      {(lede || link) && (
        <div className={["flex flex-col gap-s3", ledeColor].join(" ")}>
          {lede && (
            <p className={`text-lg leading-normal ${ledeColor} max-w-[60ch]`}>
              {lede}
            </p>
          )}
          {link && (
            <Link
              href={link.href}
              className="inline-flex w-fit items-center gap-2 border-b border-current pb-0.5 text-sm font-semibold uppercase tracking-[0.05em] transition-all duration-2 ease-akieni hover:gap-[0.85rem] hover:text-cyan-teal"
            >
              {link.label}
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
