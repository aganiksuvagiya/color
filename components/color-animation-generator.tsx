"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useMemo, useId } from "react";
import { Header } from "./header";
import { ToolPageSections } from "@/components/seo/tool-page-sections";
import { toolPageContent } from "@/lib/seo/tool-pages";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ColorStop {
  id: number;
  color: string;
}

type AnimationType = "gradient-shift" | "color-pulse" | "hue-rotate";
type Direction = "normal" | "alternate" | "reverse";
type Easing = "linear" | "ease" | "ease-in-out";

interface PresetAnimation {
  name: string;
  colors: string[];
  type: AnimationType;
  duration: number;
  direction: Direction;
  easing: Easing;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ANIMATION_TYPES: { value: AnimationType; label: string }[] = [
  { value: "gradient-shift", label: "Gradient Shift" },
  { value: "color-pulse", label: "Color Pulse" },
  { value: "hue-rotate", label: "Hue Rotate" },
];

const DIRECTIONS: { value: Direction; label: string }[] = [
  { value: "normal", label: "Normal" },
  { value: "alternate", label: "Alternate" },
  { value: "reverse", label: "Reverse" },
];

const EASINGS: { value: Easing; label: string }[] = [
  { value: "linear", label: "Linear" },
  { value: "ease", label: "Ease" },
  { value: "ease-in-out", label: "Ease In-Out" },
];

const PRESETS: PresetAnimation[] = [
  {
    name: "Aurora",
    colors: ["#00c9ff", "#92fe9d", "#00b09b", "#96c93d"],
    type: "gradient-shift",
    duration: 6,
    direction: "alternate",
    easing: "ease-in-out",
  },
  {
    name: "Sunset Pulse",
    colors: ["#ff512f", "#f09819", "#ff6b6b", "#ee0979"],
    type: "color-pulse",
    duration: 4,
    direction: "alternate",
    easing: "ease-in-out",
  },
  {
    name: "Ocean Wave",
    colors: ["#0052d4", "#4facfe", "#00f2fe", "#43e97b"],
    type: "gradient-shift",
    duration: 8,
    direction: "alternate",
    easing: "ease",
  },
  {
    name: "Neon Glow",
    colors: ["#f953c6", "#b91d73", "#8e2de2", "#4a00e0"],
    type: "hue-rotate",
    duration: 5,
    direction: "normal",
    easing: "linear",
  },
];

let nextId = 3;

/* ------------------------------------------------------------------ */
/*  CSS generation helpers                                             */
/* ------------------------------------------------------------------ */

function buildKeyframesAndStyle(
  animName: string,
  type: AnimationType,
  colors: string[],
  duration: number,
  direction: Direction,
  easing: Easing,
): { keyframes: string; elementCss: string } {
  const colorsStr = colors.join(", ");

  switch (type) {
    case "gradient-shift": {
      const keyframes = `@keyframes ${animName} {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}`;
      const elementCss = `.animated-element {
  background: linear-gradient(270deg, ${colorsStr});
  background-size: ${colors.length * 100}% ${colors.length * 100}%;
  animation: ${animName} ${duration}s ${easing} infinite ${direction};
}`;
      return { keyframes, elementCss };
    }

    case "color-pulse": {
      const steps = colors
        .map((c, i) => {
          const pct = Math.round((i / (colors.length - 1)) * 100);
          return `  ${pct}% {\n    background-color: ${c};\n  }`;
        })
        .join("\n");
      const keyframes = `@keyframes ${animName} {\n${steps}\n}`;
      const elementCss = `.animated-element {
  background-color: ${colors[0]};
  animation: ${animName} ${duration}s ${easing} infinite ${direction};
}`;
      return { keyframes, elementCss };
    }

    case "hue-rotate": {
      const keyframes = `@keyframes ${animName} {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}`;
      const elementCss = `.animated-element {
  background: linear-gradient(135deg, ${colorsStr});
  animation: ${animName} ${duration}s ${easing} infinite ${direction};
}`;
      return { keyframes, elementCss };
    }
  }
}

function buildPreviewStyle(
  animName: string,
  type: AnimationType,
  colors: string[],
  duration: number,
  direction: Direction,
  easing: Easing,
): string {
  const { keyframes, elementCss } = buildKeyframesAndStyle(
    animName,
    type,
    colors,
    duration,
    direction,
    easing,
  );
  return `${keyframes}\n\n${elementCss}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function ColorAnimationGenerator() {
  const uid = useId().replace(/:/g, "");
  const animName = `hueflow_${uid}`;

  const [colors, setColors] = useState<ColorStop[]>([
    { id: 1, color: "#6366f1" },
    { id: 2, color: "#ec4899" },
  ]);
  const [animType, setAnimType] = useState<AnimationType>("gradient-shift");
  const [duration, setDuration] = useState(4);
  const [direction, setDirection] = useState<Direction>("alternate");
  const [easing, setEasing] = useState<Easing>("ease-in-out");
  const [copied, setCopied] = useState(false);

  /* Colour management */
  const addColor = useCallback(() => {
    if (colors.length >= 6) return;
    const random = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;
    setColors((prev) => [...prev, { id: nextId++, color: random }]);
  }, [colors.length]);

  const removeColor = useCallback(
    (id: number) => {
      if (colors.length <= 2) return;
      setColors((prev) => prev.filter((c) => c.id !== id));
    },
    [colors.length],
  );

  const updateColor = useCallback((id: number, hex: string) => {
    setColors((prev) => prev.map((c) => (c.id === id ? { ...c, color: hex } : c)));
  }, []);

  /* Apply preset */
  const applyPreset = useCallback((preset: PresetAnimation) => {
    nextId = preset.colors.length + 1;
    setColors(preset.colors.map((c, i) => ({ id: i + 1, color: c })));
    setAnimType(preset.type);
    setDuration(preset.duration);
    setDirection(preset.direction);
    setEasing(preset.easing);
  }, []);

  /* Build CSS */
  const hexColors = useMemo(() => colors.map((c) => c.color), [colors]);

  const { keyframes: kf, elementCss: elCss } = useMemo(
    () => buildKeyframesAndStyle(animName, animType, hexColors, duration, direction, easing),
    [animName, animType, hexColors, duration, direction, easing],
  );

  const fullCss = `${kf}\n\n${elCss}`;

  /* Preview inline style tag */
  const previewStyleTag = useMemo(() => {
    const { keyframes, elementCss } = buildKeyframesAndStyle(
      animName,
      animType,
      hexColors,
      duration,
      direction,
      easing,
    );
    // Scope the class to the preview
    const scopedCss = elementCss.replace(
      ".animated-element",
      `#preview-${uid}`,
    );
    return `${keyframes}\n${scopedCss}`;
  }, [animName, animType, hexColors, duration, direction, easing, uid]);

  /* Copy */
  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(fullCss).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [fullCss]);

  /* Inline style for preview element depending on type */
  const previewInlineStyle = useMemo(() => {
    const base: React.CSSProperties = { borderRadius: "1rem" };
    if (animType === "gradient-shift") {
      base.background = `linear-gradient(270deg, ${hexColors.join(", ")})`;
      base.backgroundSize = `${hexColors.length * 100}% ${hexColors.length * 100}%`;
    } else if (animType === "color-pulse") {
      base.backgroundColor = hexColors[0];
    } else {
      base.background = `linear-gradient(135deg, ${hexColors.join(", ")})`;
    }
    base.animation = `${animName} ${duration}s ${easing} infinite ${direction}`;
    return base;
  }, [animName, animType, hexColors, duration, direction, easing]);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <div className="min-h-screen bg-[#160b05] text-white">
      <Header />

      <main className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-40">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Color Animation Generator
          </h1>
          <p className="mt-3 text-lg text-white/60">
            Design mesmerising CSS gradient animations with live preview
          </p>
        </motion.div>

        {/* Presets */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
            Presets
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PRESETS.map((preset) => (
              <motion.button
                key={preset.name}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => applyPreset(preset)}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:border-white/20"
              >
                <div
                  className="mb-3 h-10 w-full rounded-lg"
                  style={{
                    background: `linear-gradient(135deg, ${preset.colors.join(", ")})`,
                  }}
                />
                <span className="text-sm font-medium">{preset.name}</span>
                <span className="mt-0.5 block text-xs text-white/40">
                  {preset.type === "gradient-shift"
                    ? "Gradient Shift"
                    : preset.type === "color-pulse"
                      ? "Color Pulse"
                      : "Hue Rotate"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left column – controls */}
          <div className="space-y-6">
            {/* Color stops */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                  Color Stops
                </h2>
                <button
                  onClick={addColor}
                  disabled={colors.length >= 6}
                  className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  + Add Color
                </button>
              </div>

              <AnimatePresence mode="popLayout">
                {colors.map((stop) => (
                  <motion.div
                    key={stop.id}
                    layout
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25 }}
                    className="mb-3 flex items-center gap-3"
                  >
                    <label className="relative flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-white/10">
                      <input
                        type="color"
                        value={stop.color}
                        onChange={(e) => updateColor(stop.id, e.target.value)}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                      />
                      <span
                        className="h-full w-full"
                        style={{ backgroundColor: stop.color }}
                      />
                    </label>

                    <input
                      type="text"
                      value={stop.color}
                      maxLength={7}
                      onChange={(e) => {
                        const v = e.target.value;
                        if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) {
                          updateColor(stop.id, v);
                        }
                      }}
                      className="h-10 w-28 rounded-lg border border-white/10 bg-white/5 px-3 font-mono text-sm text-white outline-none transition-colors focus:border-white/30"
                    />

                    <button
                      onClick={() => removeColor(stop.id)}
                      disabled={colors.length <= 2}
                      className="ml-auto text-white/30 transition-colors hover:text-white/70 disabled:cursor-not-allowed disabled:opacity-20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <p className="mt-2 text-xs text-white/30">
                {colors.length}/6 color stops
              </p>
            </motion.section>

            {/* Animation type */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                Animation Type
              </h2>
              <div className="grid grid-cols-3 gap-2">
                {ANIMATION_TYPES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setAnimType(t.value)}
                    className={`rounded-xl border px-3 py-2.5 text-sm font-medium transition-all ${
                      animType === t.value
                        ? "border-white/30 bg-white/15 text-white"
                        : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* Controls */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white/50">
                Controls
              </h2>

              {/* Duration */}
              <div className="mb-5">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-white/60">Duration</span>
                  <span className="font-mono text-white/80">{duration}s</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={0.5}
                  value={duration}
                  onChange={(e) => setDuration(parseFloat(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-white [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                />
              </div>

              {/* Direction */}
              <div className="mb-5">
                <span className="mb-2 block text-sm text-white/60">Direction</span>
                <div className="flex gap-2">
                  {DIRECTIONS.map((d) => (
                    <button
                      key={d.value}
                      onClick={() => setDirection(d.value)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        direction === d.value
                          ? "border-white/30 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Easing */}
              <div>
                <span className="mb-2 block text-sm text-white/60">Easing</span>
                <div className="flex gap-2">
                  {EASINGS.map((e) => (
                    <button
                      key={e.value}
                      onClick={() => setEasing(e.value)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        easing === e.value
                          ? "border-white/30 bg-white/15 text-white"
                          : "border-white/10 bg-white/5 text-white/50 hover:border-white/20 hover:text-white/80"
                      }`}
                    >
                      {e.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.section>
          </div>

          {/* Right column – preview & code */}
          <div className="space-y-6">
            {/* Live preview */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/50">
                Live Preview
              </h2>

              {/* Inject scoped animation styles */}
              <style>{previewStyleTag}</style>

              <div
                id={`preview-${uid}`}
                className="aspect-video w-full rounded-2xl"
              />
            </motion.section>

            {/* Generated CSS */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white/50">
                  Generated CSS
                </h2>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={copyToClipboard}
                  className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-colors hover:bg-white/10"
                >
                  {copied ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 text-emerald-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy CSS
                    </>
                  )}
                </motion.button>
              </div>

              <pre className="overflow-x-auto rounded-xl border border-white/5 bg-black/40 p-4 text-sm leading-relaxed">
                <code className="text-white/80">{fullCss}</code>
              </pre>
            </motion.section>
          </div>

          <ToolPageSections config={toolPageContent.animation} />
        </div>
      </main>
    </div>
  );
}
