"use client";

import { useState } from "react";
import { type Project, ProjectCard } from "@/components/shared/project-card";
import { Section } from "@/components/shared/section";

export type ProjectsExplorerStrings = {
  counterSuffix: string;
  filters: ReadonlyArray<{ id: string; label: string }>;
  items: ReadonlyArray<Project & { categories: ReadonlyArray<string> }>;
};

export function ProjectsExplorer({
  lang,
  strings,
}: Readonly<{ lang: string; strings: ProjectsExplorerStrings }>) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all"
      ? strings.items
      : strings.items.filter((it) => it.categories.includes(active));
  const count = String(filtered.length).padStart(2, "0");

  return (
    <Section variant="paper">
      <div className="mb-s7 flex flex-wrap items-center justify-between gap-s5">
        <div
          role="tablist"
          aria-label="Project filter"
          className="flex flex-wrap gap-2"
        >
          {strings.filters.map((f) => {
            const isActive = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(f.id)}
                className={[
                  "cursor-pointer border px-[0.9rem] py-[0.55rem] font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-1 ease-akieni",
                  isActive
                    ? "border-black bg-black text-white"
                    : "border-line-light bg-transparent text-ink hover:border-black",
                ].join(" ")}
              >
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
          <span>{count}</span>&nbsp;&nbsp;{strings.counterSuffix}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2">
        {filtered.map((item) => (
          <ProjectCard
            key={item.slug || item.title}
            project={item}
            lang={lang}
            surface="paper"
          />
        ))}
      </div>
    </Section>
  );
}
