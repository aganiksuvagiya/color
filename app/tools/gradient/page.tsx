import { GradientGenerator } from "@/components/gradient-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gradient Generator | HueFlow",
  description: "Create beautiful CSS gradients with multiple color stops. Copy CSS code instantly.",
};

export default function Page() {
  return <GradientGenerator />;
}
