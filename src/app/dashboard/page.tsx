import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  getCatalogSummary,
  getCurrentProfile,
  listAlerts,
  listDrugs,
  listSavedItems,
} from "@/lib/db/queries"

export const metadata = {
  title: "Dashboard",
}

export default async function DashboardPage() {
  const [profile, summary, drugs, savedItems, alerts] = await Promise.all([
    getCurrentProfile(),
    getCatalogSummary(),
    listDrugs(),
    listSavedItems(),
    listAlerts(),
  ])

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}. This
          foundation stores reference data and your private saved items. AI
          features are not wired yet.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Drugs</CardTitle>
            <CardDescription>Reference catalog</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">{summary.drugs}</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Publications</CardTitle>
            <CardDescription>Literature records</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {summary.publications}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Clinical trials</CardTitle>
            <CardDescription>Trial records</CardDescription>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {summary.clinicalTrials}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Demo drugs</CardTitle>
            <CardDescription>
              Public reference rows ready for later API ingestion.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {drugs.map((drug) => (
              <div key={drug.id} className="rounded-lg border p-3">
                <p className="font-medium">{drug.name}</p>
                <p className="text-sm text-muted-foreground">
                  {drug.generic_name} · {drug.manufacturer}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your private data</CardTitle>
            <CardDescription>
              Saved items and alerts are empty until you add them later.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 text-sm text-muted-foreground">
            <p>Saved items: {savedItems.length}</p>
            <p>Alerts: {alerts.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
