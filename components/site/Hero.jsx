"use client";

import Image from "next/image";
import { Headphones, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero
 *
 * Platinum/light version of the ByteFX hero.
 *
 * Important:
 * - Existing hero content is unchanged.
 * - Existing CTA structure is unchanged.
 * - Existing proof badges are unchanged in content.
 * - Old blue/grid/orbit background has been removed.
 * - Gold coin artwork comes directly from:
 *   /public/assets/hero/left-side.png
 * - Coin artwork stays on the right side of the hero.
 */


/* -------------------------------------------------------------------------- */
/* Hero entrance animation wrapper                                             */
/* -------------------------------------------------------------------------- */

function Rise({
  delay = 0,
  y = 20,
  className,
  children,
  as = "div",
}) {
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


/* -------------------------------------------------------------------------- */
/* Proof badge icon container                                                  */
/* -------------------------------------------------------------------------- */

function ProofPuck({ children }) {
  return (
    <span
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-black/[0.045]
        bg-white
        shadow-[0_5px_16px_rgba(15,23,42,0.08)]
      "
      aria-hidden="true"
    >
      {children}
    </span>
  );
}


/* -------------------------------------------------------------------------- */
/* Proof badge                                                                 */
/* -------------------------------------------------------------------------- */

function ProofBadge({ icon, value, label }) {
  return (
    <span
      className="
        inline-flex
        min-h-14
        items-center
        gap-2.5
        rounded-2xl
        border
        border-black/[0.045]
        bg-white/65
        py-2
        pr-4
        pl-2.5
        text-left
        shadow-[0_8px_28px_rgba(15,23,42,0.055)]
        backdrop-blur-xl
      "
    >
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
        <span
          className="
            block
            whitespace-nowrap
            text-[13px]
            font-semibold
            text-[#344054]
          "
        >
          {value}
        </span>

        <span
          className="
            mt-1
            block
            whitespace-nowrap
            text-[10.5px]
            font-medium
            text-[#667085]
          "
        >
          {label}
        </span>
      </span>
    </span>
  );
}


/* -------------------------------------------------------------------------- */
/* Hero                                                                        */
/* -------------------------------------------------------------------------- */

export function Hero() {
  return (
    <section
      className="
        relative
        -mt-[84px]
        flex
        min-h-[640px]
        items-center
        overflow-hidden
        pt-[84px]
        md:min-h-[88vh]
      "
    >
      {/* ------------------------------------------------------------------ */}
      {/* Platinum background                                                */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      >
        {/* Main platinum surface */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_48%_42%,#ffffff_0%,#fbfbfb_26%,#f5f6f7_57%,#e9ebee_100%)]
          "
        />

        {/* Main white center light */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(ellipse_at_46%_48%,rgba(255,255,255,1)_0%,rgba(255,255,255,0.72)_28%,rgba(255,255,255,0.12)_60%,transparent_78%)]
          "
        />

        {/* Soft left platinum depth */}
        <div
          className="
            absolute
            inset-y-0
            left-0
            w-[35%]
            bg-[radial-gradient(circle_at_left_center,rgba(218,222,227,0.42),transparent_68%)]
          "
        />

        {/* Soft right depth behind coins */}
        <div
          className="
            absolute
            inset-y-0
            right-0
            w-[34%]
            bg-[radial-gradient(circle_at_right_center,rgba(219,222,226,0.46),transparent_68%)]
          "
        />

        {/* Subtle lower platinum tone */}
        <div
          className="
            absolute
            inset-x-0
            bottom-0
            h-[38%]
            bg-gradient-to-t
            from-[#e7e9ec]/55
            via-[#f1f2f4]/20
            to-transparent
          "
        />

        {/* Extremely subtle top highlight */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-[30%]
            bg-gradient-to-b
            from-white/50
            to-transparent
          "
        />


        {/* --------------------------------------------------------------- */}
        {/* Gold coin asset                                                 */}
        {/* --------------------------------------------------------------- */}

        <div
          className="
            absolute
            z-[3]

            right-[-55px]
            top-[51%]

            w-[clamp(430px,32vw,620px)]

            -translate-y-1/2

            select-none

            xl:right-[-45px]

            lg:right-[-95px]
            lg:w-[500px]

            md:right-[-135px]
            md:w-[440px]

            max-md:right-[-165px]
            max-md:w-[390px]
            max-md:opacity-70

            max-sm:right-[-180px]
            max-sm:w-[330px]
            max-sm:opacity-30
          "
        >
          {/* Very soft shadow behind gold stack */}
          <div
            className="
              absolute
              left-[15%]
              top-[10%]
              h-[80%]
              w-[65%]
              rounded-full
              bg-black/[0.055]
              blur-[70px]
            "
          />

          <Image
            src="/assets/hero/left-side.png"
            alt=""
            width={1024}
            height={1536}
            priority
            sizes="
              (max-width: 640px) 330px,
              (max-width: 768px) 390px,
              (max-width: 1024px) 440px,
              (max-width: 1280px) 500px,
              620px
            "
            className="
              relative
              h-auto
              w-full
              object-contain
              drop-shadow-[0_20px_30px_rgba(91,61,5,0.12)]
            "
          />
        </div>
      </div>


      {/* ------------------------------------------------------------------ */}
      {/* Hero content                                                       */}
      {/* ------------------------------------------------------------------ */}

      <div
        className="
          container-x
          relative
          z-10
          py-20
          md:py-24
        "
      >
        <div className="mx-auto max-w-[860px] text-center">


          {/* -------------------------------------------------------------- */}
          {/* Heading                                                        */}
          {/* -------------------------------------------------------------- */}

          <Rise
            as="h1"
            delay={0.08}
            className="h-display"
          >
            <span
              className="
                block
                font-light
                text-[#3b4554]
              "
            >
              Discover your
            </span>

            <span
              className="
                block
                text-[#1458b8]
              "
            >
              trading edge
            </span>
          </Rise>


          {/* -------------------------------------------------------------- */}
          {/* Description                                                    */}
          {/* -------------------------------------------------------------- */}

          <Rise
            as="p"
            delay={0.16}
            className="
              text-balance-i
              mx-auto
              mt-6
              max-w-[560px]
              text-[16.5px]
              leading-relaxed
              text-[#465365]
            "
          >
            One account for forex, metals, indices and crypto, on MetaTrader 5.
            Open it in minutes and fund it instantly.
          </Rise>


          {/* -------------------------------------------------------------- */}
          {/* CTA buttons                                                    */}
          {/* -------------------------------------------------------------- */}

          <Rise
            delay={0.24}
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            <Button
              href="/signup"
              size="lg"
              arrow
              className="w-full sm:w-auto"
            >
              Open live account
            </Button>

            <Button
              href="/demo"
              size="lg"
              className="
                w-full
                border
                border-black/[0.055]
                bg-white/70
                text-[#344054]
                shadow-[0_8px_25px_rgba(15,23,42,0.055)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-black/[0.08]
                hover:bg-white
                hover:shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                sm:w-auto
              "
            >
              Try demo
            </Button>
          </Rise>


          {/* -------------------------------------------------------------- */}
          {/* Proof badges                                                   */}
          {/* -------------------------------------------------------------- */}

          <Rise
            delay={0.3}
            className="
              mx-auto
              mt-8
              flex
              max-w-[640px]
              flex-wrap
              items-center
              justify-center
              gap-2.5
            "
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