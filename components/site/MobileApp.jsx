"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Apple, Play } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";

const FEATURES = [
  {
    title: "Fund and withdraw in-app",
    copy: "Card, bank wire, USDT and crypto — no desktop round trip.",
  },
  {
    title: "Price alerts that actually arrive",
    copy: "Push notifications on levels you set, per instrument.",
  },
  {
    title: "One account, every device",
    copy: "Positions opened on mobile show instantly in MT5 and WebTrader.",
  },
];

function StoreBadge({ icon: Icon, top, bottom, href }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2.5 rounded-xl bg-ink px-4 py-2.5 text-canvas transition-transform duration-200 hover:-translate-y-0.5"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
      <span className="text-left leading-tight">
        <span className="block text-[9.5px] text-canvas/70">{top}</span>
        <span className="block text-[13.5px] font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

export function MobileApp() {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Signature moment 2: the device cluster drifts a little as you scroll past.
  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <Section
      id="app"
      bg="alt"
      align="center"
      eyebrow="Mobile"
      title={
        <>
          Trade anywhere.{" "}
          <span className="text-brand-blue">Settle everything</span>{" "}
          <span className="text-brand-green">from your phone.</span>
        </>
      }
      lead="The ByteFX app runs the same account as your desktop terminal — open positions, fund, withdraw and set alerts without opening a laptop."
    >
      <div ref={ref}>
        {/* The real ByteFX product shot, centred and carrying the section. */}
        <motion.div
          style={reduced ? undefined : { y }}
          className="relative mx-auto w-full max-w-[1000px]"
        >
          {/* Soft brand glow so the dark devices sit on the light band
              instead of floating unanchored. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[6%] top-[18%] bottom-[6%] rounded-[50%] bg-brand/20 blur-3xl"
          />
          <Image
            src="/assets/mobile_section.png"
            alt="The ByteFX trading platform running on tablet, phone and laptop"
            width={1672}
            height={941}
            sizes="(max-width: 1024px) 100vw, 1000px"
            className="relative h-auto w-full"
          />
        </motion.div>

        <Reveal
          delay={0.06}
          className="mx-auto mt-12 grid max-w-4xl gap-8 text-center sm:grid-cols-3 sm:gap-6"
        >
          {FEATURES.map((f) => (
            <div key={f.title}>
              <p className="text-[16.5px] font-semibold text-ink">{f.title}</p>
              <p className="mx-auto mt-1.5 max-w-[22rem] text-[14.5px] leading-relaxed text-body">
                {f.copy}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-11 flex flex-wrap items-center justify-center gap-4"
        >
          <StoreBadge
            icon={Apple}
            top="Download on the"
            bottom="App Store"
            href="/download/ios"
          />
          <StoreBadge
            icon={Play}
            top="Get it on"
            bottom="Google Play"
            href="/download/android"
          />
          <div className="flex items-center gap-3 rounded-xl border border-line bg-surface p-2.5 pr-4">
            {/* The code is near-black modules on transparency and it stays
                that way in dark mode: a scanner needs the light quiet zone,
                so the puck is white in both themes rather than the code
                being inverted. */}
            <span className="flex h-[52px] w-[52px] items-center justify-center rounded-md bg-white p-[3px]">
              <Image
                src="/assets/bytefx-app-qr.svg"
                alt="QR code linking to the ByteFX mobile app"
                width={52}
                height={52}
                className="h-full w-full"
              />
            </span>
            <span className="text-left text-[12px] leading-snug text-muted">
              Scan to
              <br />
              install
            </span>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
