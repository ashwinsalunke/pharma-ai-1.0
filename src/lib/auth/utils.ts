export function getSafeNextPath(
  value: string | null | undefined,
  fallback = "/dashboard",
) {
  if (!value || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) {
    return fallback
  }

  return value
}

export async function getRequestOrigin() {
  const { headers } = await import("next/headers")
  const headerStore = await headers()
  const origin = headerStore.get("origin")
  if (origin) {
    return origin
  }

  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host")
  const protocol = headerStore.get("x-forwarded-proto") ?? "http"
  if (host) {
    return `${protocol}://${host}`
  }

  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (error && typeof error === "object" && "message" in error) {
    const message = String(error.message)
    if (message) {
      return message
    }
  }

  return fallback
}
