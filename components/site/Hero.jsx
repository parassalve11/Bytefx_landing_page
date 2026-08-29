"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InstrumentIcon } from "@/components/ui/asset-icon";
import OrbitImages from "@/components/ui/OrbitImages";

/**
 * Hero — one claim on the blue band.
 *
 * The band is deliberately empty apart from the copy and the orbit.
 * Everything the page has to prove is proved further down: `Ticker` streams
 * live quotes directly below this, `Conditions` prints 1:2000, 0.1 pips,
 * 150+, ~20ms and 24/6, and `FinalCta` closes with the risk warning. This
 * section's only job is to state the claim and put two buttons under it.
 *
 * ## The background
 *
 * The same treatment as the "ByteFX Enhanced Trading Tools" card in
 * `TradingShowcase` — `linear-gradient(150deg, #2f66d1, #0c2c78)` under a
 * 42px white grid at 16% — lifted into `globals.css` as `hero-tools` /
 * `hero-tools-grid` so the two surfaces cannot drift apart. Over it sit
 * `hero-scrim` (contrast for the white type) and `hero-bloom` (one green
 * light low in the frame, so the CTA is not the only green pixel).
 *
 * This replaced a full-bleed aurora photograph. The photograph was a
 * licensed stock frame with nothing to do with the product, it was ~440 KB
 * on the LCP element, and it needed a heavy scrim to keep the H1 legible.
 * The gradient costs nothing, is on-brand by construction, and leaves the
 * frame clear for the orbit.
 *
 * This is still the only dark band on the site. Everything below is the
 * white / `alt` alternation, and the hard edge at the foot of this section
 * is the page's first and strongest contrast — do not soften it with a
 * border. The bottom of `hero-scrim` is what stops the blue meeting the
 * white `Ticker` as a bright seam.
 *
 * ## The orbit
 *
 * React Bits' `OrbitImages`, orbiting the site's own `InstrumentIcon` coin
 * discs rather than files — eight instruments drawn from the four asset
 * classes named in the eyebrow, so the ring is the product line rather than
 * abstract decoration. Two rings counter-rotating at different radii read as depth;
 * one ring reads as a carousel.
 *
 * It is `aria-hidden` inside the component and `pointer-events-none` here:
 * it sits behind the copy, and nothing in it is reachable or announced.
 * Under `prefers-reduced-motion` the component parks the discs where they
 * are instead of hiding them, so the composition still holds.
 *
 * ## Motion
 *
 * Nothing here is a signature moment. The copy rises once on load and the
 * orbit turns slowly; both are off under `prefers-reduced-motion`, enforced
 * here and in `globals.css`.
 *
 * ## Open
 *
 * The regulator chip is **not** included: ByteFX Capital Ltd's licence
 * details need the same compliance sign-off the Trust section items are
 * badged for. Add it to `CHIPS` once legal confirms the entity and number —
 * the row is built for four and currently carries three.
 */

const CHIPS = ["MetaTrader 5", "$20 minimum deposit", "24/6 support"];

/**
 * Eight instruments covering every asset class named in the eyebrow — three
 * majors, both metals, both crypto and one index — so the ring says the same
 * thing the line does.
 * Every symbol here resolves to a real mark in `InstrumentIcon`; anything it
 * does not know falls back to a wordmark disc, which is why these are picked
 * from its table rather than at random.
 */
const OUTER_RING = ["EUR/USD", "XAU/USD", "BTC/USD", "GBP/USD", "NAS100"];
const INNER_RING = ["USD/JPY", "ETH/USD", "XAG/USD"];

const EASE = [0.22, 1, 0.36, 1];

/** Above-the-fold entry: plays on load, not on scroll. */
function Rise({ delay = 0, y = 20, className, children, as = "div" }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] ?? motion.div;

  if (reduced) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * `InstrumentIcon` is sized by its `size` prop, not by CSS: `PairCoin` builds
 * a fixed pair of overlapping flag discs and ignores width utilities entirely.
 * So the ring picks a named size and the orbit's `itemSize` is set to leave a
 * margin around it — `lg` and `md` are both ~56px and ~44px across, whichever
 * branch of `InstrumentIcon` a symbol lands in.
 */
