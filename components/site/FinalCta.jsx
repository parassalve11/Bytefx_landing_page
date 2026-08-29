import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { FinalCtaVisual } from "@/components/site/FinalCtaVisual";

const MICRO = ["Free to open", "No deposit fee", "Verified in minutes"];

export function FinalCta() {
  return (
    <section
      id="start-trading"
      className="relative isolate overflow-hidden border-y border-brand-100 bg-brand-50"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[8%] h-72 w-72 rounded-full bg-go/10 blur-[90px]"
      />

      <div className="container-x relative py-12 md:py-14">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          <Reveal className="relative z-10 text-center lg:text-left">
            <h2 className="h-section mx-auto max-w-[680px] lg:mx-0">
              Start trading in under five minutes.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-body lg:mx-0">
              Open an account, verify your ID and fund it with $20. Move from
              sign-up to global markets through one clear, guided flow.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Button href="/signup" size="lg" arrow>
                Open live account
              </Button>
              <Button href="/demo" variant="ghost" size="lg">
                Try demo
              </Button>
            </div>

            <ul
              className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
              aria-label="Account benefits"
            >
              {MICRO.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-white/65 px-3 py-1.5 text-[12px] font-medium text-body"
                >
                  <Check className="h-3.5 w-3.5 text-go-600" strokeWidth={2.8} />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08}>
            <FinalCtaVisual />
          </Reveal>
        </div>

        {/* The risk warning belongs here, not only in the footer. */}
        <p className="mt-8 border-t border-brand-100/80 pt-5 text-[12px] leading-relaxed text-muted">
          Trading Forex, CFDs and other leveraged financial instruments involves
          a high level of risk and may not be suitable for all investors. Ensure
          you fully understand the risks involved and can afford to sustain a
          complete loss of your invested capital.
        </p>
      </div>
    </section>
  );
}
