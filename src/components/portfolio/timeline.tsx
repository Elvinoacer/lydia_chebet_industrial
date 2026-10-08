"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { timeline } from "@/lib/data";
import { SectionHeading } from "./fx/section-heading";
import { Reveal } from "./fx/reveal";
import { cn } from "@/lib/utils";

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.72", "end 0.55"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26 });

  return (
    <section id="journey" aria-labelledby="journey-heading" className="relative border-t bg-elevated/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="10"
          eyebrow="Engineering timeline"
          title={
            <span id="journey-heading">
              Five years from <span className="text-green">foundations</span> to a full{" "}
              <span className="text-green">production-improvement project</span>.
            </span>
          }
          description="The degree builds in a deliberate sequence: materials first, processing second, systems third — then attachment and the final-year project tie it together. Dates are placeholders pending verification."
        />

        <ol ref={ref} className="relative mt-16 space-y-10 pl-10 sm:pl-14" aria-label="Engineering degree timeline 2021 to 2026">
          {/* rail */}
          <span aria-hidden className="absolute left-[0.65rem] top-1 h-[calc(100%-0.5rem)] w-px bg-border sm:left-[0.9rem]" />
          <motion.span
            aria-hidden
            style={reduce ? undefined : { scaleY, transformOrigin: "top" }}
            className="absolute left-[0.65rem] top-1 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-green via-green to-indigo sm:left-[0.9rem]"
          />
          {timeline.map((item, i) => {
            const last = i === timeline.length - 1;
            return (
              <li key={item.year} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-10 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background sm:-left-[3.4rem]",
                    last ? "border-indigo" : "border-green"
                  )}
                >
                  <span className={cn("h-2 w-2 rounded-full", last ? "bg-indigo" : "bg-green")} />
                </span>
                <Reveal direction="left" distance={24}>
                  <div className="group rounded-xl border bg-surface p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-green/40 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className={cn("font-mono text-lg font-semibold tabular-nums", last ? "text-indigo" : "text-green")}>
                        {item.year}
                      </p>
                      <p className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-muted-foreground/70">
                        YR-{String(i + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <h3 className="mt-1.5 font-display text-xl font-semibold tracking-tight sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-pretty text-[0.9rem] leading-relaxed text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
