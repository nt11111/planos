"use client";

import { useState } from "react";
import { earlyAccess } from "@/content/content";
import { Reveal } from "./ui/motion";

export function EarlyAccess({ grow = false }: { grow?: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // TODO(launch): wire this to a real endpoint (Formspree / ConvertKit /
  // your own API) before going live — submissions are client-side only
  // right now and are not stored anywhere.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      id={earlyAccess.id}
      className={`blueprint-grid-dark bg-ink text-paper ${
        grow ? "flex flex-1 items-center pt-16" : ""
      }`}
    >
      <div className="mx-auto max-w-4xl px-6 py-32 text-center md:py-44">
        <Reveal>
          <p className="anno flex items-center justify-center gap-3 text-steel-soft">
            <span aria-hidden className="inline-block h-px w-8 bg-steel-soft/60" />
            {earlyAccess.kicker}
            <span aria-hidden className="inline-block h-px w-8 bg-steel-soft/60" />
          </p>
          <h2 className="font-display mt-6 text-[length:var(--text-display-xl)] leading-[1.02] tracking-[-0.015em]">
            {earlyAccess.headline}
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-dark">
            {earlyAccess.body}
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          {submitted ? (
            <p
              role="status"
              className="mx-auto mt-10 inline-flex items-center gap-3 rounded-full border border-steel-soft/40 px-6 py-3 text-steel-soft"
            >
              <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden fill="none">
                <path
                  d="M4 10.5l4 4L16 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {earlyAccess.form.success}
            </p>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="early-access-email" className="sr-only">
                Work email
              </label>
              <input
                id="early-access-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={earlyAccess.form.placeholder}
                className="h-12 flex-1 rounded-full border border-paper/25 bg-ink-2 px-5 text-paper placeholder:text-muted-dark focus:border-azure-soft focus:outline-none"
              />
              <button
                type="submit"
                className="anno inline-flex h-12 cursor-pointer items-center justify-center rounded-full bg-azure px-6 text-white transition-colors duration-200 hover:bg-azure-deep"
              >
                {earlyAccess.form.button}
              </button>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.2} as="p">
          <span className="anno mt-16 block text-paper/40">
            {earlyAccess.closing}
          </span>
        </Reveal>
      </div>
    </section>
  );
}
