import type { Metadata } from "next";
import { EarlyAccess } from "@/components/EarlyAccess";

export const metadata: Metadata = {
  title: "Early access — Planos",
  description:
    "Request early access to Planos — bring a blueprint, leave with an editable 3D CAD model.",
};

export default function EarlyAccessPage() {
  return (
    <main className="flex min-h-dvh flex-col">
      <EarlyAccess grow />
    </main>
  );
}
