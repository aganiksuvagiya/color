"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  onGenerate: (prompt: string) => void;
  onRandom: () => void;
  isLoading: boolean;
};

export function PromptBar({ onGenerate, onRandom, isLoading }: Props) {
  const [prompt, setPrompt] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onGenerate(prompt.trim());
    }
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/8 to-white/3 p-1.5 shadow-lg shadow-black/20 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-3 rounded-[10px] bg-white/3 p-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25">
            <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
          </svg>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe a mood or brand... e.g. luxury skincare, fintech, editorial"
            className="w-full bg-transparent py-2.5 pl-10 pr-3 text-sm text-white outline-none placeholder:text-white/25"
            maxLength={200}
            disabled={isLoading}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onRandom}
            disabled={isLoading}
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/60 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white/80 disabled:opacity-40"
          >
            🎲 Random
          </button>

          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-b from-white to-white/90 px-6 py-2.5 text-sm font-semibold text-[#160b05] shadow-md shadow-white/10 transition-all hover:shadow-lg hover:shadow-white/15 disabled:opacity-40"
          >
            {isLoading ? (
              <>
                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#160b05]/20 border-t-[#160b05]" />
                Generating
              </>
            ) : (
              "Generate ✨"
            )}
          </button>
        </div>
      </div>
    </motion.form>
  );
}
