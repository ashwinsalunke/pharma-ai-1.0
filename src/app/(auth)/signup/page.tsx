import Link from "next/link"

import { SignupForm } from "@/components/auth/signup-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata = {
  title: "Create account",
}

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Sign up to save research items and manage your profile.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <SignupForm />
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="underline underline-offset-4" href="/login">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
