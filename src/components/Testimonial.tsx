import { testimonial } from "@/content/content";
import { Reveal } from "./ui/motion";

export function Testimonial() {
  return (
    <section className="blueprint-grid-dark bg-ink text-paper">
      <div className="mx-auto max-w-5xl px-6 py-28 md:py-36">
        <Reveal>
          <figure className="text-center">
            <span
              aria-hidden
              className="font-display block text-7xl leading-none text-azure-soft"
            >
              “
            </span>
            <blockquote className="font-display mx-auto -mt-4 max-w-3xl text-[length:var(--text-display-md)] leading-snug">
              {testimonial.quote}
            </blockquote>
            <figcaption className="mt-8">
              <p className="font-medium text-paper">{testimonial.name}</p>
              <p className="anno mt-2 text-muted-dark">{testimonial.role}</p>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
