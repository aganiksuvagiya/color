import { richColorCombinations } from "@/lib/seo/color-combinations-rich";
import { findEntry, getCollection, type ReadyPalette } from "@/lib/seo/content";

// The pages that get a palette sheet (components/seo/palette-sheet-image.tsx): industry and
// color-combination pages with ready-made palettes. The page and its image read the same
// palettes from here, so they can't drift apart.

export type PaletteSheetKind = "bestColorsFor" | "colorCombinations";

export const paletteSheetPrefix: Record<PaletteSheetKind, string> = {
  bestColorsFor: "/best-colors-for",
  colorCombinations: "/color-combinations",
};

export function getPaletteSheetSource(kind: PaletteSheetKind, slug: string): { title: string; palettes: ReadyPalette[] } | undefined {
  const base = findEntry(kind, slug);
  if (!base) return undefined;
  // Hand-written pairs replace the template's title and palettes on the page, so here too.
  const rich = kind === "colorCombinations" ? richColorCombinations[slug] : undefined;
  const palettes = rich?.palettes ?? base.palettes ?? [];
  return palettes.length ? { title: rich?.title ?? base.title, palettes } : undefined;
}

export function getPaletteSheetSlugs(kind: PaletteSheetKind): string[] {
  return getCollection(kind)
    .map((entry) => entry.slug)
    .filter((slug) => getPaletteSheetSource(kind, slug));
}

export function paletteSheetPath(kind: PaletteSheetKind, slug: string) {
  return `${paletteSheetPrefix[kind]}/${slug}/palettes.png`;
}
