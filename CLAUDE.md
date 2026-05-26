@AGENTS.md

# Akieni Website

## ⚠️ Read this before writing any Next.js code

This project uses **Next.js 16** — APIs, conventions, and file structure differ from earlier versions and may differ from your training data. Before writing or modifying anything that touches Next.js (routing, layouts, server components, caching, config, metadata, params/searchParams, etc.), read the relevant guide in `node_modules/next/dist/docs/`. Heed deprecation notices.

## Stack

- **Next.js** 16.2.6 (App Router)
- **React** 19.2.4 / React DOM 19.2.4
- **TypeScript** 5 (strict)
- **Tailwind CSS** 4 via `@tailwindcss/postcss`
- **Fonts**: Geist Sans + Geist Mono from `next/font/google`
- **Package manager**: pnpm (workspace configured via `pnpm-workspace.yaml`)
- **Lint/format**: ESLint 9 (`next/core-web-vitals` + TS), Prettier 3 with `prettier-plugin-tailwindcss`

## Commands

- `pnpm dev` — start the dev server (http://localhost:3000)
- `pnpm build` — production build
- `pnpm start` — run the production build
- `pnpm lint` — run ESLint

## Layout & conventions

- `app/` — App Router. Currently only `layout.tsx`, `page.tsx`, `globals.css`, `favicon.ico`.
- `public/` — static assets (SVGs).
- Path alias: `@/*` → project root (see `tsconfig.json`).
- Dark mode: `prefers-color-scheme` + Tailwind `dark:` utilities. Theme colors are driven by the `--background` and `--foreground` CSS variables defined in `app/globals.css`.
- No env vars, no API routes, no i18n configured yet.

## Project status

This is a fresh `create-next-app` scaffold. The only route is `/`, and `app/page.tsx` is the default Next.js landing page with no custom business logic. Treat new feature work as greenfield — there are no established `components/`, `lib/`, or content conventions yet.
