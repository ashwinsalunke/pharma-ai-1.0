import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return NextResponse.json(
      { connected: false, error: "DATABASE_URL is not configured" },
      { status: 503 },
    );
  }

  try {
    await db.query("SELECT 1");
    return NextResponse.json({ connected: true });
  } catch {
    return NextResponse.json(
      { connected: false, error: "Database connection failed" },
      { status: 503 },
    );
  }
}