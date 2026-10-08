"use client";

import { skillGroups, toolGroups, proficiencyMeta, targetRoles } from "@/lib/data";
import { SectionHeading } from "./fx/section-heading";
import { Reveal, RevealGroup, RevealItem } from "./fx/reveal";
import { cn } from "@/lib/utils";

export function SkillsTools() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="relative border-t bg-elevated/40">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <SectionHeading
          index="08"
          eyebrow="Skills & tools"
          title={
            <span id="skills-heading">
              Honest proficiency levels — <span className="text-green">no invented percentages</span>.
            </span>
          }
          description="Skill claims are graded, not inflated: strong means used repeatedly in coursework and labs; working knowledge means applied with guidance; academic exposure means studied formally. Software listed only where actually used."
        />

        {/* Proficiency legend */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2.5 rounded-xl border bg-surface px-5 py-3.5">
            <p className="font-mono text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground">Legend</p>
            {Object.entries(proficiencyMeta).map(([key, meta]) => (
              <span key={key} className="flex items-center gap-2">
                <span className={cn("h-2 w-2 rounded-full", key === "strong" ? "bg-green" : key === "working" ? "bg-foreground/40" : key === "academic" ? "bg-indigo" : "bg-amber")} />
                <span className="text-[0.78rem] text-muted-foreground">{meta.label}</span>
              </span>
            ))}
          </div>
        </Reveal>

        {/* Skill groups */}
        <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2" stagger={0.08}>
          {skillGroups.map((group) => (
            <RevealItem key={group.id}>
              <article className="h-full rounded-xl border bg-surface p-6">
                <h3 className="font-display text-lg font-semibold tracking-tight">{group.title}</h3>
                <ul className="mt-4 divide-y">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex items-center justify-between gap-3 py-2.5">
                      <span className="text-[0.86rem] text-foreground/90">{skill.name}</span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[0.56rem] tracking-[0.1em] uppercase",
                          proficiencyMeta[skill.level].className
                        )}
                      >
                        {proficiencyMeta[skill.level].label}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Tools */}
        <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-3" stagger={0.08}>
          {toolGroups.map((group) => (
            <RevealItem key={group.id}>
              <div className="h-full rounded-xl border bg-surface p-6">
                <p className="font-mono text-[0.62rem] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
                  {group.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {group.tools.map((tool) => (
                    <li key={tool.name} className="flex items-center justify-between gap-2">
                      <span className="text-[0.86rem] font-medium">{tool.name}</span>
                      <span className="flex items-center gap-1.5">
                        {tool.note && (
                          <span className="font-mono text-[0.55rem] tracking-wide uppercase text-muted-foreground/70">
                            {tool.note}
                          </span>
                        )}
                        <span
                          className={cn(
                            "rounded-full border px-2.5 py-0.5 font-mono text-[0.56rem] tracking-[0.1em] uppercase",
                            proficiencyMeta[tool.level].className
                          )}
                        >
                          {proficiencyMeta[tool.level].label}
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        {/* Target roles strip */}
        <Reveal delay={0.1}>
          <div className="mt-6 overflow-hidden rounded-xl border bg-surface py-4">
            <div className="overflow-hidden" aria-hidden>
              <div className="marquee-track gap-10" style={{ ["--marquee-duration" as string]: "46s" }}>
                {[...targetRoles, ...targetRoles].map((role, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-10 whitespace-nowrap font-mono text-[0.7rem] tracking-[0.16em] uppercase text-muted-foreground"
                  >
                    {role}
                    <span className="text-indigo">◆</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
