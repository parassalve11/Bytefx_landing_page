import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const MICRO = ["Free to open", "No deposit fee", "Verified in minutes"];

export function FinalCta() {
  return (
    <section className="border-y border-brand-100 bg-brand-50">
      <div className="container-x py-16 text-center md:py-24">
        <Reveal as="h2" className="h-section mx-auto max-w-3xl">
          Start trading in{" "}
          <span className="text-gradient-brand">under five minutes.</span>
        </Reveal>
        <Reveal
          as="p"
          delay={0.05}
          className="mx-auto mt-4 max-w-xl text-[16.5px] leading-relaxed text-body"
        >
          Open an account, verify your ID and fund it with $20. The same
          conditions apply whether you trade one lot or a thousand.
        </Reveal>

        <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/signup" size="lg" arrow>
            Open live account
          </Button>
          <Button href="/demo" variant="ghost" size="lg">
            Try demo
          </Button>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-6 flex flex-wrap justify-center gap-x-2 gap-y-1"
        >
          {MICRO.map((m, i) => (
            <span key={m} className="text-[13px] font-medium text-body">
              {m}
              {i < MICRO.length - 1 && (
                <span className="ml-2 text-line-strong">&middot;</span>
              )}
            </span>
          ))}
        </Reveal>

        {/* The risk warning belongs here, not only in the footer. */}
        <p className="mx-auto mt-10 max-w-3xl text-[12px] leading-relaxed text-muted">
          Trading Forex, CFDs and other leveraged financial instruments involves
          a high level of risk and may not be suitable for all investors. Ensure
          you fully understand the risks involved and can afford to sustain a
          complete loss of your invested capital.
        </p>
      </div>
    </section>
  );
}
