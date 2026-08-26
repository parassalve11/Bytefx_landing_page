"use client";

import { useEffect, useRef, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { InstrumentIcon } from "@/components/ui/asset-icon";
import { cn } from "@/lib/utils";

/**
 * Seed quotes. These render identically on server and client so there is no
 * hydration mismatch and no layout shift; ticking only starts after mount.
 *
 * Swap `useSimulatedFeed` for the real quote socket when it is available —
 * the contract is { symbol, price, change }. On a stale feed keep the last
 * price at 60% opacity; never render 0.00.
 */
const SEED = [
  { symbol: "EUR/USD", price: 1.0874, decimals: 4, change: 0.14 },
  { symbol: "XAU/USD", price: 2417.84, decimals: 2, change: 0.62 },
  { symbol: "BTC/USD", price: 76916.0, decimals: 0, change: -0.23 },
  { symbol: "GBP/USD", price: 1.2731, decimals: 4, change: -0.08 },
  { symbol: "US30", price: 41562.4, decimals: 1, change: 0.31 },
  { symbol: "NAS100", price: 21149.6, decimals: 1, change: 0.48 },
  { symbol: "USD/JPY", price: 154.219, decimals: 3, change: -0.17 },
  { symbol: "ETH/USD", price: 2913.55, decimals: 2, change: 1.06 },
  { symbol: "WTI", price: 71.42, decimals: 2, change: -0.44 },
  { symbol: "SPX500", price: 5734.9, decimals: 1, change: 0.19 },
];

function useSimulatedFeed() {
  const [quotes, setQuotes] = useState(SEED);
  const [flash, setFlash] = useState({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      const i = Math.floor(Math.random() * SEED.length);
      setQuotes((prev) =>
        prev.map((q, qi) => {
          if (qi !== i) return q;
          const drift = (Math.random() - 0.5) * (q.price * 0.0006);
          const next = q.price + drift;
          return {
            ...q,
            price: next,
            change: +(q.change + drift / q.price * 100).toFixed(2),
          };
        })
      );
      setFlash({ index: i, dir: Math.random() > 0.5 ? "up" : "down", at: Date.now() });
    }, 1800);

    return () => clearInterval(id);
  }, []);

  return { quotes, flash };
}

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

export function Ticker() {
  const { quotes, flash } = useSimulatedFeed();
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
