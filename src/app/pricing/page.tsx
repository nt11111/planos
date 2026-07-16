import type { Metadata } from "next";
import { CtaStrip } from "@/components/CtaStrip";
import { PageHeader } from "@/components/PageHeader";
import { Pricing } from "@/components/Pricing";

export const metadata: Metadata = {
  title: "Pricing — Planos",
  description:
    "Five plans sized by blueprint conversions per month — from individuals to heavy pipelines. Annual billing saves ~8%.",
};

export default function PricingPage() {
  return (
    <main>
      <PageHeader
        kicker="Pricing"
        title="Sized by sheets, not seats."
        lede="From a single drawing to a heavy monthly pipeline — five plans, one pipeline, no seat licenses."
      />
      <Pricing />
      <CtaStrip title="Start with one blueprint, on us." />
    </main>
  );
}
