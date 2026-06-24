"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  exportAsCssVariables,
  exportAsJson,
  exportAsTailwind,
  exportAsScss,
  exportAsSwift,
  exportAsAndroid,
  exportAsFigmaTokens,
  generatePngDataUrl,
} from "@/lib/export-utils";
import type { Palette } from "@/lib/types";

type Format = "tailwind" | "css" | "json" | "scss" | "swift" | "android" | "figma" | "png";

type Props = { palette: Palette };

const tabs: { key: Format; label: string }[] = [
  { key: "tailwind", label: "Tailwind" },
  { key: "css", label: "CSS" },
  { key: "scss", label: "SCSS" },
  { key: "json", label: "JSON" },
  { key: "figma", label: "Figma" },
  { key: "swift", label: "Swift" },
  { key: "android", label: "Android" },
  { key: "png", label: "PNG" },
];

const formatters: Record<Exclude<Format, "png">, (p: Palette) => string> = {
  tailwind: exportAsTailwind,
  css: exportAsCssVariables,
  scss: exportAsScss,
  json: exportAsJson,
  figma: exportAsFigmaTokens,
  swift: exportAsSwift,
  android: exportAsAndroid,
};

export function ExportPanel({ palette }: Props) {
  const [format, setFormat] = useState<Format>("tailwind");
  const [copied, setCopied] = useState(false);

  const output = format !== "png" ? formatters[format](palette) : "";

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownloadPng() {
    const dataUrl = generatePngDataUrl(palette);
    const link = document.createElement("a");
    link.download = `${palette.label.replace(/\s+/g, "-").toLowerCase()}-palette.png`;
    link.href = dataUrl;
    link.click();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFormat(tab.key)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                format === tab.key
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {format !== "png" ? (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/12"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        ) : (
          <button
            onClick={handleDownloadPng}
            className="flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/12"
          >
            Download
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {format === "png" ? (
          <motion.div
            key="png"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex h-[120px] overflow-hidden rounded-xl"
          >
            {palette.colors.map((c, i) => (
              <div key={i} className="flex flex-1 flex-col justify-end p-2" style={{ backgroundColor: c.hex }}>
                <span className={`text-[10px] font-bold ${c.text === "light" ? "text-white" : "text-black"}`}>{c.role}</span>
                <span className={`font-mono text-[10px] ${c.text === "light" ? "text-white/70" : "text-black/60"}`}>{c.hex}</span>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.pre
            key={format}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="max-h-[240px] overflow-auto rounded-xl bg-black/30 p-4 font-mono text-xs leading-5 text-white/70"
          >
            {output}
          </motion.pre>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
