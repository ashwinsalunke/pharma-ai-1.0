"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { requestPasswordResetAction } from "@/lib/auth/actions"

export function ForgotPasswordForm() {
  return (
    <AuthForm
      action={requestPasswordResetAction}
      submitLabel="Send reset link"
      pendingLabel="Sending..."
    >
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
    </AuthForm>
  )
}
