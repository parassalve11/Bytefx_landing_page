import { Ticker } from "@/components/site/Ticker";
import { Markets } from "@/components/site/Markets";
import { Conditions } from "@/components/site/Conditions";
import { AccountTypes } from "@/components/site/AccountTypes";
import { MobileApp } from "@/components/site/MobileApp";
import { Funding } from "@/components/site/Funding";
import { FinalCta } from "@/components/site/FinalCta";
import { Hero } from "@/components/site/Hero";
import { TradingShowcase } from "@/components/site/TradingShowcase";

export default function Home() {
  return (
    <main>
      {/* <Hero /> */}
      <Ticker />
      <Markets />
      <Conditions />
      <TradingShowcase />
      <AccountTypes />
      <MobileApp />
      <Funding />
      <FinalCta />
    </main>
  );
}
