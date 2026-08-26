import "server-only"

import { createClient } from "@supabase/supabase-js"

import type { Database } from "@/lib/supabase/database.types"
import { getSupabaseUrl } from "@/lib/supabase/env"

export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!serviceRoleKey) {
    throw new Error("Missing SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient<Database>(getSupabaseUrl(), serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
