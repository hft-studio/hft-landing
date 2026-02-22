import { NextResponse } from "next/server";

export async function GET() {
  const res = await fetch("https://www.hft.studio/platform/api/tvl", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to fetch TVL data" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
