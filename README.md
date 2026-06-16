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

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` and fill in the values. Variables prefixed `NEXT_PUBLIC_*` are inlined into the client bundle at build time (rebuild after changing them); all others are **server-only** and must never be exposed to the browser.

> ⚠️ **`SUPABASE_SERVICE_ROLE_KEY`, `DATABASE_URL`, `SMTP_PASS`, `GOOGLE_CLIENT_SECRET`, and `BETTER_AUTH_SECRET` are secrets.** Keep them in `.env.local` (gitignored) only. Never give any of them the `NEXT_PUBLIC_` prefix.

### Site / SEO

| Variable                               | Required | Purpose                                                                                                          |
| -------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`                 | No       | Canonical production origin (no trailing slash). Used for canonical URLs, sitemap, robots, OpenGraph, JSON-LD. Defaults to `https://www.akieni.com`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | No       | Google Search Console ownership-verification token. Renders `<meta name="google-site-verification">`.           |
| `NEXT_PUBLIC_BING_SITE_VERIFICATION`   | No       | Bing Webmaster Tools ownership-verification token. Renders `<meta name="msvalidate.01">`.                       |

### Sanity CMS (editorial content)

| Variable                        | Required | Purpose                                                                                          |
| ------------------------------- | -------- | ------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | **Yes**  | Sanity project ID. The site throws `Configuration must contain projectId` without it.            |
| `NEXT_PUBLIC_SANITY_DATASET`    | **Yes**  | Sanity dataset name (e.g. `development` / `production`). Defaults to `production` if unset.       |
| `SANITY_API_WRITE_TOKEN`        | No       | Editor token used **only** by `pnpm seed` (`scripts/seed-sanity.ts`). Not needed to run the site. Mint at sanity.io/manage → API → Tokens. |

### Supabase (form submissions + admin dashboard)

| Variable                     | Required | Purpose                                                                                                                                   |
| ---------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`   | **Yes**  | Supabase project URL, e.g. `https://xxxx.supabase.co`.                                                                                     |
| `SUPABASE_SERVICE_ROLE_KEY`  | **Yes**  | **service_role** secret (Project Settings → API). Bypasses RLS for server inserts/reads/signed URLs. **Not** the `anon`/publishable key — that key can read but inserts/uploads fail with RLS error `42501`. |
| `DATABASE_URL`               | **Yes**  | Postgres connection string for BetterAuth's tables. Use the Supabase **Session pooler** host (`aws-0-<region>.pooler.supabase.com:5432`, username `postgres.<project-ref>`) and append `?sslmode=no-verify` — the direct `db.<ref>.supabase.co` host does not resolve over IPv4, and `require` fails cert verification. |

### BetterAuth (Google login for `/dashboard`)

| Variable               | Required | Purpose                                                                                                       |
| ---------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| `BETTER_AUTH_SECRET`   | **Yes**  | Session-signing secret. Generate with `openssl rand -base64 32`.                                             |
| `BETTER_AUTH_URL`      | **Yes**  | Base URL of this app (no trailing slash). `http://localhost:3000` in dev; the deployed origin in production. |
| `GOOGLE_CLIENT_ID`     | **Yes**  | Google OAuth client ID (Google Cloud Console → Credentials → OAuth client, type "Web application").          |
| `GOOGLE_CLIENT_SECRET` | **Yes**  | Google OAuth client secret.                                                                                  |
| `ADMIN_EMAILS`         | **Yes**  | Comma-separated allowlist of Google accounts permitted into `/dashboard`. Any login outside it is rejected. |

> Google OAuth authorized **redirect URI** must be exactly `${BETTER_AUTH_URL}/api/auth/callback/google`, and the **JavaScript origin** must be `${BETTER_AUTH_URL}`. Add a second pair for the production domain when you deploy.

### Email notifications (SMTP)

These are **optional / placeholder**. Until `SMTP_HOST` (and `MAIL_TO`) are set, form submissions still succeed and notification email is skipped (logged, not sent). Fill these in to start sending — no code change required.

| Variable      | Required | Purpose                                                                          |
| ------------- | -------- | -------------------------------------------------------------------------------- |
| `SMTP_HOST`   | No       | SMTP server hostname. Sending is disabled while this is blank.                   |
| `SMTP_PORT`   | No       | SMTP port. Defaults to `587`.                                                    |
| `SMTP_SECURE` | No       | `true` for port 465 (implicit SSL), `false` for 587 (STARTTLS). Defaults `false`. |
| `SMTP_USER`   | No       | SMTP username.                                                                   |
| `SMTP_PASS`   | No       | SMTP password (secret).                                                          |
| `MAIL_FROM`   | No       | `From:` address on outgoing notifications. Defaults to `SMTP_USER`.              |
| `MAIL_TO`     | No       | Inbox that receives new contact/application notifications. Required for sending. |

The SEO verification tokens above are optional — leave them blank for local development. Paste **only the token value**, not the surrounding `<meta ...>` tag.

### Getting `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

