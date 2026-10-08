"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { paretoData } from "@/lib/data";

const W = 640;
const H = 300;
const PAD_L = 44;
const PAD_R = 40;
const PAD_T = 22;
const PAD_B = 64;
const INNER_W = W - PAD_L - PAD_R;
const INNER_H = H - PAD_T - PAD_B;

interface BuiltBar {
  defect: string;
  count: number;
  cumPct: number;
  x: number;
  w: number;
  h: number;
  y: number;
  cx: number;
}

/** Animated Pareto chart (vital-few defect analysis). Pure SVG, responsive. */
export function ParetoChart() {
  const reduce = useReducedMotion();

  const { bars, cumLine, total, maxCount } = useMemo(() => {
    const total = paretoData.reduce((a, d) => a + d.count, 0);
    const maxCount = Math.max(...paretoData.map((d) => d.count));

    // cumulative percentages without mutating outer state
    const withCum = paretoData.reduce<{ defect: string; count: number; cumPct: number }[]>(
      (acc, d) => {
        const prev = acc.length > 0 ? acc[acc.length - 1].cumPct : 0;
        acc.push({ ...d, cumPct: prev + (d.count / total) * 100 });
        return acc;
      },
      []
    );

    const slot = INNER_W / withCum.length;
    const bars: BuiltBar[] = withCum.map((b, i) => ({
      ...b,
      x: PAD_L + slot * i + slot * 0.18,
      w: slot * 0.64,
      h: (b.count / maxCount) * INNER_H,
      y: PAD_T + INNER_H - (b.count / maxCount) * INNER_H,
      cx: PAD_L + slot * i + slot / 2,
    }));

    const cumLine =
      "M " +
      bars
        .map((b) => `${b.cx.toFixed(1)},${(PAD_T + INNER_H * (1 - b.cumPct / 100)).toFixed(1)}`)
        .join(" L ");

    return { bars, cumLine, total, maxCount };
  }, []);

  return (
    <figure className="overflow-hidden rounded-xl border bg-surface">
      <div className="flex items-center justify-between border-b bg-elevated/60 px-4 py-3 sm:px-5">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-muted-foreground">
          Defect Pareto · rework sources
        </p>
        <span className="chip !py-0.5 !text-[0.6rem]">n = {total} defects · sample</span>
      </div>
      <div className="px-2 py-4 sm:px-4">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`Pareto chart of defect types. Skipped stitches ${paretoData[0].count} of ${total} defects, with a cumulative line reaching 100%.`}
        >
          {/* gridlines + left axis */}
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <g key={t}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={PAD_T + INNER_H * (1 - t)}
                y2={PAD_T + INNER_H * (1 - t)}
                stroke="currentColor"
                className="text-border"
                strokeWidth="1"
                strokeDasharray={t === 0 ? "0" : "3 5"}
              />
              <text
                x={PAD_L - 8}
                y={PAD_T + INNER_H * (1 - t) + 3.5}
                textAnchor="end"
                className="fill-current font-mono text-[9px] text-muted-foreground"
              >
                {Math.round(maxCount * t)}
              </text>
            </g>
          ))}
          {/* right axis (cum %) */}
          {[0, 50, 100].map((p) => (
            <text
              key={p}
              x={W - 30}
              y={PAD_T + INNER_H * (1 - p / 100) + 3.5}
              className="fill-current font-mono text-[9px] text-muted-foreground"
            >
              {p}%
            </text>
          ))}

          {/* bars */}
          {bars.map((b, i) => (
            <motion.rect
              key={b.defect}
              x={b.x}
              width={b.w}
              rx="2.5"
              fill="currentColor"
              className={i < 2 ? "text-green" : i < 4 ? "text-green/55" : "text-muted-foreground/40"}
              initial={reduce ? { height: b.h, y: b.y } : { height: 0, y: PAD_T + INNER_H }}
              whileInView={{ height: b.h, y: b.y }}
              viewport={{ once: true, margin: "-40px" }}
              transition={
                reduce
                  ? { duration: 0.01 }
                  : { duration: 0.75, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }
              }
            />
          ))}

          {/* cumulative line */}
          <motion.path
            d={cumLine}
            fill="none"
            stroke="currentColor"
            className="text-amber"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduce ? undefined : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: reduce ? 0.01 : 1.5, delay: 0.7, ease: "easeInOut" }}
          />
          {bars.map((b, i) => (
            <motion.circle
              key={`pt-${b.defect}`}
              cx={b.cx}
              cy={PAD_T + INNER_H * (1 - b.cumPct / 100)}
              r="3.5"
              fill="currentColor"
              className="text-amber"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: reduce ? 0 : 0.7 + (i / bars.length) * 1.4, duration: 0.2 }}
            />
          ))}

          {/* x labels */}
          {bars.map((b) => (
            <text
              key={`lb-${b.defect}`}
              x={b.cx}
              y={H - PAD_B + 16}
              textAnchor="end"
              transform={`rotate(-32 ${b.cx} ${H - PAD_B + 16})`}
              className="fill-current font-mono text-[9.5px] text-muted-foreground"
            >
              {b.defect}
            </text>
          ))}
          {/* counts above bars */}
          {bars.map((b) => (
            <text
              key={`ct-${b.defect}`}
              x={b.cx}
              y={b.y - 5}
              textAnchor="middle"
              className="fill-current font-mono text-[9.5px] text-foreground"
            >
              {b.count}
            </text>
          ))}
        </svg>
      </div>
      <figcaption className="border-t bg-elevated/60 px-4 py-2.5 sm:px-5">
        <p className="font-mono text-[0.62rem] tracking-wide text-muted-foreground">
          Vital few: skipped stitch + seam pucker ≈ 57% of all defects · sample data
        </p>
      </figcaption>
    </figure>
  );
}
