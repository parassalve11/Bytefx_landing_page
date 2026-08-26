import { Hero } from "@/components/site/Hero";
import { MetricsStrip } from "@/components/site/MetricsStrip";
import { Ticker } from "@/components/site/Ticker";
import { Markets } from "@/components/site/Markets";
import { AccountTypes } from "@/components/site/AccountTypes";
import { MobileApp } from "@/components/site/MobileApp";
import { Funding } from "@/components/site/Funding";
import { Partnership } from "@/components/site/Partnership";
import { Community } from "@/components/site/Community";
import { FinalCta } from "@/components/site/FinalCta";

export default function Home() {
  return (
    <main>
      {/* Hero is deliberately last in the design order (plan.md phase 5).
          It inherits the system rather than defining it. */}
      <Hero />

      {/* White / alt alternation below IS the page rhythm — keep it.
          Why ByteFX, Getting started, Trust and security and Support now
          live on their own routes, reached from the navbar. */}
      <MetricsStrip />
      <Ticker />
      <Markets />
      <AccountTypes />
      <MobileApp />
      <Funding />
      <Partnership />
      <Community />
      <FinalCta />
    </main>
  );
}
