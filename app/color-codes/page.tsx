import type { Metadata } from "next";

import { ColorCodesView, type ChartFamily } from "@/components/seo/color-codes-page";
import { StructuredData } from "@/components/seo/structured-data";
import { namedColors } from "@/lib/color-names";
import { colorFamily } from "@/lib/palette-library";
import { buildPageMetadata } from "@/lib/seo/page-utils";
import { buildBreadcrumbSchema, buildCollectionPageSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";
import { resolveShade } from "@/lib/shades-data";

export const revalidate = false;

const FAMILY_ORDER = ["red", "pink", "orange", "yellow", "brown", "green", "teal", "blue", "purple", "white", "gray", "black"];

const total = namedColors.length;
const title = `Color Codes Chart: ${total} Named Colors with HEX, RGB & HSL`;
const description = `HTML color codes for ${total} named colors - HEX, RGB and HSL values grouped by color family, with one-click copy and a page for every color.`;
const intro =
  "A color code is how screens and software describe a color. HEX codes like #FF6347 are the most common on the web; RGB writes the same color as red, green and blue values from 0 to 255, and HSL as hue, saturation and lightness. Every named color below shows all three - click any code to copy it, or open a color for shades, palettes and contrast checks.";

const faq = [
  { question: "What is a HEX color code?", answer: "A HEX color code is a # followed by six hexadecimal digits: two each for red, green and blue. #FF0000 is pure red, #00FF00 pure green, #0000FF pure blue, #000000 black and #FFFFFF white." },
  { question: "How do I convert a HEX code to RGB?", answer: "Split the six digits into three pairs and convert each pair from base 16 to base 10. For #FF6347: FF = 255, 63 = 99, 47 = 71, so the color is rgb(255, 99, 71). HueFlow's color converter does this instantly." },
  { question: "What is the difference between HEX, RGB and HSL?", answer: "They describe the same colors in different ways. HEX and RGB both store red, green and blue amounts; HSL stores hue (0-360°), saturation and lightness, which makes it easier to create lighter or darker versions of a color." },
  { question: "Can I use these color names in CSS?", answer: "Most of them, yes - names like Tomato, SteelBlue or RebeccaPurple are built into CSS, so color: tomato; works. A few common design names (such as Camel) are not CSS keywords, so use their HEX code instead." },
];

export const metadata: Metadata = buildPageMetadata({
  title,
  description,
  path: "/color-codes",
  keywords: ["color codes", "html color codes", "hex color codes", "color code chart", "rgb color codes", "hex colors", "css color names"],
});

export default function ColorCodesPage() {
  const url = `${siteConfig.domain}/color-codes`;

  const families: ChartFamily[] = FAMILY_ORDER.map((slug) => ({
    slug,
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    colors: namedColors
      .filter((c) => colorFamily(c.hex) === slug)
      .map((c) => ({ c, s: resolveShade(c.name, c.hex) }))
      .sort((a, b) => b.s.lightness - a.s.lightness)
      .map(({ c, s }) => ({ name: c.name, slug: c.slug, hex: s.hex, rgb: s.rgb, hsl: s.hsl })),
  })).filter((f) => f.colors.length > 0);

  return (
    <>
      <StructuredData data={buildWebPageSchema({ title, description, url })} />
      <StructuredData
        data={buildCollectionPageSchema({
          title,
          description,
          url,
          items: families.flatMap((f) => f.colors).map((c) => ({ title: `${c.name} ${c.hex}`, href: `/colors/${c.slug}` })),
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Codes", item: url },
        ])}
      />
      <ColorCodesView
        families={families}
        total={total}
        intro={intro}
        faq={faq}
        related={[
          { title: "Color converter", href: "/color-converter" },
          { title: "Color picker", href: "/color-picker" },
          { title: "Color shades", href: "/shades" },
          { title: "Color palettes", href: "/color-palettes" },
          { title: "Palette generator", href: "/generator" },
          { title: "Contrast checker", href: "/tools/contrast" },
        ]}
      />
    </>
  );
}
