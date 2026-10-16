"use client";

import { motion } from "framer-motion";
import { getContrastRatio, getWcagLevel } from "@/lib/accessibility";
import type { Palette } from "@/lib/types";

type Props = { palette: Palette };

export function AccessibilityPanel({ palette }: Props) {
  const backgrounds = [
    { label: "White", hex: "#FFFFFF" },
    { label: "Black", hex: "#000000" },
  ];

  return (
    <div className="space-y-5">
      {/* WCAG Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
      >
        <p className="mb-3 text-sm font-medium text-[#1c1712]/55">WCAG Contrast Ratios</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-[#1c1712]/40">
                <th className="pb-2 pr-4">Color</th>
                {backgrounds.map((bg) => (
                  <th key={bg.label} className="pb-2 pr-4">vs {bg.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {palette.colors.map((color, i) => (
                <tr key={`${color.role}-${i}`} className="border-t border-black/[0.05]">
                  <td className="flex items-center gap-2 py-2 pr-4">
                    <div className="h-4 w-4 rounded shadow-sm" style={{ backgroundColor: color.hex }} />
                    <span className="text-[#1c1712]/60">{color.role}</span>
                  </td>
                  {backgrounds.map((bg) => {
                    const ratio = getContrastRatio(color.hex, bg.hex);
                    const level = getWcagLevel(ratio);
                    return (
                      <td key={bg.label} className="py-2 pr-4">
                        <span className="mr-2 text-[#1c1712]/50">{ratio}:1</span>
                        <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                          level === "AAA" ? "bg-emerald-500/12 text-emerald-700" :
                          level === "AA" ? "bg-amber-500/12 text-amber-700" :
                          "bg-red-500/12 text-red-600"
                        }`}>
                          {level}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Contrast Simulator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1c1712]/40">
          Text Contrast Preview
        </p>
        <div className="space-y-2">
          {palette.colors.map((color, i) => {
            const fg = color.text === "dark" ? "#000000" : "#ffffff";
            const fgMid = color.text === "dark" ? "rgba(0,0,0,0.55)" : "rgba(255,255,255,0.55)";
            const btnBg = color.text === "dark" ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.18)";

            return (
              <div
                key={i}
                className="overflow-hidden rounded-xl p-4"
                style={{ backgroundColor: color.hex }}
              >
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider" style={{ color: fgMid }}>
                  {color.name} · {color.hex.toUpperCase()}
                </p>
                <p className="text-base font-bold leading-snug" style={{ color: fg }}>
                  The quick brown fox
                </p>
                <p className="mt-0.5 text-xs leading-relaxed" style={{ color: fgMid }}>
                  Jumps over the lazy dog. Body text readability check.
                </p>
                <div className="mt-3 flex gap-2">
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-semibold"
                    style={{ backgroundColor: btnBg, color: fg }}
                  >
                    Button
                  </span>
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-semibold"
                    style={{ border: `1px solid ${fg}30`, color: fg }}
                  >
                    Outline
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
