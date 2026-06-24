import { TailwindColors } from "@/components/tailwind-colors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tailwind CSS Colors | HueFlow",
  description: "Browse the complete Tailwind CSS color palette. Copy any color value instantly.",
};

export default function Page() {
  return <TailwindColors />;
}
