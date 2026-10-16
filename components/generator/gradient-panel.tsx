"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Palette } from "@/lib/types";

type Direction = "to right" | "to bottom" | "to bottom right" | "circle";
type Props = { palette: Palette };

export function GradientPanel({ palette }: Props) {
  const [color1, setColor1] = useState(0);
  const [color2, setColor2] = useState(1);
  const [direction, setDirection] = useState<Direction>("to right");
  const [copied, setCopied] = useState(false);

  const hex1 = palette.colors[color1]?.hex ?? "#000";
  const hex2 = palette.colors[color2]?.hex ?? "#fff";

  const gradient = direction === "circle"
    ? `radial-gradient(circle, ${hex1}, ${hex2})`
    : `linear-gradient(${direction}, ${hex1}, ${hex2})`;

  const cssCode = `background: ${gradient};`;

  async function handleCopy() {
    await navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const directions: { key: Direction; label: string }[] = [
    { key: "to right", label: "→" },
    { key: "to bottom", label: "↓" },
    { key: "to bottom right", label: "↘" },
    { key: "circle", label: "◎" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
    >
      <p className="mb-3 text-sm font-medium text-[#1c1712]/55">Gradient Generator</p>

      <div className="mb-3 h-32 rounded-xl shadow-[inset_0_0_0_1px_rgba(28,23,18,0.06)]" style={{ background: gradient }} />

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#1c1712]/40">From</span>
          <select
            value={color1}
            onChange={(e) => setColor1(Number(e.target.value))}
            className="rounded-lg border border-black/[0.10] bg-[#faf7f2] px-2 py-1 text-xs text-[#1c1712] outline-none focus:border-black/20"
          >
            {palette.colors.map((c, i) => (
              <option key={i} value={i}>{c.role} ({c.hex})</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#1c1712]/40">To</span>
          <select
            value={color2}
            onChange={(e) => setColor2(Number(e.target.value))}
            className="rounded-lg border border-black/[0.10] bg-[#faf7f2] px-2 py-1 text-xs text-[#1c1712] outline-none focus:border-black/20"
          >
            {palette.colors.map((c, i) => (
              <option key={i} value={i}>{c.role} ({c.hex})</option>
            ))}
          </select>
        </div>
        <div className="flex gap-1">
          {directions.map((d) => (
            <button
              key={d.key}
              onClick={() => setDirection(d.key)}
              className={`rounded-lg px-2.5 py-1 text-sm transition-colors ${
                direction === d.key
                  ? "bg-[#1c1712]/8 text-[#1c1712]"
                  : "text-[#1c1712]/40 hover:text-[#1c1712]/70"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <code className="flex-1 rounded-lg bg-[#f0ebe4] px-3 py-2 font-mono text-xs text-[#1c1712]/65">{cssCode}</code>
        <button
          onClick={handleCopy}
          className="rounded-lg border border-black/10 bg-[#faf7f2] px-3 py-2 text-xs font-medium text-[#1c1712]/60 transition-colors hover:text-[#1c1712]"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}
