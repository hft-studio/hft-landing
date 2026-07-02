import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://www.hftlabs.xyz";
const siteName = "HFT Labs";
const description =
  "HFT Labs is an AI-native software development firm. We design, build, and ship products at the intersection of artificial intelligence, digital assets, and data-driven web applications.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HFT Labs — Software for the AI era",
    template: "%s | HFT Labs",
  },
  description,
  applicationName: siteName,
  keywords: [
    "AI-native software",
    "AI development firm",
    "digital assets",
    "DeFi",
    "data-driven web applications",
    "AI consulting",
    "software studio",
  ],
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName,
    title: "HFT Labs — Software for the AI era",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "HFT Labs — Software for the AI era",
    description,
    creator: "@HftStudio",
    site: "@HftStudio",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/hft-black.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      legalName: "HFT Studio",
      url: siteUrl,
      logo: `${siteUrl}/hft-black.png`,
      description,
      email: "michael@hftlabs.xyz",
      address: {
        "@type": "PostalAddress",
        streetAddress: "30 N Gould St, Ste N",
        addressLocality: "Sheridan",
        addressRegion: "WY",
        postalCode: "82801",
        addressCountry: "US",
      },
      sameAs: [
        "https://x.com/HftStudio",
        "https://www.linkedin.com/company/hft-labs",
        "https://github.com/hft-studio",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("antialiased bg-black", inter.className)}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
