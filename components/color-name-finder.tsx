"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Header } from "@/components/header";
import { Dots } from "@/components/seo/page-ui";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { useCopy } from "@/components/seo/swatch-strip";
import { FORMAT_LABEL, formatters, parseHex, parseHsl, parseRgb, rgbToHex, type ColorFormat, type RGB } from "@/lib/color-convert";
import { findNamedColorByHex, getClosestNamedColors, namedColors, type NamedColor } from "@/lib/color-names";
import { toolPageContent } from "@/lib/seo/tool-pages";

const FORMATS: ColorFormat[] = ["hex", "rgb", "hsl", "cmyk", "oklch"];
const EXAMPLES = ["#E8531F", "#0F766E", "#7C3AED", "#FACC15", "#14B8A6", "#EC4899", "#1D4ED8", "#9CA3AF"];

// Accept HEX, RGB or HSL and work out which one was typed.
function parseAny(input: string): RGB | null {
  const text = input.trim();
  if (!text) return null;
  if (/^#?[0-9a-f]{3}$|^#?[0-9a-f]{6}$/i.test(text)) return parseHex(text);
  if (/hsl|%/i.test(text)) return parseHsl(text);
  return parseRgb(text);
}

function distance(a: RGB, hex: string) {
  const b = parseHex(hex)!;
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2);
}