function ring(symbols, size) {
  return symbols.map((symbol) => (
    <InstrumentIcon key={symbol} symbol={symbol} size={size} />
  ));
}

export function Hero() {
  return (
    /* The negative top margin pulls the band up behind the sticky navbar,
       whose shell is a floating white pill on a transparent header. Without
       it the band starts 84px down the page and the pill sits on a strip of
       bare canvas — the one place on the site where the header is meant to
       be floating over something. Keep the padding equal to the margin: it
       is what puts the content back where it belongs. */
    <section className="relative -mt-[84px] flex min-h-[640px] items-center overflow-hidden pt-[84px] text-white md:min-h-[88vh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-tools absolute inset-0" />
        <div className="hero-tools-grid absolute inset-0" />

        {/* The orbit sits between the grid and the scrim, so the scrim's
            centre radial dims the discs that pass behind the headline and
            leaves the ones out at the edges bright. That is the whole reason
            the copy stays readable with objects moving under it.

            Sized off the viewport width and floored, so the ellipse still
            clears the copy column on a phone instead of collapsing into it.
            `baseWidth` is the component's design space, not a pixel size —
            `responsive` scales the whole thing to the box below. */}
        <div className="absolute top-1/2 left-1/2 w-[min(1500px,168vw)] -translate-x-1/2 -translate-y-1/2">
          <OrbitImages
            className="hero-orbit"
            items={ring(OUTER_RING, "lg")}
            shape="ellipse"
            radiusX={620}
            radiusY={272}
            rotation={-8}
            duration={46}
            itemSize={84}
            responsive
          />
          <div className="absolute inset-0">
            <OrbitImages
              className="hero-orbit"
              items={ring(INNER_RING, "md")}
              shape="ellipse"
              radiusX={470}
              radiusY={205}
              rotation={-8}
              duration={34}
              direction="reverse"
              itemSize={66}
              responsive
            />
          </div>
        </div>

        <div className="hero-scrim absolute inset-0" />
        <div className="hero-bloom absolute inset-0" />
      </div>

      <div className="container-x relative py-20 md:py-24">
        <div className="mx-auto max-w-[860px] text-center">
          <Rise
            as="p"
            className="text-[11px] font-semibold tracking-[0.22em] text-white/60 uppercase"
          >
            Forex · Metals · Indices · Crypto
          </Rise>

          {/* Weight, not colour, carries the emphasis: headings on this site
              are solid by rule, and 300 against 700 in Poppins is a wider
              contrast than any tint would have given anyway. */}
          <Rise as="h1" delay={0.08} className="h-display mt-6 text-white">
            <span className="block font-light text-white/90">Discover your</span>
            <span className="block">trading edge</span>
          </Rise>

          <Rise
            as="p"
            delay={0.16}
            className="text-balance-i mx-auto mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-white/80"
          >
            One account for forex, metals, indices and crypto, on MetaTrader 5.
            Open it in minutes and fund it instantly.
          </Rise>

          <Rise
            delay={0.24}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <Button href="/signup" size="lg" arrow className="w-full sm:w-auto">
              Open live account
            </Button>
            <Button
              href="/demo"
              variant="onDark"
              size="lg"
              className="w-full sm:w-auto"
            >
              Try demo
            </Button>
          </Rise>

          {/* Three chips, room for four. The fourth is the regulator — it
              ships when compliance confirms the entity and licence number,
              not before. */}
          <Rise
            delay={0.3}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {CHIPS.map((chip) => (
              <span
                key={chip}
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/75"
              >
                <Check className="h-3.5 w-3.5 text-[#a8f55b]" strokeWidth={3} />
                {chip}
              </span>
            ))}
          </Rise>
        </div>
      </div>
    </section>
  );
}
