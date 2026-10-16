"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { useCopy } from "@/components/seo/swatch-strip";
import {
  FORMAT_LABEL,
  FORMAT_PLACEHOLDER,
  formatters,
  hslToRgb,
  parseHex,
  parsers,
  rgbToHex,
  rgbToHsl,
  type ColorFormat,
  type RGB,
} from "@/lib/color-convert";
import { findClosestColorName } from "@/lib/color-names";

const ALL: ColorFormat[] = ["hex", "rgb", "hsl", "cmyk", "oklch"];

const HINT: Record<ColorFormat, string> = {
  hex: "Enter a HEX code, for example #3B82F6 or 3B82F6",
  rgb: "Enter three values from 0 to 255, for example 59, 130, 246 or rgb(59 130 246)",
  hsl: "Enter hue (0-360), saturation and lightness (0-100%), for example 217, 91%, 60%",
  cmyk: "Enter four percentages from 0 to 100, for example 76, 47, 0, 4",
  oklch: "Enter lightness, chroma and hue, for example 62.3% 0.188 259.8 or oklch(0.623 0.188 259.8)",
};

// The generator opens a shared palette from exactly five HEX codes, so build five around the color
// (deterministically, so server and client render the same link).
function paletteParam(rgb: RGB) {
  const { h, s, l } = rgbToHsl(rgb);
  const mk = (hue: number, sat: number, light: number) => rgbToHex(hslToRgb({ h: ((hue % 360) + 360) % 360, s: sat, l: light })).slice(1);
  return [mk(h, s, Math.max(14, l - 30)), mk(h - 30, s, l), rgbToHex(rgb).slice(1), mk(h + 30, s, l), mk(h, Math.min(s, 60), Math.min(94, l + 32))].join("-");
}

function textOn(hex: string) {
  const rgb = parseHex(hex);
  if (!rgb) return "#1c1712";
  return (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 > 0.55 ? "#1c1712" : "#ffffff";
}

export function ConverterTool({
  from,
  to,
  initial,
  reverseHref,
  examples = [],
}: {
  from: ColorFormat;
  to: ColorFormat;
  initial: string;
  reverseHref?: string;
  examples?: { name: string; hex: string }[];
}) {
  const [value, setValue] = useState(initial);
  const { copied, copy } = useCopy();

  const rgb = useMemo(() => parsers[from](value), [from, value]);
  const hex = rgb ? rgbToHex(rgb) : null;
  const name = hex ? findClosestColorName(hex) : null;
  const result = rgb ? formatters[to](rgb) : null;

  const randomize = () => {
    const c = { r: Math.floor(Math.random() * 256), g: Math.floor(Math.random() * 256), b: Math.floor(Math.random() * 256) };
    setValue(formatters[from](c));
  };

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      {/* Input */}
      <div className="min-w-0 rounded-2xl p-5 ring-1 ring-black/[0.07] sm:p-6">
        <label htmlFor="converter-input" className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">
          {FORMAT_LABEL[from]} value
        </label>
        <div className="mt-2 flex gap-2">
          <input
            id="converter-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={FORMAT_PLACEHOLDER[from]}
            spellCheck={false}
            autoComplete="off"
            aria-invalid={!rgb}
            aria-describedby="converter-hint"
            className={`h-12 min-w-0 flex-1 rounded-xl px-4 font-mono text-[15px] font-semibold outline-none ring-1 transition placeholder:text-[#1c1712]/30 focus:ring-2 ${
              rgb ? "ring-black/[0.12] focus:ring-black/50" : "ring-red-300 focus:ring-red-500"
            }`}
          />
          <label className="relative h-12 w-12 shrink-0 cursor-pointer overflow-hidden rounded-xl ring-1 ring-black/[0.12] transition hover:ring-black/30" title="Pick a color">
            <span className="absolute inset-0" style={{ backgroundColor: hex ?? "#ffffff" }} />
            <input
              type="color"
              aria-label="Pick a color"
              value={hex ? hex.toLowerCase() : "#ffffff"}
              onChange={(e) => {
                const c = parseHex(e.target.value);
                if (c) setValue(formatters[from](c));
              }}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
          </label>
        </div>
        <p id="converter-hint" className={`mt-2.5 text-[13px] leading-5 ${rgb ? "text-[#1c1712]/50" : "font-medium text-red-600"}`}>
          {rgb ? HINT[from] : `That is not a valid ${FORMAT_LABEL[from]} value. ${HINT[from]}.`}
        </p>

        {examples.length > 0 && (
          <div className="mt-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45">Try an example</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {examples.map((ex) => {
                const c = parseHex(ex.hex);
                if (!c) return null;
                const text = formatters[from](c);
                return (
                  <button
                    key={ex.name}
                    onClick={() => setValue(text)}
                    className="flex items-center gap-2 rounded-full py-1.5 pl-2 pr-3.5 text-[13px] font-medium text-[#1c1712]/75 ring-1 ring-black/[0.1] transition hover:text-[#1c1712] hover:ring-black/30"
                  >
                    <span className="h-4 w-4 rounded-full ring-1 ring-black/15" style={{ backgroundColor: ex.hex }} aria-hidden="true" />
                    {ex.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-2.5">
          <button onClick={randomize} className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
            Random color
          </button>
          {reverseHref && (
            <Link href={reverseHref} className="rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25">
              Swap: {FORMAT_LABEL[to]} to {FORMAT_LABEL[from]} ⇄
            </Link>
          )}
          {rgb && (
            <Link
              href={`/generator?label=${encodeURIComponent(`${name ?? "Color"} palette`)}&c=${paletteParam(rgb)}`}
              className="rounded-full bg-[#1c1712] px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c]"
            >
              Build a palette →
            </Link>
          )}
        </div>
      </div>

      {/* Result */}
      <div className="min-w-0 overflow-hidden rounded-2xl ring-1 ring-black/[0.07]" aria-live="polite">
        <div
          className="flex h-36 items-end justify-between gap-3 p-4 transition-colors sm:h-40"
          style={{ backgroundColor: hex ?? "#f5f5f5", color: hex ? textOn(hex) : "#1c1712" }}
        >
          <span className="rounded-full bg-black/55 px-3 py-1 text-[12px] font-semibold text-white">{name ?? "No color"}</span>
          {hex && <span className="font-mono text-[13px] font-semibold opacity-80">{hex}</span>}
        </div>

        <div className="p-5 sm:p-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#c2410c]">{FORMAT_LABEL[to]} result</p>
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="min-w-0 break-all font-mono text-[1.35rem] font-bold leading-tight tracking-[-0.01em] sm:text-[1.6rem]">{result ?? "—"}</p>
            <button
              disabled={!result}
              onClick={() => result && copy(result)}
              className="shrink-0 rounded-full bg-[#1c1712] px-5 py-2 text-[13px] font-semibold text-white transition hover:bg-[#c2410c] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[#1c1712]"
            >
              {result && copied === result ? "Copied ✓" : "Copy"}
            </button>
          </div>

          <dl className="mt-5 divide-y divide-black/[0.06] border-t border-black/[0.06]">
            {ALL.map((f) => {
              const v = rgb ? formatters[f](rgb) : "—";
              const isTarget = f === to;
              return (
                <div key={f} className="flex items-center justify-between gap-3 py-2.5">
                  <dt className={`w-14 shrink-0 text-[12px] font-semibold uppercase tracking-[0.1em] ${isTarget ? "text-[#c2410c]" : "text-[#1c1712]/45"}`}>{FORMAT_LABEL[f]}</dt>
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
  );
}
