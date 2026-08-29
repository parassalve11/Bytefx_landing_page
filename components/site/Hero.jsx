"use client";

import Image from "next/image";
import { Headphones, WalletCards } from "lucide-react";
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
 * discs rather than files. The outer ring carries the five company marks from
 * the stocks market and the inner ring carries four other traded markets. Two
 * counter-rotating rings read as depth rather than a carousel.
 *
 * It is `aria-hidden` inside the component and sits behind the copy, so none
 * of it is reachable or announced. Fine pointers get a small hover response;
 * there are deliberately no links on continuously moving targets.
 * Under `prefers-reduced-motion` the component parks the discs where they
 * are instead of hiding them, so the composition still holds.
 *
 * ## Motion
 *
 * Nothing here is a signature moment. The copy rises once on load and the
 * orbit turns slowly; both are off under `prefers-reduced-motion`, enforced
 * here and in `globals.css`.
 *
 * The proof row uses the same genuine MetaTrader mark as `MobileApp`; the
 * other two facts have their own pictograms instead of three repeated checks.
 * All three sit on restrained glass surfaces so they stay legible over the
 * moving orbit without turning into another CTA row.
 */

/**
 * Every symbol resolves to a real mark in `InstrumentIcon`. Stocks lead on the
 * larger ring because they are the visual requested for this hero; the smaller
 * ring keeps the wider product range visible without an explanatory eyebrow.
 */
const STOCK_RING = ["AAPL", "NVDA", "TSLA", "GOOGL", "META"];
const MARKET_RING = ["EUR/USD", "XAU/USD", "BTC/USD", "NAS100"];

/** Above-the-fold entry: plays on load, not on scroll. */
function Rise({ delay = 0, y = 20, className, children, as = "div" }) {
  const Tag = as;

  return (
    <Tag
      className={`hero-rise ${className ?? ""}`}
      style={{ "--hero-rise-delay": `${delay}s`, "--hero-rise-y": `${y}px` }}
    >
      {children}
    </Tag>
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
    <span
      key={symbol}
      className="hero-orbit-token"
      data-symbol={symbol.replace("/USD", "")}
    >
      <InstrumentIcon symbol={symbol} size={size} />
    </span>
  ));
}

function ProofPuck({ children }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-[inset_0_0_0_1px_rgba(1,6,26,0.08),0_5px_16px_rgba(1,6,26,0.18)]"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function ProofBadge({ icon, value, label }) {
  return (
    <span className="hero-proof inline-flex min-h-14 items-center gap-2.5 rounded-2xl py-2 pr-4 pl-2.5 text-left">
      <ProofPuck>
        {icon === "mt5" ? (
          <Image
            src="/assets/mobile-section/meta-treader.png"
            alt=""
            width={1254}
            height={1254}
            sizes="40px"
            className="h-8 w-8 object-contain"
          />
        ) : icon === "deposit" ? (
          <WalletCards
            className="h-[19px] w-[19px] text-brand"
            strokeWidth={2}
          />
        ) : (
          <Headphones
            className="h-[19px] w-[19px] text-brand"
            strokeWidth={2}
          />
        )}
      </ProofPuck>
      <span className="leading-none">
        <span className="block text-[13px] font-semibold whitespace-nowrap text-white">
          {value}
        </span>
        <span className="mt-1 block text-[10.5px] font-medium whitespace-nowrap text-white/60">
          {label}
        </span>
      </span>
    </span>
  );
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
            items={ring(STOCK_RING, "lg")}
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
              items={ring(MARKET_RING, "md")}
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
          {/* Weight, not colour, carries the emphasis: headings on this site
              are solid by rule, and 300 against 700 in Poppins is a wider
              contrast than any tint would have given anyway. */}
          <Rise as="h1" delay={0.08} className="h-display text-white">
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

          <Rise
            delay={0.3}
            className="mx-auto mt-8 flex max-w-[640px] flex-wrap items-center justify-center gap-2.5"
          >
            <ProofBadge
              icon="mt5"
              value="MetaTrader 5"
              label="Trading platform"
            />
            <ProofBadge
              icon="deposit"
              value="$20 minimum"
              label="Opening deposit"
            />
            <ProofBadge
              icon="support"
              value="24/6 support"
              label="Help when markets move"
            />
          </Rise>
        </div>
      </div>
    </section>
  );
}
