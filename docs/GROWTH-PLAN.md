# HueFlow growth plan: capture the biggest color searches

This is the working plan for the next big HueFlow feature work. It's here so any new chat or session can pick up where the last one stopped. **Update the status checklist at the bottom whenever a step is finished.**

## Branch and deploy rules (read first)

- All of this work happens on the **`feature/new-feature`** branch, which was made from `develop`.
- When a phase is done and checked, merge it into **`develop`**. Production deploys come **only from `develop`**, and only when the owner asks.
- **Never merge `feature/video`** into anything. It holds video projects only.
- Never commit or deploy without the owner asking.

## Why

Research (October 2026, Ahrefs and Semrush data, US monthly searches) shows HueFlow's tools already match the leader, coolors.co:
- The generator has space-to-generate, color locking, undo, image upload, accessibility and colorblind panels, UI preview, an AI prompt bar and 13 export formats.
- There are 20+ tools under `app/tools/`.

The gap is **pages for the searches people make most**:

| Search | Volume/month | Who wins today | HueFlow before this plan |
|---|---|---|---|
| shades of pink / purple / blue | ~240K / ~140K / 81K+ | cssgradient.io (a small site) | No page |
| color palette / palettes / schemes | 192K / 23K / 31K | coolors, colorhunt | 8 palette pages |
| pastel colors | 79K | colorhunt (#3) | No page |
| red (single color names) | 570K | htmlcolorcodes | `/colors/red` is thin |
| hex color / color codes | 60K / 32K | htmlcolorcodes | No chart page |

What we take from each competitor:
- **cssgradient.io:** "shades of" pages
- **colorhunt:** a tagged palette library
- **htmlcolorcodes:** a color chart
- **coolors:** one click from any palette into the generator

All of it is built on the systems already in this repo.

## Phase 1: "Shades of [color]" pages

**URLs:** `/shades-of-blue`, `/shades-of-pink` and so on.
- The pages live at `app/shades/[color]/page.tsx`.
- `next.config.ts` rewrites `/shades-of-:color` to `/shades/:color`.
- `/shades/:color` redirects (301) to `/shades-of-:color`.
- `/shades-of-grey` redirects (301) to `/shades-of-gray`.
- The hub is at `/shades`.
- `dynamicParams = false`, so unknown colors return 404 and the middleware rate limiter isn't needed.

**Colors (12):** blue, pink, purple, green, red, yellow, orange, brown, gray, black, white, teal.

**Data:** `lib/shades-data.ts` holds, for each color:
- the named shades as `[name, hex]` pairs, using standard CSS, X11, Crayola and pigment names
- an intro and usage text
- 4 ready palettes
- 4 FAQs

Helpers in the same file: `getShadeFamily`, `getResolvedShades` (sorted light to dark, with RGB and HSL), `resolveShade` and `shadesPath`.

**What each page shows:**
- A spectrum strip using the palettes-page hover pattern: `group/swatch relative flex-1 transition-[flex] duration-300 hover:flex-[3]`, with a dark pill `bg-black/55` that shows the HEX, then "✓ Copied" after a click.
- A shade grid grouped light / medium / dark, with click-to-copy.
- A names table (Name, HEX, RGB, HSL).
- A tint scale from `generateShades()` in `lib/shades.ts`.
- Ready palettes, each with an "Open in generator" link: `/generator?label=…&c=HEX-HEX`.
- An FAQ.
- Related links: `/colors/[c]`, `/color-meanings/[c]`, `/tailwind/[c]` where it exists, and `/palettes`.

**Structured data:** FAQ, breadcrumb, CollectionPage and WebPage, from `lib/seo/schema.ts`. **Metadata:** `buildPageMetadata` in `lib/seo/page-utils.tsx`.

**Style:** the light theme, with a `bg-[#f0ede8]` page, white `rounded-2xl` cards, `#1c1712` text and the `#e8531f` accent, matching `components/seo/content-page.tsx`.

## Phase 2: Palette library with tag pages

- `lib/palette-library.ts` holds about 200 hand-picked palettes of 4–5 colors each, tagged by color, style (pastel, neon, earthy, vintage, dark, minimal) and season.
- Tag pages at `app/color-palettes/[tag]/page.tsx`, for URLs like `/color-palettes/pastel` and `/color-palettes/blue`. Each has palette cards with copy and "Open in generator", related tags, an intro and an FAQ.
- A hub at `/color-palettes`.
- They sit at a new path on purpose. `/palettes/[slug]` holds single named palettes, and those URLs must not change.
- Link the library from the `/palettes` hub (`components/seo/palettes-hub-page.tsx`).

## Phase 3: Color chart and stronger color pages

- `/color-codes`: a chart of every named color in `lib/color-names.ts`, grouped by hue family using the `hueRules` in `lib/seo/programmatic.ts`. It shows HEX, RGB and HSL, with copy.
- The 13 hand-written colors in `lib/seo/content.ts` get `relatedLinks` to their shades page and palette-library tag page.

## Phase 4: Linking, sitemaps and navigation

- Add `app/sitemap-shades.xml/route.ts` plus palette-library sitemap entries, following `app/sitemap-colors.xml/route.ts` and `lib/seo/sitemaps.ts`, and list them in the `app/sitemap.xml/route.ts` index.
- Add `/shades`, `/color-palettes` and `/color-codes` to `staticPages` in `lib/seo/sitemaps.ts`.
- Add "Shades", "Palettes library" and "Color codes" links to the header (`components/header.tsx`) and footer (`components/footer.tsx`).
- Add a "Popular: Shades of Blue · Pink · Purple" row to the homepage (`components/hueflow-homepage.tsx`).

## Verification (each phase)

1. Run `npm run build` (it type-checks) and `npm run lint`.
2. Run `npm run dev` and check the new pages in the browser:
   - copy, hover and "Open in generator" all work
   - the layout holds on mobile
3. SEO checks:
   - each page has a title, description, canonical and JSON-LD
   - the 301 redirects work
   - unknown slugs return 404
   - the sitemap lists every new page
4. `npm run preview` (the OpenNext Cloudflare build) before any deploy.

## Status

- [x] **Phase 1, shades pages** (built 2026-10-06, not committed yet)
  - [x] Data: `lib/shades-data.ts` (12 colors, 25–38 shades each, 4 palettes, 4 FAQs)
  - [x] View: `components/seo/shades-page.tsx` (`ShadesPageView`, `ShadesHubView`)
  - [x] Routes: `app/shades/[color]/page.tsx`, `app/shades/page.tsx`; rewrites and redirects in `next.config.ts`
  - [x] Verified:
    - `tsc` and `eslint` are clean, and `next build` passes (pages are static SSG)
    - In the browser: copy, hover strip, "Open in generator" and the mobile layout all work
    - `/shades/blue` and `/shades-of-grey` return 308 (permanent), and unknown colors return 404
    - The canonical is correct, with FAQ, breadcrumb and collection JSON-LD
  - [x] The redirects and rewrite are verified under the OpenNext/Cloudflare preview (see Phase 4)
  - Note: sitemap and navigation links for these pages come in Phase 4
  - **Redesign (2026-10-07, owner asked for a cleaner page):**
    - The hero has the title, intro, stats (shades, palettes, formats) and one slim spectrum strip. The orange answer box is gone.
    - One "shade explorer" replaces the grouped grids plus the separate table:
      - All / Light / Medium / Dark filter (empty groups are hidden)
      - HEX / RGB / HSL format switch (it changes the shown and copied code)
      - Grid / List view (both views stay in the DOM for SEO)
    - Simpler cards: swatch, name and code. The tint scale section was removed.
    - Palettes sit in a 2-column grid. Guide and FAQ sit side by side. Other families appear as chips.
    - The `/shades` hub got the same cleaner style.
- [x] **Phase 2, palette library and tag pages** (built 2026-10-07, not committed yet)
  - [x] Data: `lib/palette-library.ts`
    - 220 palettes and 24 tags: 8 styles, 4 seasons, 12 colors
    - Color tags are computed by `colorFamily()`
    - Color tag pages lead with the palettes where that color dominates
    - Every tag has 11–40 palettes
  - [x] Shared swatch strip and copy logic: `components/seo/swatch-strip.tsx` (the shades page now uses it too)
  - [x] View: `components/seo/palette-library-page.tsx` (`PaletteTagView`, `PaletteLibraryHubView`)
  - [x] Routes: `app/color-palettes/page.tsx` (hub) and `app/color-palettes/[tag]/page.tsx` (`dynamicParams = false`)
  - [x] The `/palettes` hub links into the library (`LIBRARY_LINKS` in `palettes-hub-page.tsx`)
  - [x] Verified:
    - `tsc` and `eslint` are clean, and `next build` passes (static)
    - All tag pages return 200, and unknown tags return 404
    - "Copy all", per-color copy and "Open in generator" work, with no console errors
- [x] **Phase 3, color chart and color-page links** (built 2026-10-07, not committed yet)
  - [x] `/color-codes`: `app/color-codes/page.tsx` and `components/seo/color-codes-page.tsx`
    - all 140 named colors, grouped into 12 families with `colorFamily()`, sorted light to dark
    - tiles link to `/colors/[slug]`
    - copy buttons for HEX, RGB and HSL
    - a full table and an FAQ
  - [x] Every `/colors/*` page now links to its family's `/shades-of-*` and `/color-palettes/*` pages
    - done once, in `buildColorRelatedLinks` in `lib/seo/programmatic.ts`
    - `content-page.tsx` gets new "Shades" and "Palette library" related-link groups
  - [x] Verified:
    - `tsc` and `eslint` are clean, and `next build` passes
    - `/color-codes` lists 140 rows
    - navy → blue, tomato → red and camel → brown links are correct
    - no console errors
- [x] **Phase 4, sitemaps, navigation and homepage links** (built 2026-10-07, not committed yet)
  - [x] Sitemaps
    - New `app/sitemap-shades.xml/route.ts` (12 URLs), added to the index (`sitemapFiles`) and to `app/robots.ts`
    - `palettesSitemap` now includes the 24 `/color-palettes/<tag>` pages
    - `/shades`, `/color-palettes` and `/color-codes` are in `staticPages`
  - [x] Header: "Shades" link (`components/header.tsx`)
    - It shows only from `lg` up (`desktopClass`), because at md widths it pushed "Sign in" off-screen
    - It's always in the mobile menu
  - [x] Footer Explore column: Palette Library, Color Shades, Color Codes (`components/footer.tsx`)
  - [x] Homepage: a "Popular:" row under the Discover section (`POPULAR_LINKS` in `components/hueflow-homepage.tsx`)
  - [x] Verified:
    - `tsc` and `eslint` are clean
    - All the sitemaps list the new URLs
    - The header has no overlap at 820px or 1024px
  - [x] **Cloudflare check** (`opennextjs-cloudflare build` then `opennextjs-cloudflare preview`):
    - every new page returns 200
    - `/shades/blue` and `/shades-of-grey` return 308
    - unknown slugs return 404
    - Note: plain `wrangler dev` without the cache-populate step shows the SSG pages as 404. That's a test-setup artifact; `npm run deploy` populates the cache.
- [ ] Merge into `develop` (owner approval)
- [ ] Deploy from `develop` (owner approval)
