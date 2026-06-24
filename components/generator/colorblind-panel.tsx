"use client";

import { motion } from "framer-motion";
import { simulateColorBlind, type ColorBlindType } from "@/lib/colorblind";
import type { Palette } from "@/lib/types";

type Props = { palette: Palette };

const types: { key: ColorBlindType | "normal"; label: string; desc: string }[] = [
  { key: "normal", label: "Normal", desc: "Full color vision" },
  { key: "protanopia", label: "Protanopia", desc: "Red-blind (~1% of males)" },
  { key: "deuteranopia", label: "Deuteranopia", desc: "Green-blind (~1% of males)" },
  { key: "tritanopia", label: "Tritanopia", desc: "Blue-blind (very rare)" },
];

export function ColorBlindPanel({ palette }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <p className="mb-3 text-sm font-medium text-white/50">Color Blindness Simulation</p>

      <div className="space-y-3">
        {types.map((t) => (
          <div key={t.key} className="flex items-center gap-3">
            <div className="w-28 shrink-0">
              <p className="text-xs font-medium text-white/60">{t.label}</p>
              <p className="text-[10px] text-white/25">{t.desc}</p>
            </div>
            <div className="flex flex-1 gap-1">
              {palette.colors.map((color, i) => {
                const hex = t.key === "normal" ? color.hex : simulateColorBlind(color.hex, t.key);
                return (
                  <div
                    key={i}
                    className="h-10 flex-1 first:rounded-l-lg last:rounded-r-lg"
                    style={{ backgroundColor: hex }}
                    title={`${color.role}: ${hex}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
