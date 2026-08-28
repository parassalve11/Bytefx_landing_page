"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Hero — one claim on a night sky.
 *
 * The band is deliberately empty apart from the copy. Everything the page
 * has to prove is proved further down: `Ticker` streams live quotes
 * directly below this, `Conditions` prints 1:2000, 0.1 pips, 150+, ~20ms
 * and 24/6, and `FinalCta` closes with the risk warning. This section's
 * only job is to state the claim and put two buttons under it, so nothing
 * else is allowed in the frame.
 *
 * ## The photograph
 *
 * `public/assets/hero/aurora.jpg` — an aurora over a treeline, by Federico
 * Di Dio (@didiofederico_photographer) on Unsplash, free for commercial use
 * under the Unsplash Licence, no attribution required. Master is downscaled
 * to 2000px / q60 (440 KB); `next/image` serves the derivatives.
 *
 * It was picked over a dozen others for one reason: it is already the
 * ByteFX palette. Deep blue-teal sky, emerald curtains — `#1356be` and
 * `#4cd201` as weather. The upper half is dark and near-featureless, which
 * is where the headline sits; the light rises from the horizon *below* the
 * copy rather than across it.
 *
 * **If you swap the photograph, check the scrim.** `hero-scrim` is tuned to
 * this frame — a lighter or busier image needs more of it, and the white
 * type has to clear AA at every breakpoint. Keep the aurora low: an image
 * with bright detail through the middle band will fight the H1 no matter
 * how much scrim goes over it.
 *
 * This is the only dark band on the site. Everything below is the white /
 * `alt` alternation, and the hard edge at the foot of this section is the
 * page's first and strongest contrast — do not soften it with a border.
 *
 * ## Motion
 *
 * Nothing here is a signature moment. The copy rises once on load, and the
 * photograph drifts a few percent over 44s so the band is not completely
 * static. Both are off under `prefers-reduced-motion`, enforced here and in
 * `globals.css`.
 *
 * ## Open
 *
 * The regulator chip is **not** included: ByteFX Capital Ltd's licence
 * details need the same compliance sign-off the Trust section items are
 * badged for. Add it to `CHIPS` once legal confirms the entity and number —
 * the row is built for four and currently carries three.
 */

const CHIPS = ["MetaTrader 5", "$20 minimum deposit", "24/6 support"];

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

export function Hero() {
  return (
    /* The negative top margin pulls the band up behind the sticky navbar,
       whose shell is a floating white pill on a transparent header. Without
       it the photograph starts 84px down the page and the pill sits on a
       strip of bare canvas — the one place on the site where the header is
       meant to be floating over something. Keep the padding equal to the
       margin: it is what puts the content back where it belongs. */
    <section className="relative -mt-[84px] flex min-h-[620px] items-center overflow-hidden pt-[84px] text-white md:min-h-[88vh]">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Base colour under the photograph, so a slow or failed image load
            leaves a night sky rather than a white flash under white type. */}
        <div className="hero-sky absolute inset-0" />

        {/* `priority` because this is the LCP element. The Thailand banner
            further down is deliberately *not* priority for the same reason
            — it must not compete with this for the first paint. */}
        <Image
          src="/assets/hero/aurora.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-drift object-cover object-[50%_60%]"
        />

        <div className="hero-scrim absolute inset-0" />

        {/* The band has no bottom border; this is what stops the aurora
            meeting the white Ticker underneath as a bright seam. */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#01040f] via-[#01040f]/55 to-transparent" />
      </div>

      <div className="container-x relative py-20 md:py-24">
        <div className="mx-auto max-w-[860px] text-center">
          <Rise
            as="p"
            className="text-[11px] font-semibold tracking-[0.22em] text-white/55 uppercase"
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
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-white/70"
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
