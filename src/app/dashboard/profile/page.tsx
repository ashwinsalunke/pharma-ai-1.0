import { ProfileForm } from "@/components/auth/profile-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getCurrentProfile } from "@/lib/db/queries"

export const metadata = {
  title: "Profile",
}

export default async function ProfilePage() {
  const profile = await getCurrentProfile()

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This is your private profile row. Other users cannot read it.
        </p>
      </div>
      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Account details</CardTitle>
          <CardDescription>
            Email comes from authentication. You can update your display name.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm
            fullName={profile?.full_name ?? ""}
            email={profile?.email ?? ""}
          />
        </CardContent>
      </Card>
    </div>
  )
}
