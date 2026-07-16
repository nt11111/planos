import Link from "next/link";
import { explore } from "@/content/content";
import { Reveal, SectionHeading } from "./ui/motion";

/** Home-page cards routing to the sub-pages. */
export function ExploreLinks() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-28 md:py-32">
        <SectionHeading kicker={explore.kicker}>
          {explore.headline}
        </SectionHeading>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {explore.cards.map((card, i) => (
            <Reveal key={card.href} delay={i * 0.08}>
              <Link
                href={card.href}
                className="group flex h-full flex-col rounded-lg border border-frost bg-white/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-steel hover:shadow-[0_20px_40px_-24px_rgba(10,28,56,0.35)]"
              >
                <p className="anno text-steel-deep">{card.label}</p>
                <h3 className="font-display mt-4 text-2xl text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{card.body}</p>
                <span className="anno mt-auto inline-flex items-center gap-2 pt-8 text-azure-deep">
                  Read on
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1.5"
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
