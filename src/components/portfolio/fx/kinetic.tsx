"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* KineticLine — character-level masked rise, the signature entrance   */
/* ------------------------------------------------------------------ */
export function KineticLine({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.022,
  once = true,
  active,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** When provided, gates the reveal on this flag instead of inView (e.g. preloader hand-off) */
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-8% 0px -8% 0px" });
  const chars = Array.from(text);
  const go = active !== undefined ? active : inView;

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {text}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text} role="text">
      {chars.map((char, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom" aria-hidden>
          <motion.span
            className={cn("inline-block will-change-transform", charClassName)}
            initial={{ y: "115%", rotate: 5 }}
            animate={go ? { y: "0%", rotate: 0 } : { y: "115%", rotate: 5 }}
            transition={{ duration: 0.9, delay: delay + i * stagger, ease: EASE }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* MaskedLines — line-level masked rise for editorial headlines        */
/* ------------------------------------------------------------------ */
export function MaskedLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.12,
  once = true,
  active,
}: {
  /** Each entry renders as its own rising line. */
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  /** When provided, gates the reveal on this flag instead of inView. */
  active?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const go = active !== undefined ? active : inView;

  if (reduce) {
    return (
      <span ref={ref} className={className}>
        {lines.map((line, i) => (
          <span key={i} className={cn("block", lineClassName)}>
            {line}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span ref={ref} className={cn("block", className)}>
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.12em] -mb-[0.12em]", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            initial={{ y: "112%" }}
            animate={go ? { y: "0%" } : { y: "112%" }}
            transition={{ duration: 1.0, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* ScrambleText — hover-triggered character shuffle                    */
/* ------------------------------------------------------------------ */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/–—\\|<>*#01";

export function ScrambleText({
  text,
  className,
  duration = 500,
}: {
  text: string;
  className?: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState(text);
  const [hovering, setHovering] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!hovering || reduce) return; // resets happen in handlers, not here
    const start = performance.now();
    timer.current = setInterval(() => {
      const elapsed = performance.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const revealCount = Math.floor(progress * text.length);
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " " || i < revealCount) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("")
      );
      if (progress >= 1 && timer.current) {
        clearInterval(timer.current);
        setDisplay(text);
      }
    }, 30);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [hovering, text, duration, reduce]);

  return (
    <span
      className={cn("inline-block tabular-nums", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setDisplay(text);
      }}
    >
      {display}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* VelocityMarquee — speed & skew react to scroll velocity             */
/* ------------------------------------------------------------------ */
export function VelocityMarquee({
  children,
  className,
  baseSpeed = 42,
  direction = 1,
}: {
  children: ReactNode;
  className?: string;
  baseSpeed?: number; // px/s at rest — real pixels, independent of track width & fps
  direction?: 1 | -1;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [copyWidth, setCopyWidth] = useState(0); // px width of ONE copy (incl. its padding)
  const inView = useInView(ref, { margin: "100px" });
  const baseX = useMotionValue(0); // pixel offset, wrapped to one copy width
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocitySkew = useTransform(smoothVelocity, [-1500, 0, 1500], [-1.6, 0, 1.6]);
  // Wrap into (-copyWidth, 0] so the loop point is exactly one copy — seamless.
  const x = useTransform(baseX, (v) =>
    copyWidth > 0 ? `-${((((-v) % copyWidth) + copyWidth) % copyWidth).toFixed(3)}px` : "0px"
  );

  // Measure one copy (first child of the track). ResizeObserver keeps it exact
  // across font loads, viewport changes and content edits.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const firstCopy = track.children[0] as HTMLElement | undefined;
    if (!firstCopy) return;
    const measure = () => setCopyWidth(firstCopy.getBoundingClientRect().width);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(firstCopy);
    return () => ro.disconnect();
  }, []);

  // Velocity boost with a deadband. useVelocity only emits while scrollY is
  // actually changing, so after an abrupt stop its last sample can linger.
  // We track the age of the last velocity event: 180ms of silence → boost
  // decays to 0 and the marquee rests at exactly baseSpeed.
  const lastVelocityAt = useRef(0);
  const boost = useRef(0);
  useMotionValueEvent(scrollVelocity, "change", () => {
    lastVelocityAt.current = performance.now();
  });

  useAnimationFrame((_, delta) => {
    if (reduce || !inView || copyWidth <= 0) return;
    const fresh = performance.now() - lastVelocityAt.current < 180;
    const target = fresh
      ? Math.max(-2.2, Math.min(2.2, smoothVelocity.get() / 1000))
      : 0;
    // ease toward the target (τ ≈ 120ms) so boosts ramp in/out smoothly
    boost.current += (target - boost.current) * Math.min(1, delta / 120);
    const speed = baseSpeed * (1 + boost.current) * (delta / 1000);
    const dir = boost.current < 0 ? -direction : direction;
    baseX.set(baseX.get() - speed * dir);
  });

  // Four identical copies, each carrying its own trailing padding (pr-10) so
  // the spacing rhythm is identical across every seam — coverage is guaranteed
  // even on ultrawide displays wider than a single copy.
  const copy = (hidden: boolean) => (
    <div className="flex items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {children}
    </div>
  );

  if (reduce) {
    return (
      <div ref={ref} className={cn("overflow-hidden", className)}>
        <div className="flex w-max">
          {copy(false)}
          {copy(true)}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        ref={trackRef}
        className="flex w-max whitespace-nowrap will-change-transform"
        style={{ x, skewX: velocitySkew }}
      >
        {copy(false)}
        {copy(true)}
        {copy(true)}
        {copy(true)}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollProgressRail — right-edge section progress dots (desktop)     */
/* ------------------------------------------------------------------ */
export function ScrollRail({ items }: { items: { id: string; label: string }[] }) {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 xl:flex" aria-hidden>
      <motion.div
        className="w-px overflow-hidden bg-border"
        style={{ scaleY, transformOrigin: "top", height: items.length * 22 }}
      >
        <div className="h-full w-full bg-green" />
      </motion.div>
      <span className="font-mono text-[0.55rem] tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl]">
        {active ? items.find((i) => i.id === active)?.label.toUpperCase() : ""}
      </span>
    </div>
  );
}
