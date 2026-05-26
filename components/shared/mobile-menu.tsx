"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { LanguageSwitcher } from "./language-switcher";

type HeaderStrings = Dictionary["header"];

const NAV_ITEMS: ReadonlyArray<{
  href: string;
  key: keyof HeaderStrings["nav"];
}> = [
  { href: "/", key: "home" },
  { href: "/services", key: "services" },
  { href: "/products", key: "products" },
  { href: "/projects", key: "projects" },
  { href: "/about", key: "about" },
  { href: "/academy", key: "academy" },
  { href: "/careers", key: "careers" },
  { href: "/contact", key: "contact" },
];

function getLang(pathname: string): string {
  const m = /^\/(en|fr)(?:\/|$)/.exec(pathname);
  return m?.[1] ?? "en";
}

export function MobileMenu({
  strings,
}: Readonly<{ strings: HeaderStrings }>) {
  const pathname = usePathname() ?? "/";
  const lang = getLang(pathname);
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      document.body.classList.remove("menu-open");
      return;
    }
    document.body.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("menu-open");
    };
  }, [open, close]);

  const withLang = (href: string) =>
    href === "/" ? `/${lang}` : `/${lang}${href}`;

  return (
    <>
      <button
        type="button"
        aria-label={open ? strings.ariaCloseMenu : strings.ariaOpenMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        style={{
          top: "calc((var(--nav-h) - 40px) / 2)",
          right: "var(--gutter)",
        }}
        className="fixed z-70 flex h-10 w-11 items-center justify-center border border-current text-white transition-colors duration-1 ease-akieni lg:hidden"
      >
        <span
          className={[
            "relative block h-px w-[18px] transition-colors duration-1 ease-akieni",
            open ? "bg-transparent" : "bg-current",
          ].join(" ")}
        >
          <span
            className={[
              "absolute left-0 right-0 h-px bg-current transition-all duration-2 ease-akieni",
              open ? "top-0 rotate-45" : "-top-1.5",
            ].join(" ")}
          />
          <span
            className={[
              "absolute left-0 right-0 h-px bg-current transition-all duration-2 ease-akieni",
              open ? "top-0 -rotate-45" : "top-1.5",
            ].join(" ")}
          />
        </span>
      </button>

      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        data-state={open ? "open" : "closed"}
        className={[
          "fixed inset-0 z-60 flex-col overflow-y-auto bg-black text-white px-gutter pb-s6",
          "pt-[calc(var(--nav-h)+1.5rem)]",
          open ? "flex" : "hidden",
        ].join(" ")}
      >
        <nav className="flex flex-col" aria-label={strings.ariaPrimary}>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={withLang(item.href)}
              onClick={close}
              className="group flex items-center justify-between border-b border-line py-s3 text-2xl font-bold tracking-[-0.02em] transition-colors duration-1 ease-akieni hover:text-cyan-teal"
            >
              {strings.nav[item.key]}
              <span
                aria-hidden
                className="font-mono text-sm font-normal tracking-normal text-muted-2 opacity-0 -translate-x-1.5 transition-all duration-2 ease-akieni group-hover:translate-x-0 group-hover:text-cyan-teal group-hover:opacity-100 group-focus:translate-x-0 group-focus:text-cyan-teal group-focus:opacity-100"
              >
                →
              </span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-s4 pt-s6">
          <div className="flex items-center justify-between gap-s3 font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
            <span>Brazzaville · Republic of Congo</span>
            <span>EST. 2023</span>
          </div>
          <div className="flex items-center justify-between gap-s3 font-mono text-xs uppercase tracking-[0.16em] text-muted-2">
            <span>{lang === "fr" ? "Langue" : "Language"}</span>
            <LanguageSwitcher size="md" className="text-white" />
          </div>
          <Link
            href={withLang("/contact")}
            onClick={close}
            className="inline-flex items-center justify-center gap-2 bg-cyan-teal px-[1.2rem] py-[1rem] text-sm font-semibold uppercase tracking-[0.02em] text-black"
          >
            {strings.cta} <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
