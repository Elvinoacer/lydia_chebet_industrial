"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type RevealDirection = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: RevealDirection;
  distance?: number;
  once?: boolean;
  as?: "div" | "section" | "span" | "li" | "article" | "header" | "figure";
}

const offsets: Record<RevealDirection, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
  none: { x: 0, y: 0 },
};

/** Scroll-triggered reveal with reduced-motion fallback. */
export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.7,
  direction = "up",
  distance = 28,
  once = true,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = offsets[direction];
  const d = reduce ? 0 : distance;

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x * d, y: offset.y * d },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: reduce ? 0.01 : duration, delay: reduce ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const Comp = motion[as];
  return (
    <Comp
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px 0px -80px 0px" }}
    >
      {children}
    </Comp>
  );
}

/** Container that staggers its Reveal children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: reduce ? 0 : delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  direction = "up",
  distance = 24,
}: {
  children: ReactNode;
  className?: string;
  direction?: RevealDirection;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const offset = offsets[direction];
  const d = reduce ? 0 : distance;
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, x: offset.x * d, y: offset.y * d },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: reduce ? 0.01 : 0.65, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
