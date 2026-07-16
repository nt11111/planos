"use client";

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { hero } from "@/content/content";
import { ExtrusionScene } from "./graphics/ExtrusionScene";
import { EASE_OUT_EXPO } from "./ui/motion";

/**
 * Full-viewport hero on ink: the blueprint draws itself, then pivots and
 * extrudes into a wireframe volume — played once on load. After that the
 * volume tilts gently toward the pointer (drafting model on a turntable).
 * Static final frame under prefers-reduced-motion.
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const [draw, setDraw] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [lift, setLift] = useState(0);

  // Pointer parallax (0..1 across the section, springs for lag)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-4, 4]), {
    stiffness: 60,
    damping: 18,
  });
  const rotateX = useSpring(useTransform(my, [0, 1], [3, -3]), {
    stiffness: 60,
    damping: 18,
  });

  useEffect(() => {
    if (reducedMotion) return;
    const controls = [
      animate(0, 1, { duration: 1.5, ease: "easeInOut", onUpdate: setDraw }),
      animate(0, 1, {
        duration: 1.7,
        delay: 1.2,
        ease: EASE_OUT_EXPO,
        onUpdate: setTilt,
      }),
      animate(0, 1, {
        duration: 1.5,
        delay: 1.7,
        ease: EASE_OUT_EXPO,
        onUpdate: setLift,
      }),
    ];
    return () => controls.forEach((c) => c.stop());
  }, [reducedMotion]);

  // Reduced motion: skip the sequence and show the final frame.
  const d = reducedMotion ? 1 : draw;
  const t = reducedMotion ? 1 : tilt;
  const l = reducedMotion ? 1 : lift;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const enter = (delay: number) =>
    reducedMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE_OUT_EXPO },
        };

  return (
    <section
      id="top"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        mx.set(0.5);
        my.set(0.5);
      }}
      className="blueprint-grid-dark relative flex min-h-dvh flex-col bg-ink text-paper"
    >
      <div className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-12 px-6 pt-28 pb-20 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        {/* ── Copy ── */}
        <div>
          <motion.p
            {...enter(0.1)}
            className="anno flex items-center gap-3 text-steel-soft"
          >
            <span aria-hidden className="inline-block h-px w-8 bg-steel-soft/60" />
            {hero.kicker}
          </motion.p>

          <motion.h1
            {...enter(0.22)}
            className="font-display mt-6 text-[length:var(--text-display-xl)] leading-[1.02] tracking-[-0.015em]"
          >
            {hero.headline}{" "}
            <em className="italic text-azure-soft">{hero.emphasis}</em>
          </motion.h1>

          <motion.p
            {...enter(0.34)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted-dark"
          >
            {hero.subhead}
          </motion.p>

          <motion.div {...enter(0.46)} className="mt-10 flex flex-wrap items-center gap-5">
            <a
              href={hero.cta.href}
              className="anno inline-flex h-12 items-center rounded-full bg-azure px-6 text-white transition-colors duration-200 hover:bg-azure-deep"
            >
              {hero.cta.label}
              <span aria-hidden className="ml-3">
                ↓
              </span>
            </a>
            <Link
              href={hero.secondary.href}
              className="anno text-paper/60 transition-colors duration-200 hover:text-paper"
            >
              {hero.secondary.label} →
            </Link>
          </motion.div>
        </div>

        {/* ── Blueprint → volume graphic ── */}
        <motion.figure
          {...(reducedMotion
            ? {}
            : {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.9, delay: 0.15 },
              })}
          style={
            reducedMotion
              ? undefined
              : { rotateX, rotateY, transformPerspective: 1000 }
          }
          className="relative mx-auto w-full max-w-[560px]"
        >
          {/* Drafting-sheet corner ticks */}
          <span aria-hidden className="absolute -top-1 -left-1 h-4 w-4 border-t border-l border-paper/30" />
          <span aria-hidden className="absolute -top-1 -right-1 h-4 w-4 border-t border-r border-paper/30" />
          <span aria-hidden className="absolute -bottom-1 -left-1 h-4 w-4 border-b border-l border-paper/30" />
          <span aria-hidden className="absolute -bottom-1 -right-1 h-4 w-4 border-b border-r border-paper/30" />

          <ExtrusionScene draw={d} tilt={t} lift={l} className="w-full" />

          <figcaption className="anno absolute top-3 left-4 text-paper/50">
            {hero.annotations.sheet}
          </figcaption>
          <span
            className="anno absolute right-2 top-1/2 hidden -translate-y-1/2 text-paper/50 transition-opacity duration-500 sm:block"
            style={{ opacity: l > 0.15 ? 1 : 0 }}
          >
            {hero.annotations.extrude}
          </span>
          <span
            className="anno absolute bottom-3 left-4 text-paper/50 transition-opacity duration-500"
            style={{ opacity: l > 0.6 ? 1 : 0 }}
          >
            {hero.annotations.export}
          </span>
        </motion.figure>
      </div>

      {/* ── Scroll cue ── */}
      <motion.div
        {...(reducedMotion
          ? {}
          : {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              transition: { duration: 1, delay: 1.2 },
            })}
        className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center"
        aria-hidden
      >
        <div className="anno flex flex-col items-center gap-2 text-paper/40">
          <span>Scroll</span>
          <motion.span
            className="block h-8 w-px bg-paper/40"
            animate={reducedMotion ? {} : { scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
