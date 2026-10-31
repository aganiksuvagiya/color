// /color-meanings/<name> pages whose content moved to a full rewrite at /colors/<name>
// (color-pages-rich.ts, which covers meaning and history too). The old meaning pages were
// noindexed templates, but Search Console showed Google ranking them for these colors
// (tan 332 impressions, light yellow 337, crimson 206, cyan 185, forest green 159 in the
// six months to Oct 29, 2026), so a permanent redirect hands that over instead of dropping it.
// Plain data with no imports, so next.config.ts can read it.
export const redirectedColorMeanings = [
  "tan",
  "light-yellow",
  "crimson",
  "cyan",
  "forest-green",
  "alice-blue",
  "lime",
  "light-gray",
];

export function isRedirectedColorMeaning(slug: string): boolean {
  return redirectedColorMeanings.includes(slug);
}
