"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Header } from "@/components/header";
import { Breadcrumbs, Dots, Faq, RelatedLinks, eyebrow } from "@/components/seo/page-ui";
import { CopyIcon, Segmented, isLight } from "@/components/seo/shades-page";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import { parseHex } from "@/lib/color-convert";
import {
  PASTEL_COLORS,
  PASTEL_GROUPS,
  contrastRatio,
  pastelize,
  toView,
  type PastelView,
} from "@/lib/pastel-colors";

type Format = "hex" | "rgb" | "hsl";

const FORMATS: { key: Format; label: string }[] = [
  { key: "hex", label: "HEX" },
  { key: "rgb", label: "RGB" },
  { key: "hsl", label: "HSL" },
];

const code = (c: PastelView, f: Format) => (f === "hex" ? c.hex : f === "rgb" ? c.rgb : c.hsl);

// Hand-picked combinations, by color name from the list.
const COMBOS: { name: string; colors: string[] }[] = [
  { name: "Soft spring", colors: ["Pastel pink", "Mint green", "Cream"] },
  { name: "Ocean air", colors: ["Baby blue", "Lavender", "Ivory"] },
  { name: "Sorbet", colors: ["Peach", "Pastel yellow", "Pale turquoise"] },
  { name: "Cotton candy", colors: ["Cotton candy", "Periwinkle", "Light cyan"] },
  { name: "Garden party", colors: ["Tea green", "Pastel pink", "Lemon chiffon"] },
  { name: "Dusk", colors: ["Lilac", "Powder blue", "Pale pink"] },
];

const hexOf = (name: string) => PASTEL_COLORS.find((c) => c.name === name)?.hex ?? "#FFFFFF";

type Props = {
  palettes: { name: string; colors: string[]; href: string }[];
  faq: { question: string; answer: string }[];
};

