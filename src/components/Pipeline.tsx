"use client";

import { useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { pipeline } from "@/content/content";
import { ExtrusionScene } from "./graphics/ExtrusionScene";
import { NODES, WALLS, U, project, segLength } from "./graphics/plan";
import { Reveal, SectionHeading } from "./ui/motion";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const range = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/** Stage boundaries within the pinned scroll (p ∈ 0..1). */
const STAGE_STARTS = [0, 0.24, 0.47, 0.8];

function stageOf(p: number): number {
  if (p < STAGE_STARTS[1]) return 0;
  if (p < STAGE_STARTS[2]) return 1;
  if (p < STAGE_STARTS[3]) return 2;
  return 3;
}

/** Representative frames for the static (mobile / reduced-motion) fallback. */
const STATIC_P = [0.16, 0.44, 0.78, 0.97];

const SEG_BOXES = [
  { corners: [3.7, -0.3, 4.3, 5.3], label: "WALL · 0.98", at: [4.6, 0.6] },
  { corners: [3.7, 1.7, 5.2, 3.4], label: "DOOR · 0.91", at: [5.45, 2.4] },
  { corners: [1.2, -0.45, 3.1, 0.45], label: "WINDOW · 0.87", at: [1.2, -0.8] },
] as const;

const STEP_ITEMS = [
  ...pipeline.steps,
  {
    n: "04",
    name: "Export & review",
    tech: "STL / STEP · HUMAN SIGN-OFF",
    body: pipeline.humanInLoop.body,
  },
];

function detailFor(stage: number): string {
  switch (stage) {
    case 0:
      return "SCANNING SHEET · A-101";
    case 1:
      return "247 VERTICES · 38 EDGES";
    case 2:
      return "EXTRUDE 0 → 4.4 M";
    default:
      return "1 ELEMENT FLAGGED → REVIEWED";
  }
}

/**
 * The scene itself — pure function of progress p, so it can be driven by
 * live scroll (pinned takeover) or rendered as a fixed frame (fallback).
 */
function SceneFrame({ p, className }: { p: number; className?: string }) {
  const draw = range(p, 0, 0.05);
  const tilt = range(p, 0.47, 0.62);
  const lift = range(p, 0.6, 0.78);

  const scanT = range(p, 0.02, 0.2);
  const scanOpacity = scanT > 0 && scanT < 1 ? 1 : 0;
  const scanY = -140 + 280 * scanT;

  const vecDraw = range(p, 0.24, 0.42);
  const nodeOpacity = range(p, 0.25, 0.3) * (1 - range(p, 0.5, 0.56));

  const flagged = range(p, 0.82, 0.86);
  const approved = p > 0.92;
  const z = 4.4 * lift;

  // Flag rides the top edge of the wall segment [7,5 → 10,5].
  const [fx1, fy1] = project(7, 5, z, tilt);
  const [fx2, fy2] = project(10, 5, z, tilt);

  return (
    <ExtrusionScene draw={draw} tilt={tilt} lift={lift} className={className}>
      {/* ── Stage 1: scanline + segmentation boxes ── */}
      <g opacity={scanOpacity}>
        <line
          x1={-175}
          y1={scanY}
          x2={175}
          y2={scanY}
          stroke="var(--color-steel-soft)"
          strokeWidth={1}
        />
        <rect
          x={-175}
          y={scanY - 26}
          width={350}
          height={26}
          fill="url(#scan-fade)"
        />
      </g>
      <defs>
        <linearGradient id="scan-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--color-steel-soft)" stopOpacity="0" />
          <stop offset="1" stopColor="var(--color-steel-soft)" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {SEG_BOXES.map((box, i) => {
        const boxIn = range(p, 0.07 + i * 0.045, 0.1 + i * 0.045);
        const boxOut = 1 - range(p, 0.24, 0.28);
        const o = boxIn * boxOut;
        if (o <= 0) return null;
        const [ax, ay, bx, by] = box.corners;
        const pts = [
          [ax, ay],
          [bx, ay],
          [bx, by],
          [ax, by],
        ]
          .map(([x, y]) => project(x, y, 0, tilt).join(","))
          .join(" ");
        const [lx, ly] = project(box.at[0], box.at[1], 0, tilt);
        return (
          <g key={box.label} opacity={o}>
            <polygon
              points={pts}
              fill="none"
              stroke="var(--color-steel-soft)"
              strokeWidth={1}
              strokeDasharray="4 4"
            />
            <text
              x={lx}
              y={ly}
              fill="var(--color-steel-soft)"
              fontSize={11}
              letterSpacing={1.2}
              className="font-mono"
            >
              {box.label}
            </text>
          </g>
        );
      })}

      {/* ── Stage 2: vector pass re-traces walls ── */}
      {vecDraw > 0 &&
        WALLS.map((seg, i) => {
          const [x1, y1, x2, y2] = seg;
          const [ax, ay] = project(x1, y1, 0, tilt);
          const [bx, by] = project(x2, y2, 0, tilt);
          const len = segLength(seg) * U;
          const start = (i / WALLS.length) * 0.55;
          const t = clamp01((vecDraw - start) / 0.45);
          return (
            <line
              key={`vec${i}`}
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke="var(--color-steel-soft)"
              strokeWidth={1.6}
              strokeDasharray={len}
              strokeDashoffset={len * (1 - t)}
              strokeLinecap="round"
              opacity={0.9}
            />
          );
        })}
      {nodeOpacity > 0 &&
        NODES.map(([x, y], i) => {
          const [px, py] = project(x, y, 0, tilt);
          return (
            <rect
              key={`n${i}`}
              x={px - 3}
              y={py - 3}
              width={6}
              height={6}
              fill="var(--color-ink)"
              stroke="var(--color-steel-soft)"
              strokeWidth={1.2}
              opacity={nodeOpacity}
            />
          );
        })}

      {/* ── Stage 4: flagged element for human review ── */}
      {flagged > 0 && (
        <g opacity={flagged}>
          <line
            x1={fx1}
            y1={fy1}
            x2={fx2}
            y2={fy2}
            stroke={approved ? "var(--color-steel-soft)" : "var(--color-azure-soft)"}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <line
            x1={(fx1 + fx2) / 2}
            y1={(fy1 + fy2) / 2}
            x2={(fx1 + fx2) / 2 + 46}
            y2={(fy1 + fy2) / 2 - 34}
            stroke="var(--color-line)"
            strokeWidth={1}
          />
          <text
            x={(fx1 + fx2) / 2 + 52}
            y={(fy1 + fy2) / 2 - 30}
            fill={approved ? "var(--color-steel-soft)" : "var(--color-azure-soft)"}
            fontSize={11}
            letterSpacing={1.2}
            className="font-mono"
          >
            {approved ? "REVIEWED ✓" : "REVIEW · LOW CONFIDENCE"}
          </text>
        </g>
      )}
    </ExtrusionScene>
  );
}

/**
 * Full-viewport pinned takeover: the scene owns the whole screen and the
 * HUD (step title, tech line, counter, detail chip) floats at the edges —
 * the drafting-table version of "scroll to go inside".
 */
function PinnedTakeover() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setP(v));

  const stage = stageOf(p);

  return (
    <div ref={ref} className="relative hidden h-[520vh] lg:block">
      <div className="blueprint-grid-dark sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* The scene owns the viewport */}
        <SceneFrame p={p} className="h-[92vh] w-auto max-w-none" />

        {/* ── HUD: step identity, top-left ──
            Explicit width: every child is absolutely positioned, so the
            container would otherwise collapse to zero and wrap text at
            min-content. */}
        <div className="pointer-events-none absolute top-24 left-6 w-72 md:left-12 xl:w-96">
          {STEP_ITEMS.map((s, i) => (
            <div
              key={s.name}
              className="absolute inset-x-0 transition-all duration-500"
              style={{
                opacity: stage === i ? 1 : 0,
                transform: stage === i ? "translateY(0)" : "translateY(12px)",
              }}
              aria-hidden={stage !== i}
            >
              <p className="anno text-azure-soft">
                {s.n} · {s.tech}
              </p>
              <h3 className="font-display mt-3 text-4xl text-paper md:text-5xl">
                {s.name}
              </h3>
              <p className="mt-4 max-w-sm leading-relaxed text-muted-dark">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* ── HUD: counter + progress, top-right ── */}
        <div className="pointer-events-none absolute top-24 right-6 flex flex-col items-end gap-3 md:right-12">
          <p className="anno text-paper/60 tabular-nums">{`0${stage + 1} / 04`}</p>
          <div className="flex gap-1.5">
            {STEP_ITEMS.map((s, i) => (
              <span
                key={s.name}
                className={`h-px w-8 transition-colors duration-300 ${
                  i <= stage ? "bg-azure-soft" : "bg-paper/20"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ── HUD: live detail, bottom-left ── */}
        <p className="anno pointer-events-none absolute bottom-10 left-6 text-steel-soft/80 md:left-12">
          {detailFor(stage)}
        </p>

        {/* ── Export chips, bottom-center, final beat ── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-9 flex justify-center gap-3 transition-opacity duration-300"
          style={{ opacity: range(p, 0.86, 0.9) }}
          aria-hidden={stage !== 3}
        >
          {pipeline.exportFormats.map((f) => (
            <span
              key={f}
              className="anno rounded-full border border-paper/25 bg-ink-2 px-4 py-2 text-paper"
            >
              .{f}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Pipeline() {
  const reducedMotion = useReducedMotion();

  return (
    <section id={pipeline.id} className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-16 md:pt-36">
        <SectionHeading kicker={pipeline.kicker} dark>
          {pipeline.headline}
        </SectionHeading>
      </div>

      {/* ── Pinned takeover (desktop, motion allowed) ── */}
      {!reducedMotion && <PinnedTakeover />}

      {/* ── Stacked fallback (mobile always; everywhere under reduced motion) ── */}
      <div
        className={`mx-auto max-w-7xl px-6 ${reducedMotion ? "" : "lg:hidden"}`}
      >
        <ol className="flex flex-col gap-12">
          {STEP_ITEMS.map((step, i) => (
            <li key={step.name}>
              <Reveal>
                <p className="anno text-azure-soft">
                  {step.n} · {step.tech}
                </p>
                <h3 className="font-display mt-2 text-2xl">{step.name}</h3>
                <p className="mt-2 max-w-xl leading-relaxed text-muted-dark">
                  {step.body}
                </p>
                <figure className="blueprint-grid-dark mt-6 overflow-hidden rounded-lg border border-paper/10 bg-ink-2/40 p-3">
                  <div className="relative">
                    <SceneFrame p={STATIC_P[i]} className="w-full" />
                    <p className="anno absolute bottom-1 left-2 text-steel-soft/80">
                      {detailFor(i)}
                    </p>
                  </div>
                </figure>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Stance + feature cards ── */}
      <div className="mx-auto max-w-7xl px-6 pt-24 pb-28 md:pb-36">
        <Reveal>
          <p className="font-display mx-auto max-w-4xl text-center text-[length:var(--text-display-md)] leading-snug text-paper">
            “{pipeline.aiStance}”
          </p>
        </Reveal>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-paper/10 bg-paper/10 md:grid-cols-3">
          {pipeline.featureCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.08} className="bg-ink">
              <div className="h-full p-8">
                <h3 className="anno text-steel-soft">{card.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-dark">{card.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
