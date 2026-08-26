"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfileAction } from "@/lib/auth/actions"

export function ProfileForm({
  fullName,
  email,
}: {
  fullName: string
  email: string
}) {
  return (
    <AuthForm
      action={updateProfileAction}
      submitLabel="Save profile"
      pendingLabel="Saving..."
    >
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" value={email} disabled readOnly />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input
          id="fullName"
          name="fullName"
          type="text"
          defaultValue={fullName}
          required
        />
      </div>
    </AuthForm>
  )
}
