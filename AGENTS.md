# AGENTS.md - AI Coding Agent Reference

This file provides essential information for AI coding agents working on this project. It contains project-specific details, conventions, and guidelines that complement the README.

---

## Project Overview

**CodeWar** is a coding challenge platform built with:

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style)
- **Database**: Neon (serverless Postgres) + Drizzle ORM
- **Authentication**: Custom JWT-based auth with bcrypt password hashing
- **Error Tracking**: Sentry
- **Package Manager**: Bun (preferred) or npm

The project follows a feature-based folder structure designed for scalability in SaaS applications, internal tools, and admin panels.

---

## Technology Stack Details

### Core Framework & Runtime
- Next.js 16.0.10 with App Router
- React 19.2.0
- TypeScript 5.7.2 with strict mode enabled

### Styling & UI
- Tailwind CSS v4 (using `@import 'tailwindcss'` syntax)
- PostCSS with `@tailwindcss/postcss` plugin
- shadcn/ui component library (Radix UI primitives)
- CSS custom properties for theming (OKLCH color format)

### State Management
- Zustand 5.x for global state
- Nuqs for URL search params state management
- React Hook Form + Zod for form handling

### Authentication & Authorization
- Custom JWT-based auth using `jose` library
- Password hashing with `bcryptjs`
- HTTP-only cookie session management
- Auth context via `useAuth()` hook from `src/lib/auth-context.tsx`
- Middleware-based route protection (`src/middleware.ts`)

### Database
- Neon serverless Postgres (`@neondatabase/serverless`)
- Drizzle ORM for type-safe queries
- Schema defined in `src/lib/db/schema.ts`
- DB connection in `src/lib/db/index.ts`

### Data & APIs
- TanStack Table for data tables
- Recharts for analytics/charts
- Mock API utilities in `src/constants/mock-api.ts`

### Development Tools
- ESLint 8.x with Next.js core-web-vitals config
- Prettier 3.x with prettier-plugin-tailwindcss
- Husky for git hooks
- lint-staged for pre-commit formatting

---

## Project Structure

```
/src
├── app/                    # Next.js App Router
│   ├── auth/              # Authentication routes (sign-in, sign-up)
│   ├── api/auth/          # Auth API routes (login, register, logout, me)
│   ├── dashboard/         # Dashboard routes
│   │   ├── overview/      # Parallel routes (@area_stats, @bar_stats, etc.)
│   │   ├── product/       # Product management pages
│   │   ├── kanban/        # Kanban board page
│   │   ├── workspaces/    # Workspace management (placeholder)
│   │   ├── billing/       # Billing (placeholder)
│   │   ├── exclusive/     # Exclusive features (placeholder)
│   │   └── profile/       # User profile
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Landing page
│   ├── global-error.tsx   # Sentry-integrated error boundary
│   └── not-found.tsx      # 404 page
│
├── components/
│   ├── ui/                # shadcn/ui components (50+ components)
│   ├── layout/            # Layout components (sidebar, header, etc.)
│   ├── forms/             # Form field wrappers
│   ├── themes/            # Theme system components
│   ├── kbar/              # Command+K search bar
│   ├── icons.tsx          # Icon registry
│   └── ...
│
├── features/              # Feature-based modules
│   ├── auth/              # Authentication components (sign-in, sign-up views)
│   ├── overview/          # Dashboard analytics
│   ├── products/          # Product management
│   ├── kanban/            # Kanban board with dnd-kit
│   └── profile/           # Profile management
│
├── config/                # Configuration files
│   ├── nav-config.ts      # Navigation configuration
│   └── ...
│
├── hooks/                 # Custom React hooks
│   ├── use-nav.ts         # Navigation filtering
│   ├── use-data-table.ts  # Data table state
│   └── ...
│
├── lib/                   # Utility functions
│   ├── db/                # Database (Neon + Drizzle)
│   │   ├── index.ts       # DB connection
│   │   └── schema.ts      # Drizzle schema (users table)
│   ├── auth.ts            # JWT auth utilities (create/verify token, cookies)
│   ├── auth-context.tsx   # React auth context & useAuth() hook
│   ├── utils.ts           # cn() and formatters
│   ├── searchparams.ts    # Search param utilities
│   └── ...
│
├── types/                 # TypeScript type definitions
│   └── index.ts           # Core types (NavItem, etc.)
│
├── middleware.ts           # Route protection middleware
│
└── styles/                # Global styles
    ├── globals.css        # Tailwind imports + view transitions
    ├── theme.css          # Theme imports
    └── themes/            # Individual theme files

/drizzle.config.ts         # Drizzle Kit configuration
```

