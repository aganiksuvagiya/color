import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { StructuredData } from "@/components/seo/structured-data";
import { buildBreadcrumbSchema, buildFaqSchema, buildWebPageSchema } from "@/lib/seo/schema";
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
      <StructuredData
        data={buildBreadcrumbSchema([
          { name: "Home", item: siteConfig.domain },
          { name: "Color Picker", item: url },
        ])}
      />

      <div className="min-h-screen bg-[#160b05] text-white">
        <Header />

        <main className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          <div className="mb-16 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/50">
              <span className="h-1.5 w-1.5 rounded-full bg-[#F15B2A]" />
              Free · No signup · HEX, RGB, HSL
            </div>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-6xl">Color Picker</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-white/55 leading-relaxed">
              Pick any color and instantly get HEX, RGB, and HSL values - plus generated shades and tints for design systems and UI work.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/tools/picker"
                className="rounded-2xl bg-[#F15B2A] px-8 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
              >
                Open Color Picker - Free
              </Link>
              <Link
                href="/colors"
                className="rounded-2xl border border-white/15 px-8 py-4 text-base font-medium text-white/65 hover:border-white/30 hover:text-white transition-colors"
              >
                Browse Colors →
              </Link>
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-tight">Everything a color picker should do</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <div className="mb-2 text-xl text-[#F97A45]">{f.icon}</div>
                  <p className="mb-1 text-sm font-semibold text-white">{f.title}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-bold tracking-tight">Frequently asked questions</h2>
            <div className="space-y-4">
              {faq.map((q) => (
                <div key={q.question} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <p className="mb-2 text-sm font-semibold text-white">{q.question}</p>
                  <p className="text-sm text-white/50 leading-relaxed">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-[#F15B2A]/20 bg-[#F15B2A]/8 p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold">Start picking colors - free</h2>
            <p className="mb-6 text-white/50">No account. No limits. Just colors.</p>
            <Link
              href="/tools/picker"
              className="inline-block rounded-2xl bg-[#F15B2A] px-10 py-4 text-base font-semibold text-white hover:bg-[#F97A45] transition-colors"
            >
              Open Color Picker →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
