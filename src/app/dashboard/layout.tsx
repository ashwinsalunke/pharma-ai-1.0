import Link from "next/link"

import { SignOutButton } from "@/components/auth/sign-out-button"
import { getCurrentProfile } from "@/lib/db/queries"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const profile = await getCurrentProfile()

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <header className="border-b">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
          <div>
            <Link href="/dashboard" className="font-semibold tracking-tight">
              ZNTX Pharma AI
            </Link>
            <p className="text-sm text-muted-foreground">
              {profile?.full_name || profile?.email || "Signed in"}
            </p>
          </div>
          <nav className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Overview
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Profile
            </Link>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</main>
    </div>
  )
}
