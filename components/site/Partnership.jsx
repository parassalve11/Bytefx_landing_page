import { Check } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const BULLETS = [
  "Commission paid per lot, credited daily",
  "Real-time dashboard for clients, volume and payouts",
  "Multi-tier structure for sub-IBs and regional partners",
];

const BARS = [38, 52, 46, 64, 58, 78, 71, 88];

export function Partnership() {
  return (
    <Section
      id="partnership"
      bg="alt"
      eyebrow="Partnership"
      title={
        <>
          Grow <span className="text-gradient-brand">with ByteFX.</span>
        </>
      }
      lead="Introduce traders, keep a share of every lot they trade, and track it all from one dashboard. One programme, one destination."
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
        <Reveal>
          <ul className="space-y-4">
            {BULLETS.map((b) => (
              <li key={b} className="flex gap-3">
                <Check className="mt-1 h-4 w-4 shrink-0 text-go-600" strokeWidth={3} />
                <span className="text-[15.5px] leading-relaxed text-body">{b}</span>
              </li>
            ))}
          </ul>
          <Button href="/partnership" size="lg" arrow className="mt-8">
            Become a partner
          </Button>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-lg md:p-7">
            <div className="flex items-center justify-between">
              <p className="eyebrow">Partner dashboard</p>
              <span className="rounded-full bg-go-50 px-2 py-0.5 text-[11px] font-semibold text-go-600">
                Live
              </span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-4 border-b border-line pb-5">
              {[
                { v: "$8,412", l: "Commission MTD" },
                { v: "127", l: "Active clients" },
                { v: "1,048", l: "Lots this month" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="tnum text-[21px] leading-none font-bold text-ink">
                    {s.v}
                  </p>
                  <p className="eyebrow mt-1.5">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <p className="eyebrow mb-3">Commission, last 8 weeks</p>
              <div className="flex h-28 items-end gap-2" aria-hidden="true">
                {BARS.map((h, i) => (
                  <span
                    key={i}
                    className="flex-1 rounded-t-sm bg-brand"
                    style={{
                      height: `${h}%`,
                      opacity: 0.35 + (i / (BARS.length - 1)) * 0.65,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
