"use client";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center shrink-0 relative z-20 px-2 py-1"
    >
      <Image
        src="/hft-black.png"
        alt="HFT Labs"
        width={500}
        height={500}
        className="h-14 w-14 rounded-lg"
        priority
      />
    </Link>
  );
};
