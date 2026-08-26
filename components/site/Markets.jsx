"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * The bento is 6 columns wide at xl:
 *
 *   [ Forex ................ 4 ][ Indices .. 2 ]
 *   [ Crypto .. 2 ][ Stocks .. 2 ][ Metals .. 2 ]
 *
 * Forex leads because it is the house product and the only tile carrying
 * motion. The other five are equal weight — breadth is the message here, so
 * nothing else gets to shout.
 *
 * The platinum lives on the TILE, not on the section and not in a separate
 * well behind the artwork. The marks are dark steel cut out on transparency:
 * they need a metal surface to sit on or they read as stickers, and a card is
 * the right size for that surface. Flooding the whole section instead would
 * drop a slab of mid-grey into a page whose entire hierarchy is the white/alt
 * alternation — so the section keeps only a whisper of the same cool cast.
 */

const MARKETS = [
  {
    id: "indices",
    title: "Indices",
    count: "12+ global indices",
    description: "S&P 500, Nasdaq 100, Dow and FTSE — spot and futures.",
    image: "/assets/indices.png",
    width: 1254,
    height: 1254,
    alt: "S&P 500, Nasdaq 100, Dow Jones and FTSE 100 index medallions",
    delay: "0s",
  },
  {
    id: "crypto",
    title: "Crypto",
    count: "25+ crypto CFDs",
    description: "Bitcoin, Ethereum, Solana and Tether, around the clock.",
    image: "/assets/CrypoCurrency.png",
    width: 1254,
    height: 1254,
    alt: "Bitcoin, Ethereum, Solana and Tether coins",
    delay: "-2.4s",
  },
  {
    id: "stocks",
    title: "Stocks",
    count: "500+ share CFDs",
    description: "Long or short on the largest US, UK and European names.",
    image: "/assets/stocks_metal.png",
    width: 830,
    height: 582,
    alt: "Apple, NVIDIA, Tesla, Google and Meta company marks",
    // Wider than it is tall, so it gets its own width to stay optically the
    // same size as the four square marks.
    markClassName: "w-[62%] max-w-[232px] bottom-7 dark:brightness-[1.55]",
    delay: "-4.8s",
  },
  {
    id: "commodities",
    title: "Metals & Energy",
    count: "XAU, XAG, WTI & Brent",
    description: "Gold, silver, crude and natural gas at institutional pricing.",
    image: "/assets/gold_and_sliver.png",
    width: 1254,
    height: 1254,
    alt: "Gold bar, silver bar and crude oil medallions",
    delay: "-1.2s",
  },
];

/**
 * One tile. The platinum surface, the hairline and the lift all live here so
 * every tile is milled the same way. Hover is the lift and the shadow only —
 * the plate no longer takes a specular sweep across it, which read as glare
 * on a card that already carries a gradient, a grain and a floating mark.
 */
function Tile({ href, label, className, children }) {
  return (
    <a
      href={href}
      aria-label={label}
      className={cn(
        "market-tile platinum-plate group/tile relative isolate flex h-full flex-col overflow-hidden rounded-[1.6rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(1,6,26,0.05),0_18px_44px_-26px_rgba(1,6,26,0.32)] transition-[transform,box-shadow] duration-300 ease-out outline-none hover:-translate-y-1 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.95),inset_0_0_0_1px_rgba(1,6,26,0.06),0_30px_62px_-28px_rgba(1,6,26,0.42)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
        className
      )}
    >
      <div className="platinum-grain pointer-events-none absolute inset-0 -z-10 opacity-25 mix-blend-overlay" />
      {children}
    </a>
  );
}

/** The circular affordance the reference parks in the bottom-left corner. */
function TileArrow({ className }) {
  return (
    <span
      className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand/15 bg-surface/85 text-brand shadow-xs backdrop-blur-sm transition-all duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:border-brand-solid group-hover/tile:bg-brand-solid group-hover/tile:text-white",
        className
      )}
    >
      <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
    </span>
  );
}

/**
 * Forex is the one moving mark on the page.
 *
 * The clip is opaque — H.264 carries no alpha — so the black studio backdrop
 * it shipped on is luma-keyed out and re-composited onto the plate tone at
 * build time (the recipe is in README). It therefore sits in its own recessed
 * well instead of floating free like the four still marks.
 *
 * It fetches only once it scrolls into view and pauses again on the way out;
 * the poster covers the gap so the well is never an empty grey box. Under
 * reduced motion the poster is all anyone ever sees.
 */
