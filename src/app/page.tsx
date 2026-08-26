import Link from "next/link"

import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <main className="w-full max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground">ZNTX Pharma AI</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Pharmaceutical intelligence, starting with a secure foundation.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          This phase adds Supabase authentication and a PostgreSQL schema for
          profiles, drugs, publications, trials, saved items, and alerts. AI
          search and live APIs come later.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/signup">Create an account</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login">Sign in</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
