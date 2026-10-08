"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { HorizontalShowcase } from "./fx/horizontal-showcase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const categoryColor: Record<Project["categoryKey"], string> = {
  industrial: "text-green border-green/40",
  "textile-testing": "text-indigo border-indigo/40",
  spinning: "text-amber border-amber/40",
  layout: "text-green border-green/40",
  "wet-processing": "text-indigo border-indigo/40",
  quality: "text-amber border-amber/40",
};

export function Projects() {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const open = projects.find((p) => p.slug === openSlug) ?? null;

  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative">
      {/* Desktop: cinematic horizontal gallery (scroll-driven) */}
      <div className="hidden lg:block">
        <HorizontalShowcase onOpen={setOpenSlug} />
      </div>

      {/* Mobile + no-JS fallback: vertical grid */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:hidden">
        <SectionHeading
          index="03"
          eyebrow="Selected engineering work"
          title={
            <span id="projects-heading">
              Six studies across the <span className="text-green">textile</span> and{" "}
              <span className="text-indigo">industrial</span> sides of manufacturing.
            </span>
          }
          description="From yarn spinning to sewing-line balancing — each case study follows the same discipline: define the problem, measure the process, analyze the data, then propose improvements grounded in evidence."
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2" stagger={0.09}>
          {projects.map((project) => (
            <RevealItem key={project.slug}>
              <ProjectCard project={project} onOpen={() => setOpenSlug(project.slug)} />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>

      <CaseStudyDialog project={open} onClose={() => setOpenSlug(null)} />
    </section>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="zoom-card group relative block w-full overflow-hidden rounded-xl border bg-surface text-left shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-green/45 hover:shadow-xl hover:shadow-green/5 focus-visible:-translate-y-1"
      aria-haspopup="dialog"
    >
      <div className="duotone relative aspect-[16/9] overflow-hidden">
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 30vw"
          placeholder="blur"
          blurDataURL={LQIP[project.slug === "sewing-line-balancing" ? "sewing-line" : project.slug === "fabric-quality-evaluation" ? "testing-tech" : project.slug === "spinning-process-analysis" ? "spinning" : project.slug === "plant-layout-improvement" ? "cutting-cad" : project.slug === "dyeing-process-study" ? "dyeing-macro" : "quality-inspect"] ?? LQIP["hero-weave"]}
          className="object-cover"
        />
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/92 via-background/25 to-transparent" />
        <span aria-hidden className="text-outline-faint pointer-events-none absolute left-3 top-1 z-[3] select-none font-display text-6xl font-bold leading-none">
          {project.index}
        </span>
        <span
          className={cn(
            "absolute right-4 top-4 z-[3] rounded-full border bg-background/60 px-3 py-1 font-mono text-[0.58rem] tracking-[0.12em] uppercase backdrop-blur",
            categoryColor[project.categoryKey]
          )}
        >
          {project.type}
        </span>
        <div className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-3 p-5">
          <p className="font-mono text-[0.62rem] tracking-[0.16em] uppercase text-green">{project.category}</p>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-foreground/20 bg-background/50 text-foreground backdrop-blur transition-all duration-500 group-hover:rotate-45 group-hover:border-green group-hover:bg-green group-hover:text-primary-foreground">
            <ArrowUpRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-green sm:text-[1.35rem]">
          {project.title}
        </h3>
        <p className="mt-2.5 text-pretty text-sm leading-relaxed text-muted-foreground">{project.tagline}</p>
      </div>
    </button>
  );
}

function CaseStudyDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  return (
    <Dialog open={project !== null} onOpenChange={(o) => !o && onClose()}>
      <AnimatePresence>
        {project && (
          <DialogContent className="max-w-3xl overflow-hidden rounded-2xl border-border bg-surface p-0 sm:max-w-3xl [&>button]:z-20">
            <div className="relative h-52 w-full overflow-hidden sm:h-64">
              <Image src={project.image} alt={project.imageAlt} fill sizes="100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
              <span className="absolute right-4 top-4 font-mono text-[0.72rem] font-semibold tracking-[0.18em] text-foreground/80">
                {project.index}
              </span>
            </div>
            <ScrollArea className="max-h-[55vh] sm:max-h-[58vh]">
              <div className="px-6 pb-8 sm:px-8">
                <DialogHeader className="text-left">
                  <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-green">
                    {project.category} · {project.type}
                  </p>
                  <DialogTitle className="pt-1 font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                    {project.title}
                  </DialogTitle>
                  <DialogDescription className="pt-2 text-pretty leading-relaxed text-muted-foreground">
                    {project.summary}
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-7 space-y-7">
                  <CaseBlock label="Engineering problem">
                    <p className="text-pretty leading-relaxed text-foreground/85">{project.problem}</p>
                  </CaseBlock>
                  <CaseBlock label="Method">
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {project.method.map((m) => (
                        <li key={m} className="flex gap-2.5 text-[0.85rem] leading-snug text-muted-foreground">
                          <span aria-hidden className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-green/70" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </CaseBlock>
                  <CaseBlock label="Evidence produced">
                    <div className="flex flex-wrap gap-2">
                      {project.evidence.map((e) => (
                        <span key={e} className="chip">
                          {e}
                        </span>
                      ))}
                    </div>
                  </CaseBlock>
                  <CaseBlock label="Results">
                    <ul className="space-y-2">
                      {project.results.map((r) => (
                        <li
                          key={r}
                          className="flex gap-2.5 rounded-lg border border-green/25 bg-green-soft px-4 py-2.5 text-[0.85rem] leading-snug text-foreground/90"
                        >
                          <span aria-hidden className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </CaseBlock>
                  <CaseBlock label="Lesson">
                    <blockquote className="rounded-xl border-l-2 border-indigo bg-indigo/10 p-4 pl-5 text-pretty italic leading-relaxed text-foreground/90">
                      {project.lessons}
                    </blockquote>
                  </CaseBlock>
                  <p className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground/70">
                    <X className="h-3 w-3" aria-hidden />
                    sample project content — replace with verified data before publishing
                  </p>
                </div>
              </div>
            </ScrollArea>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

function CaseBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      aria-label={label}
    >
      <h4 className="font-mono text-[0.64rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
        {label}
      </h4>
      <div className="mt-3">{children}</div>
    </motion.section>
  );
}
