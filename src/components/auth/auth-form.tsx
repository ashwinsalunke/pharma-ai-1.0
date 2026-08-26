"use client"

import { useActionState } from "react"

import { Button } from "@/components/ui/button"
import type { AuthActionState } from "@/lib/auth/actions"

type AuthFormProps = {
  action: (
    state: AuthActionState,
    formData: FormData,
  ) => Promise<AuthActionState>
  children: React.ReactNode
  submitLabel: string
  pendingLabel?: string
}

export function AuthForm({
  action,
  children,
  submitLabel,
  pendingLabel = "Please wait...",
}: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, {})

  return (
    <form action={formAction} className="grid gap-4">
      {children}
      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.notice ? (
        <p className="text-sm text-muted-foreground" role="status">
          {state.notice}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? pendingLabel : submitLabel}
      </Button>
    </form>
  )
}
