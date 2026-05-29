import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/app/[lang]/dictionaries";
import { Container } from "./container";

type FooterStrings = Dictionary["footer"];

export function Footer({
  lang,
  strings,
}: Readonly<{ lang: string; strings: FooterStrings }>) {
  const withLang = (href: string) =>
    href.startsWith("/") ? `/${lang}${href === "/" ? "" : href}` : href;

  return (
    <footer className="bg-black text-white pt-s9 pb-s5">
      <Container>
        <div className="grid grid-cols-1 gap-s6 pb-s7 border-b border-line min-[721px]:grid-cols-2 lg:[grid-template-columns:1.4fr_repeat(5,1fr)]">
          <div className="flex flex-col gap-s4">
            <Link
              href={withLang("/")}
              aria-label={strings.ariaBrand}
              className="inline-flex items-center"
            >
              <Image
                src="/images/akieni-logo-white.png"
                alt="Akieni"
                width={600}
                height={113}
                sizes="170px"
                quality={95}
                style={{ height: 32, width: "auto", display: "block" }}
              />
            </Link>
            <p className="text-muted-2 max-w-[30ch]">{strings.tagline}</p>
            <p className="font-mono text-xs tracking-[0.16em] text-muted-2">
              {strings.email}
            </p>
          </div>

          {Object.values(strings.columns).map((col) => (
            <div key={col.heading}>
              <h4 className="font-mono text-xs tracking-[0.16em] uppercase text-muted-2 font-medium mb-4">
                {col.heading}
              </h4>
              <ul className="flex flex-col gap-[0.7rem]">
                {col.items.map((item) => (
                  <li key={`${col.heading}-${item.label}`}>
                    <Link
                      href={withLang(item.href)}
                      className="text-sm text-white/85 transition-colors duration-1 ease-akieni hover:text-cyan-teal hover:opacity-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-s5 flex flex-wrap items-center justify-between gap-s4 text-muted text-sm">
          <div>
            {strings.bottom.copyright.replace(
              "{year}",
              String(new Date().getFullYear()),
            )}
          </div>
          <div className="flex gap-s4">
            {strings.bottom.legal.map((item) => (
              <Link
                key={item.label}
                href={withLang(item.href)}
                className="text-muted-2 transition-colors duration-1 ease-akieni hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-[1rem]">
            {strings.bottom.social.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="text-muted-2 transition-colors duration-1 ease-akieni hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
