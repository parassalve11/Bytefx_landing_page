import Image from "next/image";
import { Headphones, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      className="landing-hero-puck flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

function ProofBadge({ icon, value, label }) {
  return (
    <span className="landing-hero-proof inline-flex min-h-14 items-center gap-2.5 rounded-2xl py-2 pr-4 pl-2.5 text-left">
      <ProofPuck>
        {icon === "mt5" ? (
          <Image
            src="/assets/mobile-section/meta-treader.webp"
            alt=""
            width={1254}
            height={1254}
            sizes="40px"
            className="h-8 w-8 object-contain"
          />
        ) : icon === "deposit" ? (
          <WalletCards className="h-[19px] w-[19px] text-brand" strokeWidth={2} />
        ) : (
          <Headphones className="h-[19px] w-[19px] text-brand" strokeWidth={2} />
        )}
      </ProofPuck>

      <span className="leading-none">
        <span className="landing-hero-proof-value block whitespace-nowrap text-[13px] font-semibold">
          {value}
        </span>
        <span className="landing-hero-proof-label mt-1 block whitespace-nowrap text-[10.5px] font-medium">
          {label}
        </span>
      </span>
    </span>
  );
}

/**
 * CSS selects the active day/night image, so the browser requests one hero
 * asset instead of downloading both. The artwork's quiet left third is kept
 * for the copy while the doorway remains the visual destination on the right.
 */
export function Hero() {
  return (
    <section className="landing-hero relative -mt-20 flex min-h-[100svh] items-center overflow-hidden pt-20 sm:-mt-[84px] sm:pt-[84px]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="landing-hero-art absolute inset-0" />
        <div className="landing-hero-scrim absolute inset-0" />
        <div className="landing-hero-glow absolute inset-0" />
      </div>

      <div className="container-x relative z-10 w-full py-20 md:py-24 lg:py-28">
        <div className="landing-hero-copy mx-auto max-w-[610px] text-center md:mx-0 md:text-left">
          {/* <Rise
            delay={0.04}
            className="landing-hero-eyebrow mx-auto inline-flex rounded-full px-3.5 py-1.5 text-[10.5px] font-semibold tracking-[0.11em] uppercase md:mx-0"
          >
            One account · Global markets
          </Rise> */}

          <Rise as="h1" delay={0.1} className="h-display mt-5 text-balance-i">
            <span className="landing-hero-title-soft block font-light">
              Discover your
            </span>
            <span className="block text-brand">trading edge</span>
          </Rise>

          <Rise
            as="p"
            delay={0.17}
            className="landing-hero-lead text-balance-i mx-auto mt-6 max-w-[560px] text-[16.5px] leading-relaxed md:mx-0"
          >
            One account for forex, metals, indices and crypto, on MetaTrader 5.
            Open it in minutes and fund it instantly.
          </Rise>

          <Rise
            delay={0.24}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start"
          >
            <Button href="/signup" size="lg" arrow className="w-full sm:w-auto">
              Open live account
            </Button>
            <Button
              href="/demo"
              size="lg"
              variant="ghost"
              className="landing-hero-secondary w-full sm:w-auto"
            >
              Try demo
            </Button>
          </Rise>

          <Rise
            delay={0.3}
            className="mt-8 flex max-w-[640px] flex-wrap items-center justify-center gap-2.5 md:justify-start"
          >
            <ProofBadge icon="mt5" value="MetaTrader 5" label="Trading platform" />
            <ProofBadge icon="deposit" value="$20 minimum" label="Opening deposit" />
            <ProofBadge icon="support" value="24/6 support" label="Help when markets move" />
          </Rise>
        </div>
      </div>
    </section>
  );
}
