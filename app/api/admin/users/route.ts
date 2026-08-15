import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

export async function DELETE(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const userId = typeof body?.userId === "string" ? body.userId : "";
  if (!userId) return NextResponse.json({ error: "userId required" }, { status: 400 });

  // Explicit cleanup of dependent rows rather than relying solely on FK cascades.
  await supabase.from("palettes").delete().eq("user_id", userId);
  await supabase.from("saved_gradients").delete().eq("user_id", userId);
  await supabase.from("point_history").delete().eq("user_id", userId);
  await supabase.from("user_points").delete().eq("user_id", userId);

  const { error } = await supabase.from("users").delete().eq("id", userId);
  if (error) {
    console.error("[admin/users] delete error:", error);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
