import Image from "next/image";

import { Reveal } from "@/components/ui/reveal";
import { BrandGlyph } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

function StoreBadge({ store }) {
  const apple = store === "apple";

  return (
    <a
      href={apple ? "/download#ios" : "/download#android"}
      aria-label={apple ? "Download on the App Store" : "Get it on Google Play"}
      className="group/store flex min-h-11 items-center gap-2.5 rounded-xl border border-white/15 bg-[#050806]/92 px-3.5 py-2 text-white shadow-[0_10px_24px_-16px_rgba(0,0,0,.9)] transition duration-300 hover:-translate-y-0.5 hover:border-[#8ee72f]/65 hover:bg-[#071008] focus-visible:ring-2 focus-visible:ring-[#8ee72f]"
    >
      <BrandGlyph
        name={apple ? "apple" : "googleplay"}
        className="h-6 w-6 shrink-0 text-white"
      />
      <span className="text-left leading-none">
        <span className="block text-[8px] font-medium tracking-[0.02em] text-white/65">
          {apple ? "Download on the" : "GET IT ON"}
        </span>
        <span className="mt-1 block whitespace-nowrap text-[13px] font-semibold tracking-[-0.02em]">
          {apple ? "App Store" : "Google Play"}
        </span>
      </span>
    </a>
  );
}

function DownloadPanel({ compact = false }) {
  return (
    <div
      className={cn(
        "grid items-center gap-3 rounded-2xl border border-[#89d72e]/35 bg-[#03150d]/64 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,.08),0_18px_40px_-28px_rgba(0,0,0,.9)] backdrop-blur-xl",
        compact
          ? "grid-cols-[76px_minmax(0,1fr)]"
          : "grid-cols-[92px_minmax(0,1fr)]"
      )}
    >
      <div
        className={cn(
          "flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_8px_20px_-12px_rgba(0,0,0,.9)]",
          compact ? "w-[76px] p-2" : "w-[92px] p-2.5"
        )}
      >
        <Image
          src="/assets/bytefx-app-qr.svg"
          alt="QR code for the mobile trading app"
          width={88}
          height={88}
          className="block h-full w-full object-contain"
        />
      </div>

      <div className="min-w-0">
        <p className="mb-2 text-[10px] font-medium tracking-[0.08em] text-white/58 uppercase">
          Scan to download
        </p>
        <div
          className={cn(
            "grid gap-2",
            compact ? "sm:grid-cols-2" : "xl:grid-cols-2"
          )}
        >
          <StoreBadge store="apple" />
          <StoreBadge store="google" />
        </div>
      </div>
    </div>
  );
}

function DownloadCopy({ mobile = false }) {
  return (
    <>
      <h2
        className={
          mobile
            ? "text-[34px] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[42px]"
            : "text-[clamp(38px,3.7vw,54px)] font-semibold leading-[1.01] tracking-[-0.05em] text-white"
        }
      >
        Trade on <span className="text-[#8fea2c]">mobile.</span>
      </h2>
      <p
        className={
          mobile
            ? "mx-auto mt-3 max-w-md text-[13px] leading-6 text-white/68"
            : "mt-4 max-w-[34rem] text-[clamp(13px,1.05vw,15px)] leading-[1.7] text-white/68"
        }
      >
        Monitor positions, manage your account and respond to the market from
        one secure app—wherever the day takes you.
      </p>
    </>
  );
}

export function MobileDownload() {
  return (
    <section id="download-app" className="bg-alt pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="container-x">
        <div className="relative isolate hidden aspect-[1672/941] min-h-[520px] overflow-hidden rounded-[30px] border border-[#68ac22]/55 bg-[#002d19] shadow-[0_34px_90px_-45px_rgba(1,77,37,.78)] md:block lg:min-h-[548px]">
          <Image
            src="/assets/mobile/background.webp"
            alt=""
            fill
            sizes="(min-width: 1280px) 1240px, 100vw"
            className="-z-30 object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(0,24,14,.9)_0%,rgba(0,28,15,.72)_27%,rgba(0,30,16,.24)_48%,transparent_68%)]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-[8%] right-[2%] -z-10 h-[28%] w-[56%] rounded-full bg-[#72f018]/18 blur-[50px]"
          />

          <Reveal className="absolute left-[4.5%] top-1/2 z-20 w-[39%] -translate-y-1/2 lg:left-[5.25%] lg:w-[36%]" delay={0.05}>
            <DownloadCopy />
            <div className="mt-7 max-w-[430px]">
              <DownloadPanel />
            </div>
          </Reveal>

          <Reveal
            style={{ width: "74%", right: "-5%", bottom: "-1%" }}
            className="pointer-events-none absolute z-10 transition-transform duration-700 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.01]"
            delay={0.02}
          >
            <Image
              src="/assets/mobile/mobiles.webp"
              alt="Mobile account dashboard and live trading chart"
              width={1536}
              height={1024}
              sizes="74vw"
              className="h-auto w-full max-w-none drop-shadow-[0_38px_36px_rgba(0,0,0,.38)]"
            />
          </Reveal>
        </div>

        <div className="relative isolate overflow-hidden rounded-[26px] border border-[#68ac22]/50 bg-[#002d19] px-5 pb-5 pt-7 text-center shadow-[0_28px_70px_-42px_rgba(1,77,37,.75)] sm:px-7 sm:pt-9 md:hidden">
          <Image
            src="/assets/mobile/background.webp"
            alt=""
            fill
            sizes="100vw"
            className="-z-30 object-cover object-left"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(0,26,14,.78)_0%,rgba(0,31,16,.28)_48%,rgba(0,22,12,.76)_100%)]"
          />

          <Reveal className="relative z-20">
            <DownloadCopy mobile />
          </Reveal>

          <Reveal
            className="pointer-events-none relative z-10 -mx-4 mt-3 aspect-[3/2] w-[calc(100%+2rem)] sm:mx-auto sm:mt-4 sm:w-full sm:max-w-[640px]"
            delay={0.03}
          >
            <Image
              src="/assets/mobile/mobiles.webp"
              alt="Mobile account dashboard and live trading chart"
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), 640px"
              className="object-contain object-center drop-shadow-[0_28px_28px_rgba(0,0,0,.36)]"
            />
          </Reveal>

          <Reveal className="relative z-20 mx-auto mt-1 max-w-xl text-left sm:-mt-1" delay={0.06}>
            <DownloadPanel compact />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
