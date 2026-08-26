import "server-only"

import { requireUser } from "@/lib/auth/session"
import { createClient } from "@/lib/supabase/server"
import type { Tables } from "@/lib/supabase/database.types"

export type Profile = Tables<"profiles">

export async function getCurrentProfile() {
  const { supabase, userId } = await requireUser()
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .maybeSingle()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function updateProfile(input: { full_name: string }) {
  const { supabase, userId } = await requireUser()
  const { data, error } = await supabase
    .from("profiles")
    .update({ full_name: input.full_name })
    .eq("id", userId)
    .select("*")
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function getCatalogSummary() {
  const supabase = await createClient()

  const [drugs, publications, trials] = await Promise.all([
    supabase.from("drugs").select("id", { count: "exact", head: true }),
    supabase.from("publications").select("id", { count: "exact", head: true }),
    supabase.from("clinical_trials").select("id", { count: "exact", head: true }),
  ])

  if (drugs.error || publications.error || trials.error) {
    throw new Error(
      drugs.error?.message ??
        publications.error?.message ??
        trials.error?.message ??
        "Unable to load catalog summary",
    )
  }

  return {
    drugs: drugs.count ?? 0,
    publications: publications.count ?? 0,
    clinicalTrials: trials.count ?? 0,
  }
}

export async function listDrugs() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("drugs")
    .select("id, name, generic_name, manufacturer, indication, source")
    .order("name")

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function listSavedItems() {
  const { supabase, userId } = await requireUser()
  const { data, error } = await supabase
    .from("saved_items")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}

export async function listAlerts() {
  const { supabase, userId } = await requireUser()
  const { data, error } = await supabase
    .from("alerts")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}
