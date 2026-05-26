"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

const LOCALES = ["en", "fr"] as const;
type Locale = (typeof LOCALES)[number];

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function swapLocale(pathname: string, target: Locale): string {
  const segments = pathname.split("/");
  if (segments[1] && isLocale(segments[1])) {
    segments[1] = target;
    return segments.join("/") || "/";
  }
  return `/${target}${pathname === "/" ? "" : pathname}`;
}

function persistLocale(target: Locale): void {
  const maxAge = 60 * 60 * 24 * 365;
  document.cookie = `NEXT_LOCALE=${target}; path=/; max-age=${maxAge}; samesite=lax`;
}

export function LanguageSwitcher({
  size = "sm",
  className = "",
}: Readonly<{
  readonly size?: "sm" | "md";
  readonly className?: string;
}>) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const [, startTransition] = useTransition();

  const current: Locale = (() => {
    const seg = pathname.split("/")[1];
    return seg && isLocale(seg) ? seg : "en";
  })();

  const onSelect = (target: Locale) => {
    if (target === current) return;
    persistLocale(target);
    startTransition(() => {
      router.replace(swapLocale(pathname, target));
      router.refresh();
    });
  };

  const heightCls = size === "md" ? "h-[38px] text-sm" : "h-8 text-xs";

  return (
    <div
      className={[
        "inline-flex items-center overflow-hidden border border-current font-mono uppercase tracking-[0.14em]",
        heightCls,
        className,
      ].join(" ")}
    >
      {LOCALES.map((l, i) => {
        const active = l === current;
        return (
          <button
            key={l}
            type="button"
            aria-pressed={active}
            aria-label={`Switch language to ${l.toUpperCase()}`}
            onClick={() => onSelect(l)}
            className={[
              "h-full px-[0.65rem] transition-all duration-1 ease-akieni cursor-pointer",
              i > 0 ? "border-l border-current" : "",
              active
                ? "bg-cyan-teal text-black opacity-100"
                : "opacity-60 hover:opacity-100",
            ].join(" ")}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