export function PastelColorsPage({ palettes, faq }: Props) {
  const { copied, copy } = useCopy();
  const [format, setFormat] = useState<Format>("hex");
  const [base, setBase] = useState("#3B82F6");
  const views = useMemo(() => PASTEL_COLORS.map(toView), []);

  const baseRgb = parseHex(base);
  const steps = baseRgb ? [20, 40, 60, 75, 85].map((a) => ({ amount: a, hex: pastelize(baseRgb, a) })) : [];

  const dark = parseHex("#1C1712")!;
  const white = parseHex("#FFFFFF")!;
  const contrastRows = ["Pastel pink", "Baby blue", "Pastel green", "Lavender", "Pastel yellow", "Pastel orange", "Pastel red"].map((n) => {
    const hex = hexOf(n);
    const rgb = parseHex(hex)!;
    return { name: n, hex, onDark: contrastRatio(dark, rgb), onWhite: contrastRatio(white, rgb) };
  });

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Colors", href: "/colors" }, { title: "Pastel Colors", href: "/pastel-colors" }]} />
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Pastel Colors</h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
            <span className="mt-1.5"><Dots colors={["#FFD1DC", "#FDFD96", "#98FF98", "#89CFF0", "#C8A2C8"]} /></span>
            <p className="hub-answer min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/60">
              <span className="font-semibold text-[#1c1712]/85">Pastel colors are soft, light colors made by mixing a hue with white.</span> This page lists {PASTEL_COLORS.length} pastel colors with names and HEX, RGB and HSL codes, from pastel pink (#FFD1DC) and baby blue (#89CFF0) to lavender (#E6E6FA), plus pastel color palettes. Click any color to copy it.
            </p>
          </div>
        </section>

        {/* ── Colors by group ── */}
        <section className="w-full px-6 pb-8 sm:px-8 lg:px-12">
          <div className="z-20 -mx-6 flex flex-wrap items-center justify-between gap-3 border-y border-black/[0.06] bg-white px-6 py-3 sm:-mx-8 sm:px-8 lg:sticky lg:top-[86px] lg:-mx-12 lg:px-12">
            <nav aria-label="Pastel color groups" className="flex flex-wrap gap-2">
              {PASTEL_GROUPS.map((g) => (
                <a key={g.key} href={`#pastel-${g.key}`} className="rounded-full px-3.5 py-1.5 text-[13px] font-medium text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/30">
                  {g.label}
                </a>
              ))}
            </nav>
            <Segmented label="Code format" value={format} onChange={setFormat} options={FORMATS} />
          </div>

          {PASTEL_GROUPS.map((g) => {
            const items = views.filter((c) => c.group === g.key);
            return (
              <div key={g.key} id={`pastel-${g.key}`} className="scroll-mt-40 pt-12">
                <h2 className="text-[1.6rem] font-semibold tracking-[-0.03em]">{g.heading}</h2>
                <p className="mt-2 max-w-3xl text-[15px] leading-7 text-[#1c1712]/55">{g.intro}</p>
                <ul className="mt-6 grid grid-cols-2 gap-x-5 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
                  {items.map((c) => {
                    const value = code(c, format);
                    const done = copied === value;
                    return (
                      <li key={c.name} className="group">
                        <button
                          onClick={() => copy(value)}
                          aria-label={`Copy ${c.name} ${value}`}
                          className="flex aspect-[3/1] w-full items-center justify-center rounded-lg ring-1 ring-inset ring-black/[0.08] transition duration-200 group-hover:-translate-y-0.5 group-hover:shadow-[0_10px_24px_-12px_rgba(28,23,18,0.4)]"
                          style={{ backgroundColor: c.hex }}
                        >
                          <span className={`font-mono text-[13px] font-semibold tracking-wide transition-opacity duration-150 ${done ? "opacity-100" : "opacity-0 group-hover:opacity-100"} ${isLight(c.hex) ? "text-black/70" : "text-white/90"}`}>
                            {done ? "✓ Copied" : format === "hex" ? c.hex.slice(1) : value}
                          </span>
                        </button>
                        <div className="mt-2 flex items-center justify-between gap-2 px-0.5">
                          <span className="truncate text-[13px] font-medium text-[#1c1712]/85">{c.name}</span>
                          <button onClick={() => copy(value)} className="shrink-0 text-[#1c1712]/35 transition hover:text-[#1c1712]" aria-label={`Copy ${value}`} title={`Copy ${value}`}>
                            <CopyIcon />
                          </button>
                        </div>
                        <p className="px-0.5 font-mono text-[11px] text-[#1c1712]/45">{c.hex}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </section>

        {/* ── Make any color pastel ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Pastel maker</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Turn any color into a pastel</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#1c1712]/60">
              A pastel is a tint: the original color mixed with white. Enter a color to see it at 20% to 85% white.
            </p>
            <div className="mt-6 flex max-w-xl gap-2">
              <input
                value={base}
                onChange={(e) => setBase(e.target.value)}
                aria-label="Base HEX color"
                aria-invalid={!baseRgb}
                spellCheck={false}
                placeholder="#3B82F6"
                className={`h-12 min-w-0 flex-1 rounded-xl px-4 font-mono text-[15px] font-semibold outline-none ring-1 transition focus:ring-2 ${baseRgb ? "ring-black/[0.12] focus:ring-black/50" : "ring-red-300 focus:ring-red-500"}`}
              />
              <label className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/[0.12] transition hover:ring-black/30" title="Pick a color">
                <span className="absolute inset-0" style={{ backgroundColor: baseRgb ? base : "#ffffff" }} />
                <input
                  type="color"
                  aria-label="Pick a color"
                  value={baseRgb && /^#[0-9a-f]{6}$/i.test(base) ? base.toLowerCase() : "#3b82f6"}
                  onChange={(e) => setBase(e.target.value.toUpperCase())}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </label>
            </div>
            {!baseRgb && <p className="mt-2 text-[13px] font-medium text-red-600">Enter a valid HEX code such as #3B82F6.</p>}
            {steps.length > 0 && (
              <ul className="mt-6 grid max-w-3xl grid-cols-5 gap-3">
                {steps.map((s) => (
                  <li key={s.amount}>
                    <button
                      onClick={() => copy(s.hex)}
                      aria-label={`Copy ${s.hex}`}
                      className="flex h-20 w-full items-end rounded-xl p-2 ring-1 ring-black/[0.08] transition hover:-translate-y-0.5"
                      style={{ backgroundColor: s.hex, color: isLight(s.hex) ? "#1c1712" : "#ffffff" }}
                    >
                      <span className="font-mono text-[11px] font-semibold">{copied === s.hex ? "Copied" : s.hex}</span>
                    </button>
                    <p className="mt-1.5 text-[12px] text-[#1c1712]/50">{s.amount}% white</p>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-8 max-w-3xl min-w-0">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#1c1712]/45">In CSS</p>
              <pre className="mt-2 overflow-x-auto rounded-xl bg-[#1c1712] p-4 font-mono text-[13px] leading-6 text-white/90">
                <code>{`/* mix a color with white */\nbackground: color-mix(in srgb, ${baseRgb ? base.toUpperCase() : "#3B82F6"} 35%, white);\n\n/* or set a high lightness in HSL */\nbackground: hsl(217 90% 85%);`}</code>
              </pre>
            </div>
          </div>
        </section>

        {/* ── Palettes ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Pastel color palettes</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Pastel color palettes you can copy</h2>
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {palettes.map((p) => (
                <div key={p.name} className="min-w-0">
                  <SwatchStrip colors={p.colors} height="h-28" copied={copied} onCopy={copy} />
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-[15px] font-semibold">{p.name}</p>
                      <p className="truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{p.colors.join(" · ")}</p>
                    </div>
                    <Link href={p.href} className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                      Open
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/color-palettes/pastel" className="mt-8 inline-block text-[14px] font-semibold text-[#c2410c] hover:underline">
              See all pastel color palettes →
            </Link>

            <h3 className="mt-14 text-[1.2rem] font-semibold tracking-[-0.02em]">Pastel color combinations</h3>
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {COMBOS.map((c) => (
                <div key={c.name} className="min-w-0 rounded-2xl p-4 ring-1 ring-black/[0.07]">
                  <SwatchStrip colors={c.colors.map(hexOf)} height="h-16" copied={copied} onCopy={copy} className="rounded-xl" />
                  <p className="mt-3 text-[14px] font-semibold">{c.name}</p>
                  <p className="mt-0.5 text-[13px] text-[#1c1712]/55">{c.colors.join(" + ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contrast ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Accessibility</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Text on pastel backgrounds: use dark text</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#1c1712]/60">
              Pastels are light, so white text on them fails the WCAG minimum of 4.5:1 for normal text. Dark text passes comfortably. Ratios below are for #1C1712 and for white on each background.
            </p>
            <div className="mt-6 max-w-4xl overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
              <table className="w-full min-w-[32rem] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-black/[0.07] bg-[#fafafa] text-[12px] uppercase tracking-[0.1em] text-[#1c1712]/50">
                    <th className="px-4 py-3 font-semibold">Background</th>
                    <th className="px-4 py-3 font-semibold">Dark text (#1C1712)</th>
                    <th className="px-4 py-3 font-semibold">White text</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.06]">
                  {contrastRows.map((r) => (
                    <tr key={r.name}>
                      <td className="px-4 py-2.5">
                        <span className="flex items-center gap-3 font-medium">
                          <span className="h-5 w-5 shrink-0 rounded-full ring-1 ring-black/15" style={{ backgroundColor: r.hex }} aria-hidden="true" />
                          {r.name} <span className="font-mono text-[12px] text-[#1c1712]/45">{r.hex}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2.5 font-mono text-[13px]">{r.onDark.toFixed(1)}:1 <span className={r.onDark >= 4.5 ? "text-emerald-700" : "text-red-600"}>{r.onDark >= 4.5 ? "pass" : "fail"}</span></td>
                      <td className="px-4 py-2.5 font-mono text-[13px]">{r.onWhite.toFixed(1)}:1 <span className={r.onWhite >= 4.5 ? "text-emerald-700" : "text-red-600"}>{r.onWhite >= 4.5 ? "pass" : "fail"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/tools/contrast" className="mt-5 inline-block text-[14px] font-semibold text-[#c2410c] hover:underline">Check your own pair with the contrast checker →</Link>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Pastel colors: frequently asked questions</h2>
            <div className="mt-6">
              <Faq items={faq} wide />
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Related</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">More colors and palettes</h2>
            <div className="mt-6">
              <RelatedLinks
                links={[
                  { title: "Pastel color palettes", href: "/color-palettes/pastel" },
                  { title: "Shades of pink", href: "/shades-of-pink" },
                  { title: "Shades of blue", href: "/shades-of-blue" },
                  { title: "Shades of purple", href: "/shades-of-purple" },
                  { title: "Color mixing chart", href: "/color-mixing-chart" },
                  { title: "Color wheel", href: "/color-wheel" },
                  { title: "Color palette generator", href: "/generator" },
                  { title: "All named colors", href: "/colors" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
