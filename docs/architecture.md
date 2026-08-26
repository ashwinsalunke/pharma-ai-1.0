# ZNTX Pharma AI architecture

This document describes the database and authentication foundation. AI search, PubMed, openFDA, ClinicalTrials.gov, RAG, and PDF processing are intentionally not implemented yet.

## What this phase built

ZNTX Pharma AI now has:

- A Next.js app that talks to Supabase
- Email and password authentication
- A PostgreSQL schema for users, reference data, and private user data
- Row Level Security so users cannot read each other's private rows

Think of it as two layers:

1. **Authentication** answers "who is this person?"
2. **The database** stores both public reference records and private user records.

## Supabase architecture

Supabase is a hosted PostgreSQL database plus Auth, APIs, and security policies.

```text
Browser
  └── Next.js pages and forms
        ├── Browser Supabase client (publishable key only)
        └── Server Components / Server Actions / Route Handlers
              ├── Server Supabase client (user session cookies)
              └── Admin client (service-role key, server-only, unused in UI)
                    └── Supabase Auth + PostgreSQL
```

### Clients

| Client | File | Runs where | Key used |
|---|---|---|---|
| Browser | `src/lib/supabase/client.ts` | Client Components | Publishable / anon key |
| Server | `src/lib/supabase/server.ts` | Server Components, Server Actions, Route Handlers | Publishable / anon key + user cookies |
| Proxy | `src/lib/supabase/proxy.ts` | `src/proxy.ts` on every matched request | Publishable / anon key + cookies |
| Admin | `src/lib/supabase/admin.ts` | Server only | Service-role key |

The publishable key is public on purpose. It can only do what Row Level Security allows.

The service-role key is a master key. It bypasses RLS. It is stored as `SUPABASE_SERVICE_ROLE_KEY` with no `NEXT_PUBLIC_` prefix, and the admin helper is marked `server-only` so it cannot be imported into browser code.

### Query rule

UI components do not call Supabase directly. They call reusable functions in:

- `src/lib/auth/actions.ts` for login, signup, logout, password reset, and profile updates
- `src/lib/db/queries.ts` for profiles, catalog counts, saved items, and alerts

That keeps database logic in one place.

## Authentication flow

Supabase Auth stores accounts in `auth.users`. The app never stores raw passwords.

### Sign up

1. The user submits `/signup`.
2. A Server Action calls `supabase.auth.signUp`.
3. A database trigger creates a matching row in `public.profiles`.
4. If the project requires email confirmation, the user must click the email link first.
5. Email links go to `/auth/callback` (PKCE code) or `/auth/confirm` (token hash).

### Sign in

1. The user submits `/login`.
2. A Server Action calls `signInWithPassword`.
3. Supabase returns a session. `@supabase/ssr` stores it in HTTP-only cookies.
4. The user is redirected to `/dashboard`.

### Session refresh

`src/proxy.ts` runs on matched requests. It:

1. Creates a server Supabase client from cookies
2. Calls `getClaims()` to verify the JWT
3. Writes refreshed cookies back to the response
4. Redirects unauthenticated users away from `/dashboard`
5. Redirects signed-in users away from `/login` and `/signup`

Protected layouts also call `requireUser()`, which uses `getClaims()` again. Proxy is a gate. The server still verifies identity before loading private data.

### Forgot password

1. The user submits `/forgot-password`.
2. The app calls `resetPasswordForEmail` with a redirect to `/auth/callback?next=/auth/update-password`.
3. After the email link is used, `/auth/update-password` lets the signed-in recovery session set a new password.

### Logout

The dashboard header posts to `signOutAction`, which calls `supabase.auth.signOut()` and redirects to `/login`.

## Database relationships

`auth.users` is owned by Supabase Auth. The app's public tables are:

```text
auth.users
  └── profiles.id          (1:1, created by trigger)
  └── saved_items.user_id  (1:many, private)
  └── alerts.user_id       (1:many, private)

drugs                 (public reference)
publications          (public reference)
clinical_trials       (public reference)

saved_items.item_id   points at a catalog row by UUID + item_type
                      (no foreign key yet; keeps the first schema simple)
```

### Table purpose

| Table | Kind | Purpose |
|---|---|---|
| `profiles` | User-owned | Display name and email copy for the signed-in user |
| `drugs` | Public reference | Demo and future API-ingested drug records |
| `publications` | Public reference | Demo and future literature records |
| `clinical_trials` | Public reference | Demo and future trial records |
| `saved_items` | User-owned | Bookmarks of catalog rows |
| `alerts` | User-owned | Saved watch queries for later alert features |

Catalog tables include `source` and `external_id` so future ingestion can upsert by provider id without redesigning the tables.

## Row Level Security strategy

RLS is enabled on every public table.

| Table | Who can read | Who can write |
|---|---|---|
| `drugs`, `publications`, `clinical_trials` | Anyone (`anon` and `authenticated`) | Nobody through the Data API. Future ingestion should use the service-role key on the server |
| `profiles` | The owner, `id = auth.uid()` | The owner can update their own row. Inserts happen through a private trigger |
| `saved_items`, `alerts` | The owner, `user_id = auth.uid()` | The owner, and only for their own `user_id` |

Privileged trigger functions live in the `private` schema, not `public`, so they are not exposed through the Data API.

`auth.uid()` comes from the verified JWT, not from a user-editable metadata field.

## Environment variables

Copy `.env.example` to `.env.local`.

| Variable | Public? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Project API URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes | Browser-safe key |
| `NEXT_PUBLIC_SITE_URL` | Yes | App origin used in auth redirects |
| `SUPABASE_SERVICE_ROLE_KEY` | **No. Server only.** | Bypasses RLS. Never put this in client code |

Optional compatibility: `NEXT_PUBLIC_SUPABASE_ANON_KEY` is accepted if a publishable key is not set.

In the Supabase dashboard, add these Redirect URLs:

- `http://localhost:3000/auth/callback`
- `http://localhost:3000/auth/confirm`
- `http://localhost:3000/auth/update-password`

Site URL can stay `http://localhost:3000` during local development.

## How to run

```bash
npm install
cp .env.example .env.local
# fill in real values
npm run dev
```

Useful checks:

```bash
npm run typecheck
npm run lint
curl http://localhost:3000/api/health/db
```
