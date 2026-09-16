"use client";

import { useState } from "react";
import { images } from "@/content/images";
import { projectFilters, type Project, type ProjectFilter } from "@/content/projects";
import { cn } from "@/lib/utils";
import { ImageWithCredit } from "@/components/ui/ImageWithCredit";
import { Reveal } from "@/components/ui/Reveal";

type Props = { projects: readonly Project[]; heading: React.ReactNode };

/** Filterable project grid. Mounted only when flags.projects is on. */
export function ProjectsGrid({ projects, heading }: Props) {
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const shown = projects.filter((p) => filter === "All" || p.type === filter);

  return (
    <>
      <Reveal className="flex flex-wrap items-end justify-between gap-5">
        {heading}
        <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1.5">
          {projectFilters.map((f) => {
            const on = f === filter;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(f)}
                className={cn(
                  "min-h-11 border px-4 py-2.5 text-[12.5px] font-semibold transition-colors duration-300 hover:border-green motion-reduce:transition-none",
                  on ? "border-ink bg-ink text-white" : "border-line-2 bg-transparent text-muted",
                )}
              >
                {f}
              </button>
            );
          })}
        </div>
      </Reveal>
      <p className="sr-only" aria-live="polite">
        {shown.length} projects shown
      </p>
      <div
        className="mt-[26px] grid gap-[clamp(16px,1.8vw,26px)]"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 330px), 1fr))" }}
      >
        {shown.map((p, i) => (
          <Reveal
            key={p.slug}
            as="article"
            delay={(i % 3) * 90}
            className="group border border-line bg-white transition-[transform,box-shadow] duration-500 ease-out-expo hover:-translate-y-1.5 hover:shadow-card-hover motion-reduce:transition-none"
          >
            <div className="relative aspect-[16/11] overflow-hidden bg-well">
              <div className="absolute inset-0 transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.05] motion-reduce:transition-none">
                <ImageWithCredit image={images.projects[p.slug]} sizes="(min-width: 1000px) 33vw, (min-width: 700px) 50vw, 100vw" />
              </div>
              <span className="pointer-events-none absolute top-0 right-0 bg-gold px-2.5 py-1.5 font-mono text-[10px] tracking-[.14em] text-ink">
                {p.type.toUpperCase()}
              </span>
            </div>
            <div className="p-5 pb-6">
              <h3 className="text-[19px] font-bold tracking-[-.022em] text-ink">{p.name}</h3>
              <p className="mt-2 font-mono text-[11px] tracking-[.08em] text-bronze">{p.location}</p>
              <p className="mt-2.5 text-[13.5px] leading-[1.55] text-muted">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </>
  );
}
