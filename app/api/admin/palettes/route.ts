import { NextResponse } from "next/server";
import { auth, supabase } from "@/lib/auth";
import { isAdmin } from "@/lib/admin";

export async function DELETE(req: Request) {
  const session = await auth();
  if (!isAdmin(session?.user?.email)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const id = typeof body?.id === "string" ? body.id : "";
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { error } = await supabase.from("palettes").delete().eq("id", id);
  if (error) {
    console.error("[admin/palettes] delete error:", error);
    return NextResponse.json({ error: "Failed to delete palette" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
