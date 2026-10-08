"use client";

import Image from "next/image";
import { attachment } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { Parallax } from "./fx/motion-kit";

export function Attachment() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="relative border-t bg-elevated/40">
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="04"
          eyebrow="Industrial attachment"
          title={
            <span id="experience-heading">
              Supervised exposure to a real <span className="text-green">production system</span>.
            </span>
          }
          description="Twelve weeks inside a working factory — observing production flow, assisting with data collection, joining time studies and quality checks, and participating in 5S. No invented responsibilities: this is what attachment actually looks like for a graduate engineer."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="space-y-6">
            <Reveal direction="right" distance={30}>
              <Parallax speed={0.05}>
                <figure className="zoom-card relative overflow-hidden rounded-xl border shadow-lg">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/images/engineers.jpg"
                      alt="Engineers reviewing machinery and drawings together on a factory floor"
                      fill
                      sizes="(max-width: 1024px) 92vw, 42vw"
                      placeholder="blur"
                      blurDataURL={LQIP["engineers"]}
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/75 via-transparent to-transparent" />
                    <figcaption className="absolute bottom-0 p-5">
                      <p className="font-mono text-[0.62rem] tracking-[0.2em] uppercase text-green">
                        {attachment.role}
                      </p>
                      <p className="mt-1 text-sm text-foreground/90">
                        {attachment.company} · <span className="text-muted-foreground">{attachment.period}</span>
                      </p>
                    </figcaption>
                  </div>
                </figure>
              </Parallax>
            </Reveal>

            <Reveal delay={0.1}>
              <figure className="rounded-xl border bg-surface p-6">
                <span aria-hidden className="font-display text-4xl leading-none text-green">“</span>
                <blockquote className="mt-2 text-pretty text-[0.98rem] leading-relaxed text-foreground/90">
                  {attachment.learning}
                </blockquote>
                <figcaption className="mt-3 font-mono text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground">
                  Learning statement · attachment report
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <div>
            <Reveal direction="left" distance={26}>
              <p className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Responsibilities — always supervised, always documented
              </p>
            </Reveal>
            <RevealGroup className="mt-5 grid gap-2.5 sm:grid-cols-2" stagger={0.05}>
              {attachment.responsibilities.map((r, i) => (
                <RevealItem key={r}>
                  <div className="group flex h-full items-start gap-3 rounded-lg border bg-surface px-4 py-3.5 transition-colors hover:border-green/40">
                    <span className="font-mono text-[0.62rem] font-semibold text-green/80">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.84rem] leading-snug text-muted-foreground transition-colors group-hover:text-foreground">
                      {r}
                    </p>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>

        {/* Equipment marquee */}
        <Reveal delay={0.1} className="mt-14">
          <p className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Equipment observed on the floor
          </p>
          <div className="mt-4 overflow-hidden rounded-xl border bg-surface py-3.5" aria-hidden>
            <div className="marquee-track gap-8" style={{ ["--marquee-duration" as string]: "64s" }}>
              {[...attachment.equipment, ...attachment.equipment].map((eq, i) => (
                <span
                  key={i}
                  className="flex items-center gap-8 whitespace-nowrap font-mono text-[0.7rem] tracking-[0.14em] uppercase text-muted-foreground"
                >
                  {eq}
                  <span className="text-green">◆</span>
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
