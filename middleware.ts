import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

import { findNamedColorByHex, findNamedColorBySlug, normalizeHexColor } from "@/lib/color-names";

const HEX_COLOR_ROUTE = /^\/(colors|color-meanings)\/([^/]+)\/?$/;

// Arbitrary hex slugs (e.g. /color-meanings/1372f6) 404 in page-utils, but Next
// still renders that 404 and tries to persist it to the KV incremental cache -
// under crawl bursts that exhausts the KV write quota ("Failed to set to cache").
// Answer them here instead, before any render or KV write. Named colors and hex
// codes that duplicate a named color (which canonicalize) still pass through.
function isArbitraryHexSlug(pathname: string) {
  const match = HEX_COLOR_ROUTE.exec(pathname);
  if (!match) return false;

  let slug: string;
  try {
    slug = decodeURIComponent(match[2]).toLowerCase();
  } catch {
    return false;
  }
  if (findNamedColorBySlug(slug)) return false;

  const hex = normalizeHexColor(slug);
  return hex !== null && !findNamedColorByHex(hex);
}

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
  if (isArbitraryHexSlug(request.nextUrl.pathname)) {
    return new NextResponse("Not found", {
      status: 404,
      headers: {
        "Cache-Control": "public, max-age=86400",
        "X-Robots-Tag": "noindex",
      },
    });
  }

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
