import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/auth";

const PAGE_SIZE = 24;

export async function GET(req: NextRequest) {
  const page = Math.max(1, parseInt(req.nextUrl.searchParams.get("page") ?? "1"));
  const from = (page - 1) * PAGE_SIZE;
  const to = from + PAGE_SIZE - 1;

  const { data, count } = await supabase
    .from("palettes")
    .select("id, name, colors, created_at", { count: "exact" })
    .eq("is_public", true)
    .order("created_at", { ascending: false })
    .range(from, to);

  return NextResponse.json({
    palettes: data ?? [],
    hasMore: (count ?? 0) > to + 1,
  });
}
