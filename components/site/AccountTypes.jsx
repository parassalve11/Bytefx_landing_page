"use client";

import { useState } from "react";
import { Check, ChevronDown, Minus } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * Every card carries the identical spec list in the identical order, so the
 * eye compares straight down a column. Replaces the blurred placeholder card
 * on the live site with the real third tier (Raw).
 */
const SPEC_ORDER = [
  "Min. deposit",
  "Spread from",
  "Spread type",
  "Commission",
  "Max leverage",
  "Min. volume per trade",
  "Swap-free support",
  "Platform",
];

const ACCOUNTS = [
  {
    id: "standard",
    name: "Standard",
    blurb:
      "The entry point for new traders exploring global markets with zero commission and high flexibility.",
    deposit: "20",
    specs: {
      "Min. deposit": "$20",
      "Spread from": "1.9 pips",
      "Spread type": "Variable",
      Commission: "Zero",
      "Max leverage": "1:2000*",
      "Min. volume per trade": "0.01 lot",
      "Swap-free support": true,
      Platform: "MetaTrader 5",
    },
  },
  {
    id: "pro",
    name: "Pro",
    featured: true,
    blurb:
      "For experienced traders who need tighter spreads and stronger execution on higher volume.",
    deposit: "2,000",
    specs: {
      "Min. deposit": "$2,000",
      "Spread from": "1.0 pips",
      "Spread type": "Variable",
      Commission: "Zero",
      "Max leverage": "1:2000*",
      "Min. volume per trade": "0.01 lot",
      "Swap-free support": false,
      Platform: "MetaTrader 5",
    },
  },
  {
    id: "raw",
    name: "Raw",
    blurb:
      "Raw spreads and direct market access for professionals trading with institutional precision.",
    deposit: "25,000",
    specs: {
      "Min. deposit": "$25,000",
      "Spread from": "0.0 pips",
      "Spread type": "Raw",
      Commission: "$8 round turn",
      "Max leverage": "1:2000*",
      "Min. volume per trade": "0.01 lot",
      "Swap-free support": true,
      Platform: "MetaTrader 5",
    },
  },
];

function SpecValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] font-medium text-ink">
        <Check className="h-3.5 w-3.5 text-go-600" strokeWidth={3} />
        Available
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-[14px] text-muted">
        <Minus className="h-3.5 w-3.5" strokeWidth={3} />
        Not included
      </span>
    );
  }
  return (
    <span className="tnum text-[14px] font-medium text-ink">{value}</span>
  );
}

/**
 * ByteFX card language, taken straight off the original page: a nested frame
 * holding a card that fades white → green tint, a green "$" ahead of the
 * number, green ticks, and a full-width green pill CTA.
 */
function AccountCard({ account }) {
  const { featured } = account;

  return (
    <RevealItem
      as="li"
      id={account.id}
      className={cn(
        "card-frame relative list-none scroll-mt-28",
        featured && "bg-gradient-to-b from-brand-50 to-transparent lg:-my-3"
      )}
    >
      {featured && (
        <span className="absolute top-1 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-solid px-3 py-1 text-[11px] font-semibold tracking-[0.06em] whitespace-nowrap text-white uppercase shadow-sm">
          Most popular
        </span>
      )}

      <div
        className={cn(
          "card-fade-green flex h-full flex-col rounded-[18px] p-6 transition-all duration-200 md:p-7",
          featured
            ? "border-2 border-brand shadow-brand lg:py-9"
            : "border border-line shadow-sm hover:-translate-y-1 hover:border-line-strong hover:shadow-md"
        )}
      >
        <h3 className="text-[23px] font-bold tracking-[-0.015em] text-ink">
          {account.name}
        </h3>
        <p className="mt-2 min-h-[4.5rem] text-[14.5px] leading-relaxed text-body">
          {account.blurb}
        </p>

        <p className="mt-4 flex items-baseline gap-1 border-t border-line pt-5">
          <span className="text-[24px] font-bold text-go-600">$</span>
          <span className="tnum text-[40px] leading-none font-bold tracking-[-0.025em] text-ink">
            {account.deposit}
          </span>
          <span className="eyebrow ml-1.5">Min. deposit</span>
        </p>

        <dl className="mt-6 flex-1 divide-y divide-line/70 border-t border-line">
          {SPEC_ORDER.map((key) => (
            <div
              key={key}
              className="flex items-center justify-between gap-4 py-2.5"
            >
              <dt className="text-[13.5px] text-muted">{key}</dt>
              <dd className="text-right">
                <SpecValue value={account.specs[key]} />
              </dd>
            </div>
          ))}
        </dl>

        <Button
          href={`/signup?account=${account.id}`}
          size="md"
          arrow
          className="mt-7 w-full"
        >
          Open your account
        </Button>
      </div>
    </RevealItem>
  );
}

function ComparisonTable() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="account-comparison"
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6"
      >
        <span className="text-[15px] font-semibold text-ink">
          Compare every specification side by side
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180"
          )}
          strokeWidth={2.4}
        />
      </button>

      {open && (
        <div id="account-comparison" className="overflow-x-auto border-t border-line">
          <table className="w-full min-w-[640px] text-left">
            <caption className="sr-only">
              ByteFX account specifications compared
            </caption>
            <thead>
              <tr className="bg-sunken">
                <th
                  scope="col"
                  className="eyebrow px-5 py-3 text-left md:px-6"
                >
                  Specification
                </th>
                {ACCOUNTS.map((a) => (
                  <th
                    key={a.id}
                    scope="col"
                    className="px-5 py-3 text-left text-[13.5px] font-semibold text-ink md:px-6"
                  >
                    {a.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {SPEC_ORDER.map((key) => (
                <tr key={key}>
                  <th
                    scope="row"
                    className="px-5 py-3 text-[13.5px] font-normal text-muted md:px-6"
                  >
                    {key}
                  </th>
                  {ACCOUNTS.map((a) => (
                    <td key={a.id} className="px-5 py-3 md:px-6">
                      <SpecValue value={a.specs[key]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export function AccountTypes() {
  return (
    <Section
      id="accounts"
      bg="alt"
      align="center"
      eyebrow="Account types"
      title={
        <>
          Just one click away to{" "}
          <span className="text-brand-blue">Global</span>{" "}
          <span className="text-brand-green">Markets</span>
        </>
      }
      lead="Choose from three account types designed to suit beginners through to professionals — transparent pricing, robust execution and tailored features."
    >
      <RevealGroup
        as="ul"
        className="grid gap-5 lg:grid-cols-3 lg:items-start lg:gap-6"
      >
        {ACCOUNTS.map((a) => (
          <AccountCard key={a.id} account={a} />
        ))}
      </RevealGroup>

      <ComparisonTable />

      <p className="mt-6 text-center text-[13.5px] text-muted">
        * Maximum leverage depends on instrument class and account equity.
        Trading on leverage carries a high level of risk.{" "}
        <a
          href="/company/contact"
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          Contact us for a custom plan
        </a>
        .
      </p>
    </Section>
  );
}
