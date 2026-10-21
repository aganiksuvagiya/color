"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Header } from "@/components/header";
import { Breadcrumbs, Dots, Faq, RelatedLinks, eyebrow } from "@/components/seo/page-ui";
import { Segmented } from "@/components/seo/shades-page";
import { useCopy } from "@/components/seo/swatch-strip";
import { formatHsl, formatRgb, rgbToHex, type RGB } from "@/lib/color-convert";
import { findClosestColorName } from "@/lib/color-names";
import {
  INK_RECIPES,
  LIGHT_RECIPES,
  PAINT_KEYS,
  PAINT_RECIPES,
  mixInk,
  mixLight,
  mixPaint,
  recipeHex,
  type PaintParts,
} from "@/lib/color-mixing";

type Mode = "paint" | "light" | "ink";

const MODES: { key: Mode; label: string }[] = [
  { key: "paint", label: "Paint (RYB)" },
  { key: "light", label: "Light (RGB)" },
  { key: "ink", label: "Ink (CMYK)" },
];

const PAINT_SWATCH: Record<keyof PaintParts, string> = {
  red: "#E31B23",
  yellow: "#FFD500",
  blue: "#1565C0",
  white: "#FFFFFF",
  black: "#1C1712",
};

const LIGHT_CHANNELS = [
  { key: "r", label: "Red light", color: "#FF0000" },
  { key: "g", label: "Green light", color: "#00B300" },
  { key: "b", label: "Blue light", color: "#0000FF" },
] as const;

const INK_CHANNELS = [
  { key: "c", label: "Cyan ink", color: "#00AEEF" },
  { key: "m", label: "Magenta ink", color: "#EC008C" },
  { key: "y", label: "Yellow ink", color: "#FFD500" },
  { key: "k", label: "Black ink", color: "#1C1712" },
] as const;

type Props = {
  faq: { question: string; answer: string }[];
  steps: string[];
  tips: { title: string; body: string }[];
};

