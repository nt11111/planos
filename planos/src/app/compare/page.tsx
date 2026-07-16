import type { Metadata } from "next";
import { Comparison } from "@/components/Comparison";
import { CtaStrip } from "@/components/CtaStrip";
import { PageHeader } from "@/components/PageHeader";
import { Testimonial } from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "Compare — Planos",
  description:
    "Planos vs. scan-to-BIM tools and consumer visualizers: the only approach that returns editable CAD without a laser scanner.",
};

export default function ComparePage() {
  return (
    <main>
      <PageHeader
        kicker="The landscape"
        title="Every tool makes a model. One makes it editable."
        lede="Scan-to-BIM rigs need the finished building and a LiDAR scanner. Consumer apps make pretty pictures you can’t engineer with. Here’s the field, on four things firms actually care about."
      />
      <Comparison />
      <Testimonial />
      <CtaStrip title="See the difference on your own sheet." />
    </main>
  );
}
