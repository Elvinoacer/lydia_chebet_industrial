"use client";

import { useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { lineBalanceData, lineBalanceMetrics } from "@/lib/data";
import { Counter } from "../fx/counter";
import { cn } from "@/lib/utils";

type Mode = "current" | "proposed";

const SCALE_MAX = 90;

/** Interactive line-balance chart: current vs proposed workstation loads. */
export function LineBalanceChart() {
  const [mode, setMode] = useState<Mode>("current");
  const reduce = useReducedMotion();

  const stations = lineBalanceData
    .map((s) => ({ ...s, time: mode === "current" ? s.current : s.proposed }))
    .filter((s) => s.time > 0);

  const cycle = mode === "current" ? 85 : 60;
  const efficiency = mode === "current" ? lineBalanceMetrics.currentEfficiency : lineBalanceMetrics.proposedEfficiency;
  const bottleneck =
    mode === "current" ? lineBalanceMetrics.currentBottleneck : lineBalanceMetrics.proposedBottleneck;
  const totalWork = stations.reduce((a, s) => a + s.time, 0);

  return (
    <div className="overflow-hidden rounded-xl border bg-surface">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-elevated/60 px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.14em] uppercase text-muted-foreground">
          <span className={cn("h-2 w-2 rounded-full", mode === "current" ? "bg-amber" : "bg-green")} />
          Workstation load · seconds
        </div>
        <div
          className="inline-flex rounded-lg border bg-background p-0.5"
          role="group"
          aria-label="Select line balance scenario"
        >
          {(["current", "proposed"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                "rounded-md px-3.5 py-1.5 font-mono text-[0.7rem] tracking-[0.1em] uppercase transition-colors",
                mode === m ? "bg-green text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {m === "current" ? "Current line" : "Proposed balance"}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics strip */}
      <div className="grid grid-cols-2 divide-border border-b sm:grid-cols-4 sm:divide-x">
        <MetricCell label="Line efficiency">
          <span className="text-green">
            <Counter value={efficiency} decimals={1} suffix="%" />
          </span>
        </MetricCell>
        <MetricCell label="Cycle constraint">
          <span className="font-mono">{cycle}s</span>
        </MetricCell>
        <MetricCell label="Stations">
          <span className="font-mono">{stations.length}</span>
        </MetricCell>
        <MetricCell label="Bottleneck">
          <span className="font-mono text-[0.78rem] leading-tight">{bottleneck.split("—")[0]}</span>
        </MetricCell>
      </div>

      {/* Bars */}
      <div className="relative px-4 py-5 sm:px-5" aria-hidden>
        {/* cycle-time marker */}
        <div
          className="pointer-events-none absolute inset-y-4 z-10 transition-[left] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ left: `calc(${(cycle / SCALE_MAX) * 100}% * 0.88 + 12%)` }}
        >
          <div
            className={cn(
              "h-full w-px border-l-2 border-dashed",
              mode === "current" ? "border-amber/70" : "border-green/70"
            )}
          />
          <span
            className={cn(
              "absolute -top-1 left-1.5 whitespace-nowrap font-mono text-[0.6rem] tracking-wide",
              mode === "current" ? "text-amber" : "text-green"
            )}
          >
            takt {cycle}s
          </span>
        </div>

        <div className="space-y-2">
          {lineBalanceData.map((s, i) => {
            const time = mode === "current" ? s.current : s.proposed;
            const added = mode === "proposed" && s.current === 0 && s.proposed > 0;
            return (
              <div key={s.station} className="grid grid-cols-[7.5rem_1fr_2.6rem] items-center gap-2 sm:grid-cols-[9rem_1fr_3rem] sm:gap-3">
                <span
                  className={cn(
                    "truncate font-mono text-[0.66rem] tracking-wide text-muted-foreground",
                    added && "text-green"
                  )}
                  title={s.station}
                >
                  {s.station}
                  {added && <span className="ml-1 text-green">+</span>}
                </span>
                <div className="relative h-4 overflow-hidden rounded-sm bg-elevated/70">
                  <motion.div
                    className={cn(
                      "absolute inset-y-0 left-0 rounded-sm",
                      mode === "current"
                        ? time >= cycle
                          ? "bg-amber"
                          : "bg-amber/55"
                        : time >= cycle
                          ? "bg-green"
                          : "bg-green/55"
                    )}
                    initial={false}
                    animate={{ width: `${(time / SCALE_MAX) * 100}%` }}
                    transition={
                      reduce
                        ? { duration: 0.01 }
                        : { duration: 0.8, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }
                    }
                    style={time === 0 ? { opacity: 0.0 } : undefined}
                  />
                  {/* ghost bar for the other scenario */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-sm border border-dashed border-foreground/25"
                    initial={false}
                    animate={{
                      width: `${((mode === "current" ? s.proposed : s.current) / SCALE_MAX) * 100}%`,
                      opacity: mode === "current" ? (s.proposed > 0 ? 0.5 : 0) : s.current > 0 ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.8, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
                <span className="text-right font-mono text-[0.66rem] tabular-nums text-muted-foreground">
                  {time > 0 ? `${time}s` : "—"}
                </span>
              </div>
            );
          })}
        </div>
        <p className="mt-4 flex items-center gap-4 font-mono text-[0.62rem] tracking-wide text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className={cn("h-2 w-4 rounded-sm", mode === "current" ? "bg-amber" : "bg-green")} /> selected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-4 rounded-sm border border-dashed border-foreground/30" /> other scenario
          </span>
          <span className="ml-auto hidden sm:inline">total work content {totalWork}s</span>
        </p>
      </div>

      {/* Efficiency formula footer */}
      <div className="border-t bg-elevated/60 px-4 py-3 sm:px-5">
        <AnimatePresence mode="wait">
          <motion.p
            key={mode}
            initial={reduce ? undefined : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="font-mono text-[0.66rem] leading-relaxed tracking-wide text-muted-foreground"
          >
            {lineBalanceMetrics.formula}
            <span className="mx-2 text-border">|</span>
            <span className="text-foreground">
              {mode === "current" ? "10 stations × 85s" : "12 stations × 60s"}
            </span>
            <span className="mx-2 text-border">|</span>
            sample data — replace with verified results
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MetricCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="px-4 py-3 sm:px-5">
      <p className="font-mono text-[0.6rem] tracking-[0.16em] uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 text-xl font-semibold tabular-nums sm:text-2xl">{children}</p>
    </div>
  );
}
