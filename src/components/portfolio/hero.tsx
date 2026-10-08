"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { ArrowDown, ArrowUpRight, FileDown, MapPin } from "lucide-react";
import { profile, processFlow, marqueeTerms } from "@/lib/data";
import { LQIP } from "@/lib/lqip";
import { Magnetic, Tilt } from "./fx/motion-kit";
import { KineticLine, VelocityMarquee, ScrambleText } from "./fx/kinetic";
import { SilkCanvas } from "./fx/silk-canvas";
import { useIntroDone } from "./fx/experience";
import { toast } from "sonner";

/**
 * Editorial hero — masthead meta row, statement stage, duotone portrait and a
 * viewport-wide kinetic name anchored to the fold. Scroll transforms are all
 * keyed to the section's own progress so timing is viewport-normalised, and
 * content never fades — it only drifts and scrolls away naturally.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const intro = useIntroDone();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const yContent = useTransform(scrollYProgress, [0, 1], [0, 96]);
  const yPortrait = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const yName = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.16], [1, 0]);
  // scroll-linked variable font weight — the name thins as it leaves the fold.
  // Applied directly to the DOM (framer-motion has no first-class support).
  const nameRef = useRef<HTMLHeadingElement>(null);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const el = nameRef.current;
    if (!el) return;
    const t = Math.min(1, Math.max(0, v / 0.85));
    el.setAttribute("style", `font-variation-settings: wght ${Math.round(800 + (430 - 800) * t)}`);
  });

  // velocity-reactive skew on the giant name (subtle, spring-smoothed)
  const { scrollY } = useScroll();
  const nameVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(nameVelocity, { damping: 55, stiffness: 380 });
  const nameSkew = useTransform(smoothVelocity, [-2200, 0, 2200], [-1.1, 0, 1.1]);

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
    <section
      id="top"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative flex min-h-svh flex-col overflow-hidden"
    >
      {/* Living silk backdrop (WebGL, theme-aware, perf-guarded) */}
      <div className="absolute inset-0" aria-hidden>
        <SilkCanvas className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/55 via-background/30 to-background dark:from-background/45 dark:via-background/22" />
        <div className="absolute inset-0 bg-grid fade-edges opacity-60" />
      </div>

      {/* Masthead meta row — editorial */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={intro || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.7, delay: reduce ? 0 : 0.08 }}
        className="relative z-10 mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 px-4 pt-20 font-mono text-[0.6rem] tracking-[0.22em] uppercase text-foreground/70 sm:px-8 lg:pt-28"
      >
        <span className="truncate">Moi University · B.Eng</span>
        <span className="hidden items-center gap-1.5 md:flex">
          <MapPin className="h-3 w-3 text-green" aria-hidden />
          Kenya · East Africa
        </span>
        <span className="flex items-center gap-2 text-green">
          <span className="h-1.5 w-1.5 rounded-full bg-green pulse-soft" aria-hidden />
          Open to graduate roles
        </span>
      </motion.div>

      {/* Stage — statement left, duotone portrait right (sits BELOW the giant name) */}
      <div className="relative z-[1] mx-auto flex w-full max-w-[100rem] flex-1 flex-col justify-center px-4 pb-8 pt-[6vh] sm:px-8 lg:pt-[4vh]">
        <motion.div style={reduce ? undefined : { y: yContent }} className="relative max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={intro ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
            transition={{ duration: 0.6, delay: 0.02 }}
            className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-foreground/25 bg-foreground/[0.06] px-4 py-1.5 font-mono text-[0.66rem] tracking-[0.18em] uppercase text-muted-foreground backdrop-blur"
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green" />
            </span>
            <span className="truncate">{profile.eyebrow}</span>
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 22 }}
            animate={intro || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            transition={{ duration: 0.8, delay: reduce ? 0 : 0.24 }}
            className="mt-6"
          >
            <p className="text-pretty font-display text-[clamp(1.05rem,2.3vw,2rem)] font-semibold leading-[1.18] tracking-[-0.015em]">
              Industrial &amp; Textile Engineering graduate focused on{" "}
              <span className="text-green">Manufacturing Systems</span>,{" "}
              <span className="text-green">Quality</span> &amp;{" "}
              <span className="text-green">Sustainable Textile Production</span>.
            </p>
            <p className="mt-4 hidden max-w-md text-pretty text-[0.95rem] leading-relaxed text-muted-foreground line-clamp-3 sm:block">
              {profile.supporting}
            </p>
          </motion.div>

          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
            animate={intro || reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, delay: reduce ? 0 : 0.44 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic>
              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 rounded-full bg-green px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_8px_30px_-8px] shadow-green/50 transition-shadow hover:shadow-[0_10px_36px_-6px] hover:shadow-green/60"
              >
                Explore Engineering Projects
                <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" aria-hidden />
              </a>
            </Magnetic>
            <Magnetic>
              <button
                type="button"
                onClick={handleCv}
                className="inline-flex items-center gap-2.5 rounded-full border border-foreground/25 bg-foreground/[0.06] px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:border-green/60 hover:text-green"
              >
                <FileDown className="h-4 w-4" aria-hidden />
                Download CV
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href="#contact"
                className="group inline-flex items-center gap-1.5 rounded-full px-4 py-3.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                <ScrambleText text="Contact Lydia" />
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        {/* Portrait — hard crop, duotone, overlaps the giant name (name sits on top) */}
        <motion.div
          style={reduce ? undefined : { y: yPortrait }}
          className="relative order-2 mt-6 w-full max-w-[13rem] sm:max-w-[17.5rem] lg:absolute lg:right-[-1.5vw] lg:top-1/2 lg:z-0 lg:mt-0 lg:w-[32vw] lg:max-w-[30rem]"
        >
          <div className="lg:-translate-y-1/2">
          <motion.div
            initial={reduce ? { opacity: 0, scale: 0.96 } : { opacity: 0, y: 44, scale: 0.96, clipPath: "inset(14% 14% 14% 14% round 6px)" }}
            animate={
              intro || reduce
                ? { opacity: 1, y: 0, scale: 1, clipPath: "inset(0% 0% 0% 0% round 4px)" }
                : { opacity: 0, y: 44, scale: 0.96, clipPath: "inset(14% 14% 14% 14% round 6px)" }
            }
            transition={{ duration: 1.15, delay: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <Tilt max={5}>
              <figure
                className="duotone zoom-card relative aspect-[4/4.2] overflow-hidden rounded-md border border-foreground/10 bg-elevated shadow-2xl sm:aspect-[4/4.6] lg:aspect-[3/3.9]"
                data-cursor="hover"
              >
                <div className="absolute inset-0">
                  <Image
                    src="/images/portrait.jpg"
                    alt="Lydia Chebet, graduate engineer, adjusting controls on an industrial machine"
                    fill
                    priority
                    sizes="(max-width: 1024px) 70vw, 28vw"
                    placeholder="blur"
                    blurDataURL={LQIP["portrait"]}
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 z-[2] bg-gradient-to-t from-background/95 via-background/15 to-transparent" />
                <span aria-hidden className="absolute left-2.5 top-2.5 z-[3] h-4 w-4 border-l-2 border-t-2 border-green/70" />
                <span aria-hidden className="absolute right-2.5 top-2.5 z-[3] h-4 w-4 border-r-2 border-t-2 border-green/70" />
                <span aria-hidden className="absolute bottom-2.5 left-2.5 z-[3] h-4 w-4 border-b-2 border-l-2 border-green/70" />
                <span aria-hidden className="absolute bottom-2.5 right-2.5 z-[3] h-4 w-4 border-b-2 border-r-2 border-green/70" />
                <figcaption className="absolute inset-x-0 bottom-0 z-[3] flex items-end justify-between gap-2 p-4">
                  <div>
                    <p className="font-mono text-[0.56rem] tracking-[0.22em] uppercase text-green [text-shadow:0_1px_8px_rgb(0_0_0/0.45)]">
                      Portrait placeholder
                    </p>
                    <p className="mt-1 font-display text-base font-semibold leading-tight">{profile.fullName}</p>
                    <p className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-muted-foreground">
                      Industrial &amp; Textile Engineering
                    </p>
                  </div>
                  <span className="chip hidden !border-white/20 !bg-black/30 !text-foreground/90 sm:inline-flex">EST. 2026</span>
                </figcaption>
              </figure>
            </Tilt>
          </motion.div>

          {/* floating metric chips — anchored to the card frame, outside the clip wrapper */}
          <div aria-hidden className="pointer-events-none absolute -inset-3 hidden lg:block">
            <FloatingChip className="-left-8 top-10" delay={0} label="Quality" />
            <FloatingChip className="-left-10 top-[42%]" delay={2.0} label="Cycle Time" />
            <FloatingChip className="-right-7 top-[22%]" delay={1.1} label="GSM" />
            <FloatingChip className="-right-9 top-[56%]" delay={0.6} label="Efficiency" />
          </div>
          </div>
        </motion.div>
      </div>

      {/* Giant kinetic name — anchored to the fold, overlaps the portrait */}
      <motion.div
        style={reduce ? undefined : { y: yName, skewX: nameSkew }}
        className="relative z-[5] mx-auto w-full max-w-[100rem] px-4 sm:px-8"
      >
        <h1
          ref={nameRef}
          style={{ fontVariationSettings: "wght 800" }}
          className="type-giant font-display font-bold"
        >
          <span className="sr-only">Lydia Chebet — Industrial &amp; Textile Engineer</span>
          <span aria-hidden className="flex items-end gap-[2vw]">
            <KineticLine text="LYDIA" delay={reduce ? 0 : 0.18} stagger={0.05} active={intro} />
            <span className="mb-[0.14em] hidden font-mono text-[0.6rem] font-normal tracking-[0.3em] uppercase text-muted-foreground sm:inline-block">
              (Portfolio
              <br />
              2026)
            </span>
          </span>
          <span aria-hidden className="block pl-[7vw] text-outline-green">
            <KineticLine text="CHEBET" delay={reduce ? 0 : 0.44} stagger={0.05} active={intro} />
          </span>
        </h1>
      </motion.div>

      {/* Process hairline strip — fiber to product */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={intro || reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: reduce ? 0 : 0.9 }}
        className="strip-hairline relative z-[6] hidden lg:block"
      >
        <ol
          className="mx-auto grid w-full max-w-[100rem] grid-cols-6 px-8"
          aria-label="Textile process sequence: fiber to product"
        >
          {processFlow.map((step, i) => (
            <li
              key={step.id}
              className="group flex items-baseline gap-2 border-l border-border/70 px-4 py-3 first:border-l-0 first:pl-0"
            >
              <span className="font-mono text-[0.6rem] font-semibold tracking-[0.14em] text-green">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[0.66rem] tracking-[0.14em] uppercase text-foreground/85">{step.label}</span>
              <span className="ml-auto hidden select-none font-mono text-[0.6rem] text-muted-foreground/70 xl:block">
                {i < processFlow.length - 1 ? "→" : "◼"}
              </span>
            </li>
          ))}
        </ol>
      </motion.div>

      {/* Velocity-reactive marquee — accelerates & skews with your scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={intro || reduce ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: reduce ? 0 : 1.05 }}
        className="relative z-[6] border-t border-foreground/10 bg-foreground/[0.03] backdrop-blur"
      >
        <VelocityMarquee className="py-3.5">
          {marqueeTerms.map((term, i) => (
            <span
              key={i}
              className="flex items-center gap-10 whitespace-nowrap font-mono text-[0.68rem] tracking-[0.2em] uppercase text-muted-foreground"
            >
              {term}
              <span className="text-green">✕</span>
            </span>
          ))}
        </VelocityMarquee>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={reduce ? undefined : { opacity: cueOpacity }}
        className="pointer-events-none absolute bottom-24 left-1/2 z-[7] hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        aria-hidden
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={intro || reduce ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: reduce ? 0 : 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <motion.span animate={reduce ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <ArrowDown className="h-4 w-4 text-green" />
          </motion.span>
          <span className="font-mono text-[0.55rem] tracking-[0.3em] uppercase text-muted-foreground">Scroll</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

function FloatingChip({ className, delay, label }: { className?: string; delay: number; label: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.7 }}
      animate={reduce ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={
        reduce
          ? { duration: 0.3, delay }
          : {
              y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay },
              opacity: { duration: 0.5, delay },
              scale: { duration: 0.5, delay },
            }
      }
      className={`chip absolute z-10 !text-foreground shadow-lg backdrop-blur ${className ?? ""}`}
    >
      {label}
    </motion.span>
  );
}
