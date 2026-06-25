import { ColorAnimationGenerator } from "@/components/color-animation-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Animation Generator | HueFlow",
  description:
    "Create stunning CSS gradient animations with live preview. Choose from gradient shifts, color pulses, and hue rotations. Copy production-ready CSS code instantly.",
};

export default function Page() {
  return <ColorAnimationGenerator />;
}
