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
import { cn } from "@/lib/utils";
import growthArtwork from "@/public/assets/show_case/ae9eeeb9-2976-4ba4-8326-2dcdeaeb7513.png";

/**
 * The closing panel's artwork.
 *
 * It used to be a translucent white card floating on the section's `brand-50`
 * ground, which read as a different component that had been dropped in — a
 * pale rectangle with nothing holding it to the page. It is now a defined
 * box built from the section's own palette: a `brand-50`-to-white plate, the
 * section's `brand-100` hairline, and a header strip that names what the
 * artwork is for, so the panel reads as part of the section rather than as a
 * picture parked beside it.
 *
 * The three steps in that strip are the same three the heading promises
 * ("open an account, verify your ID and fund it with $20"), which is what
 * earns the panel its space: it is not decoration, it is the flow, and the
 * micro-chips that used to restate "free to open / no deposit fee / verified
 * in minutes" under the buttons are gone because this says it better.
 */
const TILT_SPRING = { stiffness: 180, damping: 24, mass: 0.7 };

const STEPS = [
  { n: "1", label: "Open", detail: "2 minutes" },
  { n: "2", label: "Verify", detail: "ID upload" },
  { n: "3", label: "Fund", detail: "from $20" },
];

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
  const driftTarget = useTransform(scrollYProgress, [0, 0.5, 1], [8, 0, -8]);
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
      className="relative mx-auto w-full max-w-[360px] [perspective:1000px] motion-reduce:!transform-none"
    >
      {/* The plate starts on the section's own brand-50 and lightens
          downward, so the panel emerges from the band rather than sitting on
          it as a white block. */}
      <motion.figure
        onPointerMove={handlePointerMove}
        onPointerLeave={reset}
        onPointerCancel={reset}
        whileHover={reduced ? undefined : { y: -3 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-[24px] border border-brand-100 bg-gradient-to-b from-brand-50 via-white to-white shadow-[0_20px_50px_-32px_rgba(19,86,190,0.55)] will-change-transform motion-reduce:!transform-none dark:via-surface dark:to-surface"
      >
        {/* The artwork's own stage. Square, so the render keeps its
            proportions, with the step strip below it on the flat plate. */}
        <div className="relative aspect-square overflow-hidden">
          <div
            aria-hidden="true"
            className="absolute inset-[9%] rounded-full border border-brand/10"
          />
          <div
            aria-hidden="true"
            className="absolute inset-[20%] rounded-full border border-brand/[0.08]"
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
              sizes="(min-width: 1024px) 360px, (min-width: 640px) 42vw, calc(100vw - 72px)"
              className="absolute top-1/2 left-1/2 h-auto w-[126%] max-w-none -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_24px_26px_rgba(19,86,190,0.22)] transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.03]"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(125deg,rgba(255,255,255,0.5),transparent_30%,transparent_66%,rgba(76,210,1,0.08))] opacity-45 transition-opacity duration-500 motion-safe:group-hover:opacity-75"
          />
        </div>

        {/* The flow, as three steps. A `figcaption` because that is exactly
            what it is — the caption that says what the picture is about. */}
        <figcaption className="relative grid grid-cols-3 border-t border-brand-100 bg-white/70 backdrop-blur-sm dark:bg-surface/70">
          {STEPS.map((step, i) => (
            <span
              key={step.n}
              className={cn(
                "flex flex-col items-center px-2 py-4 text-center",
                // Hairlines between the steps, never outside the first or last.
                i > 0 && "border-l border-brand-100/80"
              )}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-solid text-[11.5px] font-bold text-white">
                {step.n}
              </span>
              <span className="mt-2 block text-[12.5px] leading-none font-semibold text-ink">
                {step.label}
              </span>
              <span className="mt-1 block text-[11px] leading-none text-muted">
                {step.detail}
              </span>
            </span>
          ))}
        </figcaption>
      </motion.figure>
    </motion.div>
  );
}
