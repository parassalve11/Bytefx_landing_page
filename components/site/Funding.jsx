"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const TILT_SPRING = { stiffness: 180, damping: 24, mass: 0.7 };

function PaymentMethodsVisual() {
  const visualRef = useRef(null);
  const reduced = useReducedMotion();
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, TILT_SPRING);
  const rotateY = useSpring(rotateYTarget, TILT_SPRING);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const scrollOffset = useTransform(scrollYProgress, [0, 0.5, 1], [18, 0, -18]);
  const scrollY = useSpring(scrollOffset, {
    stiffness: 90,
    damping: 28,
    mass: 0.65,
  });

  const resetTilt = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
  };

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXTarget.set(y * -4);
    rotateYTarget.set(x * 4);
  };

  return (
    <motion.div
      ref={visualRef}
      style={{ y: scrollY }}
      className="mx-auto w-full max-w-[640px] [perspective:1200px] motion-reduce:!transform-none"
    >
      <motion.figure
        onPointerMove={handlePointerMove}
        onPointerLeave={resetTilt}
        onPointerCancel={resetTilt}
        whileHover={reduced ? undefined : { y: -4, scale: 1.012 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-square overflow-hidden rounded-lg border border-white/70 bg-[#e5e4e2] shadow-[0_24px_70px_rgba(27,32,35,0.18)] will-change-transform motion-reduce:!transform-none"
      >
        <Image
          src="/assets/payment_methods/image.png"
          alt="Visa, Mastercard, PayPal, and cryptocurrency payment methods"
          fill
          sizes="(min-width: 1280px) 540px, (min-width: 1024px) 46vw, (min-width: 640px) 80vw, calc(100vw - 48px)"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.025]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.22),transparent_35%,transparent_70%,rgba(255,255,255,0.12))] opacity-60 transition-opacity duration-500 motion-safe:group-hover:opacity-90"
        />
      </motion.figure>
    </motion.div>
  );
}

export function Funding() {
  return (
    <Section id="funding" className="arc-wash">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)] lg:gap-14 xl:gap-20">
        <Reveal>
          <h2 className="h-section">Fast and reliable payment methods.</h2>
          <p className="mt-5 max-w-lg text-[16.5px] leading-relaxed text-body">
            Six ways in and out of your account, all of them settled by
            automated, audited processing. Withdrawals always return to the
            method you funded with.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-4">
            <Button href="/signup" size="lg" arrow>
              Open your account
            </Button>
          </div>

          <p className="mt-7 text-[14.5px] text-body">
            <span className="font-semibold text-go-600">$0</span> ByteFX fee on
            every deposit and withdrawal.
          </p>
        </Reveal>

        <PaymentMethodsVisual />
      </div>

      <p className="mt-10 max-w-3xl text-[13.5px] leading-relaxed text-body">
        Deposits land instantly on every method except bank wire, which takes
        1–2 business days. Withdrawal windows are indicative — third-party
        payment providers and banks may apply their own fees and cut-off
        times.{" "}
        <a
          href="/funding"
          className="font-semibold text-brand underline-offset-4 hover:underline"
        >
          Full funding terms
        </a>
        .
      </p>
    </Section>
  );
}
