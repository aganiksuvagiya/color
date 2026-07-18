"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const DISMISS_KEY = "hueflow-promo-thepdftools-dismissed-until";
const DISMISS_DURATION_MS = 24 * 60 * 60 * 1000;

export function PromoBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const checkDismissed = () => {
      const dismissedUntil = Number(localStorage.getItem(DISMISS_KEY) ?? 0);
      setVisible(Date.now() >= dismissedUntil);
    };
    checkDismissed();
  }, []);

  function dismiss() {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION_MS));
    setVisible(false);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4 z-40 w-[300px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/10 bg-[#1a0e06] shadow-lg shadow-black/30"
        >
          <div className="flex items-start gap-3 p-4">
            <a
              href="https://thepdftools.site/"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex flex-1 items-start gap-3"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 text-sm font-bold text-white">
                P
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white">
                  the<span className="text-indigo-400">pdf</span>
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/50">
                  Free online PDF tools — merge, compress, convert &amp; edit. No upload, no signup.
                </p>
                <p className="mt-2 text-[10px] uppercase tracking-wider text-white/25">Sponsored</p>
              </div>
            </a>
            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className="shrink-0 rounded-md p-1 text-white/30 transition-colors hover:bg-white/5 hover:text-white/60"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
