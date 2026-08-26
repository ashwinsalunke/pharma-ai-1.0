import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getSafeNextPath } from "@/lib/auth/utils"

export const metadata = {
  title: "Sign in",
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const params = await searchParams
  const nextPath = getSafeNextPath(params.next)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>
          Use your ZNTX Pharma AI account to open the dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {params.error ? (
          <p className="text-sm text-destructive" role="alert">
            Authentication failed. Try signing in again.
          </p>
        ) : null}
        <LoginForm nextPath={nextPath} />
        <p className="text-sm text-muted-foreground">
          <Link className="underline underline-offset-4" href="/forgot-password">
            Forgot password?
          </Link>
        </p>
        <p className="text-sm text-muted-foreground">
          Need an account?{" "}
          <Link className="underline underline-offset-4" href="/signup">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
