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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <p className="mb-3 text-sm font-medium text-white/50">Accessibility (WCAG Contrast)</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="text-left text-white/30">
              <th className="pb-2 pr-4">Color</th>
              {backgrounds.map((bg) => (
                <th key={bg.label} className="pb-2 pr-4">vs {bg.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {palette.colors.map((color) => (
              <tr key={color.role} className="border-t border-white/5">
                <td className="flex items-center gap-2 py-2 pr-4">
                  <div className="h-4 w-4 rounded" style={{ backgroundColor: color.hex }} />
                  <span className="text-white/60">{color.role}</span>
                </td>
                {backgrounds.map((bg) => {
                  const ratio = getContrastRatio(color.hex, bg.hex);
                  const level = getWcagLevel(ratio);
                  return (
                    <td key={bg.label} className="py-2 pr-4">
                      <span className="mr-2 text-white/50">{ratio}:1</span>
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold ${
                        level === "AAA" ? "bg-emerald-500/20 text-emerald-400" :
                        level === "AA" ? "bg-amber-500/20 text-amber-400" :
                        "bg-red-500/20 text-red-400"
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
  );
}
