"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/content";
import { PlanosWordmark } from "./Logo";

/**
 * Fixed top bar, shared by every page. Solid ink so it reads over both the
 * navy heroes and the light paper pages; a thin azure hairline along its
 * bottom edge tracks scroll progress through the current page.
 */
export function Nav() {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.4,
  });

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-paper/10 bg-ink/90 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
      >
        <Link
          href="/"
          className="text-paper text-xl"
          aria-label="Planos — home"
        >
          <PlanosWordmark dark />
        </Link>

        <ul className="hidden items-center gap-7 md:flex">
          {nav.links.map((link) => {
            const active =
              link.href === pathname ||
              (link.href.startsWith("/#") && pathname === "/");
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={active && !link.href.includes("#") ? "page" : undefined}
                  className={`anno transition-colors duration-200 hover:text-paper ${
                    active ? "text-paper" : "text-paper/60"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href={nav.cta.href}
          className="anno inline-flex h-9 items-center rounded-full bg-azure px-4 text-white transition-colors duration-200 hover:bg-azure-deep"
        >
          {nav.cta.label}
          <span aria-hidden className="ml-2">
            →
          </span>
        </Link>
      </nav>

      {/* Scroll progress hairline */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-[-1px] block h-[2px] origin-left bg-azure-soft"
        style={{ scaleX: reducedMotion ? 0 : progress }}
      />
    </header>
  );
}
