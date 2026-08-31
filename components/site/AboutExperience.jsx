"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRight } from "lucide-react";

const VIDEO_SRC = "/assets/about/crypto-rain-scroll.webm";
const VIDEO_POSTER_SRC = "/assets/about/crypto-rain-poster.png";
const FRAME_DURATION = 1 / 24;
const FIRST_FRAME_TIME = FRAME_DURATION / 2;
const STORY_LENGTH = 4;

const STORY_BEATS = [
  {
    index: 1,
    side: "left",
    range: [0, 0.01, 0.18, 0.27],
    title: "About ByteFX",
    copy: "We build trading around clarity: direct market access, measurable conditions and technology that stays out of your way.",
  },
  {
    index: 2,
    side: "right",
    range: [0.22, 0.31, 0.45, 0.54],
    title: "Built around the trader.",
    copy: "From opening an account to funding and execution, every step is designed to feel immediate, considered and in your control.",
  },
  {
    index: 3,
    side: "left",
    range: [0.49, 0.58, 0.72, 0.81],
    title: "Global markets. One standard.",
    copy: "Trade forex, metals, indices and crypto from one account on MetaTrader 5, with support available 24 hours a day, six days a week.",
  },
  {
    index: 4,
    side: "right",
    range: [0.76, 0.85, 0.98, 1],
    title: "The result is your edge.",
    copy: "A focused trading experience that keeps pace when markets move and gives every decision room to be deliberate.",
  },
];

const FACTS = [
  { value: "150+", label: "Markets in one account" },
  { value: "~20ms", label: "Average execution" },
  { value: "24/6", label: "Global support" },
];

function StoryBeat({ progress, beat }) {
  const opacity = useTransform(
    progress,
    beat.range,
    beat.index === 1
      ? [1, 1, 1, 0]
      : beat.index === STORY_LENGTH
        ? [0, 1, 1, 1]
        : [0, 1, 1, 0]
  );
  const y = useTransform(progress, beat.range, [28, 0, 0, -20]);

  return (
    <motion.article
      style={{ opacity, y }}
      className={
        beat.side === "right"
          ? "absolute inset-x-0 bottom-[18%] ml-auto max-w-[430px] px-5 md:right-6 md:bottom-auto md:left-auto md:top-1/2 md:w-[36%] md:-translate-y-1/2 md:px-0 md:text-right xl:right-10 xl:max-w-[470px]"
          : "absolute inset-x-0 bottom-[18%] max-w-[430px] px-5 md:bottom-auto md:left-6 md:top-1/2 md:w-[36%] md:-translate-y-1/2 md:px-0 xl:left-10 xl:max-w-[470px]"
      }
    >
      <p className="text-[11px] font-semibold tracking-[0.08em] text-ink/55 uppercase">
        {String(beat.index).padStart(2, "0")} / {String(STORY_LENGTH).padStart(2, "0")}
      </p>
      {beat.index === 1 ? (
        <h1 className="mt-4 text-[42px] leading-[1.04] font-bold tracking-normal text-ink md:text-[48px] xl:text-[58px]">
          {beat.title}
        </h1>
      ) : (
        <h2 className="mt-4 text-[34px] leading-[1.08] font-bold tracking-normal text-ink md:text-[40px] xl:text-[48px]">
          {beat.title}
        </h2>
      )}
      <p className="mt-4 text-[15.5px] leading-relaxed text-body md:text-[16.5px]">
        {beat.copy}
      </p>
    </motion.article>
  );
}

