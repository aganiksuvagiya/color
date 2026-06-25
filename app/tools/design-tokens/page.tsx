import { DesignTokenGenerator } from "@/components/design-token-generator";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Token Generator | HueFlow",
  description: "Export your color palettes as design tokens for CSS, SCSS, Tailwind, JSON, Figma, Swift, Kotlin, and Flutter.",
};

export default function Page() {
  return <DesignTokenGenerator />;
}
