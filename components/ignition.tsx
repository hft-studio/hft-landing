"use client";
import React, { useEffect } from "react";
import { motion, useAnimation, useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "./hero-section";

const BENEFITS = [
  {
    title: "1/3 Token Emissions",
    description:
      "Early adopters receive up to one-third of all token emissions. The earlier you join, the larger your share.",
    icon: (
      <svg
        className="h-6 w-6 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ),
  },
  {
    title: "Priority Liquidity Access",
    description:
      "Get first access to new liquidity pools and strategies before they open to the public.",
    icon: (
      <svg
        className="h-6 w-6 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
  },
  {
    title: "Co-Build the Platform",
    description:
      "Shape the product roadmap. We build HFT Labs around your needs as an early liquidity provider.",
    icon: (
      <svg
        className="h-6 w-6 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.42 15.17l-5.92 3.49 1.13-6.59-4.79-4.67 6.63-.96L11.42 1l2.96 5.44 6.63.96-4.79 4.67 1.13 6.59z"
        />
      </svg>
    ),
  },
  {
    title: "Non-Custodial & Secure",
    description:
      "Your assets never leave your wallet. All strategies execute on-chain through audited smart contracts.",
    icon: (
      <svg
        className="h-6 w-6 text-emerald-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
];

const PHASES = [
  {
    phase: "Phase 1",
    title: "Genesis",
    description:
      "First 100 liquidity providers onboarded. Deposit capital, earn boosted emissions from day one.",
    status: "active",
  },
  {
    phase: "Phase 2",
    title: "Expansion",
    description:
      "New pools and strategies unlocked based on early adopter feedback. Emission rates locked in for participants.",
    status: "upcoming",
  },
  {
    phase: "Phase 3",
    title: "Amplification",
    description:
      "Platform opens to the public. Early adopters retain priority allocation and governance weight.",
    status: "upcoming",
  },
];

function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "inline-block text-3xl md:text-4xl lg:text-5xl font-bold",
        "bg-gradient-to-b from-[#3B3B3B] via-[#FFFFFF] to-[#3B3B3B]",
        "bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h2>
  );
}

function AnimatedSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function IgnitionPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Hero */}
      <div className="relative mx-auto flex max-w-7xl flex-col items-center overflow-hidden px-4 pt-32 md:pt-44">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Early Adopter Program
        </motion.div>

        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5 }}
          className="relative z-10 mx-auto max-w-5xl text-center text-4xl font-semibold text-white md:text-6xl lg:text-8xl"
        >
          Early Adopters Program
        </motion.h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.15 }}
          className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-base text-neutral-400 md:text-xl"
        >
          Join the founding cohort of liquidity providers. Help us build the
          best LP platform in DeFi — and earn up to 1/3 of all token emissions
          in return.
        </motion.p>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
          className="relative z-10 mt-8 flex items-center gap-4"
        >
          <Button
            as="a"
            href="https://hft.studio"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join Now
          </Button>
          <Button variant="simple" as="a" href="/#faq">
            Learn more
          </Button>
        </motion.div>

        {/* Emission stat */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ease: "easeOut", duration: 0.6, delay: 0.45 }}
          className="mt-20 grid w-full max-w-3xl grid-cols-1 gap-px overflow-hidden rounded-[24px] border border-neutral-800 bg-neutral-800 md:grid-cols-3"
        >
          {[
            { value: "33%", label: "Token Emissions" },
            { value: "100", label: "Genesis Spots" },
            { value: "0", label: "Management Fees" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center bg-black px-6 py-8"
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                className="text-4xl font-bold text-white md:text-5xl"
              >
                {stat.value}
              </motion.span>
              <span className="mt-2 text-sm text-neutral-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Benefits */}
      <div className="mx-auto max-w-7xl px-4 py-24 md:py-36">
        <AnimatedSection className="text-center">
          <SectionHeading>Why Join Early</SectionHeading>
          <p className="mx-auto mt-4 max-w-lg text-base text-neutral-500">
            We&apos;re not just offering early access. We&apos;re building the
            platform around you.
          </p>
        </AnimatedSection>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {BENEFITS.map((benefit, i) => (
            <AnimatedSection key={benefit.title} delay={i * 0.1}>
              <div className="group relative h-full rounded-[20px] border border-neutral-800 bg-neutral-900/50 p-8 transition-colors duration-300 hover:border-neutral-700 hover:bg-neutral-900/80">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-white">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  {benefit.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      {/* Phases / Roadmap */}
      <div className="mx-auto max-w-7xl px-4 pb-24 md:pb-36">
        <AnimatedSection className="text-center">
          <SectionHeading>How It Works</SectionHeading>
          <p className="mx-auto mt-4 max-w-lg text-base text-neutral-500">
            The program rolls out in three phases. The earlier you join, the more
            you earn.
          </p>
        </AnimatedSection>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-emerald-500/50 via-neutral-800 to-transparent md:left-1/2 md:block" />

          <div className="flex flex-col gap-12">
            {PHASES.map((phase, i) => (
              <AnimatedSection key={phase.phase} delay={i * 0.15}>
                <div
                  className={cn(
                    "relative flex flex-col gap-6 md:flex-row md:items-center",
                    i % 2 === 1 && "md:flex-row-reverse"
                  )}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      "flex-1",
                      i % 2 === 0
                        ? "md:pr-16 md:text-right"
                        : "md:pl-16 md:text-left"
                    )}
                  >
                    <span
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-medium",
                        phase.status === "active"
                          ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                          : "border border-neutral-700 bg-neutral-800 text-neutral-400"
                      )}
                    >
                      {phase.phase}
                    </span>
                    <h3 className="mt-3 text-2xl font-bold text-white">
                      {phase.title}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-neutral-400">
                      {phase.description}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 hidden md:flex md:flex-shrink-0">
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-full",
                        phase.status === "active"
                          ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
                          : "border border-neutral-700 bg-neutral-800"
                      )}
                    />
                  </div>

                  {/* Spacer for alignment */}
                  <div className="hidden flex-1 md:block" />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="mx-auto max-w-7xl px-4 pb-24 md:pb-36">
        <AnimatedSection>
          <div className="relative overflow-hidden rounded-[32px] border border-neutral-800 bg-neutral-900/50 px-6 py-16 text-center md:px-16 md:py-24">
            {/* Glow effect */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08)_0%,transparent_70%)]" />

            <h2 className="relative z-10 text-3xl font-bold text-white md:text-5xl">
              Ready to get started?
            </h2>
            <p className="relative z-10 mx-auto mt-4 max-w-lg text-base text-neutral-400">
              Spots in the Genesis cohort are limited. Start providing liquidity
              and claim your share of emissions.
            </p>
            <div className="relative z-10 mt-8">
              <Button
                as="a"
                href="https://hft.studio"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Now
              </Button>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
