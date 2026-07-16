import { EarlyAccess } from "@/components/EarlyAccess";
import { ExploreLinks } from "@/components/ExploreLinks";
import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Ticker } from "@/components/Ticker";

export default function Home() {
  return (
    <main>
      <Hero />
      <Ticker />
      <Pipeline />
      <ExploreLinks />
      <EarlyAccess />
    </main>
  );
}
