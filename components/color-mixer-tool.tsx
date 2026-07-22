"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { findClosestColorName } from "@/lib/color-names";
import { getContrastText, isValidHex } from "@/lib/color-utils";
import { toolPageContent } from "@/lib/seo/tool-pages";

const STEPS = 9;

function hexToRgb(hex: string) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHex(r: number, g: number, b: number) {
  const clamp = (n: number) => Math.max(0, Math.min(255, Math.round(n)));
  return `#${[r, g, b].map((n) => clamp(n).toString(16).padStart(2, "0")).join("")}`;
}

function mixColors(a: string, b: string, t: number) {
  const ca = hexToRgb(a);
  const cb = hexToRgb(b);
  return rgbToHex(ca.r + (cb.r - ca.r) * t, ca.g + (cb.g - ca.g) * t, ca.b + (cb.b - ca.b) * t);
}

export function ColorMixerTool() {
  const [colorA, setColorA] = useState("#4F46E5");
  const [colorB, setColorB] = useState("#F59E0B");
  const [copied, setCopied] = useState<string | null>(null);

  const valid = isValidHex(colorA) && isValidHex(colorB);
  const steps = valid
    ? Array.from({ length: STEPS }, (_, i) => mixColors(colorA, colorB, i / (STEPS - 1)))
    : [];
  const midpoint = valid ? mixColors(colorA, colorB, 0.5) : null;

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex);
    setCopied(hex);
    window.setTimeout(() => setCopied((current) => (current === hex ? null : current)), 1000);
  }

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Color Mixer</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Blend two colors and get a smooth 9-step scale between them, ready to copy.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-6 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          {[
            { label: "Color A", value: colorA, setValue: setColorA },
            { label: "Color B", value: colorB, setValue: setColorB },
          ].map((input) => (
            <div key={input.label} className="flex items-center gap-3">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-white/15" style={{ backgroundColor: isValidHex(input.value) ? input.value : "#333" }}>
                <input
                  type="color"
                  aria-label={input.label}
                  value={isValidHex(input.value) ? input.value : "#888888"}
                  onChange={(e) => input.setValue(e.target.value)}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
              </div>
              <div>
                <p className="text-xs text-white/40">{input.label}</p>
                <input
                  type="text"
                  value={input.value}
                  onChange={(e) => input.setValue(e.target.value)}
                  maxLength={7}
                  className="w-28 rounded-lg border border-white/10 bg-white/5 px-2 py-1.5 font-mono text-sm text-white outline-none transition-colors focus:border-white/25"
                />
              </div>
            </div>
          ))}
        </motion.div>

        {midpoint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-6 flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="h-14 w-14 shrink-0 rounded-xl border border-white/15" style={{ backgroundColor: midpoint }} />
            <div>
              <p className="text-xs text-white/40">Midpoint mix</p>
              <p className="font-semibold text-white">{findClosestColorName(midpoint)}</p>
              <p className="font-mono text-xs uppercase text-white/40">{midpoint}</p>
            </div>
          </motion.div>
        )}

        {steps.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-3 gap-2 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-9"
          >
            {steps.map((hex, i) => (
              <button
                key={i}
                onClick={() => handleCopy(hex)}
                className="group relative flex h-28 flex-col justify-end p-2 transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: hex, color: getContrastText(hex) === "light" ? "#fff" : "#111" }}
              >
                <span className="font-mono text-[10px] uppercase opacity-80">{hex}</span>
                {copied === hex && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-xs font-semibold text-white">
                    Copied!
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}

        <ToolPageSections config={toolPageContent["color-mixer"]} />
      </div>
    </main>
  );
}
