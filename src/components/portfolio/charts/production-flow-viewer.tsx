"use client";

import { productionFlow } from "@/lib/data";
import { cn } from "@/lib/utils";

/** Horizontal process map: Fabric Preparation → Packing, with animated flow line. */
export function ProductionFlowViewer({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-label="Production flow: fabric preparation to packing">
      {/* animated connector (desktop) */}
      <svg
        className="pointer-events-none absolute left-0 right-0 top-[1.15rem] hidden h-2 w-full lg:block"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="2%"
          y1="4"
          x2="98%"
          y2="4"
          stroke="currentColor"
          className="flow-line text-green/50"
          strokeWidth="2"
        />
      </svg>
      <ol className="relative flex flex-col gap-2.5 lg:flex-row lg:items-start lg:justify-between lg:gap-1">
        {productionFlow.map((stage, i) => (
          <li key={stage} className="flex items-center gap-3 lg:flex-col lg:gap-2 lg:text-center">
            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-surface font-mono text-[0.62rem] font-semibold text-green shadow-sm">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-mono text-[0.72rem] leading-tight tracking-wide text-muted-foreground">
              {stage}
            </span>
            {i < productionFlow.length - 1 && (
              <span
                aria-hidden
                className="ml-auto select-none font-mono text-green/60 lg:hidden"
              >
                ↓
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