---

## Build & Development Commands

```bash
# Install dependencies
bun install

# Development server
bun run dev          # Starts at http://localhost:3000

# Build for production
bun run build

# Start production server
bun run start

# Database
bun run db:push      # Push schema to Neon
bun run db:generate  # Generate migrations
bun run db:migrate   # Run migrations
bun run db:studio    # Open Drizzle Studio

# Linting
bun run lint         # Run ESLint
bun run lint:fix     # Fix ESLint issues and format
bun run lint:strict  # Zero warnings tolerance

# Formatting
bun run format       # Format with Prettier
bun run format:check # Check formatting

# Git hooks
bun run prepare      # Install Husky hooks
```

---

## Environment Configuration

Copy `env.example.txt` to `.env.local` and configure:

### Required for Database & Auth
```env
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require
JWT_SECRET=your-secret-key-change-in-production
```

### Optional for Error Tracking (Sentry)
```env
NEXT_PUBLIC_SENTRY_DSN=https://...@....ingest.sentry.io/...
NEXT_PUBLIC_SENTRY_ORG=your-org
NEXT_PUBLIC_SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=sntrys_...
NEXT_PUBLIC_SENTRY_DISABLED="false"  # Set to "true" to disable in dev
```

---

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Use explicit return types for public functions
- Prefer interface over type for object definitions
- Use `@/*` alias for imports from src

### Formatting (Prettier)
```json
{
  "singleQuote": true,
  "jsxSingleQuote": true,
  "semi": true,
  "trailingComma": "none",
  "tabWidth": 2,
  "arrowParens": "always"
}
```

### ESLint Rules
- `@typescript-eslint/no-unused-vars`: warn
- `no-console`: warn
- `react-hooks/exhaustive-deps`: warn
- `import/no-unresolved`: off (handled by TypeScript)

### Component Conventions
- Use function declarations for components: `function ComponentName() {}`
- Props interface named `{ComponentName}Props`
- shadcn/ui components use `cn()` utility for class merging
- Server components by default, `'use client'` only when needed

---

## Theming System

The project uses a sophisticated multi-theme system with 6 built-in themes:

- `vercel` (default)
- `claude`
- `neobrutualism`
- `supabase`
- `mono`
- `notebook`

### Theme Files
- CSS files: `src/styles/themes/{theme-name}.css`
- Theme registry: `src/components/themes/theme.config.ts`
- Font config: `src/components/themes/font.config.ts`
- Active theme provider: `src/components/themes/active-theme.tsx`

### Adding a New Theme
1. Create `src/styles/themes/your-theme.css` with `[data-theme='your-theme']` selector
2. Import in `src/styles/theme.css`
3. Add to `THEMES` array in `src/components/themes/theme.config.ts`
4. (Optional) Add fonts in `font.config.ts`
5. (Optional) Set as default in `theme.config.ts`

---

## Authentication System

### Architecture
- **API routes**: `src/app/api/auth/` (register, login, logout, me)
- **JWT tokens**: Created with `jose`, stored as HTTP-only cookies
- **Password hashing**: `bcryptjs` with 12 salt rounds
- **Auth context**: `useAuth()` hook provides `user`, `login`, `register`, `logout`
- **Middleware**: `src/middleware.ts` protects routes by checking for auth cookie

### Auth API Routes
- `POST /api/auth/register` - Register with username/password
- `POST /api/auth/login` - Login with username/password
- `POST /api/auth/logout` - Clear auth cookie
- `GET /api/auth/me` - Get current user from JWT

### Protected Routes
The middleware in `src/middleware.ts` redirects unauthenticated users to `/auth/sign-in` for all routes except public paths (`/auth`, `/api/auth`, `/`, `/about`, etc.).

### Using Auth in Components
```tsx
'use client';
import { useAuth } from '@/lib/auth-context';

function MyComponent() {
  const { user, loading, logout } = useAuth();
  if (!user) return null;
  return <div>Hello {user.username}</div>;
}
```