function Slider({ label, color, value, max, onChange, suffix = "" }: { label: string; color: string; value: number; max: number; onChange: (v: number) => void; suffix?: string }) {
  return (
    <label className="block">
      <span className="flex items-center justify-between text-[13px] font-semibold">
        <span className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/20" style={{ backgroundColor: color }} aria-hidden="true" />
          {label}
        </span>
        <span className="font-mono text-[12px] tabular-nums text-[#1c1712]/60">{value}{suffix}</span>
      </span>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer accent-[#1c1712]"
      />
    </label>
  );
}

export function ColorMixingChart({ faq, steps, tips }: Props) {
  const [mode, setMode] = useState<Mode>("paint");
  const [paint, setPaint] = useState<PaintParts>({ red: 1, yellow: 0, blue: 1, white: 0, black: 0 });
  const [light, setLight] = useState({ r: 100, g: 100, b: 0 });
  const [ink, setInk] = useState({ c: 0, m: 100, y: 100, k: 0 });
  const { copied, copy } = useCopy();
  const tool = useRef<HTMLDivElement>(null);

  const rgb: RGB = mode === "paint" ? mixPaint(paint) : mode === "light" ? mixLight(light.r, light.g, light.b) : mixInk(ink.c, ink.m, ink.y, ink.k);
  const hex = rgbToHex(rgb);
  const name = findClosestColorName(hex);
  const dark = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000 < 150;

  const loadRecipe = (parts: PaintParts) => {
    setMode("paint");
    setPaint(parts);
    tool.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const rows = [
    { label: "HEX", value: hex },
    { label: "RGB", value: formatRgb(rgb) },
    { label: "HSL", value: formatHsl(rgb) },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Tools", href: "/tools" }, { title: "Color Mixing Chart", href: "/color-mixing-chart" }]} />
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Mixing Chart</h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
            <span className="mt-1.5"><Dots colors={["#FF8000", "#00A833", "#800080", "#994C00", "#FFAAAA"]} /></span>
            <p className="hub-answer min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/60">
              <span className="font-semibold text-[#1c1712]/85">What colors make which color?</span> With paint, red + yellow makes orange, yellow + blue makes green and blue + red makes purple. Brown comes from mixing a primary with its opposite, for example orange + blue. Try any ratio in the mixer below, or jump to the chart of 20 colors.
            </p>
          </div>
        </section>

        {/* ── Mixer ── */}
        <section className="border-t border-black/[0.06]">
          <div ref={tool} className="grid w-full scroll-mt-28 gap-6 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:px-12">
            <div className="min-w-0 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className={eyebrow}>Color mixer</p>
                <Segmented label="Mixing model" value={mode} onChange={setMode} options={MODES} />
              </div>

              <div className="mt-6 space-y-5">
                {mode === "paint" &&
                  PAINT_KEYS.map((k) => (
                    <Slider key={k} label={`${k[0].toUpperCase()}${k.slice(1)} paint (parts)`} color={PAINT_SWATCH[k]} value={paint[k]} max={10} onChange={(v) => setPaint((p) => ({ ...p, [k]: v }))} />
                  ))}
                {mode === "light" &&
                  LIGHT_CHANNELS.map((c) => (
                    <Slider key={c.key} label={c.label} color={c.color} value={light[c.key]} max={100} suffix="%" onChange={(v) => setLight((l) => ({ ...l, [c.key]: v }))} />
                  ))}
                {mode === "ink" &&
                  INK_CHANNELS.map((c) => (
                    <Slider key={c.key} label={c.label} color={c.color} value={ink[c.key]} max={100} suffix="%" onChange={(v) => setInk((i) => ({ ...i, [c.key]: v }))} />
                  ))}
              </div>

              <p className="mt-6 text-[13px] leading-6 text-[#1c1712]/50">
                {mode === "paint" && "Paint is subtractive: pigments absorb light, so the more you mix, the darker and duller the result. Parts are relative, so 2 red + 2 yellow is the same orange as 1 red + 1 yellow."}
                {mode === "light" && "Light is additive: screens add light together, so mixing more light makes the result brighter, up to white."}
                {mode === "ink" && "Inks are subtractive, like paint. Printers lay cyan, magenta, yellow and black ink on white paper."}
              </p>

              {mode === "paint" && (
                <div className="mt-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">Quick recipes</p>
                  <div className="mt-2.5 flex flex-wrap gap-2">
                    {PAINT_RECIPES.slice(0, 8).map((r) => (
                      <button
                        key={r.slug}
                        onClick={() => setPaint(r.parts)}
                        className="flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-[#1c1712]/75 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/30"
                      >
                        <span className="h-4 w-4 rounded-full ring-1 ring-black/15" style={{ backgroundColor: recipeHex(r) }} aria-hidden="true" />
                        {r.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Result */}
            <div className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07]" aria-live="polite">
              <div className="flex h-44 items-end justify-between gap-3 p-4 transition-colors sm:h-52" style={{ backgroundColor: hex, color: dark ? "#ffffff" : "#1c1712" }}>
                <span className="rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white">{name}</span>
                <span className="font-mono text-[13px] font-semibold opacity-80">{hex}</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className={eyebrow}>Your mix</p>
                <dl className="mt-3 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                  {rows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3 py-2.5">
                      <dt className="w-12 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c1712]/45">{r.label}</dt>
                      <dd className="min-w-0 flex-1 break-all font-mono text-[13px] font-medium text-[#1c1712]/80">{r.value}</dd>
                      <button
                        onClick={() => copy(r.value)}
                        aria-label={`Copy ${r.label} value`}
                        className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/60 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/25"
                      >
                        {copied === r.value ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </dl>
                <Link
                  href={`/generator?label=${encodeURIComponent(`${name} palette`)}&c=${[0.55, 0.8, 1, 1.15, 1.35].map((f) => rgbToHex({ r: Math.min(255, Math.round(rgb.r * f)), g: Math.min(255, Math.round(rgb.g * f)), b: Math.min(255, Math.round(rgb.b * f)) }).slice(1)).join("-")}`}
                  className="mt-5 inline-block rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
                >
                  Build a palette from this color →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Chart: what colors make X ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>The chart</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">What colors make… 20 common colors</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#1c1712]/60">
              Recipes use paint parts, and the swatch is the on-screen result of the paint (RYB) mixer above. Tap a recipe to load it into the mixer.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {PAINT_RECIPES.map((r) => {
                const h = recipeHex(r);
                return (
                  <div key={r.slug} className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07] transition hover:ring-black/25">
                    <div className="h-20" style={{ backgroundColor: h }} aria-hidden="true" />
                    <div className="p-4">
                      <h3 className="text-[15px] font-semibold tracking-[-0.01em]">What colors make {r.name.toLowerCase()}?</h3>
                      <p className="mt-1.5 text-[14px] font-medium text-[#1c1712]/85">{r.recipe}</p>
                      <p className="mt-1.5 text-[13px] leading-6 text-[#1c1712]/55">{r.note}</p>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <span className="font-mono text-[12px] text-[#1c1712]/45">{h}</span>
                        <button onClick={() => loadRecipe(r.parts)} className="rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                          Try it
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Primary, secondary, tertiary ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>The basics</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Primary, secondary and tertiary colors</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Primary colors</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">Red, yellow and blue (paint). They can&apos;t be made by mixing other paints, and every other color starts from them.</p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Secondary colors</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">Orange (red + yellow), green (yellow + blue) and purple (blue + red). Each is two primaries in equal parts.</p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Tertiary colors</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">A primary plus its neighboring secondary: red-orange, yellow-orange, yellow-green, blue-green, blue-violet and red-violet. See them on the <Link href="/color-wheel" className="font-semibold text-[#c2410c] hover:underline">color wheel</Link>.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-[15px] font-semibold">Mixing light (screens, RGB)</h3>
                <ul className="mt-3 divide-y divide-black/[0.06] rounded-xl ring-1 ring-black/[0.07]">
                  {LIGHT_RECIPES.map((r) => (
                    <li key={r.name} className="flex items-center gap-3 px-4 py-3">
                      <span className="h-6 w-6 shrink-0 rounded-full ring-1 ring-black/15" style={{ backgroundColor: rgbToHex(r.rgb) }} aria-hidden="true" />
                      <span className="text-[14px]"><strong className="font-semibold">{r.name}</strong> = {r.recipe}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[15px] font-semibold">Mixing ink (print, CMYK)</h3>
                <ul className="mt-3 divide-y divide-black/[0.06] rounded-xl ring-1 ring-black/[0.07]">
                  {INK_RECIPES.map((r) => (
                    <li key={r.name} className="flex items-center gap-3 px-4 py-3">
                      <span className="h-6 w-6 shrink-0 rounded-full ring-1 ring-black/15" style={{ backgroundColor: rgbToHex(r.rgb) }} aria-hidden="true" />
                      <span className="text-[14px]"><strong className="font-semibold">{r.name}</strong> = {r.recipe}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── How to / tips ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-12 px-6 py-14 sm:px-8 lg:grid-cols-2 lg:px-12">
            <div>
              <p className={eyebrow}>How to use it</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Mix any color in four steps</h2>
              <ol className="mt-6 space-y-4">
                {steps.map((s, i) => (
                  <li key={i} className="flex gap-4 rounded-xl p-4 ring-1 ring-black/[0.07]">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1c1712] text-[12px] font-bold text-white">{i + 1}</span>
                    <p className="text-[15px] leading-7 text-[#1c1712]/75">{s}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <p className={eyebrow}>Mixing tips</p>
              <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Get cleaner, more accurate colors</h2>
              <div className="mt-6 space-y-4">
                {tips.map((t) => (
                  <div key={t.title} className="rounded-xl p-4 ring-1 ring-black/[0.07]">
                    <h3 className="text-[15px] font-semibold">{t.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-6 text-[#1c1712]/65">{t.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Color mixing: frequently asked questions</h2>
            <div className="mt-6">
              <Faq items={faq} wide />
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Related</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">More color tools</h2>
            <div className="mt-6">
              <RelatedLinks
                links={[
                  { title: "Color wheel", href: "/color-wheel" },
                  { title: "Color mixer (blend two colors)", href: "/tools/color-mixer" },
                  { title: "Pastel colors", href: "/pastel-colors" },
                  { title: "Color palette generator", href: "/generator" },
                  { title: "Color picker", href: "/color-picker" },
                  { title: "Color converter", href: "/color-converter" },
                  { title: "Color harmony generator", href: "/tools/color-harmony" },
                  { title: "Color meanings", href: "/color-meanings" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
