# Akieni Website

Digital transformation for Africa.
Brazzaville, Republic of Congo · `CONTACT@AKIENI.TECH`

This repository is the Next.js 16 implementation of the Akieni public website — a port of the legacy static HTML site (`Akieni Website/`) into a modern, statically-rendered, fully internationalized App Router project.

The site presents Akieni's four practices (Digital Transformation, Software Development, Integration, Consulting & PM), three flagship national-scale programmes (SFEC, CAMU, CNSS), three products (AkieniPay, CarTracking, Biometrie), the Academy, careers, and standard legal pages.

---

## Stack

- **Next.js** 16.2.6 — App Router, statically rendered (`generateStaticParams`)
- **React** 19.2.4
- **TypeScript** 5 (strict)
- **Tailwind CSS** 4 — design tokens defined as a `@theme` block in [`app/globals.css`](app/globals.css), mirroring the legacy `variables.css` 1:1
- **i18n** — locale-prefixed routing (`/en`, `/fr`) via the `[lang]` dynamic segment, JSON dictionaries under [`app/[lang]/dictionaries/`](app/%5Blang%5D/dictionaries), `Dictionary` type derived from `en.json` so every key is type-checked
- **Locale negotiation** — Next 16 [`proxy.ts`](proxy.ts) redirects locale-less requests using `NEXT_LOCALE` cookie or `Accept-Language`
- **Fonts** — system fallback chain matching the legacy site (`Neue Haas Grotesk Text Pro` → `Helvetica Neue` → `Helvetica` → system; `JetBrains Mono` → `IBM Plex Mono` → `ui-monospace` for mono)
- **Package manager** — pnpm
- **Lint / format** — ESLint 9 (`next/core-web-vitals` + TS), Prettier 3 with `prettier-plugin-tailwindcss`

> ⚠️ This is **Next.js 16** — APIs differ from earlier versions. Read the relevant guide in `node_modules/next/dist/docs/` before adding routes, layouts, middleware, or metadata. See [`AGENTS.md`](AGENTS.md) and [`CLAUDE.md`](CLAUDE.md).

## Commands

```bash
pnpm install      # one-time
pnpm dev          # start the dev server → http://localhost:3000
pnpm build        # production build (static export of /en and /fr)
pnpm start        # run the production build
pnpm lint         # ESLint
```

Visiting `/` redirects to `/en` (or `/fr` if your browser prefers French).

## Directory layout

```
akieni-website/
├── app/
│   ├── globals.css                 # Tailwind 4 @theme + base layer + reveal animation tokens
│   ├── favicon.ico
│   └── [lang]/                     # Locale segment — only routing root
│       ├── layout.tsx              # <html lang>, Header, MobileMenu, Footer
│       ├── page.tsx                # Home (placeholder pending the index.html port)
│       ├── dictionaries.ts         # server-only getDictionary + Dictionary type
│       └── dictionaries/
│           ├── en.json             # Source of truth for the Dictionary type
│           └── fr.json             # Must match en.json's shape (TS-enforced)
├── components/
│   ├── shared/
│   │   ├── container.tsx           # max-w-page + px-gutter wrapper (legacy .container)
│   │   ├── header.tsx              # Fixed nav, scroll-state, light variant detection
│   │   ├── mobile-menu.tsx         # Full-screen overlay, hamburger morph, fade animation
│   │   ├── language-switcher.tsx   # EN | FR pill, router.replace, cookie persistence
│   │   └── footer.tsx              # 5-column link grid, social row, dynamic copyright year
│   └── ui/                         # (reserved — empty)
├── public/
│   ├── images/                     # Brand logos (akieni-logo.png, akieni-logo-white.png, ...)
│   └── uploads/                    # Editorial content images
├── proxy.ts                        # Next 16 middleware (locale negotiation + redirect)
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
└── tsconfig.json
```

## Routing model

```
/                                   → proxy redirect → /<preferred-locale>
/{en|fr}                            → home
/{en|fr}/about                      → company story
/{en|fr}/services                   → services overview
/{en|fr}/services/digital-transformation
/{en|fr}/services/software-development
/{en|fr}/services/integration
/{en|fr}/services/consulting
/{en|fr}/products                   → products overview
/{en|fr}/products/akienipay
/{en|fr}/products/cartracking
/{en|fr}/products/biometrie
/{en|fr}/projects                   → flagship programmes overview
/{en|fr}/projects/sfec              → fiscal infrastructure (Ministry of Finance · DGID)
/{en|fr}/projects/camu              → universal health coverage
/{en|fr}/projects/cnss              → social security (GED + biometrics + ePayment)
/{en|fr}/team
/{en|fr}/academy
/{en|fr}/careers
/{en|fr}/careers/[roleId]           → individual job posting
/{en|fr}/contact
/{en|fr}/privacy
/{en|fr}/terms
/{en|fr}/cookies
```

