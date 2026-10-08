"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const LQIP_KEYS: Record<string, string> = {
  "sewing-line-balancing": "sewing-line",
  "fabric-quality-evaluation": "testing-tech",
  "spinning-process-analysis": "spinning",
  "plant-layout-improvement": "cutting-cad",
  "dyeing-process-study": "dyeing-macro",
  "quality-inspection-root-cause": "quality-inspect",
};

/**
 * Desktop showpiece — a sticky horizontal gallery driven by vertical scroll.
 * Editorial intro panel, oversized duotone panels with ghost outline indices,
 * title overlays, broken vertical rhythm, live progress rail.
 * (Mobile falls back to the vertical grid in <ProjectsGrid>.)
 */
export function HorizontalShowcase({ onOpen }: { onOpen: (slug: string) => void }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.45 });
  const x = useTransform(smooth, [0.02, 0.98], [0, -distance]);

  useMotionValueEvent(smooth, "change", (v) => {
    const idx = Math.min(projects.length - 1, Math.max(0, Math.round(v * (projects.length - 1))));
    setActive(idx);
  });

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drag-to-travel — horizontal pointer drag maps to page scroll. Guards run
  // at event time (mouse-only, primary button, never on interactive elements)
  // so touch users keep native scrolling. Composes with Lenis because it
  // drives the native scroll position rather than fighting it.
  const drag = useRef<{ x: number; scroll: number; id: number } | null>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      if (e.pointerType === "touch") return;
      if (!window.matchMedia("(pointer: fine)").matches) return;
      // don't hijack card interactions — only start drags on the stage itself
      if ((e.target as HTMLElement).closest("button, a")) return;
      drag.current = { x: e.clientX, scroll: window.scrollY, id: e.pointerId };
      setDragging(true);
    };
    const onMove = (e: PointerEvent) => {
      if (!drag.current || drag.current.id !== e.pointerId) return;
      const dx = e.clientX - drag.current.x;
      window.scrollTo(0, drag.current.scroll - dx * 1.35);
    };
    const onUp = () => {
      drag.current = null;
      setDragging(false);
    };

    stage.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Selected engineering work — horizontal gallery"
      className="relative hidden lg:block"
      style={{ height: `${100 + (projects.length + 1) * 60}vh` }}
    >
      <div
        ref={stageRef}
        className={cn(
          "sticky top-0 flex h-svh flex-col overflow-hidden",
          dragging ? "cursor-grabbing select-none" : "cursor-grab"
        )}
      >
        {/* edge fades — panels dissolve instead of hard-clipping at the frame */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[7vw] bg-gradient-to-r from-background to-transparent" />
        <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-20 w-[7vw] bg-gradient-to-l from-background to-transparent" />
        {/* slim header row */}
        <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between px-8 pb-4 pt-24">
          <p className="flex items-center gap-3 font-mono text-[0.66rem] tracking-[0.26em] uppercase text-muted-foreground">
            <span className="text-green">03</span>
            <span aria-hidden className="h-px w-10 bg-border" />
            Selected engineering work
          </p>
          <div className="flex items-center gap-4">
            <span className="font-display text-2xl font-bold tabular-nums leading-none tracking-tight">
              {String(active + 1).padStart(2, "0")}
              <span className="text-muted-foreground/50"> / {String(projects.length).padStart(2, "0")}</span>
            </span>
            <div className="h-px w-40 bg-border">
              <motion.div className="h-full origin-left bg-green" style={{ scaleX: smooth }} />
            </div>
          </div>
        </div>

        {/* horizontal track */}
        <motion.div
          ref={trackRef}
          style={reduce ? undefined : { x }}
          className="flex flex-1 items-center gap-10 pl-8 pr-[14vw] will-change-transform"
        >
          {/* editorial intro panel */}
          <div className="flex w-[26rem] shrink-0 flex-col justify-center self-center xl:w-[30rem]">
            <h2 className="font-display text-[clamp(3rem,4.6vw,4.8rem)] font-bold leading-[0.95] tracking-[-0.03em]">
              Selected
              <br />
              <span className="text-outline">work</span>
              <span className="text-green">.</span>
            </h2>
            <p className="mt-6 max-w-sm text-pretty text-[0.95rem] leading-relaxed text-muted-foreground">
              Six engineering studies across the textile &amp; industrial line — each one follows the same
              discipline: define, measure, analyse, improve. Open any panel for the full case study.
            </p>
            <p className="mt-8 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green">
              <span aria-hidden className="h-px w-8 bg-green" />
              Scroll to travel the line
            </p>
          </div>

          {projects.map((project, i) => (
            <ShowcasePanel key={project.slug} project={project} index={i} progress={smooth} onOpen={onOpen} />
          ))}
        </motion.div>

        {/* footer hint */}
        <div className="flex items-center justify-between px-8 pb-6 pt-4">
          <p className="font-mono text-[0.58rem] tracking-[0.24em] uppercase text-muted-foreground/70">
            Scroll or drag — the line continues →
          </p>
          <div className="flex gap-1.5" aria-hidden>
            {projects.map((p, i) => (
              <span key={p.slug} className={cn("h-1 w-6 rounded-full transition-colors duration-300", i === active ? "bg-green" : "bg-border")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcasePanel({
  project,
  index,
  progress,
  onOpen,
}: {
  project: Project;
  index: number;
  progress: import("framer-motion").MotionValue<number>;
  onOpen: (slug: string) => void;
}) {
  const reduce = useReducedMotion();
  // in-card image parallax — image drifts inside its mask as the track travels
  const imgX = useTransform(progress, [0, 1], [index % 2 === 0 ? -30 : 30, index % 2 === 0 ? 30 : -30]);

  return (
    <article
      className={cn(
        "relative flex shrink-0 flex-col self-center",
        // broken rhythm — alternate width, aspect and vertical offset
        index % 3 === 1 ? "w-[32rem] xl:w-[35rem] translate-y-12" : "w-[40rem] xl:w-[45rem]",
        index % 3 === 0 ? "-translate-y-3" : index % 3 === 2 ? "translate-y-6" : ""
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(project.slug)}
        data-cursor="view"
        data-cursor-label="OPEN"
        aria-haspopup="dialog"
        className="zoom-card group relative block overflow-hidden rounded-2xl border bg-surface text-left shadow-lg focus-visible:border-green"
      >
        {/* duotone image with in-card parallax */}
        <div
          className={cn(
            "duotone relative overflow-hidden",
            index % 3 === 1 ? "aspect-[4/3.5]" : index % 3 === 2 ? "aspect-[16/10]" : "aspect-[16/11]"
          )}
        >
          <motion.div style={reduce ? undefined : { x: imgX }} className="absolute -inset-x-10 inset-y-0">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              sizes="45rem"
              placeholder="blur"
              blurDataURL={LQIP[LQIP_KEYS[project.slug] ?? "hero-weave"]}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </motion.div>
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/95 via-background/30 to-background/5" />
          {/* corner scrim so the ghost index stays legible over busy imagery */}
          <div aria-hidden className="absolute inset-x-0 top-0 z-[2] h-40 bg-gradient-to-b from-background/55 to-transparent" />

          {/* ghost outline index */}
          <motion.span
            aria-hidden
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.9, ease: EASE }}
            className="text-outline-faint ghost-fill pointer-events-none absolute left-4 top-1 z-[3] select-none font-display text-[6.5rem] font-bold leading-none xl:text-[8rem]"
          >
            {project.index}
          </motion.span>

          <span className="absolute right-5 top-5 z-[4] rounded-full border border-foreground/15 bg-background/80 px-3 py-1 font-mono text-[0.56rem] tracking-[0.16em] uppercase text-foreground/90 shadow-sm backdrop-blur">
            {project.type}
          </span>

          {/* title overlay */}
          <div className="absolute inset-x-0 bottom-0 z-[4] p-6 pr-16">
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: "120%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="font-mono text-[0.6rem] tracking-[0.2em] uppercase text-green"
              >
                {project.category}
              </motion.p>
            </div>
            <div className="mt-1.5 overflow-hidden pb-1">
              <motion.h3
                initial={{ y: "115%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, delay: 0.08, ease: EASE }}
                className="text-pretty font-display text-[1.7rem] font-semibold leading-[1.08] tracking-tight xl:text-[1.9rem]"
              >
                {project.title}
              </motion.h3>
            </div>
          </div>

          <span className="absolute bottom-5 right-5 z-[4] flex h-11 w-11 translate-y-2 items-center justify-center rounded-full bg-green text-primary-foreground opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" aria-hidden />
          </span>
        </div>

        {/* slim meta strip */}
        <div className="relative flex items-center justify-between gap-4 border-t px-6 py-4">
          <p className="truncate font-mono text-[0.62rem] tracking-[0.14em] uppercase text-muted-foreground">
            {project.tagline}
          </p>
          <span className="shrink-0 font-mono text-[0.6rem] tracking-[0.18em] uppercase text-green opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            Open case study →
          </span>
        </div>
      </button>
    </article>
  );
}

/* Mobile / fallback grid (existing vertical behaviour) */
export function ProjectsGrid({ children }: { children: ReactNode }) {
  return <div className="lg:hidden">{children}</div>;
}
