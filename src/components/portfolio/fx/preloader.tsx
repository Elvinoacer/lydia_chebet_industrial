"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { bootLines } from "@/lib/data";

/**
 * Cinematic preloader — machine boot sequence, engineering counter 0→100,
 * name mask-reveal, then a curtain lift that hands off to the hero entrance.
 */
export function Preloader({ onComplete }: { onComplete?: () => void }) {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  // Keep the latest callback in a ref so the counter effect below never re-runs
  // (and never restarts the counter) because the parent re-rendered.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (reduce) {
      // reduced motion: skip straight past (async so we don't cascade renders)
      const t = setTimeout(() => {
        setDone(true);
        onCompleteRef.current?.();
      }, 0);
      return () => clearTimeout(t);
    }
    // Deterministic eased counter — snappy (1.5s) but cinematic
    const DURATION = 1500;
    const start = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          onCompleteRef.current?.();
        }, 250);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c120f] text-[#f2f5f3]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* blueprint grid backdrop */}
          <div className="absolute inset-0 bg-grid opacity-[0.07]" style={{ "--grid-line": "rgba(242,245,243,0.5)" } as React.CSSProperties} />

          {/* machine boot sequence — top left */}
          <div className="absolute left-6 top-6 hidden flex-col gap-1.5 sm:left-10 sm:top-10 md:flex">
            {bootLines.map((line, i) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.21, duration: 0.3, ease: "easeOut" }}
                className="flex items-baseline gap-2 font-mono text-[0.58rem] tracking-[0.16em] uppercase text-white/45"
              >
                <span className="text-white/25">{String(i + 1).padStart(2, "0")}</span>
                {line}
                <span className="text-[#57c18a]">· OK</span>
              </motion.p>
            ))}
          </div>

          {/* corner registration marks */}
          <span aria-hidden className="absolute left-5 top-5 h-4 w-4 border-l-2 border-t-2 border-[#57c18a]/50" />
          <span aria-hidden className="absolute right-5 top-5 h-4 w-4 border-r-2 border-t-2 border-[#57c18a]/50" />
          <span aria-hidden className="absolute bottom-5 left-5 h-4 w-4 border-b-2 border-l-2 border-[#57c18a]/50" />
          <span aria-hidden className="absolute bottom-5 right-5 h-4 w-4 border-b-2 border-r-2 border-[#57c18a]/50" />

          {/* Name mask reveal */}
          <div className="relative overflow-hidden px-6">
            <motion.p
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="font-display text-[clamp(2rem,7vw,4.5rem)] font-bold tracking-tight"
            >
              LYDIA <span className="text-[#57c18a]">CHEBET</span>
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative mt-3 font-mono text-[0.62rem] tracking-[0.32em] uppercase text-[#57c18a]"
          >
            Industrial · Textile · Engineering
          </motion.div>

          {/* Counter + hairline progress */}
          <div className="absolute bottom-8 left-6 right-6 sm:left-10 sm:right-10">
            <div className="flex items-end justify-between">
              <span className="font-mono text-[0.6rem] tracking-[0.28em] uppercase text-white/40">
                Calibrating experience
              </span>
              <span className="font-display text-5xl font-bold tabular-nums leading-none sm:text-6xl">
                {count}
                <span className="text-[#57c18a]">%</span>
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-white/10">
              <div
                className="h-full bg-[#57c18a] transition-[width] duration-100 ease-linear"
                style={{ width: `${count}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
