"use client";

import { useId, useRef } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

/** ARIA tab list with an animated brand underline. Cross-fade only, no slide. */
export function Tabs({ tabs, value, onChange, className }) {
  const baseId = useId();
  const refs = useRef([]);

  const onKeyDown = (e) => {
    const i = tabs.findIndex((t) => t.id === value);
    const last = tabs.length - 1;
    let next = null;
    if (e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    onChange(tabs[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Asset classes"
      onKeyDown={onKeyDown}
      className={cn(
        "-mx-5 flex gap-1 overflow-x-auto px-5 pb-px [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className
      )}
    >
      {tabs.map((tab, i) => {
        const active = tab.id === value;
        return (
          <button
            key={tab.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            role="tab"
            type="button"
            id={`${baseId}-tab-${tab.id}`}
            aria-selected={active}
            aria-controls={`${baseId}-panel-${tab.id}`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative shrink-0 px-4 py-3 text-[14.5px] font-semibold whitespace-nowrap transition-colors",
              active ? "text-brand" : "text-muted hover:text-ink"
            )}
          >
            {tab.label}
            {active && (
              <motion.span
                layoutId="tab-underline"
                className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-brand"
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