function ForexMark() {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.2 }
    );

    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden plate-well rounded-[1.1rem] shadow-[inset_0_0_0_1px_rgba(1,6,26,0.06),inset_0_2px_6px_rgba(1,6,26,0.06)]">
      <video
        ref={ref}
        src="/assets/forex_coins.webm"
        poster="/assets/forex_coins_poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        className="h-full w-full object-contain transition-transform duration-500 ease-out group-hover/tile:scale-[1.04]"
      />
    </div>
  );
}

function MarketTile({ market }) {
  return (
    <RevealItem as="li" className="min-w-0 list-none xl:col-span-2">
      <Tile
        href={`/markets/${market.id}`}
        label={`Explore ${market.title}`}
        className="min-h-[340px] p-6"
      >
        <div className="relative z-10 max-w-[54%]">
          <h3 className="text-[22px] leading-tight font-bold tracking-[-0.025em] text-ink">
            {market.title}
          </h3>
          <p className="tnum mt-1 text-[11.5px] font-semibold tracking-[0.035em] text-brand uppercase">
            {market.count}
          </p>
          <p className="mt-3 text-[13px] leading-relaxed text-body">
            {market.description}
          </p>
        </div>

        <Image
          src={market.image}
          alt={market.alt}
          width={market.width}
          height={market.height}
          sizes="(min-width: 1280px) 220px, (min-width: 768px) 24vw, 46vw"
          className={cn(
            "metal-float pointer-events-none absolute right-1 bottom-2 z-0 h-auto w-[50%] max-w-[190px] transition-transform duration-500 ease-out group-hover/tile:scale-[1.06]",
            market.markClassName
          )}
          style={{ "--float-delay": market.delay }}
        />

        <TileArrow className="relative z-10 mt-auto" />
      </Tile>
    </RevealItem>
  );
}

function ForexTile() {
  return (
    <RevealItem as="li" className="min-w-0 list-none md:col-span-2 xl:col-span-4">
      <Tile
        href="/markets/forex"
        label="Explore Forex"
        className="min-h-[340px] sm:flex-row sm:items-stretch"
      >
        <div className="relative z-10 flex flex-1 flex-col justify-center p-6 sm:py-8 sm:pr-0 sm:pl-8">
          <h3 className="text-[32px] leading-[1.04] font-bold tracking-[-0.03em] text-ink md:text-[40px]">
            Forex
          </h3>
          <p className="tnum mt-2 text-[12px] font-semibold tracking-[0.035em] text-brand uppercase">
            70+ currency pairs
          </p>
          <p className="mt-4 max-w-xs text-[14.5px] leading-relaxed text-body">
            Majors, minors and exotics with spreads from 0.0 pips, deep liquidity
            and execution measured in milliseconds.
          </p>
          {/* <Button
            as="span"
            variant="ghost"
            size="md"
            arrow
            className="mt-7 self-start bg-surface/90 group-hover/tile:border-brand group-hover/tile:text-brand"
          >
            Start trading
          </Button> */}
        </div>

        <div className="pointer-events-none relative z-0 aspect-square w-full shrink-0 self-center p-4 sm:aspect-auto sm:w-[44%] sm:max-w-[320px] sm:self-stretch sm:py-5 sm:pr-5">
          <ForexMark />
        </div>
      </Tile>
    </RevealItem>
  );
}

export function Markets() {
  return (
    <Section
      id="markets"
      className="platinum-wash border-y border-line"
      title={
        <>
          One platform.{" "}
          <span className="text-gradient-brand">Every major market.</span>
        </>
      }
      lead="Forex, indices, crypto, shares, metals and energy from a single MetaTrader 5 account—one balance, one margin pool, one login."
      aside={
        <Button href="/markets" size="md" arrow>
          Explore all instruments
        </Button>
      }
    >
      <RevealGroup
        as="ul"
        className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 xl:grid-cols-6"
      >
        <ForexTile />
        {MARKETS.map((market) => (
          <MarketTile key={market.id} market={market} />
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-6 text-center text-[13.5px] text-muted">
        Spreads, swaps and margin requirements for every instrument are listed in
        the{" "}
        <a
          href="/markets"
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          full contract specification
        </a>
        .
      </Reveal>
    </Section>
  );
}
