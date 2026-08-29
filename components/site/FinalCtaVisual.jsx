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
import growthArtwork from "@/public/assets/show_case/ae9eeeb9-2976-4ba4-8326-2dcdeaeb7513.png";

const TILT_SPRING = { stiffness: 180, damping: 24, mass: 0.7 };

export function FinalCtaVisual() {
  const visualRef = useRef(null);
  const reduced = useReducedMotion();
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const glowXTarget = useMotionValue(0);
  const glowYTarget = useMotionValue(0);
  const rotateX = useSpring(rotateXTarget, TILT_SPRING);
  const rotateY = useSpring(rotateYTarget, TILT_SPRING);
  const glowX = useSpring(glowXTarget, TILT_SPRING);
  const glowY = useSpring(glowYTarget, TILT_SPRING);
  const { scrollYProgress } = useScroll({
    target: visualRef,
    offset: ["start end", "end start"],
  });
  const driftTarget = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [8, 0, -8]
  );
  const driftY = useSpring(driftTarget, {
    stiffness: 90,
    damping: 28,
    mass: 0.65,
  });

  const reset = () => {
    rotateXTarget.set(0);
    rotateYTarget.set(0);
    glowXTarget.set(0);
    glowYTarget.set(0);
  };

  const handlePointerMove = (event) => {
    if (reduced || event.pointerType !== "mouse") return;

    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    rotateXTarget.set(y * -3);
    rotateYTarget.set(x * 4);
    glowXTarget.set(x * 20);
    glowYTarget.set(y * 16);
  };

  return (
    <motion.div
      ref={visualRef}
      style={{ y: reduced ? 0 : driftY }}
      className="relative mx-auto w-full max-w-[330px] [perspective:1000px] motion-reduce:!transform-none"
    >
      <motion.figure
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        whileHover={reduced ? undefined : { y: -3, scale: 1.01 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-square overflow-hidden rounded-[26px] border border-brand-100/90 bg-white/65 shadow-[0_24px_60px_-38px_rgba(19,86,190,0.48)] backdrop-blur-sm will-change-transform motion-reduce:!transform-none"
      >
        <div
          aria-hidden="true"
          className="absolute inset-[7%] rounded-full border border-brand/10"
        />
        <div
          aria-hidden="true"
          className="absolute inset-[17%] rounded-full border border-brand/8"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-45 [background-image:linear-gradient(rgba(19,86,190,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(19,86,190,0.07)_1px,transparent_1px)] [background-size:36px_36px] [mask-image:radial-gradient(circle_at_center,#000,transparent_72%)]"
        />

        <motion.div
          aria-hidden="true"
          style={{ x: glowX, y: glowY }}
          className="absolute top-[18%] left-[22%] h-[52%] w-[58%] rounded-full bg-go/18 blur-[58px]"
        />

        <div className="absolute inset-0 [transform:translateZ(42px)]">
          <Image
            src={growthArtwork}
            alt="Blue and green glass market bars rising beside a dollar symbol"
            sizes="(min-width: 1024px) 330px, (min-width: 640px) 42vw, calc(100vw - 72px)"
            className="absolute top-1/2 left-1/2 h-auto w-[133%] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_26px_rgba(19,86,190,0.22)] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.02]"
          />
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.5),transparent_30%,transparent_66%,rgba(76,210,1,0.08))] opacity-45 transition-opacity duration-500 motion-safe:group-hover:opacity-75"
        />
      </motion.figure>
    </motion.div>
  );
}
