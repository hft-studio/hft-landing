"use client";
import React from "react";
import {
  EvilAreaChart,
  Area,
  XAxis,
  YAxis,
  Grid,
  Tooltip,
  Dot,
  ActiveDot,
} from "@/components/evilcharts/charts/area-chart";
import { type ChartConfig } from "@/components/evilcharts/ui/chart";

export type TvlDataPoint = {
  date: string;
  tvl: number;
  [key: string]: string | number;
};

// Hero-theme purple → indigo, matching <MagicRings> (#a855f7 / #6366f1).
const chartConfig = {
  tvl: {
    label: "TVL",
    colors: {
      light: ["#a855f7", "#6366f1"],
      dark: ["#a855f7", "#6366f1"],
    },
  },
} satisfies ChartConfig;

const formatCurrencyShort = (value: number) => {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}b`;
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
  return `$${value.toFixed(0)}`;
};

interface TvlChartProps {
  data: TvlDataPoint[];
  height?: number;
}

export function TvlChart({ data, height = 400 }: TvlChartProps) {
  return (
    <div style={{ height }} className="flex w-full flex-col">
      <EvilAreaChart
        data={data}
        config={chartConfig}
        className="h-full w-full"
        curveType="monotone"
        animationType="left-to-right"
        showBrush
        xDataKey="date"
        brushFormatLabel={(value) => String(value)}
      >
        <Grid />
        <XAxis
          dataKey="date"
          minTickGap={40}
          tick={{ fill: "#737373", fontSize: 12 }}
        />
        <YAxis
          orientation="right"
          domain={[0, "auto"]}
          width={56}
          tickFormatter={formatCurrencyShort}
          tick={{ fill: "#737373", fontSize: 12 }}
        />
        <Tooltip variant="frosted-glass" />
        <Area dataKey="tvl" variant="gradient" strokeVariant="dashed">
          <Dot variant="border" />
          <ActiveDot variant="colored-border" />
        </Area>
      </EvilAreaChart>
    </div>
  );
}
