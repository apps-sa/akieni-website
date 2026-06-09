import { NextResponse, type NextRequest } from "next/server";

const LOCALES = ["en", "fr"] as const;
const DEFAULT_LOCALE = "en";
const COOKIE = "NEXT_LOCALE";

type Locale = (typeof LOCALES)[number];

function pickLocale(req: NextRequest): Locale {
  const fromCookie = req.cookies.get(COOKIE)?.value;
  if (fromCookie && (LOCALES as readonly string[]).includes(fromCookie)) {
    return fromCookie as Locale;
  }
  const accept = req.headers.get("accept-language") ?? "";
  const wantsFrench = accept
    .split(",")
    .some((part) => part.trim().toLowerCase().startsWith("fr"));
  return wantsFrench ? "fr" : DEFAULT_LOCALE;
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const hasLocale = LOCALES.some(
    (l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`),
  );
  if (hasLocale) return;

  const locale = pickLocale(req);
  req.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  // Exclude: _next assets, studio, api, files with extensions, and special Next.js paths
  matcher: ["/((?!_next|studio|api|favicon\\.ico|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|.*\\..*).*)" ],
};
