"use client";

import { useEffect, useRef, useState } from "react";
import { useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

function subscribeMedia(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

/**
 * Elite cursor — a precise dot with a lagging ring in difference blend.
 * Grows over interactive elements; shows a label over [data-cursor="view"].
 * Renders only on fine pointers; native cursor stays for everyone else.
 */
export function Cursor() {
  const [variant, setVariant] = useState<"default" | "hover" | "view" | "hidden">("default");
  const [label, setLabel] = useState("VIEW");
  const finePointer = useSyncExternalStore(
    subscribeMedia("(pointer: fine)"),
    () => window.matchMedia("(pointer: fine)").matches,
    () => false
  );
  const reducedMotion = useSyncExternalStore(
    subscribeMedia("(prefers-reduced-motion: reduce)"),
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  );
  const enabled = finePointer && !reducedMotion;
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useSpring(dotX, { stiffness: 350, damping: 32, mass: 0.6 });
  const ringY = useSpring(dotY, { stiffness: 350, damping: 32, mass: 0.6 });
  const raf = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const view = t.closest<HTMLElement>('[data-cursor="view"]');
      if (view) {
        setLabel(view.dataset.cursorLabel ?? "VIEW");
        setVariant("view");
        return;
      }
      if (t.closest('a, button, [role="button"], input, textarea, select, [data-cursor="hover"]')) {
        setVariant("hover");
        return;
      }
      setVariant("default");
    };

    const onLeave = () => setVariant("hidden");
    const onEnter = () => setVariant("default");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf.current);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, [enabled, dotX, dotY]);

  if (!enabled) return null;

  return (
    <>
      {/* precise dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: variant === "hidden" ? 0 : 1 }}
      />
      {/* lagging ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] flex items-center justify-center rounded-full border border-white mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: variant === "view" ? 88 : variant === "hover" ? 52 : 34,
          height: variant === "view" ? 88 : variant === "hover" ? 52 : 34,
          opacity: variant === "hidden" ? 0 : 1,
          backgroundColor: variant === "view" ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)",
        }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
      >
        <AnimatePresence>
          {variant === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-mono text-[0.55rem] font-semibold tracking-[0.18em] text-black"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