export function AboutExperience() {
  const sceneRef = useRef(null);
  const videoRef = useRef(null);
  const durationRef = useRef(0);
  const targetTimeRef = useRef(0);
  const seekFrameRef = useRef(null);
  const [videoReady, setVideoReady] = useState(false);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 72,
    damping: 26,
    mass: 0.28,
    restDelta: 0.0005,
  });
  const videoScale = useTransform(progress, [0, 0.68, 1], [1.01, 1.08, 1.19]);
  const progressScale = useTransform(progress, [0, 1], [0, 1]);

  const scheduleSeek = useCallback(() => {
    if (seekFrameRef.current !== null) return;

    seekFrameRef.current = window.requestAnimationFrame(() => {
      seekFrameRef.current = null;
      const video = videoRef.current;

      if (
        !video ||
        !durationRef.current ||
        video.readyState < 1 ||
        video.seeking
      ) {
        return;
      }

      const nextTime = Math.min(
        Math.max(targetTimeRef.current, FIRST_FRAME_TIME),
        Math.max(durationRef.current - FRAME_DURATION, FIRST_FRAME_TIME)
      );

      if (Math.abs(video.currentTime - nextTime) > FRAME_DURATION / 5) {
        video.currentTime = nextTime;
      }
    });
  }, []);

  useMotionValueEvent(progress, "change", (latest) => {
    if (reducedMotion || !durationRef.current) return;
    targetTimeRef.current =
      latest * Math.max(durationRef.current - FRAME_DURATION, 0);
    scheduleSeek();
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    let hasRevealedFrame = false;
    let revealFrameId = null;
    let revealFallbackId = null;

    const revealOnPresentedFrame = () => {
      if (
        hasRevealedFrame ||
        revealFrameId !== null ||
        revealFallbackId !== null
      ) {
        return;
      }

      if (typeof video.requestVideoFrameCallback === "function") {
        revealFrameId = video.requestVideoFrameCallback(() => {
          hasRevealedFrame = true;
          revealFrameId = null;
          setVideoReady(true);
        });
        return;
      }

      revealFallbackId = window.requestAnimationFrame(() => {
        hasRevealedFrame = true;
        revealFallbackId = null;
        setVideoReady(true);
      });
    };

    const primeVideo = () => {
      durationRef.current = Number.isFinite(video.duration) ? video.duration : 0;
      video.pause();

      const initialProgress = reducedMotion ? 0.56 : progress.get();
      targetTimeRef.current =
        initialProgress * Math.max(durationRef.current - FRAME_DURATION, 0);
      scheduleSeek();
    };

    const handleLoadedData = () => {
      revealOnPresentedFrame();
      scheduleSeek();
    };
    const handleSeeked = () => {
      revealOnPresentedFrame();

      if (
        Math.abs(video.currentTime - targetTimeRef.current) >
        FRAME_DURATION / 2
      ) {
        scheduleSeek();
      }
    };

    if (video.readyState >= 1) primeVideo();
    if (video.readyState >= 2) revealOnPresentedFrame();

    video.addEventListener("loadedmetadata", primeVideo);
    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("seeked", handleSeeked);

    return () => {
      video.removeEventListener("loadedmetadata", primeVideo);
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("seeked", handleSeeked);
      if (
        revealFrameId !== null &&
        typeof video.cancelVideoFrameCallback === "function"
      ) {
        video.cancelVideoFrameCallback(revealFrameId);
      }
      if (revealFallbackId !== null) {
        window.cancelAnimationFrame(revealFallbackId);
      }
      if (seekFrameRef.current !== null) {
        window.cancelAnimationFrame(seekFrameRef.current);
        seekFrameRef.current = null;
      }
    };
  }, [progress, reducedMotion, scheduleSeek]);

  return (
    <section className="platinum-surface relative isolate overflow-clip">
      <div
        ref={sceneRef}
        className="relative h-[430svh] motion-reduce:h-auto"
      >
        <div className="sticky top-0 h-svh min-h-[640px] overflow-hidden bg-[#e5e4e2] motion-reduce:relative motion-reduce:h-auto motion-reduce:min-h-svh">
          <motion.img
            src={VIDEO_POSTER_SRC}
            alt=""
            aria-hidden="true"
            draggable="false"
            fetchPriority="high"
            decoding="sync"
            style={{ scale: videoScale }}
            className={`pointer-events-none absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 select-none motion-reduce:!transform-none md:object-contain ${
              videoReady ? "opacity-0" : "opacity-100"
            }`}
          />

          <motion.video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            poster={VIDEO_POSTER_SRC}
            disablePictureInPicture
            disableRemotePlayback
            aria-hidden="true"
            tabIndex={-1}
            style={{ scale: videoScale }}
            className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-300 motion-reduce:!transform-none md:object-contain ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={VIDEO_SRC} type="video/webm" />
          </motion.video>

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(229,228,226,0.4)_0%,transparent_30%,transparent_53%,rgba(229,228,226,0.93)_82%,#e5e4e2_100%)] md:hidden"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-[linear-gradient(90deg,#e5e4e2_0%,rgba(229,228,226,0.98)_28%,rgba(229,228,226,0.86)_38%,rgba(229,228,226,0.12)_47%,rgba(229,228,226,0.12)_53%,rgba(229,228,226,0.86)_62%,rgba(229,228,226,0.98)_72%,#e5e4e2_100%)] md:block"
          />
          <div
            aria-hidden="true"
            className="platinum-grain pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
          />

          <div className="container-x pointer-events-none relative z-10 h-full motion-reduce:hidden">
            {STORY_BEATS.map((beat) => (
              <StoryBeat key={beat.index} progress={progress} beat={beat} />
            ))}

            <div className="absolute inset-x-5 bottom-6 h-px overflow-hidden bg-ink/15 md:inset-x-6 xl:inset-x-10">
              <motion.div
                style={{ scaleX: progressScale }}
                className="h-full origin-left bg-brand"
              />
            </div>
          </div>

          <div className="container-x relative z-10 hidden min-h-svh flex-col justify-end pt-[42vh] pb-44 motion-reduce:flex md:pb-24">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-ink/55 uppercase">
              About ByteFX
            </p>
            <h1 className="mt-4 max-w-2xl text-[42px] leading-[1.04] font-bold tracking-normal text-ink md:text-[52px]">
              Built around the trader.
            </h1>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-body">
              We build trading around clarity: direct market access, measurable
              conditions and technology that stays out of your way.
            </p>
          </div>
        </div>
      </div>

      <div className="container-x relative border-t border-ink/10 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-end lg:gap-20">
          <div>
            <h2 className="max-w-xl text-[34px] leading-[1.08] font-bold tracking-normal text-ink md:text-[46px]">
              Everything you need. Nothing in the way.
            </h2>
            <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-body">
              ByteFX brings market access, execution and account management into
              one focused experience, from the first deposit to the final
              withdrawal.
            </p>
          </div>

          <dl className="grid border-y border-ink/15 sm:grid-cols-3">
            {FACTS.map((fact) => (
              <div
                key={fact.label}
                className="border-b border-ink/15 py-5 last:border-b-0 sm:border-r sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <dt className="text-[13px] leading-relaxed text-body">
                  {fact.label}
                </dt>
                <dd className="tnum mt-1 text-[25px] font-bold tracking-normal text-ink">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="/signup"
            className="group inline-flex h-[52px] items-center justify-center gap-2 rounded-full bg-go px-7 text-[15.5px] font-semibold whitespace-nowrap text-on-go shadow-[0_8px_24px_rgba(76,210,1,0.28)] transition-all duration-200 hover:bg-go-hover"
          >
            Open live account
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={2.5}
            />
          </a>
          <a
            href="/company/why-bytefx"
            className="inline-flex h-[52px] items-center justify-center rounded-full border border-line-strong bg-white/60 px-7 text-[15.5px] font-semibold whitespace-nowrap text-ink transition-colors duration-200 hover:border-brand hover:text-brand dark:bg-surface/60"
          >
            Why ByteFX
          </a>
        </div>
      </div>
    </section>
  );
}
