"use client";

import { useRef, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { InstrumentIcon } from "@/components/ui/asset-icon";
import { TICKER_SEED, useQuoteFeed } from "@/lib/quotes";
import { cn } from "@/lib/utils";

function Quote({ q, flashing }) {
  const up = q.change >= 0;
  const Icon = up ? TrendingUp : TrendingDown;

  return (
    <div className="flex shrink-0 items-center gap-2.5 px-5">
      <InstrumentIcon symbol={q.symbol} size="sm" />
      <span className="text-[12.5px] font-semibold text-ink">{q.symbol}</span>
      <span
        className={cn(
          "tnum rounded px-1 text-[12.5px] text-body",
          flashing === "up" && "tick-up",
          flashing === "down" && "tick-down"
        )}
      >
        {q.price.toLocaleString("en-US", {
          minimumFractionDigits: q.decimals,
          maximumFractionDigits: q.decimals,
        })}
      </span>
      <span
        className={cn(
          "tnum inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11.5px] font-semibold",
          up ? "bg-up/8 text-up" : "bg-down/8 text-down"
        )}
      >
        <Icon className="h-3 w-3" strokeWidth={2.6} />
        {up ? "+" : ""}
        {q.change.toFixed(2)}%
      </span>
    </div>
  );
}

/**
 * The seed and the random walk moved to `lib/quotes.js` when the market pages
 * needed the same feed. The socket that replaces it replaces it for both —
 * see the TODO there, not here.
 */
export function Ticker() {
  const { quotes, flash } = useQuoteFeed(TICKER_SEED);
  const [paused, setPaused] = useState(false);
  const liveRef = useRef(null);

  return (
    <div
      className="marquee-host relative overflow-hidden border-b border-line bg-canvas/75 backdrop-blur-xl backdrop-saturate-150"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge fades so items do not hard-cut at the viewport border. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-canvas to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-canvas to-transparent" />

      <div
        ref={liveRef}
        aria-label="Live market prices"
        className="flex h-12 items-center"
      >
        <div
          className="marquee-track flex w-max items-center"
          data-paused={paused ? "true" : "false"}
          style={{ "--marquee-duration": "48s" }}
        >
          {/* Duplicated once so the -50% translate loops seamlessly. */}
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center" aria-hidden={copy === 1}>
              {quotes.map((q, i) => (
                <Quote
                  key={`${copy}-${q.symbol}`}
                  q={q}
                  flashing={
                    copy === 0 && flash.index === i ? flash.dir : undefined
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
