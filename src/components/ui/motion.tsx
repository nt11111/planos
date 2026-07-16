"use client";

import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

/**
 * Fade-and-rise reveal, fired once when scrolled into view.
 * Falls back to a plain div under prefers-reduced-motion.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "figure" | "li" | "p" | "h2" | "h3";
}) {
  const reducedMotion = useReducedMotion();
  const MotionTag = motion[Tag];

  if (reducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Number that counts up once when it enters the viewport.
 * Renders the final value immediately under reduced motion (and before JS).
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  className,
  duration = 1.6,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(value);

  // `once: true` on useInView means inView flips false→true exactly once,
  // so the animation starts once; cleanup only runs on unmount.
  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reducedMotion, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/** Mono kicker + serif headline, shared by every section. */
export function SectionHeading({
  kicker,
  children,
  dark = false,
  className = "",
}: {
  kicker: string;
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <Reveal className={className}>
      <p
        className={`anno flex items-center gap-3 ${
          dark ? "text-steel-soft" : "text-steel-deep"
        }`}
      >
        <span
          aria-hidden
          className={`inline-block h-px w-8 ${
            dark ? "bg-steel-soft/60" : "bg-steel-deep/60"
          }`}
        />
        {kicker}
      </p>
      <h2
        className={`font-display mt-5 max-w-3xl text-[length:var(--text-display-lg)] leading-[1.05] tracking-[-0.01em] ${
          dark ? "text-paper" : "text-ink"
        }`}
      >
        {children}
      </h2>
    </Reveal>
  );
}
