import Link from "next/link";
import { nav, site } from "@/content/content";
import { PlanosWordmark } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink py-12 text-paper">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-8 px-6">
        <Link href="/" aria-label="Planos — home">
          <PlanosWordmark dark className="text-lg" />
        </Link>

        <ul className="flex flex-wrap items-center gap-6">
          {[...nav.links, nav.cta].map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="anno text-paper/55 transition-colors duration-200 hover:text-paper"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="anno text-paper/40">
          © 2026 {site.name} · {site.tagline}
        </p>
      </div>
    </footer>
  );
}
