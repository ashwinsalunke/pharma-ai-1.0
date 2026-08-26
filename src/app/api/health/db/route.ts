import { NextResponse } from "next/server"

import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export async function GET() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    return NextResponse.json(
      { connected: false, error: "NEXT_PUBLIC_SUPABASE_URL is not configured" },
      { status: 503 },
    )
  }

  try {
    const supabase = await createClient()
    const { error } = await supabase.from("drugs").select("id").limit(1)

    if (error) {
      return NextResponse.json(
        { connected: false, error: error.message },
        { status: 503 },
      )
    }

    return NextResponse.json({ connected: true })
  } catch {
    return NextResponse.json(
      { connected: false, error: "Database connection failed" },
      { status: 503 },
    )
  }
}
