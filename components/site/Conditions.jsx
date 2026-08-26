"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";

/**
 * Trading conditions — replaces the old `MetricsStrip`, and sits under Markets.
 *
 * The strip rendered the same five numbers as hairline-separated columns. That
 * was right when it sat directly under the hero and had to stay quiet; as a
 * section in its own right it read as a footer that had drifted up the page.
 * These are the five things somebody actually compares between brokers, so
 * they get room to be compared — and they sit under Markets rather than under
 * the hero, because the numbers land better once the reader knows what is
 * being traded.
 *
 * ── Geometry, measured off the reference rather than guessed ──────────────
 *
 * `ref/image.png` (XTB's "Choose your way to understand the market") was
 * measured directly: the card is 711 × 314 in an 869-wide frame. That is
 * **82% of the frame width at a 2.26:1 aspect**, with the art occupying ~44%
 * of the card's width and ~91% of its height, and the next card peeking in at
 * the right edge. Those three numbers are what make it read as a big card.
 *
 * The first attempt here used `(100%-2rem)/2.4` — a 41% card with 240px art,
 * less than half the reference in both dimensions, which is why it looked
 * like a tile rather than a panel. **If this is ever re-tuned, keep the card
 * at ~82% and the art above 360px.** The size *is* the design; shrink either
 * and it stops being this section.
 *
 * ── Fills are FLAT ────────────────────────────────────────────────────────
 *
 * No gradient, no sheen, no texture. A gradient plate and a milled sheen were
 * both tried and removed: the renders are already high-gloss chrome and gold,
 * and a gradient behind them reads as a second, disagreeing light source.
 *
 * The tint agrees with the render standing on it rather than being assigned
 * arbitrarily — gold cluster on real metallic gold, steel caliper on
 * platinum, blue-lit scale on ByteFX blue, green headset on ByteFX green,
 * and the orange-lit stopwatch on a clear yellow. Light fills use dark copy
 * so each card keeps comfortable contrast.
 *
 * Unlike the reference, whose cards are all one grey, these five carry five
 * tints. XTB's three items are variations on one theme (courses / news /
 * analysis); leverage, spread, breadth, speed and support are five unrelated
 * quantities, and the colour is what stops them blurring together.
 *
 * ── The cursor ────────────────────────────────────────────────────────────
 *
 * Scroll-snap does the actual paging, so the track stays a plain scrollable
 * region: trackpad, swipe, scrollbar and keyboard all work whether or not the
 * JS below ever runs. The cursor is a control over that, not a replacement.
 */
const CONDITIONS = [
  {
    id: "leverage",
    label: "Max leverage",
    figure: "1:2000",
    copy: "Control a position up to two thousand times your margin, on eligible instruments.",
    image: "/assets/2nd_section/image1.webp",
    alt: "A balance scale weighing stacked coins against a rising chart",
    bg: "var(--brand)",
    ink: "light",
  },
  {
    id: "spreads",
    label: "Spreads from",
    figure: "0.1 pips",
    copy: "Variable pricing that tracks the underlying market instead of a fixed markup.",
    image: "/assets/2nd_section/image2.webp",
    alt: "A precision caliper measuring a narrow illuminated gap",
    bg: "#E5E4E2",
    ink: "dark",
  },
  {
    id: "instruments",
    label: "Tradable instruments",
    figure: "150+",
    copy: "Forex, indices, crypto, shares, metals and energy — one balance, one margin pool.",
    image: "/assets/2nd_section/image3.webp",
    alt: "Gold bars, a currency panel, a candlestick chart, an oil barrel, a globe and a Bitcoin coin",
    bg: "#D4AF37",
    ink: "dark",
  },
  {
    id: "execution",
    label: "Average execution",
    figure: "~20ms",
    copy: "From the click to the confirmation, measured across our own bridge.",
    image: "/assets/2nd_section/image4.webp",
    alt: "A stopwatch trailing motion streaks",
    bg: "#FFD600",
    ink: "dark",
  },
  {
    id: "support",
    label: "Dedicated support",
    figure: "24/6",
    copy: "A real person from the Sydney open to the New York close, every trading day.",
    image: "/assets/2nd_section/image5.webp",
    alt: "A support headset behind a shield with a message bubble",
    bg: "var(--go)",
    ink: "dark",
  },
];

/** How long a card holds before the cursor advances. */
const DWELL_MS = 5000;

