"use server"

import { redirect } from "next/navigation"

import { requireUser } from "@/lib/auth/session"
import { getAuthErrorMessage, getRequestOrigin, getSafeNextPath } from "@/lib/auth/utils"
import { updateProfile } from "@/lib/db/queries"
import { createClient } from "@/lib/supabase/server"

export type AuthActionState = {
  error?: string
  notice?: string
}

export async function signInAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")
  const next = getSafeNextPath(String(formData.get("next") ?? ""))

  if (!email || !password) {
    return { error: "Email and password are required." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: getAuthErrorMessage(error, "Unable to sign in.") }
  }

  redirect(next)
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const password = String(formData.get("password") ?? "")

  if (!fullName || !email || !password) {
    return { error: "Name, email, and password are required." }
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." }
  }

  const origin = await getRequestOrigin()
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  })

  if (error) {
    return { error: getAuthErrorMessage(error, "Unable to create an account.") }
  }

  if (!data.session) {
    return {
      notice:
        "Account created. Check your email to confirm your address, then sign in.",
    }
  }

  redirect("/dashboard")
}

export async function requestPasswordResetAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim()

  if (!email) {
    return { error: "Email is required." }
  }

  const origin = await getRequestOrigin()
  const supabase = await createClient()
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?next=/auth/update-password`,
  })

  if (error) {
    return { error: getAuthErrorMessage(error, "Unable to send a reset email.") }
  }

  return {
    notice: "If that email exists, we sent a password reset link.",
  }
}

export async function updatePasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const password = String(formData.get("password") ?? "")
  const confirmPassword = String(formData.get("confirmPassword") ?? "")

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." }
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." }
  }

  await requireUser()
  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })

  if (error) {
    return { error: getAuthErrorMessage(error, "Unable to update password.") }
  }

  redirect("/dashboard")
}

export async function updateProfileAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim()

  if (!fullName) {
    return { error: "Full name is required." }
  }

  try {
    await updateProfile({ full_name: fullName })
  } catch (error) {
    return { error: getAuthErrorMessage(error, "Unable to update profile.") }
  }

  return { notice: "Profile updated." }
}

export async function signOutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect("/login")
}
