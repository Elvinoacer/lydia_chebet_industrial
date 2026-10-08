"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowUp, FileDown, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { contactCopy, currentlyLearning, finaleMarquee, philosophy, profile, navItems } from "@/lib/data";
import { SectionHeading } from "./fx/section-heading";
import { Reveal } from "./fx/reveal";
import { Magnetic, WordReveal } from "./fx/motion-kit";
import { MaskedLines, VelocityMarquee } from "./fx/kinetic";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Github(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

/* ===================== Philosophy + currently learning ===================== */

export function Philosophy() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const glow = useTransform(scrollYProgress, [0, 1], [0.15, 0.5]);

  return (
    <section id="philosophy" aria-labelledby="philosophy-heading" ref={ref} className="relative overflow-hidden">
      <motion.div
        aria-hidden
        style={reduce ? undefined : { opacity: glow }}
        className="absolute left-1/2 top-1/2 h-[26rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green/20 blur-[130px]"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-28 sm:px-6 sm:py-36 lg:px-8">
        <SectionHeading
          index="11"
          eyebrow="Engineering philosophy"
          title={<span id="philosophy-heading" className="sr-only">Engineering philosophy</span>}
        />
        <div className="mt-2 max-w-4xl space-y-1.5 sm:space-y-2.5">
          {philosophy.mantra.map((line, i) => (
            <p key={line.text} className="font-display text-[1.7rem] font-bold leading-tight tracking-tight text-balance sm:text-5xl lg:text-[3.4rem]">
              <span className={line.accent === "green" ? "text-green" : "text-indigo"}>
                <WordReveal text={line.text} delay={0.1 + i * 0.16} stagger={0.045} />
              </span>
            </p>
          ))}
        </div>
        <Reveal delay={0.4}>
          <p className="mt-10 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {philosophy.expanded}
          </p>
        </Reveal>

        {/* Currently learning */}
        <Reveal delay={0.15} className="mt-16">
          <div className="rounded-xl border bg-surface p-6 sm:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="font-mono text-[0.66rem] font-semibold tracking-[0.2em] uppercase text-amber">
                Currently learning
              </p>
              <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground">
                continuous improvement — applied to herself
              </p>
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {currentlyLearning.map((item, i) => (
                <motion.li
                  key={item}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={
                    reduce
                      ? { duration: 0.01 }
                      : { duration: 0.4, delay: i * 0.045, ease: [0.22, 1, 0.36, 1] }
                  }
                  className="rounded-full border border-amber/35 bg-amber/10 px-3.5 py-1.5 font-mono text-[0.68rem] tracking-wide text-foreground/85 transition-colors hover:border-amber/70"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== Contact finale + footer ===================== */

export function Contact() {
  const reduce = useReducedMotion();

  function handleCv() {
    if (profile.cvUrl) {
      window.open(profile.cvUrl, "_blank");
      return;
    }
    toast.info("CV placeholder", {
      description: "Attach the real CV PDF before publishing — this button is wired and ready.",
    });
  }

  return (
    <section id="contact" aria-labelledby="contact-heading" className="relative border-t bg-elevated/40">
      <div className="relative mx-auto max-w-[100rem] px-4 pb-20 pt-24 sm:px-8 sm:pt-28 lg:px-10 lg:pt-32">
        {/* ghost index */}
        <span
          aria-hidden
          className="text-outline-faint pointer-events-none absolute right-6 top-10 hidden select-none font-display text-[9rem] font-bold leading-none xl:block"
        >
          12
        </span>

        <p className="flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-muted-foreground">
          <span className="text-green">12</span>
          <span aria-hidden className="h-px w-8 bg-border" />
          Contact
        </p>

        {/* kinetic finale headline */}
        <h2 className="mt-6 font-display font-bold tracking-[-0.035em]">
          <span id="contact-heading" className="sr-only">
            Let&apos;s make quality measurable — interested in better products, better quality and better production systems?
          </span>
          <MaskedLines
            lines={[
              <span key="a" aria-hidden className="type-display block">
                Let&apos;s make quality
              </span>,
              <span key="b" aria-hidden className="type-display block">
                <span className="text-green">measurable</span>
                <span className="text-muted-foreground/40">.</span>
              </span>,
              <span key="c" aria-hidden className="type-display mt-3 block font-mono text-[0.62rem] font-normal tracking-[0.26em] uppercase text-muted-foreground">
                Better products · Better processes · Better systems
              </span>,
            ]}
            lineClassName=""
            stagger={0.14}
          />
        </h2>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
            {contactCopy.supporting}
          </p>
        </Reveal>

        {/* actions */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center gap-3.5">
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2.5 rounded-full bg-green px-7 py-4 text-sm font-semibold text-primary-foreground shadow-[0_10px_36px_-10px] shadow-green/60 transition-shadow hover:shadow-[0_14px_44px_-8px] hover:shadow-green/70"
              >
                <Mail className="h-4 w-4" aria-hidden />
                Email Lydia
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border bg-surface px-7 py-4 text-sm font-semibold transition-colors hover:border-green/60 hover:text-green"
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={handleCv}
                className="inline-flex items-center gap-2.5 rounded-full border bg-surface px-7 py-4 text-sm font-semibold transition-colors hover:border-green/60 hover:text-green"
              >
                <FileDown className="h-4 w-4" aria-hidden />
                Download CV
              </button>
            </Magnetic>
          </div>
        </Reveal>

        {/* giant email — the finale link */}
        <Reveal delay={0.2} className="mt-14">
          <Magnetic strength={0.18}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="hover"
              className="group inline-flex max-w-full flex-col gap-1"
            >
              <span className="font-mono text-[0.62rem] tracking-[0.26em] uppercase text-muted-foreground">
                Write directly
              </span>
              <span className="link-sweep w-fit break-all font-display text-[clamp(1.35rem,3.4vw,3rem)] font-bold tracking-[-0.02em] transition-colors group-hover:text-green">
                {profile.email}
              </span>
            </a>
          </Magnetic>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="flex items-center gap-2.5 font-mono text-[0.56rem] tracking-[0.16em] uppercase text-muted-foreground/50">
            <span aria-hidden className="h-px w-6 bg-border" />
            Spec note — email &amp; LinkedIn shown are placeholders · update before publishing
          </p>
        </Reveal>
      </div>

      {/* velocity marquee wall */}
      <div className="relative border-y bg-background/60">
        <VelocityMarquee className="py-6 sm:py-8" baseSpeed={58}>
          {finaleMarquee.map((word, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap sm:gap-12">
              <span
                className={cn(
                  "font-display text-[clamp(2rem,5vw,4.4rem)] font-bold tracking-[-0.03em]",
                  i % 2 === 1 && "text-outline"
                )}
              >
                {word}
              </span>
              <span aria-hidden className="font-display text-[clamp(1.1rem,2.4vw,2rem)] text-green">
                ✕
              </span>
            </span>
          ))}
        </VelocityMarquee>
      </div>

      {/* Footer */}
      <footer className="relative">
        <div className="mx-auto max-w-[100rem] px-4 py-12 sm:px-8 lg:px-10">
          <div className="grid gap-10 sm:grid-cols-[1.4fr_1fr_1fr]">
            <div>
              <Link href="#top" className="group inline-flex items-center gap-3" aria-label="Back to top">
                <span
                  aria-hidden
                  className="flex h-10 w-10 items-center justify-center rounded-md border bg-surface font-display text-sm font-bold text-green transition-transform duration-500 group-hover:rotate-[8deg]"
                >
                  LC
                </span>
                <span className="flex flex-col leading-none">
                  <span className="font-display text-base font-semibold tracking-tight">{profile.fullName}</span>
                  <span className="mt-1 font-mono text-[0.56rem] tracking-[0.18em] uppercase text-muted-foreground">
                    Industrial &amp; Textile Engineer
                  </span>
                </span>
              </Link>
              <p className="mt-5 max-w-sm text-pretty text-sm leading-relaxed text-muted-foreground">
                {profile.availability}
              </p>
              <p className="mt-4 flex items-center gap-2 font-mono text-[0.62rem] tracking-[0.16em] uppercase text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green" />
                </span>
                Nairobi <NairobiClock />
              </p>
            </div>
            <nav aria-label="Footer">
              <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Sections
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="link-sweep text-sm text-muted-foreground transition-colors hover:text-foreground">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                Elsewhere
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="link-sweep inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Mail className="h-3.5 w-3.5" aria-hidden /> Email
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-sweep inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Linkedin className="h-3.5 w-3.5" aria-hidden /> LinkedIn
                  </a>
                </li>
                <li className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <Github className="h-3.5 w-3.5" aria-hidden /> Kenya · {profile.graduationYear} graduate
                </li>
              </ul>
              <Magnetic strength={0.15}>
                <Link
                  href="#top"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground transition-colors hover:border-green/50 hover:text-green"
                >
                  <ArrowUp className="h-3.5 w-3.5" aria-hidden />
                  Back to top
                </Link>
              </Magnetic>
            </div>
          </div>
          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 sm:flex-row sm:items-center">
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground/70">
              © {profile.graduationYear} {profile.fullName} · Engineering portfolio
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.14em] uppercase text-muted-foreground/70">
              Understand the material · Measure the process · Reduce waste
            </p>
          </div>
        </div>
      </footer>
    </section>
  );
}

/** Live clock — Nairobi / East Africa Time. */
function NairobiClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "Africa/Nairobi",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="tabular-nums text-foreground/80" suppressHydrationWarning>
      {" — "}
      {time} EAT
    </span>
  );
}
