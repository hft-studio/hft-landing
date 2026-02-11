import fs from "fs";
import path from "path";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HFT Studio",
  description: "Terms of Service for HFT Studio LLC",
};

export default function TermsPage() {
  const filePath = path.join(process.cwd(), "terms.md");
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (i === 0 && line.startsWith("Terms of Service")) {
      elements.push(
        <h1 key={i} className="text-3xl md:text-4xl font-bold text-white mb-2">
          {line}
        </h1>
      );
    } else if (line.startsWith("Last Updated:")) {
      elements.push(
        <p key={i} className="text-neutral-500 text-sm mb-10">
          {line}
        </p>
      );
    } else if (/^\d+\.\s/.test(line)) {
      const heading = line.replace(/^\d+\.\s/, "");
      elements.push(
        <h2 key={i} className="text-xl font-semibold text-white mt-10 mb-4">
          {line}
        </h2>
      );
    } else if (line.trim() === "") {
      // skip empty lines
    } else {
      elements.push(
        <p key={i} className="text-neutral-400 leading-relaxed mb-4">
          {line}
        </p>
      );
    }

    i++;
  }

  return (
    <div className="min-h-screen bg-black py-20 px-4">
      <div className="max-w-3xl mx-auto">{elements}</div>
    </div>
  );
}
