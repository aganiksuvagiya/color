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
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <p className="mb-3 text-sm font-medium text-white/50">Gradient Generator</p>

      <div className="mb-3 h-32 rounded-xl" style={{ background: gradient }} />

      <div className="mb-3 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">From</span>
          <select
            value={color1}
            onChange={(e) => setColor1(Number(e.target.value))}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white"
          >
            {palette.colors.map((c, i) => (
              <option key={i} value={i}>{c.role} ({c.hex})</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/30">To</span>
          <select
            value={color2}
            onChange={(e) => setColor2(Number(e.target.value))}
            className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs text-white"
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
              className={`rounded-lg px-2.5 py-1 text-sm ${direction === d.key ? "bg-white/15 text-white" : "text-white/40 hover:text-white/60"}`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <code className="flex-1 rounded-lg bg-black/30 px-3 py-2 font-mono text-xs text-white/60">{cssCode}</code>
        <button onClick={handleCopy} className="rounded-lg bg-white/8 px-3 py-2 text-xs font-medium text-white/60 hover:bg-white/12">
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </motion.div>
  );
}