export function ColorNameFinder() {
  const [value, setValue] = useState("#E8531F");
  const { copied, copy } = useCopy();

  const rgb = useMemo(() => parseAny(value), [value]);
  const hex = rgb ? rgbToHex(rgb) : null;

  const { exact, closest, similar } = useMemo(() => {
    if (!rgb || !hex) return { exact: undefined, closest: undefined, similar: [] as NamedColor[] };
    const ex = findNamedColorByHex(hex);
    const near = getClosestNamedColors(hex, 7);
    const best = ex ?? near[0];
    return { exact: ex, closest: best, similar: near.filter((c) => c.hex !== best?.hex).slice(0, 6) };
  }, [rgb, hex]);

  const diff = rgb && closest ? Math.round(distance(rgb, closest.hex)) : 0;

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        <section className="w-full px-6 pb-8 pt-28 sm:px-8 lg:px-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-[#1c1712]/40">
            <Link href="/" className="transition hover:text-[#1c1712]/70">Home</Link>
            <span className="text-[#1c1712]/20">/</span>
            <Link href="/tools" className="transition hover:text-[#1c1712]/70">Tools</Link>
            <span className="text-[#1c1712]/20">/</span>
            <span className="text-[#1c1712]/60">Color Name Finder</span>
          </nav>
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Name Finder</h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
            <span className="mt-1.5"><Dots colors={["#E8531F", "#0F766E", "#7C3AED", "#FACC15", "#14B8A6"]} /></span>
            <p className="hub-description min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/55">
              <span className="font-semibold text-[#1c1712]/80">What color is this hex code?</span> Enter a HEX, RGB or HSL code and get the closest color name from {namedColors.length} named colors, plus every format to copy.
            </p>
          </div>
        </section>

        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:px-12">
            {/* Input */}
            <div className="min-w-0 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
              <label htmlFor="name-input" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">Color code</label>
              <div className="mt-2 flex gap-2">
                <input
                  id="name-input"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="#E8531F, 232, 83, 31 or 16, 81%, 52%"
                  spellCheck={false}
                  autoComplete="off"
                  aria-invalid={!rgb}
                  aria-describedby="name-hint"
                  className={`h-12 min-w-0 flex-1 rounded-xl px-4 font-mono text-[15px] font-semibold outline-none ring-1 transition placeholder:font-sans placeholder:text-[13px] placeholder:font-normal placeholder:text-[#1c1712]/30 focus:ring-2 ${rgb ? "ring-black/[0.12] focus:ring-black/50" : "ring-red-300 focus:ring-red-500"}`}
                />
                <label className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/[0.12] transition hover:ring-black/30" title="Pick a color">
                  <span className="absolute inset-0" style={{ backgroundColor: hex ?? "#ffffff" }} />
                  <input
                    type="color"
                    aria-label="Pick a color"
                    value={hex ? hex.toLowerCase() : "#ffffff"}
                    onChange={(e) => setValue(e.target.value.toUpperCase())}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                </label>
              </div>
              <p id="name-hint" className={`mt-2.5 text-[13px] leading-5 ${rgb ? "text-[#1c1712]/50" : "font-medium text-red-600"}`}>
                {rgb ? "HEX, RGB (59, 130, 246) or HSL (217, 91%, 60%) all work." : "That is not a valid color. Try a HEX code like #3B82F6, RGB like 59, 130, 246 or HSL like 217, 91%, 60%."}
              </p>

              <div className="mt-6">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">Try an example</p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {EXAMPLES.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setValue(ex)}
                      className="flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5 font-mono text-[12px] font-medium text-[#1c1712]/75 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/30"
                    >
                      <span className="h-4 w-4 rounded-full ring-1 ring-black/15" style={{ backgroundColor: ex }} aria-hidden="true" />
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07]" aria-live="polite">
              <div className="h-32 transition-colors sm:h-36" style={{ backgroundColor: hex ?? "#f5f5f5" }} />
              <div className="p-5 sm:p-6">
                {closest && hex ? (
                  <>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{exact ? "Exact match" : "Closest named color"}</p>
                    <p className="mt-1 text-[1.75rem] font-bold leading-tight tracking-[-0.03em]">{closest.name}</p>
                    <p className="mt-1 text-[14px] leading-6 text-[#1c1712]/55">
                      {exact ? (
                        <>{hex} is the color {closest.name}. </>
                      ) : (
                        <>{hex} is closest to {closest.name} ({closest.hex}), a difference of {diff} out of 441 in RGB distance. </>
                      )}
                      <Link href={`/colors/${closest.slug}`} className="font-semibold text-[#c2410c] hover:underline">See the {closest.name} color page →</Link>
                    </p>
                  </>
                ) : (
                  <p className="text-[15px] text-[#1c1712]/55">Enter a valid color code to see its name.</p>
                )}

                <dl className="mt-5 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                  {FORMATS.map((f) => {
                    const v = rgb ? formatters[f](rgb) : "—";
                    return (
                      <div key={f} className="flex items-center justify-between gap-3 py-2.5">
                        <dt className="w-14 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c1712]/45">{FORMAT_LABEL[f]}</dt>
                        <dd className="min-w-0 flex-1 break-all font-mono text-[13px] font-medium text-[#1c1712]/80">{v}</dd>
                        <button
                          disabled={!rgb}
                          onClick={() => rgb && copy(v)}
                          aria-label={`Copy ${FORMAT_LABEL[f]} value`}
                          className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/60 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/25 disabled:opacity-40"
                        >
                          {rgb && copied === v ? "Copied" : "Copy"}
                        </button>
                      </div>
                    );
                  })}
                </dl>
              </div>
            </div>
          </div>

          {similar.length > 0 && (
            <div className="w-full px-6 pb-12 sm:px-8 lg:px-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c2410c]">Similar named colors</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {similar.map((c) => (
                  <Link key={c.slug} href={`/colors/${c.slug}`} className="group overflow-hidden rounded-xl ring-1 ring-black/[0.07] transition hover:ring-black/30">
                    <span className="block h-16" style={{ backgroundColor: c.hex }} />
                    <span className="block px-3 py-2.5">
                      <span className="block truncate text-[13px] font-semibold group-hover:text-[#c2410c]">{c.name}</span>
                      <span className="block font-mono text-[11px] text-[#1c1712]/50">{c.hex}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>

        <ToolPageSections config={toolPageContent["color-name-finder"]} variant="new" />
      </main>
    </div>
  );
}
