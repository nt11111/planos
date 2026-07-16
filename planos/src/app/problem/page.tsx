import type { Metadata } from "next";
import { Bottleneck } from "@/components/Bottleneck";
import { CtaStrip } from "@/components/CtaStrip";
import { PageHeader } from "@/components/PageHeader";
import { Problem } from "@/components/Problem";

export const metadata: Metadata = {
  title: "The problem — Planos",
  description:
    "Inaccurate drawings carry real costs — and the bottleneck isn’t the building, it’s the blueprint.",
};

export default function ProblemPage() {
  return (
    <main>
      <PageHeader
        kicker="Why Planos exists"
        title={
          <>
            The drawing is the weakest link in the build.
          </>
        }
        lede="Before a single beam goes up, someone has to turn flat drawings into working models. Here’s what it costs when that goes wrong — and why the redraw step is the real bottleneck."
      />
      <Problem />
      <Bottleneck />
      <CtaStrip title="Skip the redraw. Keep the review." />
    </main>
  );
}
