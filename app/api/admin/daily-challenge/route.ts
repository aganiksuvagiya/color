import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";

const ADMIN_EMAIL = "suvagiyaaganik@gmail.com";

export async function POST(req: Request) {
  const session = await auth();
  if (session?.user?.email !== ADMIN_EMAIL) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const theme = typeof body?.theme === "string" ? body.theme.trim() : "";
  if (!theme) return NextResponse.json({ error: "theme required" }, { status: 400 });

  const { error } = await supabase
    .from("daily_challenge")
    .upsert(
      { id: 1, theme, updated_at: new Date().toISOString(), updated_by: session.user.email } as never,
      { onConflict: "id" }
    );

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, theme });
}
