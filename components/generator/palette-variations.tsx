"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { generateShades } from "@/lib/shades";
import type { Palette } from "@/lib/types";

type Props = { palette: Palette };

export function PaletteVariations({ palette }: Props) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  async function handleCopy(hex: string) {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1200);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
    >
      <p className="mb-3 text-sm font-medium text-[#1c1712]/55">Palette Variations</p>
      <div className="space-y-3">
        {palette.colors.map((color, i) => (
          <div key={`${color.role}-${i}`} className="flex items-center gap-3">
            <div className="w-20 shrink-0 text-xs text-[#1c1712]/50">{color.name}</div>
            <div className="flex h-9 flex-1 overflow-hidden rounded-lg">
              {generateShades(color.hex).map((shade) => (
                <button
                  key={shade.hex}
                  onClick={() => handleCopy(shade.hex)}
                  className="group relative flex-1 transition-transform hover:scale-y-110"
                  style={{ backgroundColor: shade.hex }}
                  title={shade.hex}
                >
                  {copiedHex === shade.hex && (
                    <span className={`pointer-events-none absolute inset-0 flex items-center justify-center text-[9px] font-bold ${shade.text === "light" ? "text-white" : "text-black"}`}>
                      ✓
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-xs text-[#1c1712]/35">Click any shade to copy its hex code</p>
    </motion.div>
  );
}
