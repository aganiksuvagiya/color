import { converterPairs } from "@/lib/seo/converter-pages";
import { colorMixing, colorWheel, pastelColors } from "@/lib/seo/guide-pages";
import { siteConfig } from "@/lib/seo/site-config";
import { toolPageContent } from "@/lib/seo/tool-pages";

const d = siteConfig.domain;

// Long-form companion to /llms.txt: the text of HueFlow's main tool pages (answer, steps, FAQs) and
// a short list of color facts, in one plain-text file so an LLM can read and cite it without crawling.
const FACTS = [
  "HEX is a six-digit hexadecimal code for a color (for example #3B82F6). Each pair of digits is the red, green or blue channel from 00 to FF (0 to 255).",
  "RGB gives red, green and blue levels from 0 to 255, for example rgb(59, 130, 246).",
  "HSL is hue (0-360 degrees), saturation (0-100%) and lightness (0-100%), for example hsl(217, 91%, 60%).",
  "CMYK is cyan, magenta, yellow and black in percent and is used in print. Browsers do not support a cmyk() function in CSS.",
  "OKLCH is a perceptual color format (lightness, chroma, hue) supported by CSS Color 4, for example oklch(62.3% 0.188 259.8).",
  "WCAG 2 contrast ratio thresholds: level AA needs 4.5:1 for normal text and 3:1 for large text and UI components; level AAA needs 7:1 for normal text and 4.5:1 for large text.",
  "Large text in WCAG means at least 18pt (24px) regular or 14pt (about 18.66px) bold.",
  "Complementary colors sit opposite each other on the color wheel; analogous colors sit next to each other; triadic colors are spaced 120 degrees apart; tetradic schemes use two complementary pairs.",
];

export async function GET() {
  const tools = Object.values(toolPageContent);
  const out: string[] = [
    "# HueFlow (hueflow.site): full text for LLMs",
    "",
    "> HueFlow is a free online color palette generator and color toolkit for designers, developers and marketers. It needs no signup and runs in the browser.",
    "",
    "## About HueFlow",
    "HueFlow (hueflow.site) combines a color palette generator, color picker, color converter, WCAG contrast checker, gradient generator, color wheel, image palette extractor, Tailwind color tools, design token generator and color reference pages. All tools are free.",
    `Home: ${d}/`,
    `Palette generator: ${d}/generator`,
    `Contact: suvagiyaaganik@gmail.com`,
    "",
    "## Color facts",
    ...FACTS.map((f) => `- ${f}`),
    "",
    "## Tools",
    "",
  ];

  for (const t of tools) {
    out.push(`### ${t.title}`, `URL: ${d}${t.path}`, "", t.answer, "", "How to use:");
    t.howToSteps.forEach((s, i) => out.push(`${i + 1}. ${s}`));
    out.push("", "FAQ:");
    t.faq.forEach((f) => out.push(`Q: ${f.question}`, `A: ${f.answer}`, ""));
  }

  out.push("## Color guides and references", "");
  for (const g of [colorMixing, colorWheel, pastelColors]) {
    out.push(`### ${g.title}`, `URL: ${d}${g.path}`, "", g.answer, "");
    out.push(...g.faq.flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]));
  }

  out.push("## Color converters", "");
  for (const p of converterPairs) {
    out.push(`### ${p.h1}`, `URL: ${d}${p.path}`, "", p.answer, "");
    out.push(...p.faq.slice(0, 3).flatMap((f) => [`Q: ${f.question}`, `A: ${f.answer}`, ""]));
  }

  return new Response(out.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
