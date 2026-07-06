import { ProfilePage } from "@/components/profile-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Profile | HueFlow",
  description: "Browse your saved palettes, collections, and gradients.",
  robots: { index: false },
};

export default function Page() {
  return <ProfilePage />;
}
