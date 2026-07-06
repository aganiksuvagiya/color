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
  exportAsSvg,
  exportAsGpl,
  generatePngDataUrl,
  generateAseBlob,
  generatePdfBlob,
} from "@/lib/export-utils";
import type { Palette } from "@/lib/types";

type Format = "tailwind" | "css" | "json" | "scss" | "swift" | "android" | "figma" | "svg" | "gpl" | "png" | "ase" | "pdf";

type Props = { palette: Palette };

const DOWNLOAD_FORMATS = ["png", "ase", "pdf"] as const;
type DownloadFormat = (typeof DOWNLOAD_FORMATS)[number];

const tabs: { key: Format; label: string }[] = [
  { key: "tailwind", label: "Tailwind" },
  { key: "css", label: "CSS" },
  { key: "scss", label: "SCSS" },
  { key: "json", label: "JSON" },
  { key: "figma", label: "Figma" },
  { key: "svg", label: "SVG" },
  { key: "gpl", label: "GPL" },
  { key: "swift", label: "Swift" },
  { key: "android", label: "Android" },
  { key: "png", label: "PNG" },
  { key: "ase", label: "ASE" },
  { key: "pdf", label: "PDF" },
];

type PreviewFormat = Exclude<Format, DownloadFormat>;

const formatters: Record<PreviewFormat, (p: Palette) => string> = {
  tailwind: exportAsTailwind,
  css: exportAsCssVariables,
  scss: exportAsScss,
  json: exportAsJson,
  figma: exportAsFigmaTokens,
  svg: exportAsSvg,
  gpl: exportAsGpl,
  swift: exportAsSwift,
  android: exportAsAndroid,
};

function isDownloadFormat(format: Format): format is DownloadFormat {
  return (DOWNLOAD_FORMATS as readonly string[]).includes(format);
}

export function ExportPanel({ palette }: Props) {
  const [format, setFormat] = useState<Format>("tailwind");
  const [copied, setCopied] = useState(false);

  const output = !isDownloadFormat(format) ? formatters[format](palette) : "";

  async function handleCopy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadFile(href: string, extension: string) {
    const link = document.createElement("a");
    link.download = `${palette.label.replace(/\s+/g, "-").toLowerCase()}-palette.${extension}`;
    link.href = href;
    link.click();
  }

  function handleDownload() {
    if (format === "png") {
      downloadFile(generatePngDataUrl(palette), "png");
    } else if (format === "ase") {
      const url = URL.createObjectURL(generateAseBlob(palette));
      downloadFile(url, "ase");
      URL.revokeObjectURL(url);
    } else if (format === "pdf") {
      const url = URL.createObjectURL(generatePdfBlob(palette));
      downloadFile(url, "pdf");
      URL.revokeObjectURL(url);
    }
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

        {!isDownloadFormat(format) ? (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/12"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-white/8 px-3 py-1.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/12"
          >
            Download
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isDownloadFormat(format) ? (
          <motion.div
            key={format}
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
