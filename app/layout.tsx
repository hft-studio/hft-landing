import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HFT Labs",
  description:
    "HFT Labs is an AI-native software development firm. We offer consulting and development services, and build our own products at the intersection of AI, digital assets, and data-driven web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased bg-black", inter.className)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
