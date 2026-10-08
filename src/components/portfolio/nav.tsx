"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, FileDown } from "lucide-react";
import { navItems, profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Magnetic } from "./fx/motion-kit";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

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
    <>
      {/* scroll progress */}
      <motion.div
        className="fixed inset-x-0 top-0 z-[60] h-[2.5px] origin-left bg-gradient-to-r from-green via-green to-indigo"
        style={{ scaleX: progress }}
        aria-hidden
      />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
        >
          <Link href="#top" className="group flex items-center gap-3" aria-label="Lydia Chebet — back to top">
            <span
              aria-hidden
              className="flex h-9 w-9 items-center justify-center rounded-md border bg-surface font-display text-sm font-bold text-green transition-transform duration-500 group-hover:rotate-[8deg]"
            >
              LC
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[0.95rem] font-semibold tracking-tight">
                {profile.fullName}
              </span>
              <span className="mt-1 font-mono text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground">
                Industrial &amp; Textile Engineer
              </span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-[0.82rem] font-medium transition-colors",
                    active === item.id ? "text-green" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-green"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCv}
              className="hidden items-center gap-2 rounded-full border px-4 py-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-muted-foreground transition-colors hover:border-green/50 hover:text-green sm:inline-flex"
            >
              <FileDown className="h-3.5 w-3.5" aria-hidden />
              CV
            </button>
            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-green/50 hover:text-green"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25 }}
                    className="flex"
                  >
                    {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  </motion.span>
                </AnimatePresence>
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:text-foreground lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-b bg-background/95 backdrop-blur-xl lg:hidden"
            >
              <ul className="space-y-1 px-4 py-4">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-muted-foreground transition-colors hover:bg-elevated hover:text-foreground"
                    >
                      {item.label}
                      <span className="font-mono text-[0.6rem] text-green">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </a>
                  </motion.li>
                ))}
                <li className="pt-2">
                  <Magnetic strength={0.15}>
                    <button
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        handleCv();
                      }}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-green px-5 py-3 text-sm font-semibold text-primary-foreground"
                    >
                      <FileDown className="h-4 w-4" aria-hidden />
                      Download CV
                    </button>
                  </Magnetic>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