### Server-side Auth Check
```tsx
import { getAuthFromCookie } from '@/lib/auth';

export default async function Page() {
  const auth = await getAuthFromCookie();
  if (!auth) redirect('/auth/sign-in');
  // auth.userId, auth.username available
}
```

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);
```

### Adding New Tables
1. Define table in `src/lib/db/schema.ts` using Drizzle's `pgTable`
2. Run `bun run db:push` to push changes to Neon

---

## Navigation System

### Navigation Configuration
Navigation is defined in `src/config/nav-config.ts`:

```typescript
export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
    icon: 'dashboard',
    shortcut: ['d', 'd']
  }
];
```

### Client-Side Filtering
The `useFilteredNavItems()` hook in `src/hooks/use-nav.ts` filters navigation items based on the `access` property. Items with `requireOrg: true` are hidden (organizations feature not yet implemented).

---

## Data Fetching Patterns

### Server Components (Default)
Fetch data directly in async components:

```tsx
export default async function ProductPage() {
  const products = await getProducts();
  return <ProductTable data={products} />;
}
```

### URL State Management
Use `nuqs` for search params state:

```tsx
import { useQueryState } from 'nuqs';

const [search, setSearch] = useQueryState('search');
```

### Data Tables
Tables use TanStack Table with server-side filtering:
- Column definitions in `features/*/components/*-tables/columns.tsx`
- Table component in `src/components/ui/table/data-table.tsx`
- Filter parsers in `src/lib/parsers.ts`

---

## Error Handling & Monitoring

### Sentry Integration
Sentry is configured for both client and server:
- Client config: `src/instrumentation-client.ts`
- Server config: `src/instrumentation.ts`
- Global error: `src/app/global-error.tsx`

To disable Sentry in development:
```env
NEXT_PUBLIC_SENTRY_DISABLED="true"
```

---

## Testing Strategy

**Note**: This project does not include a test suite by default. Consider adding:

- **Unit tests**: Vitest or Jest for utilities and hooks
- **Component tests**: React Testing Library for UI components
- **E2E tests**: Playwright for critical user flows

---

## Deployment

### Vercel (Recommended)
1. Connect repository to Vercel
2. Add environment variables in dashboard
3. Deploy

### Environment Variables for Production
Ensure these are set in your deployment platform:
- `DATABASE_URL` - Neon connection string
- `JWT_SECRET` - Strong random secret for JWT signing
- `SENTRY_*` variables if using error tracking

### Build Considerations
- Output: Static + Server (default Next.js)
- Images: Configured for `api.slingacademy.com`
- Sentry source maps uploaded automatically in CI

---

## Common Development Tasks

### Adding a New Page
1. Create route: `src/app/dashboard/new-page/page.tsx`
2. Add navigation item in `src/config/nav-config.ts`
3. Create feature components in `src/features/new-feature/`

### Adding a New API Route
1. Create: `src/app/api/my-route/route.ts`
2. Export HTTP method handlers: `GET`, `POST`, etc.

### Adding a shadcn Component
```bash
npx shadcn add component-name
```

### Adding a New Theme
See "Theming System" section above.

---

## Troubleshooting

### Common Issues

**Build fails with Tailwind errors**
- Ensure using Tailwind CSS v4 syntax (`@import 'tailwindcss'`)
- Check `postcss.config.js` uses `@tailwindcss/postcss`

**Database connection errors**
- Verify `DATABASE_URL` in `.env.local` is correct
- Ensure Neon project is active and not suspended

**Theme not applying**
- Check theme name matches in CSS `[data-theme]` and `theme.config.ts`
- Verify theme CSS is imported in `theme.css`

**Navigation items not showing**
- Check `access` property in nav config
- Items with `requireOrg: true` are hidden by default

---

## External Documentation

- [Next.js App Router](https://nextjs.org/docs/app)
- [Drizzle ORM](https://orm.drizzle.team/docs/overview)
- [Neon Serverless](https://neon.tech/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [TanStack Table](https://tanstack.com/table/latest)
- [Sentry Next.js](https://docs.sentry.io/platforms/javascript/guides/nextjs/)

---

## Notes for AI Agents

1. **Always use `cn()` for className merging** - never concatenate strings manually
2. **Respect the feature-based structure** - put new feature code in `src/features/`
3. **Server components by default** - only add `'use client'` when using browser APIs or React hooks
4. **Type safety first** - avoid `any`, prefer explicit types
5. **Follow existing patterns** - look at similar components before creating new ones
6. **Environment variables** - prefix with `NEXT_PUBLIC_` for client-side access
7. **shadcn components** - don't modify files in `src/components/ui/` directly; extend them instead
8. **Auth** - use `useAuth()` hook client-side, `getAuthFromCookie()` server-side
9. **Database** - use Drizzle ORM via `db` from `src/lib/db` for all queries
