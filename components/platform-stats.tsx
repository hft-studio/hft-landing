"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TvlChart, type TvlDataPoint } from "./tvl-chart";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Sparkle } from "lucide-react";

/** Sparkle eyebrow label: accented first word + neutral remainder. */
function SectionLabel({
  accent,
  rest,
}: {
  accent: string;
  rest?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <Sparkle className="h-3.5 w-3.5 fill-purple-400 text-purple-400" />
      <span className="text-xs font-medium uppercase tracking-[0.2em]">
        <span className="text-purple-400">{accent}</span>
        {rest ? <span className="text-neutral-400"> {rest}</span> : null}
      </span>
    </div>
  );
}

interface TvlEntry {
  tvl: number;
  date: string;
}

interface ProcessedData {
  series: TvlDataPoint[];
  latestTvl: number;
  change24h: number | null;
}

function processData(raw: TvlEntry[]): ProcessedData {
  const sorted = [...raw].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Aggregate the hourly feed into one closing point per week so the full
  // history reads as a clean dotted line across the whole date range.
  const MONTHS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const WEEK_MS = 7 * 86_400_000;
  const byWeek = new Map<number, { ts: number; tvl: number }>();
  for (const entry of sorted) {
    const t = new Date(entry.date).getTime();
    const weekKey = Math.floor(t / WEEK_MS);
    byWeek.set(weekKey, { ts: t, tvl: entry.tvl }); // sorted asc → last wins
  }
  const series: TvlDataPoint[] = [...byWeek.values()]
    .sort((a, b) => a.ts - b.ts)
    .map(({ ts, tvl }) => {
      const d = new Date(ts);
      return { date: `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`, tvl };
    });

  // Latest value + 24h change come from the raw hourly feed for accuracy.
  const latestTvl = sorted.length > 0 ? sorted[sorted.length - 1].tvl : 0;

  let change24h: number | null = null;
  if (sorted.length >= 2) {
    const latestTime = new Date(sorted[sorted.length - 1].date).getTime();
    const targetTime = latestTime - 86_400_000;
    let closest = sorted[0];
    for (const entry of sorted) {
      const t = new Date(entry.date).getTime();
      if (
        Math.abs(t - targetTime) <
        Math.abs(new Date(closest.date).getTime() - targetTime)
      ) {
        closest = entry;
      }
    }
    if (closest.tvl > 0) {
      change24h = ((latestTvl - closest.tvl) / closest.tvl) * 100;
    }
  }

  return { series, latestTvl, change24h };
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export function PlatformStats() {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/tvl");
      if (!res.ok) throw new Error(`API returned ${res.status}`);
      const raw: TvlEntry[] = await res.json();
      setData(processData(raw));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="relative mx-auto flex max-w-6xl flex-col px-4 md:px-8 pt-28 md:pt-40 pb-28">
      {/* Page header — two column, left aligned */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12"
      >
        <div>
          <SectionLabel accent="Live" rest="Metrics" />
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Platform Stats
          </h1>
        </div>
        <p className="text-sm leading-relaxed text-neutral-400 md:pb-2 md:text-base">
          Total Value Locked (TVL) represents the combined value of assets
          managed across the platform. As a non-custodial protocol, this is
          calculated from positions in customer wallets and token portfolios
          held in embedded wallets — tracked hourly.
        </p>
      </motion.div>

      {/* Error state */}
      {error && (
        <div className="py-20 text-center">
          <p className="mb-4 text-neutral-400">{error}</p>
          <button
            onClick={fetchData}
            className="rounded-full border border-transparent bg-neutral-900 px-6 py-2 text-sm font-medium text-white shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] transition duration-200 hover:bg-black/90"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Section: Total Value Locked */}
      <motion.section
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.15 }}
        className="mt-20 border-t border-neutral-800 pt-10 md:mt-28"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <SectionLabel accent="Total" rest="Value Locked" />
            {loading ? (
              <div className="mt-4 h-9 w-40 animate-pulse rounded bg-neutral-800" />
            ) : data ? (
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-semibold tracking-tight text-white md:text-5xl">
                  {formatCurrency(data.latestTvl)}
                </span>
                {data.change24h !== null && (
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      data.change24h >= 0
                        ? "bg-green-500/10 text-green-500"
                        : "bg-red-500/10 text-red-500"
                    )}
                  >
                    {data.change24h >= 0 ? (
                      <IconTrendingUp className="h-3 w-3" />
                    ) : (
                      <IconTrendingDown className="h-3 w-3" />
                    )}
                    {data.change24h >= 0 ? "+" : ""}
                    {data.change24h.toFixed(2)}%
                  </span>
                )}
              </div>
            ) : null}
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500 md:text-right">
            Aggregated hourly from customer and embedded wallet positions.
          </p>
        </div>

        {loading ? (
          <div className="mt-8 rounded-[32px] border border-neutral-800 bg-neutral-900/40 p-4">
            <div className="h-[400px] animate-pulse rounded-[24px] border border-neutral-800 bg-black p-2" />
          </div>
        ) : data && data.series.length > 0 ? (
          <div className="mt-8 rounded-[32px] border border-neutral-800 bg-neutral-900/40 p-4">
            <div className="rounded-[24px] border border-neutral-800 bg-black p-2">
              <TvlChart data={data.series} />
            </div>
          </div>
        ) : null}
      </motion.section>

      {/* Section: Trade Volume */}
      <motion.section
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.25 }}
        className="mt-20 border-t border-neutral-800 pt-10 md:mt-28"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <SectionLabel accent="Trade" rest="Volume" />
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500 md:text-right">
            Rolling on-chain swap volume across managed positions.
          </p>
        </div>
        <div className="mt-8 rounded-[32px] border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex h-48 items-center justify-center rounded-[24px] border border-neutral-800 bg-black p-2">
            <p className="text-sm text-neutral-500">Coming Soon</p>
          </div>
        </div>
      </motion.section>

      {/* Section: LP Fees */}
      <motion.section
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.35 }}
        className="mt-20 border-t border-neutral-800 pt-10 md:mt-28"
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <SectionLabel accent="LP" rest="Fees" />
          <p className="max-w-xs text-sm leading-relaxed text-neutral-500 md:text-right">
            Fees earned by liquidity positions over time.
          </p>
        </div>
        <div className="mt-8 rounded-[32px] border border-neutral-800 bg-neutral-900/40 p-4">
          <div className="flex h-48 items-center justify-center rounded-[24px] border border-neutral-800 bg-black p-2">
            <p className="text-sm text-neutral-500">Coming Soon</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
