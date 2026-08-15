import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

export async function POST(req: Request) {
  const session = await auth();
  const adminEmail = session?.user?.email;
  if (!isAdmin(adminEmail)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const theme = typeof body?.theme === "string" ? body.theme.trim() : "";
  if (!theme) return NextResponse.json({ error: "theme required" }, { status: 400 });

  const { error } = await supabase
    .from("daily_challenge")
    .upsert(
      { id: 1, theme, updated_at: new Date().toISOString(), updated_by: adminEmail } as never,
      { onConflict: "id" }
    );

  if (error) {
    console.error("[admin/daily-challenge] upsert error:", error);
    return NextResponse.json({ error: "Failed to update challenge" }, { status: 500 });
  }
  return NextResponse.json({ success: true, theme });
}
