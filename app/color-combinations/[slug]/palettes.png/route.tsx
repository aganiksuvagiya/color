import { renderPaletteSheet } from "@/components/seo/palette-sheet-image";
import { getPaletteSheetSlugs, getPaletteSheetSource, paletteSheetPrefix } from "@/lib/seo/palette-sheets";

// Every palette on the page in one PNG, built once at deploy time. Unknown slugs 404 instead
// of drawing an image on the Worker, which the free plan's CPU limit can't afford.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getPaletteSheetSlugs("colorCombinations").map((slug) => ({ slug }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const source = getPaletteSheetSource("colorCombinations", slug);
  if (!source) return new Response("Not found", { status: 404 });
  return renderPaletteSheet({
    eyebrow: "Color combinations",
    title: source.title,
    palettes: source.palettes,
    path: `${paletteSheetPrefix.colorCombinations}/${slug}`,
  });
}
