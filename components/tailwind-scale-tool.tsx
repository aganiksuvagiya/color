"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { generateTailwindScale, getContrastText, isValidHex } from "@/lib/color-utils";
import { toolPageContent } from "@/lib/seo/tool-pages";

export function TailwindScaleTool() {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [copied, setCopied] = useState<number | null>(null);

  const scale = isValidHex(baseColor) ? generateTailwindScale(baseColor) : [];

  function handleCopy(step: number, hex: string) {
    navigator.clipboard.writeText(hex);
    setCopied(step);
    window.setTimeout(() => setCopied((current) => (current === step ? null : current)), 1000);
  }

  function handleCopyConfig() {
    const config = scale.map(({ step, hex }) => `  "${step}": "${hex}",`).join("\n");
    navigator.clipboard.writeText(`{\n${config}\n}`);
  }

  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.2),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />
      <Header />

      <div className="relative mx-auto max-w-4xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10 text-center">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">Tailwind Color Scale Generator</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/50">
            Turn any hex color into a full Tailwind-style 50-950 shade scale, ready to paste into your config.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 flex flex-wrap items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl border border-white/15" style={{ backgroundColor: isValidHex(baseColor) ? baseColor : "#333" }}>
              <input
                type="color"
                aria-label="Base color"
                value={isValidHex(baseColor) ? baseColor : "#4F46E5"}
                onChange={(e) => setBaseColor(e.target.value)}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
            </div>
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              maxLength={7}
              placeholder="#4F46E5"
              className="w-28 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-white/25"
            />
          </div>

          {scale.length > 0 && (
            <button
              onClick={handleCopyConfig}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10"
            >
              Copy as Tailwind config
            </button>
          )}
        </motion.div>

        {scale.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 gap-2 overflow-hidden rounded-2xl border border-white/10 sm:grid-cols-11"
          >
            {scale.map(({ step, hex }) => (
              <button
                key={step}
                onClick={() => handleCopy(step, hex)}
                className="group relative flex h-24 flex-col justify-between p-2.5 text-left transition-transform hover:scale-[1.03]"
                style={{ backgroundColor: hex, color: getContrastText(hex) === "light" ? "#fff" : "#111" }}
              >
                <span className="text-xs font-bold">{step}</span>
                <span className="font-mono text-[9px] uppercase opacity-80">{hex}</span>
                {copied === step && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/50 text-[10px] font-semibold text-white">
                    Copied!
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}

        <ToolPageSections config={toolPageContent["tailwind-scale"]} />
      </div>
    </main>
  );
}
