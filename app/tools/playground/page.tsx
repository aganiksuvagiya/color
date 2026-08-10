import type { Metadata } from "next";
import { Header } from "@/components/header";
import { ColorPlayground } from "@/components/color-playground";

export const metadata: Metadata = {
  title: "Color Playground | HueFlow",
  description: "Interactively adjust hue, saturation, lightness, and contrast to preview a live UI theme in real time.",
};

export default function PlaygroundPage() {
  return (
    <main className="relative min-h-screen bg-[#160b05] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(0,0,0,0.95),transparent_18%),radial-gradient(circle_at_88%_0%,rgba(255,106,44,0.18),transparent_30%),linear-gradient(135deg,#1a0e06_0%,#160b05_50%,#1a0e06_100%)]" />
      <div className="noise absolute inset-0 opacity-20" />

      <Header />

      <div className="relative mx-auto max-w-5xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/6 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/55 backdrop-blur-xl mb-5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#F15B2A]">
              <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            Color Playground
          </div>
          <h1 className="font-display text-[2.4rem] font-semibold leading-[1.1] tracking-[-0.05em] text-white sm:text-[3rem]">
            Build your palette,<br />
            <span className="text-[#F97A45]">see it live.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-white/50">
            Adjust hue, saturation, lightness and contrast - watch the UI preview update in real time.
          </p>
        </div>

        <ColorPlayground />
      </div>
    </main>
  );
}
