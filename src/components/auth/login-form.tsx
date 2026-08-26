"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInAction } from "@/lib/auth/actions"

export function LoginForm({ nextPath }: { nextPath: string }) {
  return (
    <AuthForm action={signInAction} submitLabel="Sign in" pendingLabel="Signing in...">
      <input type="hidden" name="next" value={nextPath} />
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
          autoComplete="current-password"
          required
        />
      </div>
    </AuthForm>
  )
}
