"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { qualityLoop, qualityTools } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { ParetoChart } from "./charts/pareto-chart";
import { Parallax } from "./fx/motion-kit";

export function QualitySection() {
  const reduce = useReducedMotion();

  return (
    <section id="quality" aria-labelledby="quality-heading" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="07"
          eyebrow="Quality & process improvement"
          title={
            <span id="quality-heading">
              A closed loop: <span className="text-green">measure</span>, find root cause,{" "}
              <span className="text-green">verify</span> — then standardize.
            </span>
          }
          description="Quality engineering is not inspection at the end of the line. It is a control loop that runs through the whole process — and it only counts when the fix survives the next shift."
        />

        {/* Quality loop */}
        <Reveal delay={0.05}>
          <ol
            className="relative mt-12 grid gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
            aria-label="Quality improvement loop: measure, classify defect, find root cause, correct process, verify result, standardize"
          >
            {qualityLoop.map((step, i) => (
              <motion.li
                key={step.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  reduce
                    ? { duration: 0.01 }
                    : { duration: 0.55, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }
                }
                className="group relative rounded-xl border bg-surface p-4 transition-colors hover:border-green/45"
              >
                <span aria-hidden className="absolute right-3 top-3 select-none font-mono text-[1.4rem] font-bold leading-none text-green/10 transition-colors group-hover:text-green/25">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-mono text-[0.58rem] tracking-[0.2em] uppercase text-green">Step {i + 1}</p>
                <h3 className="mt-2 font-display text-[1.05rem] font-semibold leading-tight">{step.title}</h3>
                <p className="mt-1.5 text-[0.78rem] leading-snug text-muted-foreground">{step.desc}</p>
                {i < qualityLoop.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute -right-[0.85rem] top-1/2 z-10 hidden -translate-y-1/2 select-none font-mono text-sm text-green/60 lg:block"
                  >
                    →
                  </span>
                )}
              </motion.li>
            ))}
          </ol>
        </Reveal>

        {/* Pareto + image */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <Reveal direction="right" distance={30}>
            <ParetoChart />
          </Reveal>
          <div className="flex flex-col gap-6">
            <Reveal direction="left" distance={30}>
              <Parallax speed={0.05}>
                <figure className="zoom-card relative overflow-hidden rounded-xl border shadow-lg">
                  <div className="relative aspect-[16/9]">
                    <Image
                      src="/images/quality-inspect.jpg"
                      alt="Operator running bright red fabric through an inspection machine"
                      fill
                      sizes="(max-width: 1024px) 92vw, 40vw"
                      placeholder="blur"
                      blurDataURL={LQIP["quality-inspect"]}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-0 p-5 text-pretty text-sm leading-snug text-foreground/90">
                      Inspection only sorts good from bad — the loop above is what stops defects from being made.
                    </figcaption>
                  </div>
                </figure>
              </Parallax>
            </Reveal>
            <Reveal direction="left" delay={0.1}>
              <div className="rounded-xl border bg-surface p-6">
                <p className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                  Quality toolkit
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {qualityTools.map((t) => (
                    <li key={t} className="chip transition-colors hover:border-green/45 hover:text-green">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
