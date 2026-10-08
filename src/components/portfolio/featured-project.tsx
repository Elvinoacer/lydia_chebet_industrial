"use client";

import Image from "next/image";
import { featuredProject } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { LineBalanceChart } from "./charts/line-balance-chart";
import { ProductionFlowViewer } from "./charts/production-flow-viewer";
import { TimeStudyTable } from "./charts/time-study-table";
import { Parallax } from "./fx/motion-kit";
import { CheckCircle2, AlertTriangle, Target, ShieldCheck } from "lucide-react";

export function FeaturedProject() {
  return (
    <section id="featured" aria-labelledby="featured-heading" className="relative border-t bg-elevated/40">
      <div className="pointer-events-none absolute inset-0 bg-grid-fine opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="02"
          eyebrow="Flagship · final-year project"
          ghostIndex
          size="display"
          title={
            <span id="featured-heading">
              Sewing-line performance, <span className="text-green">re-balanced</span> with work study.
            </span>
          }
          description={featuredProject.summary}
        />

        <Reveal delay={0.1} direction="up">
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="chip !text-green !border-green/40">{featuredProject.type}</span>
            <span className="chip">Time Study</span>
            <span className="chip">Line Balancing</span>
            <span className="chip">Productivity Analysis</span>
            <span className="chip">Ergonomics</span>
            <span className="chip">Quality Awareness</span>
          </div>
        </Reveal>

        {/* Chart + image */}
        <div className="mt-12 grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          <Reveal direction="right" distance={34}>
            <LineBalanceChart />
          </Reveal>

          <div className="flex flex-col gap-6">
            <Reveal direction="left" distance={34}>
              <Parallax speed={0.06}>
                <figure className="duotone zoom-card group relative overflow-hidden rounded-xl border shadow-lg">
                  <div className="relative aspect-[16/10]">
                    <Image
                      src="/images/sewing-line.jpg"
                      alt="A balanced garment assembly line: operators at numbered sewing stations"
                      fill
                      sizes="(max-width: 1024px) 92vw, 44vw"
                      placeholder="blur"
                      blurDataURL={LQIP["sewing-line"]}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-0 left-0 right-0 z-[3] flex items-end justify-between gap-4 p-5">
                      <p className="max-w-[80%] text-pretty text-sm leading-snug text-foreground">
                        A balanced line spreads work evenly, so bundles flow without piling up behind a bottleneck.
                      </p>
                      <span className="chip hidden shrink-0 sm:inline-flex">LINE-01</span>
                    </figcaption>
                  </div>
                </figure>
              </Parallax>
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <div className="rounded-xl border bg-surface p-5 sm:p-6">
                <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Production flow studied
                </p>
                <div className="mt-4">
                  <ProductionFlowViewer />
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Detail cards */}
        <RevealGroup className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <DetailCard
            icon={<AlertTriangle className="h-4 w-4 text-amber" aria-hidden />}
            title="Engineering problem"
            items={featuredProject.problem}
          />
          <DetailCard
            icon={<Target className="h-4 w-4 text-indigo" aria-hidden />}
            title="Objectives"
            items={featuredProject.objectives}
          />
          <DetailCard
            icon={<CheckCircle2 className="h-4 w-4 text-green" aria-hidden />}
            title="Improvement options"
            items={featuredProject.improvements}
          />
          <div className="flex flex-col gap-6">
            <DetailCard
              icon={<ShieldCheck className="h-4 w-4 text-green" aria-hidden />}
              title="Quality integration"
              items={featuredProject.quality}
              compact
            />
            <DetailCard
              icon={<ShieldCheck className="h-4 w-4 text-indigo" aria-hidden />}
              title="Ergonomic review"
              items={featuredProject.ergonomics}
              compact
            />
          </div>
        </RevealGroup>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Reveal delay={0.05} className="min-w-0">
            <figure className="h-full rounded-xl border bg-surface p-6 sm:p-8">
              <span aria-hidden className="font-display text-5xl leading-none text-green">“</span>
              <blockquote className="mt-2 max-w-4xl text-pretty text-lg leading-relaxed text-foreground/90 sm:text-xl">
                {featuredProject.lessons}
              </blockquote>
              <figcaption className="mt-4 font-mono text-[0.64rem] tracking-[0.18em] uppercase text-muted-foreground">
                {featuredProject.role}
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={0.12} direction="up" className="min-w-0">
            <TimeStudyTable />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DetailCard({
  icon,
  title,
  items,
  compact,
}: {
  icon: React.ReactNode;
  title: string;
  items: string[];
  compact?: boolean;
}) {
  return (
    <RevealItem>
      <div className={`h-full rounded-xl border bg-surface p-5 transition-colors hover:border-green/35 ${compact ? "" : "sm:p-6"}`}>
        <p className="flex items-center gap-2.5 font-mono text-[0.68rem] font-semibold tracking-[0.16em] uppercase text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border bg-elevated">{icon}</span>
          {title}
        </p>
        <ul className={`mt-4 space-y-2 ${compact ? "space-y-1.5" : ""}`}>
          {items.map((item) => (
            <li key={item} className="flex gap-2.5 text-[0.83rem] leading-snug text-muted-foreground">
              <span aria-hidden className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-green/70" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </RevealItem>
  );
}
