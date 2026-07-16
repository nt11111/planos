import Link from "next/link";
import { Reveal } from "./ui/motion";

/** Bottom-of-page bridge from a sub-page to the early-access form. */
export function CtaStrip({
  title = "Ready to see your own blueprint in 3D?",
}: {
  title?: string;
}) {
  return (
    <section className="blueprint-grid-dark border-t border-paper/10 bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-16">
        <Reveal>
          <h2 className="font-display max-w-xl text-3xl leading-snug">
            {title}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href="/early-access"
            className="anno inline-flex h-12 items-center rounded-full bg-azure px-6 text-white transition-colors duration-200 hover:bg-azure-deep"
          >
            Request early access
            <span aria-hidden className="ml-3">
              →
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
