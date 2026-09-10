import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// These routes render on-demand for any hex/slug not already built at build
// time (dynamicParams = true, revalidate = false), so an uncached hit costs a
// full render plus a permanent Workers KV write. A crawler enumerating many
// distinct slugs quickly burns the KV daily write quota and the per-request
// CPU budget. Rate limit per client IP before any of that work happens.
export const config = {
  matcher: [
    "/colors/:slug",
    "/color-meanings/:slug",
    "/color-psychology/:slug",
    "/comparisons/:slug",
    "/best-colors-for/:slug",
    "/css-colors/:slug",
    "/brand-colors/:slug",
    "/resources/:slug",
    "/tailwind/:slug",
    "/faqs/:slug",
    "/guides/:slug",
    "/explainers/:slug",
    "/accessibility/:slug",
    "/gradients/:slug",
    "/palettes/:slug",
    "/color-combinations/:slug",
    "/developer/:slug",
  ],
};

export default async function middleware(request: NextRequest) {
  const { env } = getCloudflareContext();
  const rateLimiter = (env as Record<string, unknown>).SLUG_RATE_LIMITER as
    | { limit: (options: { key: string }) => Promise<{ success: boolean }> }
    | undefined;

  if (!rateLimiter) {
    return NextResponse.next();
  }

  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const { success } = await rateLimiter.limit({ key: ip });

  if (!success) {
    return new NextResponse("Too many requests, please slow down.", {
      status: 429,
      headers: { "Retry-After": "60" },
    });
  }

  return NextResponse.next();
}