The four pages with a light hero (`/contact`, `/privacy`, `/terms`, `/cookies`) get the `nav--light` variant automatically — Header reads `usePathname()` and flips text color + logo `invert()`.

## Design system

All visual tokens live in [`app/globals.css`](app/globals.css):

- **Palette** — `black`, `off-black`, `ink`, `ink-2`, `line`, `line-light`, `white`, `paper`, `muted`, `muted-2`. Accents: `cyan-teal` (primary), `green` (positive), `blue` (informational).
- **Typography** — fluid scale from `--text-xs` (12px) to `--text-display` (`clamp(3.5rem, 10vw, 9rem)`); mono utility for technical labels.
- **Spacing** — named steps `--spacing-s1` through `--spacing-s10` plus `--spacing-gutter`, `--spacing-nav-h`, `--spacing-section-y`.
- **Layout** — `--container-page: 1360px` → `max-w-page` utility.
- **Motion** — `--ease-akieni: cubic-bezier(0.2, 0.7, 0.1, 1)`, durations `--duration-1` / `-2` / `-3` (180 / 320 / 600 ms).

Tokens are duplicated into both `:root` (for raw `var(--cyan-teal)` references where useful) and `@theme inline { ... }` (for Tailwind utilities like `bg-cyan-teal`, `text-display`, `py-section-y`, `ease-akieni`).

The `:has(...)` selector pattern is used in a couple of places (e.g., locking page scroll when the mobile menu is open). Targets modern browsers (Chrome / Edge ≥ 105, Safari ≥ 15.4, Firefox ≥ 121).

## Internationalization

Two locales are live: **English** (default) and **French**.

### Adding a translatable string

1. Add the key under the relevant section in [`app/[lang]/dictionaries/en.json`](app/%5Blang%5D/dictionaries/en.json).
2. Add the matching French value in [`app/[lang]/dictionaries/fr.json`](app/%5Blang%5D/dictionaries/fr.json) — the build fails if anything is missing.
3. In a Server Component (layout / page), call `getDictionary(lang)` and read from it.
4. In a Client Component, pass the relevant slice down as a `strings` prop (see [`header.tsx`](components/shared/header.tsx)).

`href`s stay in the dictionary alongside their labels (see `footer.columns`), which keeps the link table type-safe and lets one render loop produce every column.

### Adding a new locale (e.g. `pt`)

1. Drop `pt.json` next to `en.json` with the same key shape.
2. Add `pt` to the loader map in [`dictionaries.ts`](app/%5Blang%5D/dictionaries.ts).
3. Add `pt` to `LOCALES` in [`proxy.ts`](proxy.ts).
4. Add `pt` to the visible buttons in [`language-switcher.tsx`](components/shared/language-switcher.tsx).

That's the whole pipeline.

## Migration map — legacy → Next 16

| Legacy (`Akieni Website/`)          | This project                                                   |
| ----------------------------------- | -------------------------------------------------------------- |
| `index.html`, `about.html`, ...     | `app/[lang]/{home, about, ...}/page.tsx`                       |
| `assets/css/variables.css`          | `:root { ... }` block in `app/globals.css`                     |
| `assets/css/main.css`               | Tailwind utilities on JSX (read for spacing/colors only)       |
| `assets/js/main.js` — nav scroll    | `useEffect` in [`header.tsx`](components/shared/header.tsx)    |
| `assets/js/main.js` — mobile menu   | [`mobile-menu.tsx`](components/shared/mobile-menu.tsx)         |
| `assets/js/main.js` — lang switch   | [`language-switcher.tsx`](components/shared/language-switcher.tsx) + dictionaries |
| `assets/js/main.js` — reveal/stats  | (pending — `data-reveal` styles already wired in `globals.css`)|
| `assets/img/`                       | `public/images/`                                               |
| `uploads/`                          | `public/uploads/`                                              |
| `data-fr="..."` runtime swap        | Dictionary lookup at SSG time per locale                       |

## Status

The shared chrome (Header + MobileMenu + Footer + LanguageSwitcher + i18n plumbing) is complete. Page ports are in progress — each legacy `.html` is being rewritten as an idiomatic Server Component under `app/[lang]/`.

## License

© Akieni. All rights reserved.
