"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Container } from "./container";
import { LanguageSwitcher } from "./language-switcher";

const LIGHT_VARIANT_PATHS = ["/contact", "/privacy", "/terms", "/cookies"];

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
];

function stripLocale(pathname: string): { lang: string; rest: string } {
  const m = /^\/(en|fr)(\/.*)?$/.exec(pathname);
  if (!m) return { lang: "en", rest: pathname || "/" };
  return { lang: m[1], rest: m[2] || "/" };
}

function isActive(rest: string, href: string): boolean {
  if (href === "/") return rest === "/";
  return rest === href || rest.startsWith(`${href}/`);
}

export function Header({
  strings,
}: Readonly<{
  strings: HeaderStrings;
}>) {
  const pathname = usePathname() ?? "/";
  const { lang, rest } = stripLocale(pathname);
  const isLight = LIGHT_VARIANT_PATHS.some(
    (p) => rest === p || rest.startsWith(`${p}/`),
  );

  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const update = () => setSolid(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const withLang = (href: string) =>
    href === "/" ? `/${lang}` : `/${lang}${href}`;

  const baseColor = isLight ? "text-black" : "text-white";
  const solidBg = isLight
    ? "bg-white/90 border-line-light"
    : "bg-black/85 border-line";

  return (
    <header
      data-nav
      data-solid={solid}
      className={[
        "fixed inset-x-0 top-0 z-50 h-nav-h border-b border-transparent transition-all duration-2 ease-akieni",
        baseColor,
        solid ? `${solidBg} backdrop-blur-md` : "bg-transparent",
      ].join(" ")}
    >
      <Container className="flex h-full items-center justify-between gap-s5">
        <Link
          href={withLang("/")}
          aria-label={strings.ariaBrand}
          className="inline-flex items-center gap-[0.6rem] font-bold tracking-[-0.02em]"
        >
          <Image
            src="/images/akieni-logo-white.png"
            alt="Akieni"
            width={600}
            height={113}
            priority
            sizes="170px"
            quality={95}
            style={{ height: 32, width: "auto", display: "block" }}
            className={isLight ? "invert" : ""}
          />
        </Link>

        <nav
          className="hidden items-center gap-s6 lg:flex"
          aria-label={strings.ariaPrimary}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(rest, item.href);
            return (
              <Link
                key={item.href}
                href={withLang(item.href)}
                className={[
                  "relative py-1.5 text-sm font-medium tracking-[0.01em] transition-opacity duration-1 ease-akieni hover:text-cyan-teal",
                  active
                    ? "opacity-100 after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:bg-cyan-teal"
                    : "opacity-85 hover:opacity-100",
                ].join(" ")}
              >
                {strings.nav[item.key]}
              </Link>
            );
          })}

          <LanguageSwitcher size="sm" className="ml-s3" />

          <Link
            href={withLang("/contact")}
            className="ml-s3 inline-flex items-center gap-[0.65rem] border border-current px-[1.4rem] py-[0.95rem] text-sm font-semibold uppercase tracking-[0.02em] transition-all duration-2 ease-akieni hover:border-white hover:bg-white hover:text-black"
          >
            {strings.cta}{" "}
            <span
              aria-hidden
              className="transition-transform duration-2 ease-akieni"
            >
              →
            </span>
          </Link>
        </nav>

      </Container>
    </header>
  );
}
