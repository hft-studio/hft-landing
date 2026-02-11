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
        src="/banner.svg"
        alt="HFT Labs"
        width={120}
        height={30}
        className="h-7 w-auto"
        priority
      />
    </Link>
  );
};
