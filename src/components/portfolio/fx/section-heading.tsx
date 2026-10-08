"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MaskedLines } from "./kinetic";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  /** "display" renders an oversized editorial headline with masked line reveals. */
  size?: "default" | "display";
  /** Optional huge outlined ghost index rendered behind the heading (desktop). */
  ghostIndex?: boolean;
  className?: string;
}

/** Consistent section header: mono index + eyebrow, display title, description. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  size = "default",
  ghostIndex = false,
  className,
}: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "relative max-w-3xl",
        align === "center" && "mx-auto text-center",
        size === "display" && "max-w-none",
        className
      )}
    >
      {ghostIndex && (
        <span
          aria-hidden
          className="text-outline-faint pointer-events-none absolute -top-[0.72em] right-0 hidden select-none font-display text-[9rem] font-bold leading-none lg:block xl:text-[11rem]"
        >
          {index}
        </span>
      )}

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "flex items-center gap-3 font-mono text-[0.7rem] tracking-[0.22em] uppercase text-muted-foreground",
          align === "center" && "justify-center"
        )}
      >
        <span className="text-green">{index}</span>
        <span aria-hidden className="h-px w-8 bg-border" />
        {eyebrow}
      </motion.p>

      {size === "display" ? (
        <h2 className="mt-5 font-display font-bold tracking-[-0.03em]">
          <MaskedLines
            lines={[title]}
            lineClassName="type-display"
            delay={0.08}
            stagger={0.14}
          />
        </h2>
      ) : (
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 font-display text-3xl font-semibold leading-[1.06] tracking-tight text-balance sm:text-4xl lg:text-[2.75rem]"
        >
          {title}
        </motion.h2>
      )}

      {description ? (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.65, delay: reduce ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  );
}
