"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/shared/section";
import { ShowcaseCard } from "@/components/shared/showcase-card";
import type { ShowcaseItem } from "@/lib/queries/showcaseItems";

export type ShowcaseExplorerStrings = {
  counterSuffix: string;
  allLabel: string;
  stageLabels: Record<string, string>;
  emptyLabel: string;
  linkLabel: string;
};

// Tab order; only stages actually present in the data are shown.
const STAGE_ORDER = ["live", "beta", "rnd", "internal"];

export function ShowcaseExplorer({
  strings,
  items,
}: Readonly<{
  strings: ShowcaseExplorerStrings;
  items: ReadonlyArray<ShowcaseItem>;
}>) {
  const [active, setActive] = useState("all");

  const filters = useMemo(() => {
    const present = new Set(items.map((i) => i.stage));
    const stageTabs = STAGE_ORDER.filter((s) => present.has(s)).map((s) => ({
      id: s,
      label: strings.stageLabels[s] ?? s,
    }));
    return [{ id: "all", label: strings.allLabel }, ...stageTabs];
  }, [items, strings.allLabel, strings.stageLabels]);

  const filtered =
    active === "all" ? items : items.filter((it) => it.stage === active);
  const count = String(filtered.length).padStart(2, "0");

  return (
    <Section variant="paper">
      <div className="mb-s7 flex flex-wrap items-center justify-between gap-s5">
        <div
          role="tablist"
          aria-label="Showcase stage filter"
          className="flex flex-wrap gap-2"
        >
          {filters.map((f) => {
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

      {filtered.length === 0 ? (
        <p className="font-mono text-sm uppercase tracking-[0.14em] text-muted">
          {strings.emptyLabel}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-s5 min-[721px]:grid-cols-2">
          {filtered.map((item) => (
            <ShowcaseCard
              key={item.id}
              item={item}
              stageLabel={strings.stageLabels[item.stage] ?? item.stage}
              linkLabel={strings.linkLabel}
              surface="paper"
            />
          ))}
        </div>
      )}
    </Section>
  );
}
