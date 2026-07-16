"use client";

import { useState } from "react";
import Link from "next/link";
import { pricing } from "@/content/content";
import { Reveal, SectionHeading } from "./ui/motion";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/**
 * Five conversion-based tiers with a monthly/annual toggle.
 * Load-bearing content: prices render without JS (monthly is the default
 * server-rendered state); the toggle is an enhancement.
 */
export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id={pricing.id} className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <SectionHeading kicker={pricing.kicker}>
          {pricing.headline}
        </SectionHeading>

        <Reveal delay={0.08} as="p">
          <span className="mt-6 block max-w-2xl text-lg leading-relaxed text-muted">
            {pricing.intro}
          </span>
        </Reveal>

        {/* ── Billing toggle ── */}
        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div
              role="group"
              aria-label="Billing period"
              className="inline-flex rounded-full border border-frost bg-white/60 p-1"
            >
              {(["Monthly", "Annual"] as const).map((label) => {
                const isAnnual = label === "Annual";
                const selected = annual === isAnnual;
                return (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setAnnual(isAnnual)}
                    className={`anno cursor-pointer rounded-full px-5 py-2 transition-colors duration-200 ${
                      selected
                        ? "bg-ink text-paper"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
            <p className="anno text-steel-deep">{pricing.annualNote}</p>
          </div>
        </Reveal>

        {/* ── Tier cards ── */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {pricing.tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 0.06}>
              <article
                className={`relative flex h-full flex-col rounded-lg border p-6 transition-all duration-300 hover:-translate-y-1.5 ${
                  tier.featured
                    ? "border-azure bg-ink text-paper shadow-[0_24px_48px_-24px_rgba(10,28,56,0.5)] hover:shadow-[0_32px_56px_-24px_rgba(10,28,56,0.65)]"
                    : "border-frost bg-white/60 hover:border-steel hover:shadow-[0_20px_40px_-24px_rgba(10,28,56,0.35)]"
                }`}
              >
                {tier.featured && (
                  <p className="anno absolute -top-3 left-6 rounded-full bg-azure px-3 py-1 text-white">
                    Most popular
                  </p>
                )}
                <h3
                  className={`anno ${
                    tier.featured ? "text-azure-soft" : "text-steel-deep"
                  }`}
                >
                  {tier.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    tier.featured ? "text-paper/60" : "text-muted"
                  }`}
                >
                  {tier.audience}
                </p>
                <p className="font-display mt-5 text-[2rem] leading-none tracking-[-0.02em]">
                  ${fmt(annual ? tier.yearly : tier.monthly)}
                  <span
                    className={`ml-1 font-sans text-sm ${
                      tier.featured ? "text-paper/60" : "text-muted"
                    }`}
                  >
                    /{annual ? "yr" : "mo"}
                  </span>
                </p>
                <p
                  className={`mt-4 border-t pt-4 text-sm leading-relaxed ${
                    tier.featured
                      ? "border-paper/15 text-paper/80"
                      : "border-frost text-muted"
                  }`}
                >
                  <span
                    className={`font-display block text-2xl ${
                      tier.featured ? "text-paper" : "text-ink"
                    }`}
                  >
                    {tier.conversions}
                  </span>
                  blueprint conversions per month
                </p>
                <Link
                  href="/early-access"
                  className={`anno mt-6 inline-flex h-10 items-center justify-center rounded-full px-4 transition-colors duration-200 ${
                    tier.featured
                      ? "bg-azure text-white hover:bg-azure-deep"
                      : "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper"
                  }`}
                >
                  Get early access
                </Link>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <aside className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-frost bg-paper-2 px-8 py-6">
            <div>
              <h3 className="anno text-steel-deep">{pricing.enterprise.name}</h3>
              <p className="mt-1 text-muted">{pricing.enterprise.note}</p>
            </div>
            <Link
              href="/early-access"
              className="anno inline-flex h-10 items-center rounded-full border border-ink/25 px-5 text-ink transition-colors duration-200 hover:border-ink hover:bg-ink hover:text-paper"
            >
              Contact us →
            </Link>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
