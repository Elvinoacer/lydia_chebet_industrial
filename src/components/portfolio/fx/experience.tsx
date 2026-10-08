"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";
import { Preloader } from "./preloader";
import { Cursor } from "./cursor";
import { ScrollRail } from "./kinetic";
import { navItems } from "@/lib/data";

/**
 * The experience shell — preloader, custom cursor, Lenis smooth scroll,
 * and the right-edge scroll rail. Wraps the whole page exactly once.
 *
 * `useIntroDone()` lets the hero hold its entrance until the preloader
 * curtain lifts, so the first paint lands as one cinematic sequence.
 */
const IntroContext = createContext(true);
export const useIntroDone = () => useContext(IntroContext);

export function Experience({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);

  return (
    <IntroContext.Provider value={done}>
      <SmoothScroll>
        <Preloader onComplete={() => setDone(true)} />
        <Cursor />
        <ScrollRail items={navItems.map((n) => ({ id: n.id, label: n.label }))} />
        {children}
      </SmoothScroll>
    </IntroContext.Provider>
  );
}
