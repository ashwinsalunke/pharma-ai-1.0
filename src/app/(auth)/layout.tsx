import Link from "next/link"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          ZNTX Pharma AI
        </Link>
        <p className="mt-1 text-sm text-muted-foreground">
          Pharmaceutical intelligence foundation
        </p>
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  )
}
