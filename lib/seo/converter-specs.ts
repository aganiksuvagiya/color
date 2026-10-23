import type { ColorFormat } from "../color-convert";

// The converter pages, as [from, to, example color]. Plain data with only a relative type
// import, so next.config.ts can read the slugs for its rewrite without pulling in app code.
// Each pair gets its own example color so the worked examples (and the long-tail
// "what is #XXXXXX in RGB" answers) differ from page to page.
export const converterPairSpecs: Array<[ColorFormat, ColorFormat, string]> = [
  ["hex", "rgb", "#3B82F6"],
  ["rgb", "hex", "#E8531F"],
  ["hex", "hsl", "#0F766E"],
  ["hsl", "hex", "#7C3AED"],
  ["rgb", "hsl", "#FDE68A"],
  ["hsl", "rgb", "#16A34A"],
  ["hex", "cmyk", "#E8531F"],
  ["cmyk", "hex", "#1D4ED8"],
  ["rgb", "cmyk", "#7C3AED"],
  ["cmyk", "rgb", "#0F766E"],
  ["hex", "oklch", "#3B82F6"],
  ["oklch", "hex", "#E8531F"],
  ["rgb", "oklch", "#16A34A"],
  ["oklch", "rgb", "#FDE68A"],
];

export const converterSlugList = converterPairSpecs.map(([from, to]) => `${from}-to-${to}`);
