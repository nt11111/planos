import { bottleneck } from "@/content/content";
import { Reveal, SectionHeading } from "./ui/motion";

function SheetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <rect x="6" y="4" width="36" height="40" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M13 14h22M13 21h22M13 28h13" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 35h8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden fill="none">
      <path
        d="M24 5 41 15v18L24 43 7 33V15L24 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M24 5v19m0 0L7 15m17 9 17-9M24 24v19" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function FlowRow({
  label,
  steps,
  duration,
  variant,
}: {
  label: string;
  steps: string[];
  duration: string;
  variant: "before" | "after";
}) {
  const after = variant === "after";
  return (
    <div
      className={`grid items-center gap-6 rounded-lg border p-7 md:grid-cols-[7rem_1fr_auto] md:p-9 ${
        after ? "border-steel-deep/40 bg-paper" : "border-frost bg-paper/60"
      }`}
    >
      <p className={`anno ${after ? "text-steel-deep" : "text-muted"}`}>{label}</p>

      <div className="flex items-center gap-4">
        <span className={`flex flex-col items-center gap-2 ${after ? "text-ink" : "text-muted"}`}>
          <SheetIcon className="h-11 w-11" />
          <span className="anno">{steps[0]}</span>
        </span>

        <span className="relative flex-1" aria-hidden>
          <svg className="h-8 w-full" preserveAspectRatio="none" viewBox="0 0 100 32">
            <line
              x1="0"
              y1="16"
              x2="94"
              y2="16"
              stroke="currentColor"
              strokeWidth={after ? 2 : 1.5}
              strokeDasharray={after ? undefined : "6 6"}
              className={
                after ? "text-azure" : "dash-crawl text-frost-2"
              }
            />
            <path
              d="M94 16l-7-5v10l7-5Z"
              fill="currentColor"
              className={after ? "text-azure" : "text-frost-2"}
            />
          </svg>
          <span
            className={`anno absolute inset-x-0 -top-3 text-center ${
              after ? "text-azure-deep" : "text-muted"
            }`}
          >
            {steps[1]}
          </span>
        </span>

        <span className={`flex flex-col items-center gap-2 ${after ? "text-ink" : "text-muted"}`}>
          <CubeIcon className="h-11 w-11" />
          <span className="anno">{steps[2]}</span>
        </span>
      </div>

      <p
        className={`anno md:max-w-[12rem] md:text-right ${
          after ? "text-steel-deep" : "text-muted"
        }`}
      >
        {duration}
      </p>
    </div>
  );
}

export function Bottleneck() {
  return (
    <section id={bottleneck.id} className="blueprint-grid-light bg-paper-2">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <SectionHeading kicker={bottleneck.kicker}>
          {bottleneck.headline[0]}
          <br />
          <em className="italic text-azure">{bottleneck.headline[1]}</em>
        </SectionHeading>

        <Reveal delay={0.1} as="p">
          <span className="mt-6 block max-w-2xl text-lg leading-relaxed text-muted">
            {bottleneck.body}
          </span>
        </Reveal>

        <div className="mt-14 flex flex-col gap-5">
          <Reveal delay={0.05}>
            <FlowRow
              label={bottleneck.before.label}
              steps={bottleneck.before.steps}
              duration={bottleneck.before.duration}
              variant="before"
            />
          </Reveal>
          <Reveal delay={0.15}>
            <FlowRow
              label={bottleneck.after.label}
              steps={bottleneck.after.steps}
              duration={bottleneck.after.duration}
              variant="after"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
