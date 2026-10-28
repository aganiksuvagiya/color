"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { hslToHex, getContrastText } from "@/lib/color-utils";

type SliderKey = "hue" | "saturation" | "lightness" | "contrast";

const SLIDERS: { key: SliderKey; label: string; min: number; max: number; unit: string }[] = [
  { key: "hue", label: "Hue", min: 0, max: 360, unit: "°" },
  { key: "saturation", label: "Saturation", min: 0, max: 100, unit: "%" },
  { key: "lightness", label: "Lightness", min: 15, max: 85, unit: "%" },
  { key: "contrast", label: "Contrast", min: 0, max: 100, unit: "" },
];

const DEFAULTS: Record<SliderKey, number> = {
  hue: 18,
  saturation: 78,
  lightness: 52,
  contrast: 62,
};

const THUMB =
  "[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent " +
  "[&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full " +
  "[&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-(--thumb) [&::-webkit-slider-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.4)] " +
  "[&::-moz-range-thumb]:box-border [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full " +
  "[&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-(--thumb) [&::-moz-range-thumb]:shadow-[0_1px_5px_rgba(0,0,0,0.4)]";

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1c1712]/45";

export function ColorPlayground() {
  const [values, setValues] = useState<Record<SliderKey, number>>(DEFAULTS);
  const [copied, setCopied] = useState<string | null>(null);

  const theme = useMemo(() => {
    const { hue, saturation, lightness, contrast } = values;
    const accent = hslToHex(hue, saturation, lightness);
    const accentText = getContrastText(accent);

    // "Contrast" drives how far the surface/background lightness sits from the accent,
    // so higher values read as a punchier, higher-contrast UI rather than a flat one.
    const bgLightness = lightness > 50 ? Math.max(4, 18 - contrast * 0.12) : Math.min(96, 82 + contrast * 0.12);
    const surfaceLightness = lightness > 50 ? bgLightness + 6 : bgLightness - 6;

    const background = hslToHex(hue, Math.min(saturation * 0.22, 22), bgLightness);
    const surface = hslToHex(hue, Math.min(saturation * 0.18, 18), surfaceLightness);
    const border = hslToHex(hue, Math.min(saturation * 0.16, 16), bgLightness + (lightness > 50 ? 12 : -12));
    const bgText = getContrastText(background);

    return { accent, accentText, background, surface, border, bgText };
  }, [values]);

  function update(key: SliderKey, value: number) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function copy(hex: string) {
    await navigator.clipboard.writeText(hex.toUpperCase());
    setCopied(hex);
    setTimeout(() => setCopied((c) => (c === hex ? null : c)), 1500);
  }

  const isDark = theme.bgText === "light";
  const bodyTextClass = isDark ? "text-white/70" : "text-black/65";
  const headingTextClass = isDark ? "text-white" : "text-black";
  const mutedTextClass = isDark ? "text-white/45" : "text-black/40";

  const { hue, saturation, lightness } = values;
  const tracks: Record<SliderKey, string> = {
    hue: `linear-gradient(to right, ${[0, 60, 120, 180, 240, 300, 360].map((h) => `hsl(${h} 100% 50%)`).join(", ")})`,
    saturation: `linear-gradient(to right, hsl(${hue} 0% ${lightness}%), hsl(${hue} 100% ${lightness}%))`,
    lightness: `linear-gradient(to right, hsl(${hue} ${saturation}% 15%), hsl(${hue} ${saturation}% 50%), hsl(${hue} ${saturation}% 85%))`,
    contrast: `linear-gradient(to right, ${theme.accent}33, ${theme.accent})`,
  };

  const tokens = [
    { name: "Accent", hex: theme.accent },
    { name: "Background", hex: theme.background },
    { name: "Surface", hex: theme.surface },
    { name: "Border", hex: theme.border },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.3fr)]">
      <div className="min-w-0 rounded-2xl ring-1 ring-black/[0.07] lg:sticky lg:top-24">
        <div className="p-5 sm:p-6">
          <p className={label}>Controls</p>
          <div className="mt-5 space-y-6">
            {SLIDERS.map((slider) => (
              <div key={slider.key}>
                <div className="mb-2 flex items-center justify-between">
                  <label htmlFor={`playground-${slider.key}`} className="text-[13px] font-semibold text-[#1c1712]/65">
                    {slider.label}
                  </label>
                  <span className="font-mono text-[13px] font-semibold">{values[slider.key]}{slider.unit}</span>
                </div>
                <div className="relative h-5">
                  <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 rounded-full ring-1 ring-black/[0.08]" style={{ background: tracks[slider.key] }} />
                  <input
                    id={`playground-${slider.key}`}
                    type="range"
                    min={slider.min}
                    max={slider.max}
                    value={values[slider.key]}
                    onChange={(e) => update(slider.key, Number(e.target.value))}
                    className={`absolute inset-0 h-5 w-full cursor-pointer appearance-none bg-transparent focus-visible:outline-none focus-visible:[&::-webkit-slider-thumb]:ring-2 focus-visible:[&::-webkit-slider-thumb]:ring-[#1c1712] ${THUMB}`}
                    style={{ "--thumb": slider.key === "hue" ? `hsl(${hue} 100% 50%)` : theme.accent } as CSSProperties}
                    aria-label={`Adjust ${slider.label.toLowerCase()}`}
                  />
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setValues(DEFAULTS)}
            className="mt-6 rounded-full px-4 py-2 text-[13px] font-semibold text-[#1c1712]/70 ring-1 ring-black/[0.12] transition hover:text-[#1c1712] hover:ring-black/25"
          >
            Reset controls
          </button>
        </div>

        <div className="border-t border-black/[0.06] p-5 sm:p-6">
          <p className={label}>Theme colors</p>
          <ul className="mt-3 divide-y divide-black/[0.06]">
            {tokens.map((t) => (
              <li key={t.name}>
                <button onClick={() => copy(t.hex)} className="group flex w-full items-center gap-3 py-2.5 text-left">
                  <span className="h-7 w-7 shrink-0 rounded-lg ring-1 ring-black/10" style={{ backgroundColor: t.hex }} />
                  <span className="flex-1 text-[14px] font-semibold">{t.name}</span>
                  <span className="font-mono text-[12px] uppercase text-[#1c1712]/50 transition group-hover:text-[#c2410c]">{copied === t.hex ? "✓ Copied" : t.hex}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        className="min-w-0 overflow-hidden rounded-2xl border p-6 transition-colors duration-300 sm:p-9"
        style={{ backgroundColor: theme.background, borderColor: theme.border }}
      >
        <div className="flex items-center justify-between">
          <span className={`text-xs font-semibold uppercase tracking-[0.24em] ${mutedTextClass}`}>Live preview</span>
          <span
            className="rounded-full px-3 py-1 text-[11px] font-medium"
            style={{ backgroundColor: theme.accent, color: theme.accentText === "light" ? "#fff" : "#161412" }}
          >
            New
          </span>
        </div>

        <h3 className={`mt-6 text-3xl font-semibold tracking-[-0.04em] ${headingTextClass}`}>
          Design with confidence
        </h3>
        <p className={`mt-3 max-w-sm text-sm leading-6 ${bodyTextClass}`}>
          Every control updates this preview instantly, so you can see how a color choice actually feels in an interface before you commit to it.
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: theme.accent, color: theme.accentText === "light" ? "#fff" : "#161412" }}
          >
            Primary action
          </button>
          <div
            className="rounded-xl border px-4 py-2.5 text-sm"
            style={{ borderColor: theme.border, color: theme.bgText === "light" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.6)" }}
          >
            Secondary
          </div>
        </div>

        <div
          className="mt-7 rounded-2xl border p-5"
          style={{ backgroundColor: theme.surface, borderColor: theme.border }}
        >
          <div className="flex items-center justify-between">
            <p className={`text-sm font-semibold ${headingTextClass}`}>Card title</p>
            <span
              className="rounded-full px-2.5 py-1 text-[10px] font-medium"
              style={{ backgroundColor: theme.accent, color: theme.accentText === "light" ? "#fff" : "#161412" }}
            >
              Badge
            </span>
          </div>
          <p className={`mt-2 text-sm leading-6 ${bodyTextClass}`}>
            A short paragraph shows how body text reads against the current background and surface tones.
          </p>
          <div
            className="mt-4 rounded-lg border px-3 py-2 text-sm"
            style={{ borderColor: theme.border, color: mutedTextClass.includes("white") ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.45)" }}
          >
            Input placeholder
          </div>
        </div>
      </div>
    </div>
  );
}
