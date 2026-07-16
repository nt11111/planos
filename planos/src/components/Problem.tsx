import { problem } from "@/content/content";
import { CountUp, Reveal, SectionHeading } from "./ui/motion";

/**
 * The problem, treated with restraint: data on a light background,
 * factual framing, cited sources. Real people died in these events —
 * no dramatic imagery, no warning-red graphics.
 */
export function Problem() {
  return (
    <section id={problem.id} className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-36">
        <SectionHeading kicker={problem.kicker}>
          {problem.headline}
        </SectionHeading>

        <Reveal delay={0.1} as="p">
          <span className="mt-6 block max-w-2xl text-lg leading-relaxed text-muted">
            {problem.intro}
          </span>
        </Reveal>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-lg border border-frost bg-frost md:grid-cols-3">
          {problem.stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08} className="bg-paper">
              <div className="flex h-full flex-col p-8 md:p-10">
                <dd className="font-display order-1 text-6xl tracking-[-0.02em] text-ink tabular-nums md:text-7xl">
                  <CountUp
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                </dd>
                <dt className="order-2 mt-4 max-w-[26ch] leading-snug text-ink/80">
                  {stat.label}
                </dt>
                <p className="anno order-3 mt-auto pt-6 text-muted">
                  Source · {stat.source}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.15}>
          <aside className="mt-10 max-w-3xl border-l-2 border-steel pl-6">
            <h3 className="anno text-steel-deep">{problem.caseNote.title}</h3>
            <p className="mt-3 leading-relaxed text-muted">
              {problem.caseNote.body}
            </p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
