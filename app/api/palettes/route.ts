import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { supabase } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ palettes: [] });

  const { data } = await supabase
    .from("palettes")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({ palettes: data ?? [] });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, colors } = body;
  if (!colors) return NextResponse.json({ error: "colors required" }, { status: 400 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const { data, error } = await supabase
    .from("palettes")
    .insert({ user_id: user.id, name: name ?? "Untitled", colors } as never)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ palette: data });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const { data: user } = await supabase.from("users").select("id").eq("email", session.user.email).single().overrideTypes<{ id: string }, { merge: false }>();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  await supabase.from("palettes").delete().eq("id", id).eq("user_id", user.id);
  return NextResponse.json({ success: true });
}
