# ZNTX Pharma AI

Next.js + TypeScript + Tailwind + Supabase foundation for a pharmaceutical intelligence platform.

This phase includes authentication and a PostgreSQL schema. It does not include OpenAI, PubMed, openFDA, ClinicalTrials.gov, RAG, or PDF processing.

## Getting started

```bash
npm install
cp .env.example .env.local
```

Fill in `.env.local` with the Supabase project URL and publishable key. Keep `SUPABASE_SERVICE_ROLE_KEY` server-side only.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

- `/signup` creates an account
- `/login` signs in
- `/dashboard` is protected
- `/api/health/db` checks the Supabase connection

Read [docs/architecture.md](docs/architecture.md) for authentication, schema, and Row Level Security details.
