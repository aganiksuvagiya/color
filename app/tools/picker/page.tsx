import { ColorPicker } from "@/components/color-picker";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color Picker | HueFlow",
  description: "Pick any color and get hex, RGB, HSL values with shades and tints. Copy to clipboard instantly.",
};

export default function Page() {
  return <ColorPicker />;
}
