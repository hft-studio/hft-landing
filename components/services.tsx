"use client";
import React from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  {
    title: "Artificial Intelligence",
    description:
      "LLM-powered products, agents, retrieval pipelines, and AI-first interfaces.",
  },
  {
    title: "Digital Assets",
    description:
      "On-chain systems, market infrastructure, and DeFi protocol integrations.",
  },
  {
    title: "Data-Driven Web Apps",
    description:
      "High-performance web applications built around real-time data and analytics.",
  },
];

export function Services() {
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      id="services"
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
          What we do
        </p>
        <h2
          className={cn(
            "inline-block text-3xl font-semibold tracking-tight md:text-5xl",
            "bg-gradient-to-b from-white to-neutral-500 bg-clip-text text-transparent"
          )}
        >
          Consulting and development, end to end.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-400">
          We partner with founders and teams to ship ambitious software. Engage
          us for strategy, build with us as your team, or license what we&apos;ve
          already built.
        </p>
      </motion.div>

      <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-800 md:grid-cols-3">
        {SPECIALTIES.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: "easeOut" }}
            className="group relative bg-black p-8 transition-colors duration-300 hover:bg-neutral-950"
          >
            <div className="mb-4 inline-flex h-8 w-8 items-center justify-center rounded-md border border-neutral-800 bg-neutral-900 text-neutral-400 transition-colors group-hover:border-neutral-700 group-hover:text-white">
              <span className="text-sm font-mono">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
