import { ContrastChecker } from "@/components/contrast-checker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contrast Checker | HueFlow",
  description: "Check WCAG color contrast ratios between any two colors. Ensure your text is readable and accessible.",
};

export default function Page() {
  return <ContrastChecker />;
}
