import { Metadata } from "next";
import { PlatformStats } from "@/components/platform-stats";

export const metadata: Metadata = {
  title: "Platform Stats | HFT Labs",
  description:
    "Real-time TVL and platform statistics for HFT Labs DeFi yield optimization.",
};

export default function PlatformPage() {
  return (
    <div className="min-h-screen bg-black">
      <PlatformStats />
    </div>
  );
}
