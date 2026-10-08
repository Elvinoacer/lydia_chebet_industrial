"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, animate, motion, useMotionValue, useTransform } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Animated number counter that counts up when scrolled into view. */
export function Counter({ value, suffix = "", prefix = "", decimals = 0, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const mv = useMotionValue(0);
  const text = useTransform(mv, (v) => `${prefix}${v.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      mv.set(value);
      return () => {};
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => mv.set(v),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce, mv]);

  return (
    <motion.span ref={ref} className={className}>
      {text}
    </motion.span>
  );
}
