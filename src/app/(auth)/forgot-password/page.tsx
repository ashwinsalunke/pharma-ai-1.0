import Link from "next/link"

import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Reset password",
}

export default function ForgotPasswordPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset your password</CardTitle>
        <CardDescription>
          We will email a reset link if that address has an account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <ForgotPasswordForm />
        <p className="text-sm text-muted-foreground">
          <Link className="underline underline-offset-4" href="/login">
            Back to sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
