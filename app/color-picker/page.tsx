import type { Metadata } from "next";
import { StructuredData } from "@/components/seo/structured-data";
import { ToolLanding } from "@/components/seo/tool-landing";
import { buildBreadcrumbSchema, buildFaqSchema, buildSpeakableSchema, buildWebApplicationSchema, buildWebPageSchema } from "@/lib/seo/schema";
import { siteConfig } from "@/lib/seo/site-config";

export const metadata: Metadata = {
  title: "Color Picker - Free Online HEX, RGB & HSL Color Tool",
  description:
    "Pick any color and instantly get HEX, RGB, and HSL values, plus matching shades and tints. Free online color picker for designers and developers - no signup.",
  keywords: [
    "color picker",
    "hex color picker",
    "online color picker",
    "hsl color picker",
    "rgb color picker",
    "free color picker tool",
    "website color picker",
    "hex to rgb converter",
    "pick a color online",
  ],
  alternates: { canonical: `${siteConfig.domain}/color-picker` },
  openGraph: {
    title: "Color Picker - Free Online HEX, RGB & HSL Color Tool",
    description: "Pick any color and instantly get HEX, RGB, and HSL values, plus matching shades and tints.",
    url: `${siteConfig.domain}/color-picker`,
    type: "website",
  },
};

const url = `${siteConfig.domain}/color-picker`;

const faq = [
  {
    question: "What is the best free online color picker?",
    answer:
      "HueFlow's color picker lets you choose any color and instantly see its HEX, RGB, and HSL values, along with a full range of shades and tints - all free, with no signup required.",
  },
  {
    question: "How do I convert a HEX color to RGB?",
    answer:
      "Enter or pick a color in HueFlow's color picker and the RGB, HSL, and nearest color name are generated automatically alongside the HEX value.",
  },
  {
    question: "Can I find shades and tints of a color?",
    answer:
      "Yes - the color picker generates a full scale of lighter and darker variations from your chosen color, ready to use for buttons, surfaces, and text.",
  },
  {
    question: "Is HueFlow's color picker free to use?",
    answer: "Yes, completely free with unlimited use and no account required.",
  },
];

const features = [
  { icon: "◎", title: "HEX, RGB & HSL", body: "Every format shown instantly - copy whichever value your project needs." },
  { icon: "◈", title: "Shades & tints", body: "Generate a full lightness scale from any base color in one click." },
  { icon: "✦", title: "Nearest color name", body: "See the closest named color for quicker communication with your team." },
  { icon: "⬡", title: "Design-system ready", body: "Turn one picked color into a reusable set for UI kits and brand systems." },
];

export default function ColorPickerPage() {
  return (
    <>
      <StructuredData
        data={buildWebPageSchema({
          title: "Color Picker - Free Online HEX, RGB & HSL Color Tool",
          description: "Pick any color and instantly get HEX, RGB, and HSL values, plus matching shades and tints.",
          url,
        })}
      />
      <StructuredData data={buildFaqSchema(faq)} />
      <StructuredData data={buildWebApplicationSchema({ name: "HueFlow Color Picker", description: "Pick any color and instantly get HEX, RGB, HSL, HSB and CMYK values, plus matching shades and tints.", url, featureList: ["HEX, RGB, HSL, HSB and CMYK values", "Shades and tints", "EyeDropper screen picker (Chrome and Edge)"] })} />
      <StructuredData data={buildSpeakableSchema(["h1", ".hub-description"])} />
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Picker", item: url },
        ])}
      />

      <ToolLanding
        crumb="Color Picker"
        badge="Free · No signup · HEX, RGB, HSL"
        title="Color Picker"
        subtitle="Pick any color and instantly get HEX, RGB, and HSL values, plus generated shades and tints for design systems and UI work."
        primary={{ label: "Open Color Picker", href: "/tools/picker" }}
        secondary={{ label: "Browse Colors →", href: "/colors" }}
        dots={["#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"]}
        featuresTitle="Everything a color picker should do"
        features={features}
        faq={faq}
        closing={{ title: "Start picking colors, free", body: "No account. No limits. Just colors.", cta: { label: "Open Color Picker →", href: "/tools/picker" } }}
      />
    </>
  );
}
