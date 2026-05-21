"use client";
import React from "react";
import { motion, useInView } from "motion/react";
import { HiArrowUpRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  {
    name: "pokerstudy.ai",
    href: "https://pokerstudy.ai",
    tagline: "AI-powered poker analysis",
    description:
      "An LLM-based database analysis tool for poker professionals. Surface leaks, study spots, and turn hand histories into actionable insight.",
    accent: "from-rose-500/20 to-orange-500/5",
  },
  {
    name: "hft.studio",
    href: "https://hft.studio",
    tagline: "Concentrated liquidity, automated",
    description:
      "Advanced concentrated liquidity management software. Optimize positions across leading DEXs with strategies built for serious LPs.",
    accent: "from-emerald-500/20 to-cyan-500/5",
  },
];

export function Products() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section
      id="products"
      ref={ref}
      className="relative mx-auto w-full max-w-7xl px-4 py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="mb-3 text-xs font-medium tracking-[0.2em] text-neutral-500 uppercase">
          Our products
        </p>
        <h2
          className={cn(
            "inline-block text-3xl font-semibold tracking-tight md:text-5xl",
            "bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent"
          )}
        >
          What we&apos;ve built.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-400">
          We don&apos;t just consult — we operate our own products. Each one
          tackles a real problem in a domain we know cold.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
        {PRODUCTS.map((product, i) => (
          <motion.a
            key={product.name}
            href={product.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 + i * 0.1, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-900/70 md:p-10"
          >
            <div
              className={cn(
                "pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br opacity-60 blur-3xl transition-opacity duration-500 group-hover:opacity-100",
                product.accent
              )}
            />
            <div className="relative z-10 flex h-full flex-col">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-semibold text-white md:text-3xl">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-500">
                    {product.tagline}
                  </p>
                </div>
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-neutral-400 transition-all duration-300 group-hover:border-neutral-700 group-hover:bg-neutral-800 group-hover:text-white">
                  <HiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
              <p className="mt-6 text-base leading-relaxed text-neutral-400">
                {product.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
