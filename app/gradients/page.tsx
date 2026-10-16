import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/structured-data";
import { buildHubMetadata, renderHub } from "@/lib/seo/page-utils";
import { buildFaqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = buildHubMetadata("/gradients");
export const revalidate = false;

const faqSchema = buildFaqSchema([
  { question: "What is a CSS gradient?", answer: "A CSS gradient is a smooth transition between two or more colors, defined using linear-gradient(), radial-gradient(), or conic-gradient() functions." },
  { question: "How do I create a linear gradient in CSS?", answer: "Use linear-gradient(direction, color1, color2). Example: background: linear-gradient(to right, #e8531f, #f97316);" },
  { question: "What is the difference between linear and radial gradients?", answer: "Linear gradients transition along a straight line; radial gradients radiate outward from a center point." },
  { question: "Can I export gradients from HueFlow?", answer: "Yes, HueFlow's gradient generator lets you copy the CSS code directly, ready to paste into your project." },
]);

export default function GradientsPage() {
  return (
    <>
      <StructuredData data={faqSchema} />
      {renderHub("/gradients")}
    </>
  );
}
