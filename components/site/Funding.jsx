"use client";

import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * TODO [LEGAL REVIEW]: the withdrawal windows below are the ones shown on the
 * live site plus reasonable card/wire norms. Compliance must confirm each one
 * before launch — the "Indicative" footnote stays either way.
 *
 * Note for design: the marketing reference for this section prints INSTANT on
 * crypto and USDT withdrawals. That contradicts the ~1 hour the live site
 * quotes, so the conservative number is what ships here. Flip `withdrawal`
 * once legal signs off, not before.
 */
const METHODS = [
  {
    name: "Crypto",
    detail: "BTC, ETH and more",
    icon: "/assets/payment_methods/crypto.png",
    markClass: "h-[30px] w-[30px]",
    withdrawal: "~1 hour",
    tone: "fast",
  },
  {
    name: "USDT",
    detail: "TRC-20 and ERC-20",
    icon: "/assets/payment_methods/USDT.png",
    markClass: "h-[30px] w-[30px]",
    withdrawal: "~1 hour",
    tone: "fast",
  },
  {
    name: "Visa",
    detail: "Debit and credit",
    icon: "/assets/payment_methods/visa.png",
    markClass: "h-9 w-9",
    withdrawal: "1–3 days",
    tone: "standard",
  },
  {
    name: "Mastercard",
    detail: "Debit and credit",
    icon: "/assets/payment_methods/master_card.png",
    markClass: "h-9 w-9",
    withdrawal: "1–3 days",
    tone: "standard",
  },
  {
    name: "Apple Pay",
    detail: "On iOS and Safari",
    icon: "/assets/payment_methods/apple_pay.png",
    markClass: "h-9 w-9",
    withdrawal: "1–3 days",
    tone: "standard",
  },
  {
    name: "Bank wire",
    detail: "SWIFT and local rails",
    icon: "/assets/payment_methods/bank_wire.png",
    markClass: "h-10 w-10",
    withdrawal: "1–3 days",
    tone: "slow",
  },
];

/**
 * Tone drives the connector colour and nothing else loud. The withdrawal
 * figure is set as plain type, not as a status badge: these are published
 * processing times on a funding table, and a row of coloured pills reads as
 * decoration rather than as the numbers someone is here to compare.
 */
const TONE = {
  fast: { dot: "bg-go-600", line: "var(--go-600)", value: "text-go-600" },
  standard: { dot: "bg-brand", line: "var(--brand)", value: "text-body" },
  slow: { dot: "bg-muted", line: "var(--muted)", value: "text-body" },
};

/* The fan is drawn in a 600-unit-tall viewBox that is stretched to whatever
   height the six rows settle at, so every coordinate here is a fraction of
   the list rather than a pixel. Row i is centred at (i + 0.5) / 6. */

const RAIL_W = 46;
const RAIL_H = 600;
const rowY = (i) => ((i + 0.5) / METHODS.length) * RAIL_H;

/** One curve from the ByteFX hub out to a method row. */
function RailPath({ index, tone }) {
  const y = rowY(index);
  return (
    <path
      className="rail-path"
      d={`M0 ${RAIL_H / 2} C ${RAIL_W / 2} ${RAIL_H / 2}, ${RAIL_W / 2} ${y}, ${RAIL_W} ${y}`}
      fill="none"
      stroke={TONE[tone].line}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.45"
    />
  );
}

/**
 * The hub. This is the one place the standalone ByteFX mark appears in the
 * section — the wordmark already sits in the navbar, so repeating it above
 * the heading would just be the logo twice on one screen.
 */
function Hub() {
  return (
    <div className="absolute top-1/2 left-0 -translate-y-1/2">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 rounded-[32px] bg-brand/12 blur-xl"
      />
      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface shadow-md">
        <Image
          src="/assets/payment_methods/bytefx-logo.png"
          alt="ByteFX"
          width={119}
          height={82}
          sizes="36px"
          className="h-auto w-9"
        />
      </div>
    </div>
  );
}

export function Funding() {
  return (
    <Section id="funding" className="arc-wash">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        {/* ---------------------------------------------------------- */}
        <Reveal>
          <h2 className="h-section">
            Fast and reliable payment methods.
          </h2>
          <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-body">
            Six ways in and out of your account, all of them settled by
            automated, audited processing. Withdrawals always return to the
            method you funded with.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button href="/signup" size="lg" arrow>
              Open your account
            </Button>
          </div>

          {/* Set as a sentence, not a badge — same reasoning as the
              withdrawal column above. */}
          <p className="mt-7 text-[14.5px] text-body">
            <span className="font-semibold text-go-600">$0</span> ByteFX fee on
            every deposit and withdrawal.
          </p>
        </Reveal>

        {/* ---------------------------------------------------------- */}
        <div>
          {/* The column labels live outside the rail grid on purpose: the fan
              divides its own height into six, so anything stacked above the
              card inside that grid would drag every connector off its row.
              110px is the hub column plus the fan column. */}
          <div className="mb-2.5 flex items-baseline justify-between px-5 sm:px-6 lg:ml-[110px]">
            <span className="eyebrow">Method</span>
            <span className="eyebrow">Withdrawal</span>
          </div>

          <div className="grid lg:grid-cols-[64px_46px_minmax(0,1fr)]">
            {/* Hub and fan are the diagram, not the data — below lg there is
                no room for them and the list carries the section alone. */}
            <div className="relative hidden lg:block">
              <Hub />
            </div>

            <div aria-hidden="true" className="relative hidden lg:block">
              <svg
                viewBox={`0 0 ${RAIL_W} ${RAIL_H}`}
                preserveAspectRatio="none"
                className="absolute inset-0 h-full w-full"
              >
                {METHODS.map((m, i) => (
                  <RailPath key={m.name} index={i} tone={m.tone} />
                ))}
              </svg>
              {METHODS.map((m, i) => (
                <span
                  key={m.name}
                  style={{ top: `${((i + 0.5) / METHODS.length) * 100}%` }}
                  className={cn(
                    "absolute right-0 h-[7px] w-[7px] -translate-y-1/2 translate-x-1/2 rounded-full",
                    TONE[m.tone].dot
                  )}
                />
              ))}
            </div>

            <RevealGroup
              as="ul"
              className="grid grid-rows-6 rounded-3xl border border-line bg-surface px-5 shadow-lg sm:px-6"
            >
              {METHODS.map((m) => (
                <RevealItem
                  as="li"
                  key={m.name}
                  className="flex items-center gap-4 border-b border-line py-4 last:border-b-0"
                >
                  <span className="pay-puck flex h-12 w-12 shrink-0 items-center justify-center rounded-full">
                    <Image
                      src={m.icon}
                      alt=""
                      width={1254}
                      height={1254}
                      sizes="48px"
                      className={cn("object-contain", m.markClass)}
                    />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-[15.5px] leading-tight font-semibold text-ink">
                      {m.name}
                    </span>
                    <span className="mt-0.5 block truncate text-[12.5px] text-muted">
                      {m.detail}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "tnum shrink-0 text-[13.5px] font-medium whitespace-nowrap",
                      TONE[m.tone].value
                    )}
                  >
                    {m.withdrawal}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>

      <p className="mt-10 max-w-3xl text-[13.5px] leading-relaxed text-body">
        Deposits land instantly on every method except bank wire, which takes
        1–2 business days. Withdrawal windows are indicative — third-party
        payment providers and banks may apply their own fees and cut-off
        times.{" "}
        <a
          href="/funding"
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          Full funding terms
        </a>
        .
      </p>
    </Section>
  );
}
