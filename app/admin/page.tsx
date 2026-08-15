import { redirect } from "next/navigation";
import { auth, supabase } from "@/lib/auth";
import { getRotatingTheme } from "@/lib/daily-challenge";
import { isAdmin } from "@/lib/admin";
import { AdminDashboard, type AdminUser, type AdminPalette, type AdminPointHistory } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await auth();
  const adminEmail = session?.user?.email;
  if (!isAdmin(adminEmail)) redirect("/");

  const [usersRes, palettesRes, pointsRes, historyRes, challengeRes] = await Promise.all([
    supabase
      .from("users")
      .select("id, name, email, image, emailVerified")
      .order("emailVerified", { ascending: false })
      .overrideTypes<AdminUser[], { merge: false }>(),
    supabase
      .from("palettes")
      .select("id, user_id, email, name, colors, created_at")
      .order("created_at", { ascending: false })
      .overrideTypes<AdminPalette[], { merge: false }>(),
    supabase
      .from("user_points")
      .select("user_id, total, streak")
      .overrideTypes<{ user_id: string; total: number; streak: number }[], { merge: false }>(),
    supabase
      .from("point_history")
      .select("id, user_id, action, points, created_at")
      .order("created_at", { ascending: false })
      .limit(500)
      .overrideTypes<AdminPointHistory[], { merge: false }>(),
    supabase
      .from("daily_challenge")
      .select("theme, updated_at, updated_by")
      .eq("id", 1)
      .maybeSingle()
      .overrideTypes<{ theme: string; updated_at: string | null; updated_by: string | null } | null, { merge: false }>(),
  ]);

  return (
    <AdminDashboard
      adminUser={{ name: session?.user?.name ?? null, email: adminEmail, image: session?.user?.image ?? null }}
      users={usersRes.data ?? []}
      palettes={palettesRes.data ?? []}
      points={pointsRes.data ?? []}
      history={historyRes.data ?? []}
      challenge={{
        theme: challengeRes.data?.theme ?? getRotatingTheme(),
        updatedAt: challengeRes.data?.updated_at ?? null,
        updatedBy: challengeRes.data?.updated_by ?? null,
      }}
    />
  );
}
