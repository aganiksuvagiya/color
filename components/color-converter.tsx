"use client";

import { motion } from "framer-motion";
import { useState, useCallback } from "react";
import { hexToHsl, hslToHex, isValidHex } from "@/lib/color-utils";
import { Header } from "@/components/header";

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length !== 6) return null;
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => Math.min(255, Math.max(0, v)).toString(16).padStart(2, "0")).join("");
}

function getContrastColor(hex: string): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#ffffff";
  const lum = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return lum > 0.5 ? "#000000" : "#ffffff";
}

type Tab = "hex-to-rgb" | "rgb-to-hex" | "hex-to-hsl" | "hsl-to-hex";

export function ColorConverter() {
  const [tab, setTab] = useState<Tab>("hex-to-rgb");
  const [hex, setHex] = useState("#3B82F6");
  const [hexInput, setHexInput] = useState("#3B82F6");
  const [rgb, setRgb] = useState({ r: 59, g: 130, b: 246 });
  const [hsl, setHsl] = useState({ h: 217, s: 91, l: 60 });
  const [copied, setCopied] = useState<string | null>(null);

  const copy = useCallback((text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  }, []);

  function handleHexChange(val: string) {
    setHexInput(val);
    const norm = val.startsWith("#") ? val : `#${val}`;
    if (isValidHex(norm)) {
      setHex(norm);
      const r = hexToRgb(norm);
      if (r) setRgb(r);
      const h = hexToHsl(norm);
      setHsl({ h: h.h, s: h.s, l: h.l });
    }
  }

  function handleRgbChange(key: "r" | "g" | "b", val: string) {
    const num = Math.min(255, Math.max(0, parseInt(val) || 0));
    const next = { ...rgb, [key]: num };
    setRgb(next);
    const h = rgbToHex(next.r, next.g, next.b);
    setHex(h);
    setHexInput(h);
    const hslVal = hexToHsl(h);
    setHsl({ h: hslVal.h, s: hslVal.s, l: hslVal.l });
  }

  function handleHslChange(key: "h" | "s" | "l", val: string) {
    const max = key === "h" ? 360 : 100;
    const num = Math.min(max, Math.max(0, parseInt(val) || 0));
    const next = { ...hsl, [key]: num };
    setHsl(next);
    const h = hslToHex(next.h, next.s, next.l);
    setHex(h);
    setHexInput(h);
    const r = hexToRgb(h);
    if (r) setRgb(r);
  }

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hexUpper = hex.toUpperCase();

  const tabs: { key: Tab; label: string }[] = [
    { key: "hex-to-rgb", label: "HEX → RGB" },
    { key: "rgb-to-hex", label: "RGB → HEX" },
    { key: "hex-to-hsl", label: "HEX → HSL" },
    { key: "hsl-to-hex", label: "HSL → HEX" },
  ];

  const inputCls = "w-full rounded-xl border border-white/12 bg-white/6 px-4 py-3 font-mono text-sm text-white placeholder-white/25 outline-none focus:border-white/28 transition-colors";
  const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-widest text-white/35";
  const resultCls = "flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3";

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      <main className="mx-auto max-w-3xl px-4 py-12 pt-28 sm:px-6 sm:py-20">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Header */}
          <div className="mb-10 text-center">
            <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">Color Converter</h1>
            <p className="text-base text-white/45">Convert HEX to RGB, RGB to HEX, HEX to HSL - instant results, copy with one click.</p>
          </div>

          {/* Color preview */}
          <div
            className="mb-8 flex h-32 items-center justify-center rounded-2xl border border-white/10 text-2xl font-bold tracking-wider transition-colors duration-300"
            style={{ backgroundColor: hex, color: getContrastColor(hex) }}
          >
            {hexUpper}
          </div>

          {/* Tabs */}
          <div className="mb-6 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${
                  tab === t.key ? "bg-white/15 text-white" : "border border-white/10 bg-white/4 text-white/45 hover:bg-white/8 hover:text-white/70"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Converter card */}
          <div className="mb-8 rounded-2xl border border-white/10 bg-white/4 p-6">
            {(tab === "hex-to-rgb" || tab === "hex-to-hsl") && (
              <div className="space-y-5">
                <div>
                  <label className={labelCls}>HEX color code</label>
                  <div className="flex gap-2">
                    <label className="relative flex h-11 w-11 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-white/12">
                      <input type="color" value={hex} onChange={(e) => handleHexChange(e.target.value)} className="absolute inset-0 h-full w-full cursor-pointer opacity-0" />
                      <div className="h-full w-full" style={{ backgroundColor: hex }} />
                    </label>
                    <input
                      type="text"
                      value={hexInput}
                      onChange={(e) => handleHexChange(e.target.value)}
                      placeholder="#3B82F6"
                      className={inputCls}
                      maxLength={7}
                    />
                  </div>
                </div>
                <div className="border-t border-white/8 pt-5">
                  <p className={labelCls}>Result</p>
                  <div className={resultCls}>
                    <span className="font-mono text-sm text-white">{tab === "hex-to-rgb" ? rgbStr : hslStr}</span>
                    <button
                      onClick={() => copy(tab === "hex-to-rgb" ? rgbStr : hslStr, "result")}
                      className="text-xs font-semibold text-[#F97A45] hover:text-white transition-colors"
                    >
                      {copied === "result" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === "rgb-to-hex" && (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  {(["r", "g", "b"] as const).map((ch) => (
                    <div key={ch}>
                      <label className={labelCls}>{ch.toUpperCase()} (0–255)</label>
                      <input
                        type="number"
                        min={0}
                        max={255}
                        value={rgb[ch]}
                        onChange={(e) => handleRgbChange(ch, e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/8 pt-5">
                  <p className={labelCls}>Result</p>
                  <div className={resultCls}>
                    <span className="font-mono text-sm text-white">{hexUpper}</span>
                    <button onClick={() => copy(hexUpper, "result")} className="text-xs font-semibold text-[#F97A45] hover:text-white transition-colors">
                      {copied === "result" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {tab === "hsl-to-hex" && (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  {(["h", "s", "l"] as const).map((ch) => (
                    <div key={ch}>
                      <label className={labelCls}>{ch.toUpperCase()} {ch === "h" ? "(0–360)" : "(0–100)"}</label>
                      <input
                        type="number"
                        min={0}
                        max={ch === "h" ? 360 : 100}
                        value={hsl[ch]}
                        onChange={(e) => handleHslChange(ch, e.target.value)}
                        className={inputCls}
                      />
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/8 pt-5">
                  <p className={labelCls}>Result</p>
                  <div className={resultCls}>
                    <span className="font-mono text-sm text-white">{hexUpper}</span>
                    <button onClick={() => copy(hexUpper, "result")} className="text-xs font-semibold text-[#F97A45] hover:text-white transition-colors">
                      {copied === "result" ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* All values at once */}
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/4 p-6">
            <p className="mb-4 text-sm font-semibold text-white/70">All formats for <span className="font-mono text-white">{hexUpper}</span></p>
            <div className="space-y-2.5">
              {[
                { label: "HEX", value: hexUpper },
                { label: "RGB", value: rgbStr },
                { label: "HSL", value: hslStr },
                { label: "R", value: String(rgb.r) },
                { label: "G", value: String(rgb.g) },
                { label: "B", value: String(rgb.b) },
              ].map(({ label, value }) => (
                <div key={label} className={resultCls}>
                  <div className="flex items-center gap-3">
                    <span className="w-10 text-[11px] font-bold uppercase tracking-wider text-white/30">{label}</span>
                    <span className="font-mono text-sm text-white">{value}</span>
                  </div>
                  <button onClick={() => copy(value, label)} className="text-xs font-semibold text-white/40 hover:text-[#F97A45] transition-colors">
                    {copied === label ? "✓" : "Copy"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <h2 className="mb-5 text-xl font-bold">Common questions</h2>
            <div className="space-y-4">
              {[
                { q: "How do I convert HEX to RGB?", a: "Enter any HEX code above and it instantly shows the RGB equivalent. Click Copy to grab it." },
                { q: "How do I convert RGB to HEX?", a: 'Switch to the "RGB → HEX" tab, enter your R, G, B values (0–255), and get the HEX code instantly.' },
                { q: "What is HSL color format?", a: "HSL = Hue (0–360°), Saturation (0–100%), Lightness (0–100%). Easier to adjust in code than HEX or RGB." },
                { q: "Which format should I use in CSS?", a: "HEX for most cases. rgba() when you need transparency. HSL when adjusting brightness programmatically." },
              ].map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-white/10 bg-white/4 p-5">
                  <p className="mb-1.5 text-sm font-semibold text-white">{q}</p>
                  <p className="text-sm text-white/45 leading-relaxed">{a}</p>
                </div>
              ))}
            </div>
          </div>

        </motion.div>
      </main>
    </div>
  );
}
