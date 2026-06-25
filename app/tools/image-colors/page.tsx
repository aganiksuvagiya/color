import { ImageColorExtractor } from "@/components/image-color-extractor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image Color Extractor | HueFlow",
  description: "Upload any image to extract its dominant colors using AI-powered color analysis.",
};

export default function Page() {
  return <ImageColorExtractor />;
}
