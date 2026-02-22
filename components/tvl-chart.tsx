"use client";
import React, { useEffect, useRef } from "react";
import {
  createChart,
  AreaSeries,
  ColorType,
  type IChartApi,
  type UTCTimestamp,
} from "lightweight-charts";

export interface TvlDataPoint {
  time: UTCTimestamp;
  value: number;
}

interface TvlChartProps {
  data: TvlDataPoint[];
  height?: number;
}

export function TvlChart({ data, height = 400 }: TvlChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length === 0) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#737373",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { color: "#1a1a1a" },
      },
      width: containerRef.current.clientWidth,
      height,
      rightPriceScale: {
        borderVisible: false,
        scaleMargins: {
          top: 0.1,
          bottom: 0,
        },
      },
      timeScale: {
        borderVisible: false,
        timeVisible: false,
        tickMarkFormatter: (time: UTCTimestamp) => {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const d = new Date((time as number) * 1000);
          return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
        },
      },
      crosshair: {
        horzLine: { color: "#525252", style: 2 },
        vertLine: { color: "#525252", style: 2 },
      },
      localization: {
        priceFormatter: (price: number) => {
          if (price >= 1_000_000_000) return `$${(price / 1_000_000_000).toFixed(1)}b`;
          if (price >= 1_000_000) return `$${(price / 1_000_000).toFixed(1)}m`;
          if (price >= 1_000) return `$${(price / 1_000).toFixed(1)}k`;
          return `$${price.toFixed(0)}`;
        },
        timeFormatter: (time: number) => {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          const d = new Date(time * 1000);
          return `${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
        },
      },
    });

    const areaSeries = chart.addSeries(AreaSeries, {
      lineColor: "#22c55e",
      topColor: "rgba(34, 197, 94, 0.3)",
      bottomColor: "rgba(34, 197, 94, 0.02)",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerRadius: 4,
      crosshairMarkerBorderColor: "#22c55e",
      crosshairMarkerBackgroundColor: "#22c55e",
    });

    areaSeries.setData(data);

    // Force Y-axis to start from $0
    areaSeries.applyOptions({
      autoscaleInfoProvider: () => ({
        priceRange: {
          minValue: 0,
          maxValue: Math.max(...data.map((d) => d.value)) * 1.1,
        },
      }),
    });

    chart.timeScale().fitContent();
    chartRef.current = chart;

    const handleResize = () => {
      if (containerRef.current) {
        chart.applyOptions({ width: containerRef.current.clientWidth });
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
      chartRef.current = null;
    };
  }, [data, height]);

  return <div ref={containerRef} className="w-full" />;
}
