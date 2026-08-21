"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { hasUnlocked, POINT_REWARDS } from "@/lib/rewards";
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
import { awardPointsClient } from "@/lib/award-points-client";
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
  const { data: session } = useSession();
  const [format, setFormat] = useState<Format>("tailwind");
  const [copied, setCopied] = useState(false);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/points")
      .then((r) => r.json())
      .then((d) => setPoints(d.total ?? 0))
      .catch(() => {});
  }, [session?.user]);

  const figmaLocked = format === "figma" && !hasUnlocked(points, "FIGMA_EXPORT");
  const output = !isDownloadFormat(format) && !figmaLocked ? formatters[format](palette) : "";

  async function handleCopy() {
    if (figmaLocked) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    awardPointsClient("EXPORT_CSS");
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
    awardPointsClient("EXPORT_CSS");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border border-black/[0.08] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.06)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFormat(tab.key)}
              className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                format === tab.key
                  ? "bg-[#1c1712]/8 text-[#1c1712]"
                  : "text-[#1c1712]/40 hover:text-[#1c1712]/70"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {!isDownloadFormat(format) ? (
          <button
            onClick={handleCopy}
            disabled={figmaLocked}
            className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-[#faf7f2] px-3 py-1.5 text-xs font-medium text-[#1c1712]/60 transition-colors hover:text-[#1c1712] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {figmaLocked ? "Locked" : copied ? "Copied!" : "Copy"}
          </button>
        ) : (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-[#faf7f2] px-3 py-1.5 text-xs font-medium text-[#1c1712]/60 transition-colors hover:text-[#1c1712]"
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
        ) : figmaLocked ? (
          <motion.div
            key="figma-locked"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="rounded-xl border border-[#e8531f]/20 bg-[#e8531f]/8 p-4"
          >
            <p className="text-sm font-medium text-[#e8531f]">
              🔒 Unlock Figma export at {POINT_REWARDS.FIGMA_EXPORT} points
            </p>
            <p className="mt-1 text-xs text-[#1c1712]/50">
              You have {points} points — save/share palettes or try the Daily Challenge to earn more.
            </p>
            <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.min(100, Math.round((points / POINT_REWARDS.FIGMA_EXPORT) * 100))}%`,
                  background: "linear-gradient(90deg, #ff7a45, #e8531f)",
                }}
              />
            </div>
          </motion.div>
        ) : (
          <motion.pre
            key={format}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="max-h-[240px] overflow-auto rounded-xl bg-[#f0ebe4] p-4 font-mono text-xs leading-5 text-[#1c1712]/70"
          >
            {output}
          </motion.pre>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
