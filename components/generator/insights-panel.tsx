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

type Props = { palette: Palette };

export function InsightsPanel({ palette }: Props) {
  const story = getPaletteStory(palette);
  const industryScores = getIndustryFitScores(palette).slice(0, 5);
  const brandMatches = getBrandMatches(palette);
  const fontPairings = getFontPairings(palette);

  return (
    <div className="space-y-6">

      {/* Palette Story */}
      <section>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Palette Story</p>
        <div className="rounded-xl border border-white/8 bg-white/4 p-4">
          <p className="text-sm leading-relaxed text-white/75">{story}</p>
        </div>
      </section>

      {/* Color Psychology */}
      <section>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Color Psychology</p>
        <div className="space-y-2.5">
          {palette.colors.map((color, i) => {
            const tags = getColorPsychology(color.hex);
            return (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="mt-0.5 h-6 w-6 shrink-0 rounded-lg"
                  style={{ backgroundColor: color.hex }}
                />
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-white/55">{color.name}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {tags.map(tag => (
                      <span
                        key={tag.label}
                        className="rounded-md bg-white/6 px-1.5 py-0.5 text-[10px] text-white/50"
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

      {/* Industry Fit */}
      <section>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Industry Fit</p>
        <div className="space-y-2.5">
          {industryScores.map(({ name, emoji, score }) => (
            <div key={name}>
              <div className="mb-1 flex items-center justify-between">
                <span className="text-[11px] text-white/60">{emoji} {name}</span>
                <span className="text-[11px] font-mono text-white/40">{score}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/8">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[#F15B2A] to-[#F97A45]"
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Matches */}
      {brandMatches.length > 0 && (
        <section>
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Similar Brands</p>
          <div className="grid grid-cols-2 gap-2">
            {brandMatches.map(({ name, description, similarity }) => (
              <div key={name} className="rounded-xl border border-white/8 bg-white/4 p-3">
                <p className="text-[12px] font-semibold text-white/80">{name}</p>
                <p className="mt-0.5 text-[10px] text-white/38">{description}</p>
                <p className="mt-1.5 text-[10px] font-mono text-white/28">{similarity}% match</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Font Pairings */}
      <section>
        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/30">Font Pairings</p>
        <div className="space-y-2">
          {fontPairings.map((pair, i) => (
            <div key={i} className="rounded-xl border border-white/8 bg-white/4 p-3">
              <p className="mb-1 text-[10px] text-white/32">{pair.style}</p>
              <p className="text-[13px] font-semibold text-white/80">{pair.heading}</p>
              <p className="mt-0.5 text-[11px] text-white/42">
                {pair.body}{pair.mono ? ` · ${pair.mono}` : ""}
              </p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
