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

      <div className="min-h-screen bg-[#faf7f2] text-[#1c1712]">
        <Header />

        <main className="mx-auto max-w-5xl px-4 pb-16 pt-32 sm:px-6 sm:pb-24">
          {/* Hero */}
          <div className="mb-16 text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#1c1712]/48 shadow-[0_1px_4px_rgba(28,23,18,0.06)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e8531f]" />
              Free · No signup · HEX, RGB, HSL
            </span>
            <h1 className="mt-5 mb-5 font-display text-4xl font-bold leading-[1.06] tracking-[-0.04em] text-[#1c1712] sm:text-6xl">Color Picker</h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-[#1c1712]/50">
              Pick any color and instantly get HEX, RGB, and HSL values — plus generated shades and tints for design systems and UI work.
            </p>
            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/tools/picker"
                className="rounded-full px-8 py-3.5 text-base font-semibold text-white shadow-[0_6px_20px_rgba(232,83,31,0.28)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(232,83,31,0.36)]"
                style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
              >
                Open Color Picker — Free
              </Link>
              <Link
                href="/colors"
                className="rounded-full border border-black/10 bg-white px-8 py-3.5 text-base font-medium text-[#1c1712]/60 shadow-[0_1px_4px_rgba(28,23,18,0.06)] transition-all hover:border-black/18 hover:text-[#1c1712]"
              >
                Browse Colors →
              </Link>
            </div>
          </div>

          {/* Features */}
          <div className="mb-20">
            <h2 className="mb-8 text-center text-2xl font-bold tracking-[-0.03em] text-[#1c1712]">Everything a color picker should do</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
                  <div className="mb-2 text-xl text-[#e8531f]">{f.icon}</div>
                  <p className="mb-1 text-sm font-semibold text-[#1c1712]">{f.title}</p>
                  <p className="text-sm leading-relaxed text-[#1c1712]/50">{f.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="mb-8 text-2xl font-bold tracking-[-0.03em] text-[#1c1712]">Frequently asked questions</h2>
            <div className="space-y-3">
              {faq.map((q) => (
                <div key={q.question} className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_1px_6px_rgba(28,23,18,0.06)]">
                  <p className="mb-2 text-sm font-semibold text-[#1c1712]">{q.question}</p>
                  <p className="text-sm leading-relaxed text-[#1c1712]/50">{q.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl border border-[#e8531f]/15 bg-[#e8531f]/6 p-10 text-center">
            <h2 className="mb-3 text-2xl font-bold tracking-[-0.03em] text-[#1c1712]">Start picking colors — free</h2>
            <p className="mb-7 text-[#1c1712]/50">No account. No limits. Just colors.</p>
            <Link
              href="/tools/picker"
              className="inline-block rounded-full px-10 py-3.5 text-base font-semibold text-white shadow-[0_6px_20px_rgba(232,83,31,0.28)] transition-all hover:scale-[1.02] hover:shadow-[0_8px_28px_rgba(232,83,31,0.36)]"
              style={{ background: "linear-gradient(135deg, #ff7a45, #e8531f)" }}
            >
              Open Color Picker →
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
