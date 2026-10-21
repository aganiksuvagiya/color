"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Header } from "@/components/header";
import { Breadcrumbs, Dots, Faq, RelatedLinks, eyebrow } from "@/components/seo/page-ui";
import { Segmented } from "@/components/seo/shades-page";
import { SwatchStrip, useCopy } from "@/components/seo/swatch-strip";
import { formatHsl, formatRgb, parseHex, rgbToHex } from "@/lib/color-convert";
import { findClosestColorName } from "@/lib/color-names";
import {
  ARTIST_WHEEL,
  SCHEMES,
  SCREEN_WHEEL,
  WHEELS,
  schemeIndexes,
  schemesFromColor,
  type SchemeKey,
  type WheelColor,
  type WheelModel,
} from "@/lib/color-wheel";

const CX = 200;
const CY = 200;
const R_OUT = 168;
const R_IN = 84;

function polar(r: number, angleDeg: number) {
  const a = (angleDeg * Math.PI) / 180;
  return { x: CX + r * Math.cos(a), y: CY + r * Math.sin(a) };
}

// One 30-degree ring segment centered on the given angle (0 degrees = 3 o'clock, clockwise).
function wedge(center: number, rOut: number) {
  const a0 = center - 15;
  const a1 = center + 15;
  const o0 = polar(rOut, a0);
  const o1 = polar(rOut, a1);
  const i1 = polar(R_IN, a1);
  const i0 = polar(R_IN, a0);
  return `M ${o0.x} ${o0.y} A ${rOut} ${rOut} 0 0 1 ${o1.x} ${o1.y} L ${i1.x} ${i1.y} A ${R_IN} ${R_IN} 0 0 0 ${i0.x} ${i0.y} Z`;
}

const textOn = (hex: string) => {
  const c = parseHex(hex);
  return c && (c.r * 299 + c.g * 587 + c.b * 114) / 1000 > 150 ? "#1c1712" : "#ffffff";
};

const CALC_EXAMPLES = ["#3B82F6", "#E8531F", "#10B981", "#8B5CF6", "#F59E0B", "#EC4899", "#0F766E", "#1C1712"];

// The generator opens a palette from exactly five HEX codes: pad a short scheme with neutrals.
function generatorLink(label: string, colors: string[]) {
  const five = [...colors, "F5F5F5", "1C1712", "FFFFFF", "8A8A8A"].map((c) => c.replace("#", "").toUpperCase()).slice(0, 5);
  return `/generator?label=${encodeURIComponent(`${label} scheme`)}&c=${five.join("-")}`;
}

const TYPE_LABEL = { primary: "Primary", secondary: "Secondary", tertiary: "Tertiary" } as const;

type Props = {
  faq: { question: string; answer: string }[];
  steps: string[];
};

