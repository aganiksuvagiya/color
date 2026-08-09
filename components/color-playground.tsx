"use client";

import { useMemo, useState } from "react";
import { hslToHex, getContrastText } from "@/lib/color-utils";

type SliderKey = "hue" | "saturation" | "lightness" | "contrast";

const SLIDERS: { key: SliderKey; label: string; min: number; max: number }[] = [
  { key: "hue", label: "Hue", min: 0, max: 360 },
  { key: "saturation", label: "Saturation", min: 0, max: 100 },
  { key: "lightness", label: "Lightness", min: 15, max: 85 },
  { key: "contrast", label: "Contrast", min: 0, max: 100 },
];

const DEFAULTS: Record<SliderKey, number> = {
  hue: 18,
  saturation: 78,
  lightness: 52,
  contrast: 62,
};

export function ColorPlayground() {
  const [values, setValues] = useState<Record<SliderKey, number>>(DEFAULTS);

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

  const isDark = theme.bgText === "light";
  const bodyTextClass = isDark ? "text-white/70" : "text-black/65";
  const headingTextClass = isDark ? "text-white" : "text-black";
  const mutedTextClass = isDark ? "text-white/45" : "text-black/40";

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.85fr_1.15fr]">
      <div className="rounded-[28px] border border-white/12 bg-[#2a140a]/70 p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/56">Controls</p>
        <div className="mt-6 space-y-6">
          {SLIDERS.map((slider) => (
            <div key={slider.key}>
              <div className="flex items-center justify-between">
                <label htmlFor={`playground-${slider.key}`} className="text-sm font-medium text-white/78">
                  {slider.label}
                </label>
                <span className="font-mono text-xs text-white/45">{values[slider.key]}</span>
              </div>
              <input
                id={`playground-${slider.key}`}
                type="range"
                min={slider.min}
                max={slider.max}
                value={values[slider.key]}
                onChange={(e) => update(slider.key, Number(e.target.value))}
                className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/12 accent-[color:var(--accent)]"
                style={{ ["--accent" as string]: theme.accent }}
                aria-label={`Adjust ${slider.label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setValues(DEFAULTS)}
          className="mt-7 rounded-full border border-white/14 px-4 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
        >
          Reset controls
        </button>
      </div>

      <div
        className="overflow-hidden rounded-[28px] border p-7 transition-colors duration-300 sm:p-9"
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
