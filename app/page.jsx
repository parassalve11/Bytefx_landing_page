import { Hero } from "@/components/site/Hero";
import { Ticker } from "@/components/site/Ticker";
import { Markets } from "@/components/site/Markets";
import { Conditions } from "@/components/site/Conditions";
import { AccountTypes } from "@/components/site/AccountTypes";
import { Competition } from "@/components/site/Competition";
import { MobileApp } from "@/components/site/MobileApp";
import { Funding } from "@/components/site/Funding";
import { Thailand } from "@/components/site/Thailand";
import { FinalCta } from "@/components/site/FinalCta";

export default function Home() {
  return (
    <main>
      {/* Hero is deliberately last in the design order (plan.md phase 5).
          It inherits the system rather than defining it. */}
      <Hero />

      {/* White / alt alternation below IS the page rhythm — keep it.
          Why ByteFX, Getting started, Trust and security and Support now
          live on their own routes, reached from the navbar.

          Conditions sits under Markets, not under the hero: the five numbers
          land better once the reader knows what is being traded. */}
      <Ticker />
      <Markets />
      <Conditions />
      <AccountTypes />

      {/* Competition sits here, not next to Thailand: it breaks the
          Account types / Mobile app `alt`-on-`alt` adjacency, and keeps the
          page's two photographic bands well apart. */}
      <Competition />

      <MobileApp />
      <Funding />
      <Thailand />
      <FinalCta />
    </main>
  );
}
