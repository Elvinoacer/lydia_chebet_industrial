"use client";

import { snapshot, heroStats, aboutLydia } from "@/lib/data";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { Counter } from "./fx/counter";

export function Snapshot() {
  return (
    <section id="profile" aria-labelledby="profile-heading" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="01"
          eyebrow="Candidate snapshot"
          ghostIndex
          size="display"
          title={
            <span id="profile-heading">
              An engineer who reads both the{" "}
              <span className="text-green">material</span> and the{" "}
              <span className="text-indigo">system</span>.
            </span>
          }
        />

        {/* Counters */}
        <RevealGroup className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {heroStats.map((s) => (
            <RevealItem key={s.label}>
              <div className="group relative overflow-hidden rounded-xl border bg-surface p-5 transition-colors hover:border-green/40 sm:p-6">
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-green transition-transform duration-500 group-hover:scale-x-100"
                />
                <p className="font-display text-3xl font-bold tabular-nums tracking-tight sm:text-4xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium">{s.label}</p>
                <p className="mt-0.5 font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
                  {s.sub}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* About copy */}
          <div className="space-y-5">
            {aboutLydia.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.06} direction="up" distance={20}>
                <p
                  className={
                    i === 0
                      ? "text-pretty text-lg leading-relaxed text-foreground"
                      : "text-pretty leading-relaxed text-muted-foreground"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
            <Reveal delay={0.3}>
              <blockquote className="relative rounded-xl border-l-2 border-green bg-green-soft p-5 pl-6">
                <p className="text-pretty text-[0.95rem] leading-relaxed italic">
                  I approach manufacturing problems by understanding the process, measuring current performance,
                  identifying bottlenecks or defects, and then evaluating practical improvements based on evidence.
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* Data sheet */}
          <Reveal direction="left" distance={30}>
            <div className="overflow-hidden rounded-xl border bg-surface">
              <div className="flex items-center justify-between border-b bg-elevated/60 px-5 py-3">
                <p className="font-mono text-[0.66rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Profile · data sheet
                </p>
                <span className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-green">ENG / KE</span>
              </div>
              <dl className="divide-y">
                {snapshot.map((item) => (
                  <div
                    key={item.label}
                    className="grid grid-cols-[8.5rem_1fr] items-baseline gap-3 px-5 py-3.5 transition-colors hover:bg-elevated/40 sm:grid-cols-[10rem_1fr]"
                  >
                    <dt className="font-mono text-[0.64rem] tracking-[0.12em] uppercase text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="flex flex-wrap items-baseline gap-x-2 text-sm font-medium">
                      <span className={item.mono ? "font-mono text-[0.8rem]" : ""}>{item.value}</span>
                      {item.note && (
                        <span className="rounded border px-1.5 py-px font-mono text-[0.55rem] tracking-[0.1em] uppercase text-muted-foreground/80">
                          {item.note}
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
