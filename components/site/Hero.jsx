"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Check, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Hero — "product proof", per the competitor pass in README.
 *
 * Six competitor heroes were read before this was designed (Pepperstone,
 * eToro, Deriv, IC Markets, Exness, OANDA). Five of the six put a stock
 * photograph or a promo graphic above the fold; only IC Markets shows
 * anything you could act on. So the differentiator here is the one thing
 * the category does not do: **show the product**.
 *
 * Three constraints the sections below impose, and the whole reason this
 * hero looks the way it does:
 *
 * 1. `Conditions` prints 1:2000, 0.1 pips, 150+, ~20ms and 24/6 further down
 *    the page. The hero must not restate them — the ticket *demonstrates*
 *    the fill time instead, which is the point. (That section used to sit
 *    directly under this one as `MetricsStrip`; it now follows Markets, but
 *    the constraint is unchanged — the numbers still belong to it.)
 * 2. `Ticker` now follows the hero directly, with live quotes, so a streaming
 *    price widget here would be the same idea twice in 900px. The ticket is
 *    static and fires once.
 * 3. `FinalCta` owns "Start trading in under five minutes" and the risk
 *    warning. The CTA labels deliberately match it — they bookend the page.
 *
 * The fill animation is a **third** signature moment, added to the two the
 * motion contract names (ticker flash, phone parallax). It is deliberate:
 * "orders fill in about 20ms" is the claim the whole positioning rests on,
 * and this is the only place on the page that shows it rather than saying
 * it. It runs once, never loops, and is fully skipped under reduced motion.
 *
 * Copy is written to what the live site already claims. The regulator chip
 * is **not** included: ByteFX Capital Ltd's licence details need the same
 * compliance sign-off the Trust section items are badged for. Add it to
 * CHIPS once legal confirms the entity and number — the row is built for
 * four and currently carries three.
 */

/* Fixed geometry — server and client render identically, so there is no
   hydration mismatch and no layout shift under the ticket. */
const SPARK = [
  18, 22, 19, 26, 24, 31, 28, 34, 30, 27, 33, 39, 36, 42, 38, 45, 43, 50, 47,
  55,
];

const BID = 2417.62;
const ASK = 2417.84;

const CHIPS = ["MetaTrader 5", "$20 minimum deposit", "24/6 support"];

function Sparkline() {
  const w = 260;
  const h = 56;
  const lo = Math.min(...SPARK);
  const hi = Math.max(...SPARK);
  const step = w / (SPARK.length - 1);
  const y = (v) => h - ((v - lo) / (hi - lo)) * (h - 6) - 3;
  const line = SPARK.map((v, i) => `${i * step},${y(v)}`).join(" ");

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      className="h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hero-spark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--up)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--up)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,${h} ${line} ${w},${h}`} fill="url(#hero-spark)" />
      <polyline
        points={line}
        fill="none"
        stroke="var(--up)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The ticket. Static quote, one-shot fill.
 *
 * `stage` goes idle → sending → filled on a timer started after mount, so
 * the server-rendered markup is always the idle state and hydration is
 * clean. Under reduced motion it mounts straight to `filled`: the
 * confirmation is information, the transition is the decoration.
 */
function ExecutionTicket() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState("idle");

  useEffect(() => {
    if (reduced) {
      setStage("filled");
      return;
    }
    const a = setTimeout(() => setStage("sending"), 900);
    const b = setTimeout(() => setStage("filled"), 1550);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [reduced]);

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-xl">
      {/* Instrument header */}
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div>
          <p className="text-[13.5px] font-semibold text-ink">XAU/USD</p>
          <p className="eyebrow mt-1">Gold &middot; spot</p>
        </div>
        <span className="tnum inline-flex items-center gap-1 rounded-md bg-up/10 px-2 py-1 text-[11.5px] font-semibold text-up">
          <TrendingUp className="h-3 w-3" strokeWidth={2.5} />
          +0.62%
        </span>
      </div>

      {/* Trend. Decorative — the numbers below carry the meaning. */}
      <div className="h-[56px] px-4 pt-3">
        <Sparkline />
      </div>

      {/* Two-sided quote */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-stretch gap-2 px-4 py-3">
        <div className="rounded-lg border border-line bg-alt px-3 py-2.5">
          <span className="eyebrow">Sell</span>
          <span className="tnum mt-1 block text-[17px] leading-none font-bold text-down">
            {BID.toFixed(2)}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center px-1">
          <span className="eyebrow">Spread</span>
          <span className="tnum mt-1 text-[13px] leading-none font-bold text-ink">
            {(ASK - BID).toFixed(2)}
          </span>
        </div>
        <div className="rounded-lg border border-brand-100 bg-brand-50 px-3 py-2.5">
          <span className="eyebrow text-brand/70">Buy</span>
          <span className="tnum mt-1 block text-[17px] leading-none font-bold text-up">
            {ASK.toFixed(2)}
          </span>
        </div>
      </div>

      {/* The payoff. Fixed height so the confirmation swapping in never
          shifts the card — that jump would undercut the point it makes. */}
      <div className="flex h-[52px] items-center border-t border-line bg-alt px-4">
        {stage === "filled" ? (
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full items-center justify-between gap-3"
          >
            <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-ink">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-go-50">
                <Check className="h-3 w-3 text-go-600" strokeWidth={3} />
              </span>
              Filled &middot; 0.10 lots
            </span>
            <span className="tnum text-[13px] font-bold text-go-600">19 ms</span>
          </motion.div>
        ) : (
          <span
            className={cn(
              "text-[13px] font-medium text-muted transition-opacity duration-300",
              stage === "sending" && "opacity-60"
            )}
          >
            {stage === "sending" ? "Sending order…" : "Market order · 0.10 lots"}
          </span>
        )}
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="arc-wash relative border-b border-line">
      <div className="container-x grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-16">
        {/* Copy */}
        <div>
          <Reveal as="h1" className="h-display max-w-[15ch] text-ink">
            Trade 150+ markets on infrastructure built for speed.
          </Reveal>

          <Reveal
            as="p"
            delay={0.05}
            className="mt-6 max-w-xl text-[17px] leading-relaxed text-balance-i text-body"
          >
            MetaTrader 5 on ByteFX servers, priced from raw spreads. One
            account covers forex, metals, indices, crypto and share CFDs
            &mdash; and opens with $20.
          </Reveal>

          <Reveal delay={0.1} className="mt-9 flex flex-wrap gap-3">
            <Button href="/signup" size="lg" arrow>
              Open live account
            </Button>
            <Button href="/demo" variant="ghost" size="lg">
              Try demo
            </Button>
          </Reveal>

          {/* Trust row. Above the fold on every competitor read; ByteFX had
              none. Kept to what the site can already substantiate. */}
          <Reveal
            delay={0.15}
            className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1.5"
          >
            {CHIPS.map((c, i) => (
              <span
                key={c}
                className="flex items-center gap-2 text-[13px] font-medium text-body"
              >
                {c}
                {i < CHIPS.length - 1 && (
                  <span aria-hidden="true" className="text-line-strong">
                    &middot;
                  </span>
                )}
              </span>
            ))}
          </Reveal>
        </div>

        {/* Product. Below lg it drops under the copy rather than beside it —
            a 440px ticket squeezed into a phone column reads as a graphic,
            not as software. */}
        <Reveal delay={0.1} y={16} className="w-full">
          <ExecutionTicket />
        </Reveal>
      </div>
    </section>
  );
}
