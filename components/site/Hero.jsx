import Image from "next/image";
import { Headphones, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * The landing-page hero shares its blue gradient, grid, scrim and bloom with
 * the trading-tools card and interior page heroes. Its copy stays centred so
 * the claim and actions remain the focus without decorative side artwork.
 */

function Rise({ delay = 0, y = 20, className, children, as = "div" }) {
  const Tag = as;

  return (
    <Tag
      className={`hero-rise ${className ?? ""}`}
      style={{
        "--hero-rise-delay": `${delay}s`,
        "--hero-rise-y": `${y}px`,
      }}
    >
      {children}
    </Tag>
  );
}

function ProofPuck({ children }) {
  return (
    <span
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_5px_16px_rgba(1,6,26,0.16)]"
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
        <span className="block whitespace-nowrap text-[13px] font-semibold text-white">
          {value}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[10.5px] font-medium text-white/65">
          {label}
        </span>
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section className="relative -mt-[84px] flex min-h-[640px] items-center overflow-hidden pt-[84px] text-white md:min-h-[88vh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-tools absolute inset-0" />
        <div className="hero-tools-grid absolute inset-0" />
        <div className="hero-scrim absolute inset-0" />
        <div className="hero-bloom absolute inset-0" />
      </div>

      <div className="container-x relative z-10 w-full py-20 md:py-24">
        <div className="mx-auto max-w-[860px] text-center">
          <Rise as="h1" delay={0.08} className="h-display text-balance-i">
            <span className="block font-light text-white/75">
              Discover your
            </span>
            <span className="block text-white">trading edge</span>
          </Rise>

          <Rise
            as="p"
            delay={0.16}
            className="text-balance-i mx-auto mt-6 max-w-[560px] text-[16.5px] leading-relaxed text-white/75"
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
              size="lg"
              variant="onDark"
              className="w-full sm:w-auto"
            >
              Try demo
            </Button>
          </Rise>

          <Rise
            delay={0.3}
            className="mx-auto mt-9 flex max-w-[640px] flex-wrap items-center justify-center gap-2.5"
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
