"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { manifesto } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * Scroll-scrub manifesto — viewport-filling kinetic type. Each line lights up
 * and rises as scroll progress passes through its window (target-relative, so
 * pacing is identical on every viewport). Reduced motion renders a static,
 * fully-legible block.
 */
export function Manifesto() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = manifesto.length;
  const outroOpacity = useTransform(scrollYProgress, [0.88, 0.97], [0, 1]);

  return (
    <section
      ref={ref}
      aria-label="Operating principle"
      className="relative"
      style={{ height: reduce ? undefined : `${total * 26 + 55}vh` }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        {/* faint blueprint backdrop */}
        <div aria-hidden className="absolute inset-0 bg-grid-fine opacity-40 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,black,transparent_78%)]" />

        <div className="relative mx-auto w-full max-w-[100rem] px-4 sm:px-8">
          <p className="flex items-center gap-3 font-mono text-[0.66rem] tracking-[0.26em] uppercase text-muted-foreground">
            <span className="text-green">§</span>
            <span aria-hidden className="h-px w-10 bg-border" />
            Operating principle
            <span aria-hidden className="hidden h-px w-10 bg-border sm:block" />
            <span className="hidden text-muted-foreground/60 sm:block">how I work — fibre to finished product</span>
          </p>

          <div className="mt-10 sm:mt-12">
            {manifesto.map((line, i) => (
              <ManifestoLine
                key={line.text}
                progress={scrollYProgress}
                index={i}
                total={total}
                text={line.text}
                accent={line.accent}
                reduce={!!reduce}
              />
            ))}
          </div>

          <motion.p
            style={reduce ? undefined : { opacity: outroOpacity }}
            className="mt-10 font-mono text-[0.62rem] tracking-[0.24em] uppercase text-muted-foreground/80"
          >
            — Lydia Chebet · B.Eng. Industrial &amp; Textile Engineering
          </motion.p>
        </div>
      </div>
    </section>
  );
}

function ManifestoLine({
  progress,
  index,
  total,
  text,
  accent,
  reduce,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  text: string;
  accent: "green" | "indigo" | null;
  reduce: boolean;
}) {
  const start = index / total;
  const end = Math.min(1, start + 1.7 / total);
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const y = useTransform(progress, [start, end], [28, 0]);

  return (
    <motion.p
      style={reduce ? undefined : { opacity, y }}
      className={cn(
        "font-display text-[clamp(2.1rem,6.6vw,6rem)] font-bold leading-[1.04] tracking-[-0.03em]",
        accent === "green" && "text-green",
        accent === "indigo" && "text-indigo"
      )}
    >
      {text}
    </motion.p>
  );
}
