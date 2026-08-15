import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";
  const total = Number.isFinite(body?.total) ? Math.max(0, Math.trunc(body.total)) : null;
  const streak = Number.isFinite(body?.streak) ? Math.max(0, Math.trunc(body.streak)) : null;

  if (!userId || (total === null && streak === null)) {
    return NextResponse.json({ error: "userId and at least one of total/streak required" }, { status: 400 });
  }

  const patch: Record<string, unknown> = { user_id: userId };
  if (total !== null) patch.total = total;
  if (streak !== null) {
    patch.streak = streak;
    patch.streak_date = new Date().toISOString().slice(0, 10);
  }

  const { error } = await supabase.from("user_points").upsert(patch as never, { onConflict: "user_id" });
  if (error) {
    console.error("[admin/user-points] upsert error:", error);
    return NextResponse.json({ error: "Failed to update points" }, { status: 500 });
  }

  return NextResponse.json({ success: true, total, streak });
}
