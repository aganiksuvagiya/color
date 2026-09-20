import type { Metadata } from "next";

import { CommunityGallery } from "@/components/community-gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community Palettes",
  description: "Browse color palettes shared by the HueFlow community — real palettes made by real users, ready to copy or remix in the generator.",
};

export default function CommunityPage() {
  return <CommunityGallery />;
}
