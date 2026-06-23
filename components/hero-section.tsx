"use client";
import { HiArrowRight } from "react-icons/hi2";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import DotField from "./dot-field";
import MagicRings from "./magic-rings";

export function HeroWithCenteredImage() {
  return (
    <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-20 md:pt-40">
      <div className="pointer-events-none absolute inset-0 z-0 [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_95%)]">
        <DotField
          dotRadius={1.8}
          dotSpacing={18}
          bulgeStrength={80}
          glowRadius={200}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(255, 255, 255, 0.85)"
          gradientTo="rgba(255, 255, 255, 0.55)"
          glowColor="rgba(255, 255, 255, 0.18)"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]">
        <div className="aspect-square w-[120vw] max-w-[900px] opacity-50">
          <MagicRings
            color="#a855f7"
            colorTwo="#6366f1"
            ringCount={6}
            speed={0.6}
            attenuation={11}
            lineThickness={2}
            opacity={0.9}
            noiseAmount={0.04}
            parallax={0.05}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-neutral-300 backdrop-blur-sm"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        AI-native software studio
      </motion.div>

      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className={cn(
          "relative z-10 mx-auto max-w-5xl text-center text-4xl font-semibold tracking-tight md:text-6xl lg:text-7xl",
          "bg-gradient-to-b from-white via-white to-neutral-500 bg-clip-text text-transparent"
        )}
      >
        Software for the AI era.
      </motion.h1>

      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.15 }}
        className="relative z-10 mx-auto mt-6 max-w-2xl text-center text-base text-neutral-400 md:text-lg"
      >
        HFT Labs is an AI-native development firm. We design, build, and ship
        products at the intersection of artificial intelligence, digital assets,
        and data-driven web applications.
      </motion.p>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
        className="relative z-10 mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4"
      >
        <Button as="a" href="#contact">
          Start a project
        </Button>
        <Button
          variant="simple"
          as="a"
          href="#products"
          className="group flex items-center space-x-2"
        >
          <span>See our work</span>
          <HiArrowRight className="h-3 w-3 stroke-[1px] text-neutral-300 transition-transform duration-200 group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}

export const Badge: React.FC<
  { children: React.ReactNode } & React.ComponentPropsWithoutRef<"button">
> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="group relative mx-auto inline-block w-fit cursor-pointer rounded-full bg-neutral-700 p-px text-[10px] leading-6 font-semibold text-neutral-300 no-underline shadow-zinc-900 sm:text-xs md:shadow-2xl"
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative z-10 flex items-center space-x-2 rounded-full bg-neutral-800 px-4 py-1.5 ring-1 ring-white/10">
        <span>{children}</span>
        <svg
          fill="none"
          height="16"
          viewBox="0 0 24 24"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.75 8.75L14.25 12L10.75 15.25"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </svg>
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-neutral-400/0 via-neutral-400/90 to-neutral-400/0 transition-opacity duration-500 group-hover:opacity-40" />
    </button>
  );
};

export const Button: React.FC<{
  children?: React.ReactNode;
  className?: string;
  variant?: "simple" | "outline" | "primary";
  as?: React.ElementType<any>;
  [x: string]: any;
}> = ({
  children,
  className,
  variant = "primary",
  as: Tag = "button" as any,
  ...props
}) => {
  const variantClass =
    variant === "simple"
      ? "relative z-10 bg-transparent hover:bg-neutral-800 hover:shadow-xl border border-transparent text-white text-sm md:text-sm transition font-medium duration-200 rounded-full px-4 py-2 flex items-center justify-center"
      : variant === "outline"
        ? "bg-white relative z-10 hover:bg-black/90 hover:shadow-xl  text-black border border-black hover:text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center"
        : variant === "primary"
          ? "bg-neutral-900 relative z-10 hover:bg-black/90  border border-transparent text-white text-sm md:text-sm transition font-medium duration-200  rounded-full px-4 py-2  flex items-center justify-center shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset]"
          : "";
  return (
    <Tag
      className={cn(
        "relative z-10 flex items-center justify-center rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition duration-200 hover:bg-black/90 md:text-sm",
        variantClass,
        className,
      )}
      {...props}
    >
      {children ?? `Get Started`}
    </Tag>
  );
};
