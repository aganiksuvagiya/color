"use client";

import { useState } from "react";

/** tone "light" = white text, for use on top of a dark or saturated color; "dark" = dark text, for a light color or the white page. */
export function CopyHexButton({ hex, tone = "dark" }: { hex: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex.toUpperCase());
    } catch {
      const ta = document.createElement("textarea");
      ta.value = hex.toUpperCase();
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const look =
    tone === "light"
      ? "border-white/35 bg-white/15 text-white hover:bg-white/25"
      : "border-black/15 bg-black/[0.05] text-[#1c1712]/80 hover:bg-black/[0.09]";

  return (
    <button onClick={handleCopy} className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[13px] font-semibold transition ${look}`}>
      {copied ? (
        <>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
          </svg>
          Copy hex
        </>
      )}
    </button>
  );
}
