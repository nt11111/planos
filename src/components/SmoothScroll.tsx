"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "framer-motion";

/**
 * Site-wide smooth scrolling via Lenis.
 * Disabled entirely when the user prefers reduced motion —
 * native scrolling (and native anchor jumps) take over.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.12,
        anchors: { offset: -72 },
      }}
    >
      {children}
    </ReactLenis>
  );
}
