"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  textileFocusAreas,
  industrialFocusAreas,
  leanThemes,
  sustainability,
} from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { cn } from "@/lib/utils";

/* ================= Textile capabilities — interactive stage viewer ================= */

export function TextileCapabilities() {
  const [activeId, setActiveId] = useState(textileFocusAreas[0].id);
  const reduce = useReducedMotion();
  const active = textileFocusAreas.find((a) => a.id === activeId) ?? textileFocusAreas[0];

  return (
    <section id="textiles" aria-labelledby="textiles-heading" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="05"
          eyebrow="Textile engineering capabilities"
          title={
            <span id="textiles-heading">
              The material side: from <span className="text-green">fiber</span> to{" "}
              <span className="text-green">tested fabric</span>.
            </span>
          }
          description="Five linked stages — each one sets the ceiling for the next. Select a stage to see what it covers and why it matters."
        />

        {/* Stage selector */}
        <Reveal delay={0.05}>
          <div
            className="mt-12 flex gap-2 overflow-x-auto rounded-xl border bg-surface p-2 sm:overflow-visible"
            role="tablist"
            aria-label="Textile process stages"
          >
            {textileFocusAreas.map((area, i) => (
              <button
                key={area.id}
                role="tab"
                aria-selected={activeId === area.id}
                onClick={() => setActiveId(area.id)}
                className={cn(
                  "relative flex-1 whitespace-nowrap rounded-lg px-4 py-3 text-left font-mono text-[0.68rem] tracking-[0.12em] uppercase transition-colors",
                  activeId === area.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeId === area.id && (
                  <motion.span
                    layoutId="stage-pill"
                    className="absolute inset-0 rounded-lg bg-green"
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 340, damping: 32 }}
                  />
                )}
                <span className="relative flex items-center gap-2">
                  <span className={cn("font-semibold", activeId === area.id ? "text-primary-foreground/80" : "text-green/70")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {area.title}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Stage content */}
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Image with crossfade */}
          <div className="duotone relative overflow-hidden rounded-xl border shadow-lg" aria-hidden>
            <AnimatePresence mode="popLayout">
              <motion.div
                key={active.id}
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[26rem]"
              >
                <Image
                  src={active.image}
                  alt={active.imageAlt}
                  fill
                  sizes="(max-width: 1024px) 92vw, 42vw"
                  placeholder="blur"
                  blurDataURL={LQIP[active.id === "fiber" ? "yarn-skeins" : active.id === "yarn" ? "spinning" : active.id === "fabric" ? "loom-warp" : active.id === "wet" ? "dyeing-macro" : "testing-tech"] ?? LQIP["hero-weave"]}
                  className="object-cover"
                />
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                <span className="chip absolute bottom-4 left-4 z-[3]">{active.caption}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Skills */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border bg-surface p-6 sm:p-8"
            >
              <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{active.title}</h3>
              <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">{active.quote}</p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {active.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border bg-elevated/60 px-3.5 py-1.5 font-mono text-[0.68rem] tracking-wide text-foreground/80 transition-colors hover:border-green/45 hover:text-green"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ================= Industrial capabilities ================= */

export function IndustrialCapabilities() {
  return (
    <section id="industrial" aria-labelledby="industrial-heading" className="relative border-t bg-elevated/40">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="06"
          eyebrow="Industrial engineering capabilities"
          title={
            <span id="industrial-heading">
              The systems side: making production <span className="text-indigo">measurable</span> and{" "}
              <span className="text-indigo">efficient</span>.
            </span>
          }
          description="Industrial engineering gives the factory its eyes: work study, planning, quality engineering, operations research and ergonomics — the toolkit behind every credible improvement."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
          {industrialFocusAreas.map((area, i) => (
            <RevealItem key={area.id} className={cn(i === 0 && "sm:col-span-2 lg:col-span-1")}>
              <article className="group flex h-full flex-col rounded-xl border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-indigo/45 hover:shadow-lg hover:shadow-indigo/5">
                <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] text-indigo">
                  IE-{String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">{area.title}</h3>
                <p className="mt-2 text-pretty text-[0.86rem] leading-relaxed text-muted-foreground">{area.blurb}</p>
                <ul className="mt-5 flex flex-wrap gap-1.5 pb-1">
                  {area.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border px-3 py-1 font-mono text-[0.62rem] tracking-wide text-muted-foreground transition-colors group-hover:border-indigo/30 group-hover:text-foreground/80"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}

          {/* Lean card */}
          <RevealItem>
            <article className="flex h-full flex-col rounded-xl border border-green/30 bg-green-soft p-6">
              <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] text-green">LEAN · 7 WASTES</p>
              <h3 className="mt-3 font-display text-xl font-semibold tracking-tight">
                Lean &amp; continuous improvement
              </h3>
              <p className="mt-2 text-pretty text-[0.86rem] leading-relaxed text-muted-foreground">
                Improvement language for the shop floor — and the seven wastes it hunts.
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {leanThemes.wastes.map((w, i) => (
                  <li
                    key={w}
                    className="rounded-full border border-green/30 bg-surface px-3 py-1 font-mono text-[0.62rem] tracking-wide text-foreground/80"
                  >
                    <span className="mr-1 text-green/70">{i + 1}</span>
                    {w}
                  </li>
                ))}
              </ul>
            </article>
          </RevealItem>
        </RevealGroup>

        {/* Sustainability strip */}
        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-6 rounded-xl border bg-surface p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div>
              <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-green">
                Sustainability focus
              </p>
              <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
                {sustainability.statement}
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {sustainability.topics.map((t) => (
                  <li key={t} className="rounded-full border px-3 py-1 font-mono text-[0.62rem] tracking-wide text-muted-foreground">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center lg:justify-end">
              <span className="writing-vertical hidden select-none font-mono text-[0.6rem] tracking-[0.4em] uppercase text-muted-foreground/50 lg:block">
                reduce · reuse · recycle
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
