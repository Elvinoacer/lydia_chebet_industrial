"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useInView, useReducedMotion, useSpring, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Magnetic — element gently follows the cursor                        */
/* ------------------------------------------------------------------ */
export function Magnetic({
  children,
  className,
  strength = 0.35,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — translates children on scroll                            */
/* ------------------------------------------------------------------ */
export function Parallax({
  children,
  className,
  speed = 0.2,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, -speed * 100]);
  const smooth = useSpring(y, { stiffness: 90, damping: 24, mass: 0.5 });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <motion.div style={reduce ? undefined : { y: smooth }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tilt — subtle 3D card tilt on pointer                               */
/* ------------------------------------------------------------------ */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 20 });
  const sry = useSpring(ry, { stiffness: 180, damping: 20 });
  const [hover, setHover] = useState(false);

  function onMove(e: MouseEvent<HTMLDivElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ry.set(px * max);
    rx.set(-py * max);
  }

  return (
    <motion.div
      ref={ref}
      className={cn("[transform-style:preserve-3d]", className)}
      style={{ rotateX: srx, rotateY: sry, perspective: 900 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        rx.set(0);
        ry.set(0);
      }}
      animate={{ scale: hover && !reduce ? 1.012 : 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* WordReveal — headline reveals word by word                          */
/* ------------------------------------------------------------------ */
export function WordReveal({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.055,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  // Reveal when the line actually enters the viewport (once) — otherwise the
  // animation plays on mount, offscreen, and the visitor never sees it.
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={cn("inline-block", className)} aria-label={text} role="text">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className={cn("inline-block", wordClassName)}
            aria-hidden
            initial={reduce ? { opacity: 0 } : { y: "108%", opacity: 0 }}
            animate={
              reduce
                ? { opacity: inView ? 1 : 0 }
                : inView
                  ? { y: "0%", opacity: 1 }
                  : { y: "108%", opacity: 0 }
            }
            transition={{
              duration: reduce ? 0.2 : 0.85,
              delay: reduce ? 0 : delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
