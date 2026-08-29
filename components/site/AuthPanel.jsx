import Link from "next/link";
import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * The sign-up and log-in landing panels.
 *
 * ## Why there is no form here
 *
 * There is **no credential field on either page — no password input, no email
 * input, no card field — and that is deliberate, not unfinished.** Account
 * opening and authentication belong to the client area, which is a separate
 * authenticated application. Rendering a realistic-looking login form on the
 * marketing site that posts nowhere does three bad things at once:
 *
 * 1. It trains clients to type ByteFX credentials into whatever page looks
 *    like the login page, which is precisely the habit phishing relies on.
 * 2. It collects nothing, so anyone who uses it is simply locked out and
 *    believes they tried.
 * 3. A marketing site is not the right security boundary for credentials —
 *    different deploy cadence, different threat model, different reviewers.
 *
 * So these pages do the honest job: explain what happens next, list what to
 * have ready, and hand off to the real application with a single button.
 *
 * TODO [BACKEND]: point `href` at the live client area. Until that host
 * exists the buttons target `/support`, which reaches a person who can open
 * an account manually — a dead end that is a real dead end beats a form that
 * silently discards what someone typed.
 */

const CLIENT_AREA_SIGNUP = "/support";
const CLIENT_AREA_LOGIN = "/support";

const SIGNUP_STEPS = [
  {
    title: "Register",
    copy: "Name, email and country of residence. A few minutes, and no deposit at this stage.",
  },
  {
    title: "Verify",
    copy: "A government photo ID and a recent proof of address. This is a legal requirement and cannot be skipped or deferred.",
  },
  {
    title: "Fund and trade",
    copy: "Card, bank wire, USDT or crypto, with no ByteFX fee of its own. Standard opens from $20.",
  },
];

const SIGNUP_READY = [
  "A government-issued photo ID — passport, national ID or driving licence",
  "Proof of address issued in the last three months, in your own name",
  "A payment method in your own name; third-party transfers are returned, not credited",
];

export function AuthPanel({ mode = "signup" }) {
  const isSignup = mode === "signup";

  return (
    <section className="relative -mt-[84px] overflow-hidden pt-[84px] text-white">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-tools absolute inset-0" />
        <div className="hero-tools-grid absolute inset-0" />
        <div className="hero-scrim absolute inset-0" />
        <div className="hero-bloom absolute inset-0" />
      </div>

      <div className="container-x relative py-16 md:py-24">
        <div
          className={cn(
            "mx-auto grid max-w-5xl gap-10",
            isSignup && "lg:grid-cols-[1fr_1fr] lg:gap-14"
          )}
        >
          <div className={cn(!isSignup && "mx-auto max-w-xl text-center")}>
            <h1 className="h-section text-balance-i text-white">
              {isSignup
                ? "Open your ByteFX account."
                : "Log in to your account."}
            </h1>
            <p className="text-balance-i mt-5 text-[16.5px] leading-relaxed text-white/80">
              {isSignup
                ? "Registration, verification and funding happen in the client area. Here is exactly what that involves, so nothing surprises you halfway through."
                : "Trading and account management happen in the ByteFX client area — a separate, secured application. This page only sends you there."}
            </p>

            {isSignup && (
              <ol className="mt-9 space-y-6">
                {SIGNUP_STEPS.map((s, i) => (
                  <li key={s.title} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="tnum mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-[12.5px] font-semibold text-white"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-[16.5px] font-semibold text-white">
                        {s.title}
                      </span>
                      <span className="mt-1 block text-[14.5px] leading-relaxed text-white/75">
                        {s.copy}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            )}

            <div
              className={cn(
                "mt-9 flex flex-col gap-3 sm:flex-row",
                !isSignup && "sm:justify-center"
              )}
            >
              <Button
                href={isSignup ? CLIENT_AREA_SIGNUP : CLIENT_AREA_LOGIN}
                size="lg"
                arrow
                className="w-full sm:w-auto"
              >
                {isSignup ? "Continue to registration" : "Go to the client area"}
              </Button>
              <Button
                href={isSignup ? "/demo" : "/signup"}
                variant="onDark"
                size="lg"
                className="w-full sm:w-auto"
              >
                {isSignup ? "Try a demo first" : "Open an account"}
              </Button>
            </div>

            {/* The security note is the point of the page, so it is on the
                page rather than in a footer nobody reads. */}
            <p className="mt-8 flex items-start gap-2.5 text-[13px] leading-relaxed text-white/65">
              <ShieldCheck
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-[#a8f55b]"
                strokeWidth={2.25}
              />
              <span>
                ByteFX never asks for your password or a card PIN by email,
                chat or phone. You will only ever enter your password in the
                client area — never on this marketing site, and never on a page
                someone sends you a link to.{" "}
                <Link
                  href="/company/trust-security"
                  className="font-medium text-white underline underline-offset-4"
                >
                  How we protect your account
                </Link>
              </span>
            </p>
          </div>

          {isSignup && (
            <div className="rounded-[24px] border border-white/15 bg-white/8 p-7 backdrop-blur-sm md:p-8">
              <p className="text-[11px] font-semibold tracking-[0.18em] text-white/55 uppercase">
                Have these ready
              </p>
              <ul className="mt-5 space-y-4">
                {SIGNUP_READY.map((r) => (
                  <li
                    key={r}
                    className="flex gap-3 text-[14.5px] leading-relaxed text-white/85"
                  >
                    <Check
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-[#a8f55b]"
                      strokeWidth={3}
                    />
                    {r}
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-white/15 pt-6 text-[13px] leading-relaxed text-white/60">
                Verification is an anti-money-laundering requirement, not a
                ByteFX preference — see the{" "}
                <Link
                  href="/legal/aml"
                  className="font-medium text-white underline underline-offset-4"
                >
                  AML and KYC policy
                </Link>
                . Read the{" "}
                <Link
                  href="/legal/risk"
                  className="font-medium text-white underline underline-offset-4"
                >
                  risk disclosure
                </Link>{" "}
                before you fund an account: trading on leverage carries a high
                level of risk and you can lose the money you deposit.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
