"use client";

import { motion, useReducedMotion } from "framer-motion";
import { timeStudy } from "@/lib/data";

/** Standard-time build-up table. [EXAMPLE] data. */
export function TimeStudyTable() {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden rounded-xl border bg-surface">
      <div className="flex items-center justify-between border-b bg-elevated/60 px-4 py-3 sm:px-5">
        <p className="font-mono text-[0.68rem] tracking-[0.14em] uppercase text-muted-foreground">
          Time study · standard-time build-up
        </p>
        <span className="chip !py-0.5 !text-[0.6rem]">sample</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <caption className="sr-only">
            Time study showing observed time, performance rating, basic time and standard time per operation. Sample
            data.
          </caption>
          <thead>
            <tr className="border-b font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
              <th scope="col" className="px-4 py-2.5 font-medium sm:px-5">Operation</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Observed</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Rating</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium">Basic</th>
              <th scope="col" className="px-4 py-2.5 text-right font-medium sm:px-5">Standard</th>
            </tr>
          </thead>
          <tbody>
            {timeStudy.map((row, i) => (
              <motion.tr
                key={row.operation}
                initial={reduce ? undefined : { opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="border-b transition-colors last:border-0 hover:bg-elevated/40"
              >
                <th scope="row" className="px-4 py-3 text-left font-mono text-[0.72rem] font-normal text-foreground/90 sm:px-5">
                  {row.operation}
                </th>
                <td className="px-4 py-3 text-right font-mono text-[0.72rem] tabular-nums text-muted-foreground">{row.observed}</td>
                <td className="px-4 py-3 text-right font-mono text-[0.72rem] tabular-nums text-muted-foreground">{row.rating}</td>
                <td className="px-4 py-3 text-right font-mono text-[0.72rem] tabular-nums text-muted-foreground">{row.basic}</td>
                <td className="px-4 py-3 text-right font-mono text-[0.75rem] font-semibold tabular-nums text-green sm:px-5">
                  {row.standard}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t bg-elevated/60 px-4 py-2.5 font-mono text-[0.62rem] tracking-wide text-muted-foreground sm:px-5">
        Standard time = observed × rating + 15% allowance · sample data for demonstration
      </p>
    </div>
  );
}