function WheelTable({ colors, caption }: { colors: WheelColor[]; caption: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl ring-1 ring-black/[0.07]">
      <table className="w-full min-w-[30rem] text-left text-[14px]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-black/[0.07] bg-[#fafafa] text-[12px] uppercase tracking-[0.1em] text-[#1c1712]/50">
            <th className="px-4 py-3 font-semibold">Color</th>
            <th className="px-4 py-3 font-semibold">Type</th>
            <th className="px-4 py-3 font-semibold">Temperature</th>
            <th className="px-4 py-3 font-semibold">HEX</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/[0.06]">
          {colors.map((c) => (
            <tr key={c.name}>
              <td className="px-4 py-2.5">
                <span className="flex items-center gap-3 font-medium">
                  <span className="h-5 w-5 shrink-0 rounded-full ring-1 ring-black/15" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                  {c.name}
                </span>
              </td>
              <td className="px-4 py-2.5 text-[#1c1712]/70">{TYPE_LABEL[c.type]}</td>
              <td className="px-4 py-2.5 capitalize text-[#1c1712]/70">{c.temperature}</td>
              <td className="px-4 py-2.5 font-mono text-[13px] text-[#1c1712]/75">{c.hex}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ColorWheelPage({ faq, steps }: Props) {
  const [model, setModel] = useState<WheelModel>("artist");
  const [selected, setSelected] = useState(4);
  const [scheme, setScheme] = useState<SchemeKey>("complementary");
  const [input, setInput] = useState("#3B82F6");
  const [base, setBase] = useState("#3B82F6");
  const { copied, copy } = useCopy();

  const wheel = WHEELS[model];
  const current = wheel[selected];
  const members = schemeIndexes(selected, scheme);
  const schemeInfo = SCHEMES.find((s) => s.key === scheme) ?? SCHEMES[0];

  const rgb = parseHex(current.hex)!;
  const rows = [
    { label: "HEX", value: current.hex },
    { label: "RGB", value: formatRgb(rgb) },
    { label: "HSL", value: formatHsl(rgb) },
  ];

  // The calculator keeps showing the last valid color while the text field is mid-edit or invalid.
  const typed = parseHex(input);
  const baseRgb = parseHex(base)!;
  const baseName = findClosestColorName(base);
  const baseRows = [
    { label: "HEX", value: base },
    { label: "RGB", value: formatRgb(baseRgb) },
    { label: "HSL", value: formatHsl(baseRgb) },
  ];
  const calcRows = useMemo(() => schemesFromColor(parseHex(base)!), [base]);

  const onInput = (value: string) => {
    setInput(value);
    const c = parseHex(value);
    if (c) setBase(rgbToHex(c));
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => (s + 1) % 12);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => (s + 11) % 12);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1c1712]">
      <Header />

      <main>
        {/* ── Header ── */}
        <section className="w-full px-6 pb-10 pt-28 sm:px-8 lg:px-12">
          <Breadcrumbs items={[{ title: "Home", href: "/" }, { title: "Color Wheel", href: "/color-wheel" }]} />
          <h1 className="mt-8 text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] sm:text-[3.5rem]">Color Wheel</h1>
          <div className="mt-5 flex max-w-4xl flex-wrap items-start gap-3">
            <span className="mt-1.5"><Dots colors={["#E31B23", "#FF8000", "#FFE600", "#2E9E3F", "#1F5FBF"]} /></span>
            <p className="hub-answer min-w-0 flex-1 basis-80 text-[16px] leading-7 text-[#1c1712]/60">
              <span className="font-semibold text-[#1c1712]/85">The color wheel arranges 12 colors by hue.</span> It has 3 primary colors (red, yellow, blue), 3 secondary colors (orange, green, violet) and 6 tertiary colors made by mixing a primary with its neighbor. Colors opposite each other are complementary; neighbors are analogous. Click the wheel to explore.
            </p>
          </div>
        </section>

        {/* ── Interactive wheel ── */}
        <section className="border-t border-black/[0.06]">
          <div className="grid w-full gap-8 px-6 py-10 sm:px-8 lg:grid-cols-[minmax(0,520px)_minmax(0,1fr)] lg:px-12">
            <div className="min-w-0">
              <Segmented
                label="Color wheel type"
                value={model}
                onChange={setModel}
                options={[
                  { key: "artist", label: "Artist wheel (RYB)" },
                  { key: "screen", label: "Screen wheel (RGB)" },
                ]}
              />
              <svg
                viewBox="0 0 400 400"
                role="group"
                aria-label={`${model === "artist" ? "Artist" : "Screen"} color wheel. Use arrow keys to move between colors.`}
                className="mx-auto mt-4 w-full max-w-[480px] touch-manipulation select-none"
                onKeyDown={onKey}
              >
                {wheel.map((c, i) => {
                  const center = -90 + i * 30;
                  const active = i === selected;
                  const inScheme = members.includes(i);
                  const marker = polar(R_OUT + 14, center);
                  return (
                    <g key={c.name}>
                      <path
                        d={wedge(center, active ? R_OUT + 12 : R_OUT)}
                        fill={c.hex}
                        stroke="#ffffff"
                        strokeWidth={3}
                        tabIndex={active ? 0 : -1}
                        role="button"
                        aria-label={`${c.name}, ${TYPE_LABEL[c.type].toLowerCase()} color, ${c.hex}`}
                        aria-pressed={active}
                        onClick={() => setSelected(i)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setSelected(i);
                          }
                        }}
                        className="cursor-pointer outline-none transition-all duration-200 hover:opacity-90 focus-visible:stroke-[#1c1712]"
                      />
                      {inScheme && <circle cx={marker.x} cy={marker.y} r={active ? 6 : 5} fill={active ? "#1c1712" : "#c2410c"} stroke="#fff" strokeWidth={2} pointerEvents="none" />}
                    </g>
                  );
                })}
                <circle cx={CX} cy={CY} r={R_IN - 14} fill={current.hex} stroke="#ffffff" strokeWidth={4} />
                <text x={CX} y={CY - 4} textAnchor="middle" fontSize="15" fontWeight="700" fill={textOn(current.hex)} pointerEvents="none">
                  {current.name}
                </text>
                <text x={CX} y={CY + 16} textAnchor="middle" fontSize="12" fontFamily="monospace" fill={textOn(current.hex)} opacity="0.85" pointerEvents="none">
                  {current.hex}
                </text>
              </svg>
            </div>

            <div className="min-w-0">
              <div className="rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
                <div className="flex items-center gap-4">
                  <span className="h-14 w-14 shrink-0 rounded-2xl ring-1 ring-black/15" style={{ backgroundColor: current.hex }} aria-hidden="true" />
                  <div className="min-w-0">
                    <p className="text-[1.35rem] font-bold leading-tight tracking-[-0.02em]">{current.name}</p>
                    <p className="mt-0.5 text-[14px] text-[#1c1712]/55">
                      {TYPE_LABEL[current.type]} color · {current.temperature} color
                    </p>
                  </div>
                </div>
                <dl className="mt-4 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                  {rows.map((r) => (
                    <div key={r.label} className="flex items-center justify-between gap-3 py-2.5">
                      <dt className="w-12 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1c1712]/45">{r.label}</dt>
                      <dd className="min-w-0 flex-1 break-all font-mono text-[13px] font-medium text-[#1c1712]/80">{r.value}</dd>
                      <button onClick={() => copy(r.value)} aria-label={`Copy ${r.label} value`} className="shrink-0 rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/60 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/25">
                        {copied === r.value ? "Copied" : "Copy"}
                      </button>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-5 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
                <p className={eyebrow}>Color scheme</p>
                <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Color scheme">
                  {SCHEMES.map((s) => (
                    <button
                      key={s.key}
                      onClick={() => setScheme(s.key)}
                      aria-pressed={scheme === s.key}
                      className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition ${scheme === s.key ? "bg-[#1c1712] text-white" : "text-[#1c1712]/65 ring-1 ring-black/[0.12] hover:text-[#1c1712] hover:ring-black/25"}`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-[14px] leading-6 text-[#1c1712]/60">{schemeInfo.body}</p>
                <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {members.map((i) => {
                    const c = wheel[i];
                    return (
                      <li key={`${scheme}-${i}`}>
                        <button
                          onClick={() => copy(c.hex)}
                          aria-label={`Copy ${c.name} ${c.hex}`}
                          className="flex h-16 w-full items-end rounded-xl p-2 ring-1 ring-black/[0.08] transition hover:-translate-y-0.5"
                          style={{ backgroundColor: c.hex, color: textOn(c.hex) }}
                        >
                          <span className="font-mono text-[11px] font-semibold">{copied === c.hex ? "Copied" : c.hex}</span>
                        </button>
                        <p className="mt-1.5 truncate text-[12px] font-medium text-[#1c1712]/75">{c.name}</p>
                      </li>
                    );
                  })}
                </ul>
                <Link
                  href={`/generator?label=${encodeURIComponent(`${schemeInfo.label} scheme`)}&c=${[...members.map((i) => wheel[i].hex.slice(1)), ...["FFFFFF", "1C1712", "F5F5F5", "1C1712"]].slice(0, 5).join("-")}`}
                  className="mt-5 inline-block rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
                >
                  Open this scheme in the generator →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Calculator for any color ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Color wheel calculator</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Find the complementary, analogous and triadic colors of any HEX code</h2>
            <p className="mt-3 max-w-3xl text-[15px] leading-7 text-[#1c1712]/60">
              Enter a color and every scheme is calculated by rotating its hue around the RGB color wheel (for example +180 degrees for the complement). Hover a color for its code, click to copy.
            </p>

            <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,340px)_minmax(0,1fr)] lg:gap-10">
              {/* Base color */}
              <div className="min-w-0 lg:sticky lg:top-28">
                <div className="overflow-hidden rounded-2xl ring-1 ring-black/[0.07]">
                  <div className="flex h-36 items-end justify-between gap-3 p-4 transition-colors duration-300" style={{ backgroundColor: base, color: textOn(base) }}>
                    <span className="rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white">{baseName}</span>
                    <span className="font-mono text-[13px] font-semibold opacity-80">{base}</span>
                  </div>
                  <div className="p-4 sm:p-5">
                    <label htmlFor="wheel-hex" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">Base color</label>
                    <div className="mt-2 flex gap-2">
                      <input
                        id="wheel-hex"
                        value={input}
                        onChange={(e) => onInput(e.target.value)}
                        aria-invalid={!typed}
                        spellCheck={false}
                        placeholder="#3B82F6"
                        className={`h-11 min-w-0 flex-1 rounded-xl px-4 font-mono text-[14px] font-semibold outline-none ring-1 transition focus:ring-2 ${typed ? "ring-black/[0.12] focus:ring-black/50" : "ring-red-300 focus:ring-red-500"}`}
                      />
                      <label className="relative h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/[0.12] transition hover:ring-black/30" title="Pick a color">
                        <span className="absolute inset-0" style={{ backgroundColor: base }} />
                        <input
                          type="color"
                          aria-label="Pick a color"
                          value={base.toLowerCase()}
                          onChange={(e) => onInput(e.target.value.toUpperCase())}
                          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                      </label>
                    </div>
                    {!typed && <p className="mt-2 text-[13px] font-medium text-red-600">Enter a valid HEX code such as #3B82F6.</p>}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {CALC_EXAMPLES.map((ex) => (
                        <button
                          key={ex}
                          onClick={() => onInput(ex)}
                          aria-label={`Use ${ex}`}
                          className={`h-7 w-7 rounded-full ring-1 transition hover:scale-110 ${base === ex ? "ring-2 ring-[#1c1712] ring-offset-2" : "ring-black/15"}`}
                          style={{ backgroundColor: ex }}
                        />
                      ))}
                    </div>

                    <dl className="mt-4 divide-y divide-black/[0.06] border-t border-black/[0.06]">
                      {baseRows.map((r) => (
                        <div key={r.label} className="flex items-center justify-between gap-3 py-2">
                          <dt className="w-10 shrink-0 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#1c1712]/45">{r.label}</dt>
                          <dd className="min-w-0 flex-1 break-all font-mono text-[12px] font-medium text-[#1c1712]/80">{r.value}</dd>
                          <button onClick={() => copy(r.value)} aria-label={`Copy ${r.label} value`} className="shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-[#1c1712]/60 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/25">
                            {copied === r.value ? "Copied" : "Copy"}
                          </button>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </div>

              {/* Schemes */}
              <div className="grid min-w-0 gap-x-6 gap-y-8 sm:grid-cols-2 2xl:grid-cols-3">
                {calcRows.map((row) => (
                  <div key={row.key} className="min-w-0">
                    <SwatchStrip colors={row.colors} height="h-24" copied={copied} onCopy={copy} className="rounded-xl ring-1 ring-black/[0.07]" />
                    <div className="mt-3 flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-[15px] font-semibold tracking-[-0.01em]">{row.label}</h3>
                        <p className="mt-0.5 text-[12px] text-[#1c1712]/50">{row.detail}</p>
                      </div>
                      <div className="flex shrink-0 items-center gap-1.5">
                        <button onClick={() => copy(row.colors.join(", "))} className="rounded-full px-3 py-1 text-[12px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
                          {copied === row.colors.join(", ") ? "Copied" : "Copy all"}
                        </button>
                        <Link href={generatorLink(row.label, row.colors)} className="rounded-full bg-[#1c1712] px-3 py-1 text-[12px] font-semibold text-white transition hover:bg-[#c2410c]">
                          Open
                        </Link>
                      </div>
                    </div>
                    <p className="mt-1.5 truncate font-mono text-[11px] uppercase text-[#1c1712]/45">{row.colors.join(" · ")}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Tables ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Color wheel chart</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Primary, secondary and tertiary colors</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Primary colors</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">Red, yellow and blue on the artist wheel. They cannot be mixed from other colors. On screens the primaries are red, green and blue light.</p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Secondary colors</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">Orange (red + yellow), green (yellow + blue) and violet (blue + red). Each is an equal mix of two primaries.</p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Tertiary colors</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">A primary mixed with its neighboring secondary: red-orange, yellow-orange, yellow-green, blue-green, blue-violet and red-violet. See <Link href="/color-mixing-chart" className="font-semibold text-[#c2410c] hover:underline">how to mix them</Link>.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 xl:grid-cols-2">
              <div className="min-w-0">
                <h3 className="mb-3 text-[15px] font-semibold">Artist color wheel (RYB), 12 colors</h3>
                <WheelTable colors={ARTIST_WHEEL} caption="The 12 colors of the artist color wheel" />
              </div>
              <div className="min-w-0">
                <h3 className="mb-3 text-[15px] font-semibold">Screen color wheel (RGB), 12 colors</h3>
                <WheelTable colors={SCREEN_WHEEL} caption="The 12 colors of the RGB screen color wheel" />
              </div>
            </div>
          </div>
        </section>

        {/* ── Warm vs cool ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Temperature</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Warm colors and cool colors</h2>
            <p className="mt-3 max-w-5xl text-[15px] leading-7 text-[#1c1712]/60">
              Draw a line through the wheel between yellow-green and red-violet. Warm colors sit on one side and cool colors on the other. Warm colors feel energetic and seem to advance; cool colors feel calm and seem to recede. Many colors lean either way, so a red with a blue bias reads cooler than a red with an orange bias.
            </p>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {(["warm", "cool"] as const).map((t) => (
                <div key={t} className="rounded-2xl p-5 ring-1 ring-black/[0.07]">
                  <h3 className="text-[15px] font-semibold capitalize">{t} colors</h3>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {ARTIST_WHEEL.filter((c) => c.temperature === t).map((c) => (
                      <li key={c.name} className="flex items-center gap-2 rounded-full py-1 pl-1.5 pr-3 text-[13px] font-medium ring-1 ring-black/[0.1]">
                        <span className="h-4 w-4 rounded-full ring-1 ring-black/15" style={{ backgroundColor: c.hex }} aria-hidden="true" />
                        {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Complements differ by wheel ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Good to know</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Why the complement of red is green on one wheel and cyan on another</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Artist wheel (paint, RYB)</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">Red is opposite green, blue is opposite orange, and yellow is opposite violet. Mixing opposites gives browns and grays.</p>
              </div>
              <div className="rounded-xl p-5 ring-1 ring-black/[0.07]">
                <h3 className="text-[15px] font-semibold">Screen wheel (light, RGB)</h3>
                <p className="mt-2 text-[14px] leading-6 text-[#1c1712]/65">Red is opposite cyan, green is opposite magenta, and blue is opposite yellow. Adding opposites together makes white light.</p>
              </div>
            </div>
            <p className="mt-5 max-w-5xl text-[15px] leading-7 text-[#1c1712]/60">
              The two wheels place the same hues in different spots because paint mixes by absorbing light and screens mix by adding it. Use the artist wheel for paint, drawing and traditional design theory, and the screen wheel (or HSL hue rotation) for CSS and digital design.
            </p>
          </div>
        </section>

        {/* ── How to ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>How to use it</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Choose colors with the color wheel in four steps</h2>
            <ol className="mt-6 grid gap-4 md:grid-cols-2">
              {steps.map((st, i) => (
                <li key={i} className="flex gap-4 rounded-xl p-4 ring-1 ring-black/[0.07]">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#1c1712] text-[12px] font-bold text-white">{i + 1}</span>
                  <p className="text-[15px] leading-7 text-[#1c1712]/75">{st}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>FAQ</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Color wheel: frequently asked questions</h2>
            <div className="mt-6">
              <Faq items={faq} wide />
            </div>
          </div>
        </section>

        <section className="border-t border-black/[0.06]">
          <div className="w-full px-6 py-14 sm:px-8 lg:px-12">
            <p className={eyebrow}>Related</p>
            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-[-0.03em]">Go further with color</h2>
            <div className="mt-6">
              <RelatedLinks
                links={[
                  { title: "Color harmony generator", href: "/tools/color-harmony" },
                  { title: "Color mixing chart", href: "/color-mixing-chart" },
                  { title: "Color palette generator", href: "/generator" },
                  { title: "Pastel colors", href: "/pastel-colors" },
                  { title: "Color picker", href: "/color-picker" },
                  { title: "Color combinations", href: "/color-combinations" },
                  { title: "Color meanings", href: "/color-meanings" },
                  { title: "Color palettes", href: "/palettes" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