export function Conditions() {
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const goTo = useCallback(
    (i, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.children[i];
      if (!card) return;
      track.scrollTo({
        left: card.offsetLeft - track.offsetLeft,
        behavior: smooth && !reduced ? "smooth" : "auto",
      });
    },
    [reduced]
  );

  // Scroll position is the source of truth for which card is active, so a
  // manual swipe and an automatic advance update the cursor through the same
  // path and can never disagree.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const i = Array.prototype.indexOf.call(track.children, entry.target);
          if (i >= 0) setActive(i);
        }
      },
      { root: track, threshold: 0.55 }
    );

    for (const child of track.children) observer.observe(child);
    return () => observer.disconnect();
  }, []);

  // Auto-advance. Never runs under reduced motion — a carousel that moves on
  // its own is exactly what that setting is asking us not to do.
  useEffect(() => {
    if (reduced || paused) return;
    const id = setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % CONDITIONS.length;
        goTo(next);
        return next;
      });
    }, DWELL_MS);
    return () => clearInterval(id);
  }, [reduced, paused, goTo]);

  const hold = () => setPaused(true);
  const release = () => setPaused(false);

  return (
    <Section
      id="conditions"
      title="Every number that moves your P&L."
      lead="Leverage, spread, breadth, speed and support. These are the five things worth comparing before you open an account anywhere — so here they are, with nothing rounded in our favour."
    >
      <div
        onMouseEnter={hold}
        onMouseLeave={release}
        onFocusCapture={hold}
        onBlurCapture={release}
        onTouchStart={hold}
      >
        {/* The negative margin lets a card bleed to the viewport edge on small
            screens while the padding keeps the first one aligned to the grid. */}
        <div
          ref={trackRef}
          role="group"
          aria-label="Trading conditions"
          tabIndex={0}
          className={cn(
            "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2",
            "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          )}
        >
          {CONDITIONS.map((c, i) => (
            <article
              key={c.id}
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${CONDITIONS.length}: ${c.label} ${c.figure}`}
              style={{ backgroundColor: c.bg }}
              className={cn(
                "relative shrink-0 snap-start overflow-hidden rounded-[28px]",
                // 82% on desktop is the reference proportion, and it is what
                // leaves the next card peeking at the right edge.
                "w-[88vw] sm:w-[74vw] lg:w-[82%]"
              )}
            >
              <div
                className={cn(
                  "flex flex-col gap-8 p-8 sm:p-10",
                  "lg:min-h-[460px] lg:flex-row lg:items-center lg:gap-12 lg:p-14"
                )}
              >
                <div className="lg:w-[46%] lg:shrink-0">
                  <p
                    className={cn(
                      "text-[12.5px] leading-none font-semibold tracking-[0.07em] uppercase",
                      c.ink === "dark" ? "text-ink/60" : "text-white/60"
                    )}
                  >
                    {c.label}
                  </p>
                  <p
                    className={cn(
                      "tnum mt-4 text-[clamp(44px,5.4vw,68px)] leading-[0.95] font-bold tracking-[-0.04em]",
                      c.ink === "dark" ? "text-ink" : "text-white"
                    )}
                  >
                    {c.figure}
                  </p>
                  <p
                    className={cn(
                      "mt-5 max-w-[30rem] text-[15.5px] leading-relaxed",
                      c.ink === "dark" ? "text-ink/75" : "text-white/75"
                    )}
                  >
                    {c.copy}
                  </p>
                </div>

                {/* The render is the card's whole visual argument, so it gets
                    the larger half of the space. Below 360px it stops reading
                    as product art and starts reading as an icon. */}
                <div className="mx-auto w-[64%] max-w-[300px] lg:mx-0 lg:w-auto lg:max-w-none lg:flex-1">
                  <Image
                    src={c.image}
                    alt={c.alt}
                    width={620}
                    height={620}
                    sizes="(max-width: 1024px) 64vw, 400px"
                    className="mx-auto h-auto w-full drop-shadow-[0_26px_40px_rgba(0,0,0,0.45)] lg:max-w-[400px]"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* The cursor. The active card is a bar rather than a dot so the
            control reads as a position along a run, not as five equal
            options — which is what it is. */}
        <div className="mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-2 shadow-sm">
            {CONDITIONS.map((c, i) => {
              const on = i === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-label={`Show ${c.label}`}
                  aria-current={on ? "true" : undefined}
                  onClick={() => {
                    setActive(i);
                    goTo(i);
                  }}
                  className="group grid h-5 place-items-center px-0.5"
                >
                  <span
                    className={cn(
                      "block h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      on
                        ? "w-8 bg-ink"
                        : "w-1.5 bg-line-strong group-hover:bg-muted"
                    )}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Section>
  );
}
