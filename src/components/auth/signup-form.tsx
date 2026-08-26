"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpAction } from "@/lib/auth/actions"

export function SignupForm() {
  return (
    <AuthForm
      action={signUpAction}
      submitLabel="Create account"
      pendingLabel="Creating account..."
    >
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          autoComplete="name"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
    </AuthForm>
  )
}
