"use client";

import { CountUp } from "@/components/ui/count-up";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * The live site ships these five as a solid green banner, which reads as
 * decoration and gets scrolled past. Same numbers, rendered as data:
 * hairline-separated columns, counters firing once on view.
 *
 * Label above, figure below — "Max leverage → 1:2000" is the order someone
 * actually reads a spec in, and it stops five equal-weight numbers from
 * shouting over each other. The figures are set in solid ink, not the brand
 * gradient: that treatment is reserved for one display heading per section,
 * and spending it on a row of five is what makes a stat strip look like
 * filler instead of the conditions someone is here to check.
 */
const METRICS = [
  { prefix: "1:", value: 2000, group: false, label: "Max leverage" },
  { value: 0.1, decimals: 1, suffix: " pips", label: "Spreads from" },
  { value: 150, suffix: "+", label: "Tradable instruments" },
  { prefix: "~", value: 20, suffix: "ms", label: "Average execution" },
  { text: "24/6", label: "Dedicated support" },
];

export function MetricsStrip() {
  return (
    <section
      aria-label="Key trading conditions"
      className="border-b border-line bg-surface"
    >
      <div className="container-x">
        <RevealGroup className="grid grid-cols-2 md:grid-cols-5">
          {METRICS.map((m, i) => (
            <RevealItem
              key={m.label}
              className={cn(
                "border-t border-line px-1 py-6 md:border-t-0 md:border-l md:px-6 md:py-8",
                "md:first:border-l-0 md:first:pl-0",
                // 5 items in a 2-col grid leaves a dangling cell: the last spans it.
                i === METRICS.length - 1 && "col-span-2 md:col-span-1"
              )}
            >
              <p className="text-[12.5px] leading-none text-muted">{m.label}</p>
              <p className="tnum mt-2.5 text-[clamp(26px,2.7vw,36px)] leading-none font-semibold tracking-[-0.035em] text-ink">
                {m.text ?? (
                  <CountUp
                    value={m.value}
                    decimals={m.decimals ?? 0}
                    prefix={m.prefix ?? ""}
                    suffix={m.suffix ?? ""}
                    group={m.group ?? true}
                  />
                )}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
