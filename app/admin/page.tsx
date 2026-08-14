import { redirect } from "next/navigation";
import { auth, supabase } from "@/lib/auth";
import { AdminDashboard, type AdminUser, type AdminPalette, type AdminPointHistory } from "@/components/admin-dashboard";

export const dynamic = "force-dynamic";

const ADMIN_EMAIL = "suvagiyaaganik@gmail.com";

export default async function AdminPage() {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) redirect("/");

  const [usersRes, palettesRes, pointsRes, historyRes] = await Promise.all([
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
    supabase.from("user_points").select("user_id, total").overrideTypes<{ user_id: string; total: number }[], { merge: false }>(),
    supabase
      .from("point_history")
      .select("id, user_id, action, points, created_at")
      .order("created_at", { ascending: false })
      .limit(500)
      .overrideTypes<AdminPointHistory[], { merge: false }>(),
  ]);

  return (
    <AdminDashboard
      adminUser={{ name: session.user?.name ?? null, email: session.user.email, image: session.user?.image ?? null }}
      users={usersRes.data ?? []}
      palettes={palettesRes.data ?? []}
      points={pointsRes.data ?? []}
      history={historyRes.data ?? []}
    />
  );
}
