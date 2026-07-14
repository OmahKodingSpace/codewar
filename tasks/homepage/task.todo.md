# Task TODO: Homepage

## Scope

- Task: `homepage`
- Feature: `frontend-homepage`
- Owner: `airm2`
- Related route(s): `/`
- Related data model(s): `users`, `challenges`, `leaderboard`, `achievements`
- Branch: `feat/homepage`

## Implementation

- Status: `[done]`
- Goal: Build a production-ready homepage that replaces current mock data with real data and polishes the UI
- Why: The homepage is the first impression — it needs to pull real user stats, leaderboard data, and challenge info from the database
- Inputs: Authenticated user session, database queries (stats, leaderboard, challenges)
- Output: Server-rendered homepage with real data, responsive layout, and polished design
- Target files:
  - `src/app/(frontend)/page.tsx`
  - `src/app/(frontend)/layout.tsx`
  - `src/components/frontend/top-nav.tsx`
  - `src/components/frontend/bottom-nav.tsx`
- Constraints:
  - Use `cn()` for class names
  - Keep server component by default
- Acceptance criteria:
  - [x] Hero section shows real user level, XP, streak from database
  - [x] Quick stats pull live data (correct answers, active users, total challenges, languages)
  - [x] Leaderboard section shows real top 5 players
  - [x] CTA links work and route correctly (`/challenges`, `/leaderboard`, `/login`)
  - [x] Responsive layout works on mobile and desktop (TopNav `md:block`, BottomNav `md:hidden`)
  - [x] Loading/empty states handled gracefully (empty leaderboard + languages)
- Validation:
  - [ ] `bun run lint` — BLOCKED, repo-wide tooling broken (Next 16 removed `next lint`; ESLint 8 `.eslintrc.json` throws circular JSON). Not homepage-specific. `bunx tsc --noEmit` passes clean.
  - [x] manual check: homepage renders at `/` with real data (verified via authed curl — hero, stats, leaderboard all live)
  - [x] manual check: mobile nav and layout (BottomNav `md:hidden`, TopNav `hidden md:block`)
- Notes:
  - Homepage already migrated to real data at commit `df3a064` ("fix homepage") — page/layout/nav all use `@/lib/db/queries` + `getAuthFromCookie`. No mock left on `/`.
  - FIX applied: register route (`src/app/api/auth/register/route.ts`) now inserts a `user_stats` row per user. `getLeaderboard` innerJoins `user_stats`, so without this the leaderboard showed "No warriors yet" permanently. New registrations now appear on hero + leaderboard.
  - KNOWN GAP: users registered before the fix have no `user_stats` row (won't appear on leaderboard). Backfill needed if those accounts matter.
  - KNOWN GAP: unauth hero branch in `page.tsx` (Welcome / Sign In) is dead code — middleware redirects `/` to `/login` for unauth users (open question below). Either loosen middleware to make it a public landing, or delete the branch.
  - Mock still used by OTHER routes (achievements/rewards/leaderboard/profile) — out of homepage scope.
  - Shadcn/ui + Tabler Icons in use.

## Dependencies

- Database and auth must be set up (see `tasks/setup-database-and-auth/`)
- User session/auth context must be available server-side

## Open Questions

- Should we show a different homepage for unauthenticated users?
- What specific stats should the "Quick Stats" section display?
- Should leaderboard be global or filtered by organization?
