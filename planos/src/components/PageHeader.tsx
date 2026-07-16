import { Reveal } from "./ui/motion";

/**
 * Dark drafting-sheet intro band shared by the sub-pages — keeps the
 * blueprint identity even where the hero graphic doesn't appear.
 */
export function PageHeader({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: React.ReactNode;
  lede?: string;
}) {
  return (
    <section className="blueprint-grid-dark bg-ink pt-16 text-paper">
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <span aria-hidden className="absolute top-6 left-6 h-4 w-4 border-t border-l border-paper/30" />
        <span aria-hidden className="absolute top-6 right-6 h-4 w-4 border-t border-r border-paper/30" />

        <Reveal>
          <p className="anno flex items-center gap-3 text-steel-soft">
            <span aria-hidden className="inline-block h-px w-8 bg-steel-soft/60" />
            {kicker}
          </p>
          <h1 className="font-display mt-5 max-w-4xl text-[length:var(--text-display-lg)] leading-[1.05] tracking-[-0.01em]">
            {title}
          </h1>
          {lede ? (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-dark">
              {lede}
            </p>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}
