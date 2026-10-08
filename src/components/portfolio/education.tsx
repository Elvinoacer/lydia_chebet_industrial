"use client";

import Image from "next/image";
import { education, labExperience } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-heading" className="relative">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="09"
          eyebrow="Academic foundation"
          title={
            <span id="education-heading">
              One degree, <span className="text-green">both languages</span>: textile science{" "}
              <span className="text-muted-foreground">×</span> industrial engineering.
            </span>
          }
        />

        {/* Degree banner */}
        <Reveal delay={0.05}>
          <div className="zoom-card group relative mt-12 overflow-hidden rounded-xl border shadow-lg">
            <div className="relative aspect-[16/7] sm:aspect-[21/7]">
              <Image
                src="/images/fabric-mono.jpg"
                alt="Macro view of a woven fabric structure in soft monochrome tones"
                fill
                sizes="100vw"
                placeholder="blur"
                blurDataURL={LQIP["fabric-mono"]}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/92 via-background/70 to-background/30" />
              <div className="absolute inset-0 flex flex-col justify-center p-6 sm:p-10">
                <p className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-green">
                  {education.school} · {education.period}
                  <span className="ml-2 rounded border border-border px-1.5 py-px text-[0.52rem] text-muted-foreground/80">
                    {education.periodNote}
                  </span>
                </p>
                <h3 className="mt-3 max-w-2xl font-display text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-3xl lg:text-4xl">
                  {education.degree}
                </h3>
                <p className="mt-2 font-display text-lg font-medium text-muted-foreground sm:text-xl">
                  {education.institution}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Course groups */}
        <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.07}>
          {education.groups.map((group) => (
            <RevealItem key={group.id}>
              <article className="h-full rounded-xl border bg-surface p-5 transition-colors hover:border-green/40 sm:p-6">
                <h4 className="font-mono text-[0.64rem] font-semibold tracking-[0.18em] uppercase text-muted-foreground">
                  {group.title}
                </h4>
                <ul className="mt-4 space-y-2">
                  {group.courses.map((course) => (
                    <li key={course} className="flex gap-2.5 text-[0.84rem] leading-snug text-foreground/85">
                      <span aria-hidden className="mt-[0.42rem] h-1 w-1 shrink-0 rounded-full bg-green/70" />
                      {course}
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Lab exposure */}
        <div className="mt-16">
          <Reveal>
            <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Laboratory &amp; factory exposure
            </h3>
            <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
              Engineering claims need bench time. These are the practical routines behind the coursework — run in
              university laboratories and observed on live factory floors.
            </p>
          </Reveal>
          <RevealGroup className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.06}>
            {labExperience.map((lab, i) => (
              <RevealItem key={lab.id} className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <div className="flex h-full flex-col rounded-xl border bg-surface p-5 transition-colors hover:border-indigo/40 sm:p-6">
                  <p className="font-mono text-[0.6rem] font-semibold tracking-[0.2em] text-indigo">
                    LAB-{String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className="mt-2.5 font-display text-lg font-semibold tracking-tight">{lab.title}</h4>
                  <ul className="mt-3.5 flex flex-wrap gap-1.5">
                    {lab.items.map((item) => (
                      <li
                        key={item}
                        className="rounded border bg-elevated/60 px-2.5 py-1 font-mono text-[0.62rem] tracking-wide text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
