import type { Metadata } from "next";
import { ContrastFixer } from "@/components/contrast-fixer";

export const metadata: Metadata = {
  title: "Smart Contrast Fixer | HueFlow",
  description:
    "Automatically fix color accessibility contrast issues. Get WCAG-compliant color suggestions that preserve your design intent while meeting AA and AAA standards.",
};

export default function ContrastFixerPage() {
  return <ContrastFixer />;
}
