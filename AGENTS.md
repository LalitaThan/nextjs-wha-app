<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# nextjs-wha-app-starter

## Commands
- `npm run dev` — dev server at http://localhost:3000
- `npm run build`
- `npm run start`
- `npm run lint` — ESLint flat config (`eslint.config.mjs`)
- `npx prisma generate` — regenerates Prisma client to `generated/prisma/`
- `npx prisma studio` — browse DB via Prisma Studio
- `npx prisma migrate dev` — create and apply migrations
- No test or typecheck scripts exist. No CI/CD.

## Tech stack
- **Next.js 16** App Router (React 19) — `cacheComponents: true` enabled in `next.config.ts`
- **Tailwind CSS v4** (`@import "tailwindcss"` via `@tailwindcss/postcss` plugin)
- **shadcn/ui** (Radix style, remixicon icon library)
- **Prisma 7** — uses `prisma.config.ts` (config-based), `prisma-client` generator (not `prisma-client-js`), output to `generated/prisma/` (gitignored), MariaDB/MySQL driver adapter
- **better-auth 1.6** — email/password auth, Prisma adapter, MySQL
- **zustand** with persist — cart store uses localStorage key `skill-cart`
- **react-hook-form** + **zod** — form validation
- **`@/*`** path alias maps to `./src/*`

## Architecture
- **No root `layout.tsx`**. Route groups `(front)/` and `(auth)/` each have their own `<html>`/`<body>` tags. Adding a root layout would nest them and break the app.
- Route groups: `(front)/` (pages with navbar) and `(auth)/` (login/signup, no nav).
- Dynamic server components call `await connection()` from `next/server` to opt out of static caching (see `src/app/(front)/product/page.tsx`).
- `src/lib/auth.ts` — better-auth server instance
- `src/lib/auth-client.ts` — better-auth browser client
- `src/lib/prisma.ts` — singleton PrismaClient with MariaDB driver adapter
- `src/lib/cart-store.ts` — zustand persist store
- `src/components/ui/` — shadcn/ui primitives
- `src/app/(front)/components/` — page-specific components
- Auth API route: `src/app/api/auth/[...all]/route.ts` (catch-all better-auth handler)

## Prisma notes
- Schema at `prisma/schema.prisma`, config at `prisma.config.ts` (loads `dotenv/config`)
- Generator uses `prisma-client` (v7), output set to `../generated/prisma`
- Import path: `../../generated/prisma/client` (not `@prisma/client`)
- Datasource: `mysql` provider (MariaDB driver adapter in runtime)

## Styling
- CSS: `src/app/globals.css` uses `@import "tailwindcss"`, `@import "tw-animate-css"`, `@import "shadcn/tailwind.css"`
- Dark mode via `.dark` class (`next-themes` compatible)
- `cn()` utility at `src/lib/utils.ts` (clsx + tailwind-merge)

## Docker
- Multi-stage build with Prisma client generation step before Next.js build.
- Outputs Next.js standalone mode (`server.js`) with Prisma artifacts copied.