1. Go to [Google Search Console](https://search.google.com/search-console) and sign in with the account that should own the property.
2. Click **Add property** → choose the **URL prefix** type → enter `https://www.akieni.com` (must match `NEXT_PUBLIC_SITE_URL`).
3. In the verification dialog, expand the **HTML tag** method. Google shows a tag like:
   ```html
   <meta name="google-site-verification" content="AbC123_xxxxxxxxxxxxxxxxxxxxxxxxxxxx" />
   ```
4. Copy **only the `content` value** (`AbC123_xxx…`) into `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`.
5. Deploy (or rebuild) so the tag is live, then click **Verify** in Search Console.

### Getting `NEXT_PUBLIC_BING_SITE_VERIFICATION`

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in.
2. Add the site `https://www.akieni.com`. (You can also **Import from Google Search Console** to skip re-verification — if you do that, this token is unnecessary.)
3. Choose the **HTML Meta Tag** verification option. Bing shows a tag like:
   ```html
   <meta name="msvalidate.01" content="0123456789ABCDEF0123456789ABCDEF" />
   ```
4. Copy **only the `content` value** into `NEXT_PUBLIC_BING_SITE_VERIFICATION`.
5. Deploy (or rebuild), then click **Verify** in Bing Webmaster Tools.

The tags are wired up in [`app/[lang]/layout.tsx`](app/%5Blang%5D/layout.tsx) via the Next.js `metadata.verification` field — when a token env var is empty, the corresponding tag is simply omitted.

## Admin dashboard

The public site is content-only, so contact messages and job applications are captured server-side and reviewed in an internal dashboard at **`/dashboard`** (English-only, outside the `[lang]` segment, `noindex`, excluded from the locale proxy/robots/sitemap). It is protected by **Google login via BetterAuth**, gated by the `ADMIN_EMAILS` allowlist. There is a low-key **Admin** link in the site footer.

- **Public submit endpoints:** [`app/api/submit/contact/route.ts`](app/api/submit/contact/route.ts), [`app/api/submit/application/route.ts`](app/api/submit/application/route.ts) — zod-validated, honeypot-protected, insert via the service-role client; applications upload the CV to a private `cvs` Storage bucket.
- **Dashboard pages:** overview, Contacts (+ detail), Applications (+ detail, with role-search and signed CV download links) under [`app/dashboard/`](app/dashboard/).
- **Auth:** [`lib/auth.ts`](lib/auth.ts) (server), [`lib/auth-client.ts`](lib/auth-client.ts) (client), handler at [`app/api/auth/[...all]/route.ts`](app/api/auth/%5B...all%5D/route.ts).
- **Email:** [`lib/email.ts`](lib/email.ts) sends a notification to `MAIL_TO` on each submission (placeholder until SMTP is configured).

### One-time setup

1. **Fill the Supabase, BetterAuth, and (optionally) SMTP env vars** above in `.env.local`.
2. **Apply the database schema** — run both SQL files against your Supabase Postgres (SQL Editor or `psql`):
   - [`supabase/migrations/0001_submissions.sql`](supabase/migrations/0001_submissions.sql) — `contacts` + `applications` tables (RLS on, no policies) and the private `cvs` Storage bucket.
   - The BetterAuth tables — generate the SQL with `pnpm dlx @better-auth/cli generate` (writes to `better-auth_migrations/`, does **not** apply it), then run that file too. It creates `user` / `session` / `account` / `verification`.
3. **Configure Google OAuth** — create a "Web application" OAuth client; set the redirect URI to `${BETTER_AUTH_URL}/api/auth/callback/google` and JS origin to `${BETTER_AUTH_URL}`. If the consent screen is in *Testing*, add your admin emails as test users.
4. Restart the dev/prod server (env is read at process start) and visit `/dashboard`.

## Directory layout

```
akieni-website/
├── app/
│   ├── globals.css                 # Tailwind 4 @theme + base layer + reveal animation tokens
│   ├── favicon.ico
│   ├── [lang]/                     # Locale segment — public site routing root
│   │   ├── layout.tsx              # <html lang>, Header, MobileMenu, Footer
│   │   ├── page.tsx                # Home
│   │   ├── dictionaries.ts         # server-only getDictionary + Dictionary type
│   │   └── dictionaries/
│   │       ├── en.json             # Source of truth for the Dictionary type
│   │       └── fr.json             # Must match en.json's shape (TS-enforced)
│   ├── dashboard/                  # Admin dashboard — own <html>/<body>, outside [lang]
│   │   ├── layout.tsx              # Session guard + sidebar (or sign-in screen)
│   │   ├── page.tsx                # Overview
│   │   ├── contacts/{page,[id]}    # Contact list + detail
│   │   └── applications/{page,[id]}# Application list + detail
│   └── api/
│       ├── auth/[...all]/route.ts  # BetterAuth handler (Google OAuth)
│       └── submit/                 # Public form POST endpoints (contact, application)
├── components/
│   ├── shared/                     # Header, MobileMenu, Footer, LanguageSwitcher, Container, ...
│   ├── forms/                      # contact-form.tsx, application-form.tsx (POST to /api/submit)
│   ├── dashboard/                  # Sidebar, data-table, stat-card, sign-in, applications-table
│   └── ui/                         # (reserved — empty)
├── lib/
│   ├── auth.ts / auth-client.ts    # BetterAuth (server / client)
│   ├── admin.ts                    # ADMIN_EMAILS allowlist helper
│   ├── dashboard.ts                # Server data + session helpers for /dashboard
│   ├── email.ts                    # SMTP notifications (nodemailer)
│   ├── supabase/server.ts          # Service-role Supabase client (server only)
│   ├── sanity.ts                   # Sanity client
│   └── queries/                    # Sanity GROQ queries
├── supabase/migrations/            # SQL for contacts/applications + cvs bucket
├── public/
│   ├── images/                     # Brand logos (akieni-logo.png, akieni-logo-white.png, ...)
│   └── uploads/                    # Editorial content images
├── proxy.ts                        # Next 16 middleware (locale negotiation; excludes /dashboard)
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

/dashboard                          → admin overview (Google login, outside [lang])
/dashboard/contacts                 → contact submissions
/dashboard/contacts/[id]            → contact detail
/dashboard/applications             → job applications (role search)
/dashboard/applications/[id]        → application detail + job role
/api/submit/contact                 → contact form POST
/api/submit/application             → application form POST (multipart, CV upload)
/api/auth/[...all]                  → BetterAuth (Google OAuth)
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


