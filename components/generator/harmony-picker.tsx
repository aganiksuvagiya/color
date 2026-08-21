"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { isValidHex } from "@/lib/color-utils";
import { generateHarmony, type HarmonyMode } from "@/lib/harmony";
import type { Palette } from "@/lib/types";

type Props = { onGenerate: (palette: Palette) => void };

const modes: { key: HarmonyMode; label: string }[] = [
  { key: "complementary", label: "Complementary" },
  { key: "analogous", label: "Analogous" },
  { key: "triadic", label: "Triadic" },
  { key: "split-complementary", label: "Split-comp" },
  { key: "tetradic", label: "Tetradic" },
  { key: "monochromatic", label: "Monochromatic" },
];

export function HarmonyPicker({ onGenerate }: Props) {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [activeMode, setActiveMode] = useState<HarmonyMode>("complementary");

  function handleGenerate(mode: HarmonyMode) {
    setActiveMode(mode);
    if (isValidHex(baseColor)) {
      onGenerate(generateHarmony(baseColor, mode));
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/[0.08] bg-white p-5 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
    >
      <div className="mb-4 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1c1712]/[0.05]">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="text-[#1c1712]/45">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3a9 9 0 010 18" />
            <path d="M12 7a5 5 0 010 10" />
          </svg>
        </div>
        <p className="text-sm font-medium text-[#1c1712]/65">Color Harmony</p>
      </div>

      <div className="mb-4 flex items-center gap-3">
        <div className="relative">
          <div className="h-10 w-10 rounded-xl border border-black/[0.10] shadow-sm" style={{ backgroundColor: baseColor }} />
          <input
            type="color"
            value={baseColor}
            onChange={(e) => {
              setBaseColor(e.target.value);
              onGenerate(generateHarmony(e.target.value, activeMode));
            }}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </div>
        <input
          type="text"
          value={baseColor}
          onChange={(e) => {
            setBaseColor(e.target.value);
            if (isValidHex(e.target.value)) {
              onGenerate(generateHarmony(e.target.value, activeMode));
            }
          }}
          className="w-24 rounded-xl border border-black/[0.10] bg-[#faf7f2] px-3 py-2 font-mono text-sm text-[#1c1712] outline-none transition-colors focus:border-black/25 focus:bg-white"
          maxLength={7}
          placeholder="#hex"
        />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {modes.map((m) => (
          <button
            key={m.key}
            onClick={() => handleGenerate(m.key)}
            className={`rounded-xl px-3.5 py-2 text-xs font-medium transition-all ${
              activeMode === m.key
                ? "bg-[#1c1712]/8 text-[#1c1712] shadow-sm"
                : "text-[#1c1712]/40 hover:bg-[#1c1712]/5 hover:text-[#1c1712]/65"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
    </motion.div>
  );
}
