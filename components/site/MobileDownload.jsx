import Image from "next/image";
import { Apple, BellRing, Check, Play, ShieldCheck, WalletCards } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const BENEFITS = [
  { icon: WalletCards, label: "Fund and withdraw in-app" },
  { icon: BellRing, label: "Set live price alerts" },
  { icon: ShieldCheck, label: "One secure account on every device" },
];

function StoreBadge({ icon: Icon, top, bottom, href }) {
  return (
    <a
      href={href}
      className="inline-flex min-h-12 items-center gap-2.5 rounded-xl border border-white/15 bg-[#050706] px-4 py-2.5 text-white shadow-[0_12px_28px_-16px_rgba(0,0,0,0.72)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <Icon className="h-5 w-5" strokeWidth={2} />
      <span className="text-left leading-tight">
        <span className="block text-[9.5px] text-white/65">{top}</span>
        <span className="block text-[13.5px] font-semibold">{bottom}</span>
      </span>
    </a>
  );
}

export function MobileDownload() {
  return (
    <section id="download-app" className="bg-alt pb-16 md:pb-24">
      <div className="container-x">
        <div className="relative isolate overflow-hidden rounded-[32px] border border-white/20 bg-[linear-gradient(135deg,#063b2b_0%,#087a47_54%,#0b5f3c_100%)] px-6 py-9 text-white shadow-[0_30px_84px_-38px_rgba(5,65,43,0.8)] sm:px-8 md:py-11 lg:min-h-[520px] lg:px-10 xl:px-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-36 -left-20 h-80 w-80 rounded-full bg-go/32 blur-[90px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -bottom-36 h-80 w-80 rounded-full bg-white/18 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:46px_46px] [mask-image:radial-gradient(ellipse_at_center,#000,transparent_82%)]"
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-[200px_minmax(340px,1fr)_minmax(280px,360px)] lg:gap-6 xl:gap-9">
            <Reveal
              delay={0.08}
              className="order-3 flex flex-col items-center gap-3 lg:order-1 lg:items-stretch"
            >
              <StoreBadge
                icon={Apple}
                top="Download on the"
                bottom="App Store"
                href="/download#ios"
              />
              <StoreBadge
                icon={Play}
                top="Get it on"
                bottom="Google Play"
                href="/download#android"
              />

              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-white/18 bg-white/10 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl lg:flex-col lg:items-start">
                <span className="flex h-[88px] w-[88px] shrink-0 items-center justify-center rounded-xl bg-white p-1.5 shadow-sm">
                  <Image
                    src="/assets/bytefx-app-qr.svg"
                    alt="QR code linking to the ByteFX mobile app"
                    width={88}
                    height={88}
                    className="h-full w-full"
                  />
                </span>
                <span className="text-left text-[12px] leading-snug text-white/72">
                  Scan to install
                  <span className="mt-1 block font-semibold text-white">
                    ByteFX mobile
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal
              delay={0.05}
              className="order-2 relative h-[300px] overflow-hidden rounded-[28px] border border-white/12 bg-white/[0.055] shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-md sm:h-[380px] lg:h-[440px]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-x-[20%] top-[16%] bottom-[8%] rounded-full bg-go/24 blur-[60px]"
              />
              <Image
                src="/assets/mobile_section.png"
                alt="ByteFX mobile account dashboard shown on a phone"
                width={1672}
                height={941}
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 42vw, 90vw"
                className="absolute top-1/2 left-1/2 h-auto w-[760px] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_28px_36px_rgba(0,0,0,0.28)] sm:w-[920px] lg:w-[1040px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(6,59,43,0.42),transparent_18%,transparent_82%,rgba(6,59,43,0.42))]"
              />
            </Reveal>

            <Reveal delay={0.02} className="order-1 text-center lg:order-3 lg:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-3.5 py-1.5 text-[10.5px] font-semibold tracking-[0.1em] uppercase backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#a8f55b]" />
                ByteFX mobile
              </span>
              <h2 className="mt-5 text-[clamp(34px,4.1vw,54px)] leading-[1.02] font-bold tracking-[-0.035em] text-white">
                Trade on mobile.
              </h2>
              <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-white/72 lg:mx-0">
                Keep your account with you—monitor positions, manage funding and
                act on price alerts without opening a laptop.
              </p>

              <ul className="mx-auto mt-7 max-w-sm space-y-3 text-left lg:mx-0">
                {BENEFITS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-[13.5px] font-medium text-white/88">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/16 bg-white/10 backdrop-blur-md">
                      <Icon className="h-4 w-4 text-[#b9ff81]" strokeWidth={2.2} />
                    </span>
                    {label}
                  </li>
                ))}
              </ul>

              <p className="mt-7 inline-flex items-center gap-2 text-[12.5px] font-semibold text-white">
                <Check className="h-4 w-4 text-[#b9ff81]" strokeWidth={2.5} />
                Available for iOS and Android
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
