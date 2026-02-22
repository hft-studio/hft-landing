"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TvlChart, type TvlDataPoint } from "./tvl-chart";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import type { UTCTimestamp } from "lightweight-charts";

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

  const series: TvlDataPoint[] = sorted.map((entry) => ({
    time: Math.floor(new Date(entry.date).getTime() / 1000) as UTCTimestamp,
    value: entry.tvl,
  }));

  const latestTvl = series.length > 0 ? series[series.length - 1].value : 0;

  let change24h: number | null = null;
  if (series.length >= 2) {
    const latestTime = series[series.length - 1].time as number;
    const targetTime = latestTime - 86400;
    let closest = series[0];
    for (const point of series) {
      if (
        Math.abs((point.time as number) - targetTime) <
        Math.abs((closest.time as number) - targetTime)
      ) {
        closest = point;
      }
    }
    if (closest.value > 0) {
      change24h = ((latestTvl - closest.value) / closest.value) * 100;
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
    <div className="relative mx-auto flex max-w-7xl flex-col px-4 md:px-8 pt-20 md:pt-40 pb-20">
      {/* Header */}
      <motion.h1
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className={cn(
          "relative z-10 mx-auto max-w-4xl text-center text-3xl font-semibold md:text-6xl",
          "bg-[radial-gradient(61.17%_178.53%_at_38.83%_-13.54%,#3B3B3B_0%,#888787_12.61%,#FFFFFF_50%,#888787_80%,#3B3B3B_100%)]",
          "bg-clip-text text-transparent"
        )}
      >
        Platform Stats
      </motion.h1>
      <motion.p
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
        className="relative z-10 mx-auto mt-4 max-w-xl text-center text-sm text-neutral-400 md:text-base"
      >
        Total Value Locked (TVL) represents the combined value of assets managed
        across the platform. As a non-custodial protocol, this is calculated
        from positions in customer wallets and token portfolios held in embedded
        wallets — tracked hourly.
      </motion.p>

      {/* Error state */}
      {error && (
        <div className="text-center py-20">
          <p className="text-neutral-400 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="rounded-full bg-neutral-900 px-6 py-2 text-sm font-medium text-white border border-transparent shadow-[0px_-1px_0px_0px_#FFFFFF40_inset,_0px_1px_0px_0px_#FFFFFF40_inset] hover:bg-black/90 transition duration-200"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Section: Total Value Locked */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
        className="mt-12"
      >
        <div className="flex items-baseline gap-4 mb-4">
          <h2 className="text-lg font-medium text-neutral-300">
            Total Value Locked
          </h2>
          {loading ? (
            <div className="h-5 w-24 bg-neutral-800 rounded animate-pulse" />
          ) : data ? (
            <div className="flex items-baseline gap-3">
              <span className="text-2xl md:text-3xl font-bold text-white">
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

        {loading ? (
          <div className="rounded-[32px] border border-neutral-700 bg-neutral-800 p-4">
            <div className="rounded-[24px] border border-neutral-700 bg-black p-2 h-[400px] animate-pulse" />
          </div>
        ) : data && data.series.length > 0 ? (
          <div className="rounded-[32px] border border-neutral-700 bg-neutral-800 p-4">
            <div className="rounded-[24px] border border-neutral-700 bg-black p-2">
              <TvlChart data={data.series} />
            </div>
          </div>
        ) : null}
      </motion.div>

      {/* Section: Trade Volume */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.5 }}
        className="mt-12"
      >
        <h2 className="text-lg font-medium text-neutral-300 mb-4">
          Trade Volume
        </h2>
        <div className="rounded-[32px] border border-neutral-700 bg-neutral-800 p-4">
          <div className="rounded-[24px] border border-neutral-700 bg-black p-2 flex items-center justify-center h-48">
            <p className="text-neutral-500 text-sm">Coming Soon</p>
          </div>
        </div>
      </motion.div>

      {/* Section: LP Fees */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5, delay: 0.6 }}
        className="mt-12"
      >
        <h2 className="text-lg font-medium text-neutral-300 mb-4">
          LP Fees
        </h2>
        <div className="rounded-[32px] border border-neutral-700 bg-neutral-800 p-4">
          <div className="rounded-[24px] border border-neutral-700 bg-black p-2 flex items-center justify-center h-48">
            <p className="text-neutral-500 text-sm">Coming Soon</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
