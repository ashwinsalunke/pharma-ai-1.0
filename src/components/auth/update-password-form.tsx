"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updatePasswordAction } from "@/lib/auth/actions"

export function UpdatePasswordForm() {
  return (
    <AuthForm
      action={updatePasswordAction}
      submitLabel="Update password"
      pendingLabel="Updating..."
    >
      <div className="grid gap-2">
        <Label htmlFor="password">New password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          minLength={8}
          required
        />
      </div>
    </AuthForm>
  )
}
