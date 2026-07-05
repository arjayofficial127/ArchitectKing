# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

ArchitectKing is Arvin Jayson Castro's personal brand site (arvinjaysoncastro.com) built on the AtomicFuel multi-org workspace engine, extended with consultant tooling: a booking calendar (recurring events + public slots at `/schedule`), a prospect CRM with list/kanban swimlane views (`/superadmin/prospects`), a Knowledge Vault file tree (`/superadmin/files`), a landing page for the book *Working Fundamentals* (`/working-fundamentals` + one route per chapter), and static service/brand pages (`/architecture-review`, `/case-studies`, `/contact-me`, `/offer`, `/resume`, `/urgent-hire`).

It is a fork of the AtomicFuel template (root package.json is still named `atomicfuel-monorepo`) — one of six sibling forks under `C:\AOTECH`. Shared engineering conventions live in `_tools/` and `C:\AOTECH\CLAUDE.md`.

## Commands

pnpm workspaces monorepo: `frontend/` (Next.js 14 App Router, port 3000) + `backend-node/` (Express, port 4000).

```bash
pnpm install
pnpm db:up                                  # Postgres 16 via docker compose
pnpm --filter backend-node db:migrate      # migrations never auto-run
pnpm --filter backend-node db:seed
pnpm dev                                    # both; or dev:backend / dev:frontend
pnpm build
pnpm lint
pnpm test                                   # backend Jest
pnpm --filter backend-node test -- path/to/file.test.ts   # single test file
pnpm --filter backend-node test -- -t "name"              # single test by name
pnpm --filter backend-node db:generate     # Drizzle migration from schema changes
pnpm --filter backend-node db:studio
```

Env: `backend-node/.env.example` → `.env` (DATABASE_URL, JWT_ACCESS/REFRESH secrets, REGISTRATION_SECRET, FRONTEND_URL); frontend needs `NEXT_PUBLIC_API_BASE_URL` (includes `/api`).

Notes:
- pnpm 11 requires explicit build-script approval: `allowBuilds` in `pnpm-workspace.yaml` must hold real booleans (`esbuild`, `msgpackr-extract`, `unrs-resolver` = true) or every install — including the one `pnpm dev` auto-triggers — fails.
- `frontend/package-lock.json` exists because npm was used inside `frontend/` at some point. The workspace is pnpm; don't run `npm install` in frontend or the lockfiles diverge further.

⚠ The docker-compose Postgres container is named `baseofui-postgres` on port 5432 — **identical to every sibling project in C:\AOTECH**. Check `docker ps` before `db:up`; another project's DB may already own the port and you'd silently hit its data.

## Architecture

- Backend clean architecture: `api` (Express routes, auth/rate-limit middleware) → `application` (use cases, DTOs) → `domain` (entities, value objects) → `infrastructure` (Drizzle repos, pluggable file storage: R2/S3/Supabase/Cloudinary) → `core` (TSyringe DI container, Result pattern, event bus, logger, in-memory cache).
- API surface (mounted in `backend-node/src/api/server.ts`): `/api/auth`, `/api/orgs` (+ nested `posts`, `comments`, `likes`, `attachments`, `members`), `/api/superadmin/{calendar,prospects,notifications,files}`, `/api/public/{schedule,book}`, `/api/health`.
- Frontend: React Query for server state, React Hook Form + Zod, TipTap rich text. Layer roles: components render only, hooks orchestrate, services do IO. Main utility library is `frontend/lib/` (api clients, hooks, services, validators); `frontend/src/lib/` holds only the uploadthing config — not a duplicate.
- Multi-org tenancy: `orgs`/`org_users`/role tables with Owner/Admin/Editor/Viewer roles; org authorization is enforced server-side in middleware, never trusted from the UI.
- Route groups: `(auth)` login/register, `(dashboard)` org workspaces (posts, collections, records by slug, members), public brand/service pages listed above, and `/superadmin/*` pages (dashboard, calendar, prospects, notifications, files). The `(superadmin)` route group directory exists but is empty — the real pages live under `app/superadmin/`.
- Modal system (block styling, `modalId` hook state, nesting) is documented in `frontend/MODAL_CAPABILITIES.md`.

## Known gaps

- `/api/superadmin/files` backend is a stub ("Files API - Coming soon") — the Knowledge Vault UI exists but has no real persistence.
- Markdown preview renders plain text and the RTF viewer shows raw content (`frontend/components/superadmin/files/FileEditor.tsx`) — both need proper renderer libraries.
- Build progression log lives in `BUILD_PROGRESS_9_STEPS.md` (all 9 steps pass); architecture thinking in `Master_Architecture.md`; landing MVP spec in `MVP_STRUCTURE.md`; book integration notes in `BOOK_INTEGRATION_SUMMARY.md`. `QUICK_FIX.md` covers the "redirected to org pages / failed to fetch events" superadmin troubleshooting (backend down, user not flagged superadmin, or bad API base URL).
- `books/`, `portfolio/`, and `Prompts/` at the repo root are content/asset archives, not code.

## Conventions

Follow `_tools/CURSOR_RULES/CURSOR_RULES.md`: strict TypeScript (no `any`; guard/default/assert every `T | undefined`), DTOs at boundaries, read by slug / update by immutable ID, no list-then-`.find()` fetching, size limits (components ≤ 300 lines, hooks ≤ 500, services ≤ 400, pages ≤ 600), minimal scoped changes, preserve existing patterns.
