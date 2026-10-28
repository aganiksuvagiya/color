"use client";

import { motion } from "framer-motion";
import type { Palette } from "@/lib/types";
import {
  getPaletteStory,
  getIndustryFitScores,
  getBrandMatches,
  getColorPsychology,
  getFontPairings,
} from "@/lib/insights-utils";

type Props = { palette: Palette; column?: "left" | "right" };

const sectionLabel = "mb-3 text-[10px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/50";

export function InsightsPanel({ palette, column }: Props) {
  const story = getPaletteStory(palette);
  const industryScores = getIndustryFitScores(palette).slice(0, 5);
  const brandMatches = getBrandMatches(palette);
  const fontPairings = getFontPairings(palette);

  const showLeft = !column || column === "left";
  const showRight = !column || column === "right";

  return (
    <div className="space-y-7">

      {/* ── LEFT COLUMN ── */}

      {/* Palette Story */}
      {showLeft && (
        <section>
          <p className={sectionLabel}>Palette Story</p>
          <div className="rounded-2xl border border-black/[0.10] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.07)]">
            <p className="text-[13px] leading-[1.75] text-[#1c1712]/70">{story}</p>
          </div>
        </section>
      )}

      {/* Color Psychology */}
      {showLeft && (
        <section>
          <p className={sectionLabel}>Color Psychology</p>
          <div className="space-y-3.5">
            {palette.colors.map((color, i) => {
              const tags = getColorPsychology(color.hex);
              return (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="mt-0.5 h-10 w-10 shrink-0 rounded-xl shadow-[0_2px_8px_rgba(28,23,18,0.14)]"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="min-w-0 pt-0.5">
                    <p className="text-[12px] font-semibold text-[#1c1712]/65">{color.name}</p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {tags.map(tag => (
                        <span
                          key={tag.label}
                          className="rounded-full border border-black/[0.10] bg-white px-2 py-0.5 text-[10px] font-semibold text-[#1c1712]/65 shadow-[0_1px_3px_rgba(28,23,18,0.06)]"
                        >
                          {tag.emoji} {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ── RIGHT COLUMN ── */}

      {/* Industry Fit */}
      {showRight && (
        <section>
          <p className={sectionLabel}>Industry Fit</p>
          <div className="space-y-3.5">
            {industryScores.map(({ name, emoji, score }) => (
              <div key={name}>
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="text-[12px] font-medium text-[#1c1712]/65">{emoji} {name}</span>
                  <span className="font-mono text-[11px] font-bold text-[#1c1712]/40">{score}%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06]">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: "linear-gradient(90deg, #ff7a45, #e8531f)" }}
                    initial={{ width: 0 }}
                    animate={{ width: `${score}%` }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Brand Matches */}
      {showRight && brandMatches.length > 0 && (
        <section>
          <p className={sectionLabel}>Similar Brands</p>
          <div className="grid grid-cols-2 gap-2.5">
            {brandMatches.map(({ name, description, similarity }) => (
              <div key={name} className="rounded-2xl border border-black/[0.10] bg-white p-3.5 shadow-[0_1px_6px_rgba(28,23,18,0.07)]">
                <p className="text-[13px] font-bold tracking-[-0.01em] text-[#1c1712]">{name}</p>
                <p className="mt-1 text-[11px] leading-[1.5] text-[#1c1712]/55">{description}</p>
                <span className="mt-2.5 inline-flex items-center rounded-full border border-[#e8531f]/20 bg-[#e8531f]/10 px-2 py-0.5 font-mono text-[9px] font-bold text-[#e8531f]">
                  {similarity}% match
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Font Pairings */}
      {showRight && (
        <section>
          <p className={sectionLabel}>Font Pairings</p>
          <div className="space-y-2.5">
            {fontPairings.map((pair, i) => (
              <div key={i} className="rounded-2xl border border-black/[0.10] bg-white p-4 shadow-[0_1px_6px_rgba(28,23,18,0.07)]">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.20em] text-[#1c1712]/40">{pair.style}</p>
                <p className="text-[16px] font-bold tracking-[-0.02em] text-[#1c1712]">{pair.heading}</p>
                <p className="mt-0.5 text-[12px] text-[#1c1712]/55">
                  {pair.body}
                  {pair.mono ? <span className="text-[#1c1712]/35"> · {pair.mono}</span> : ""}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
