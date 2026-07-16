/**
 * Planos mark: the deck's hexagon-and-blade "P" — an open hexagon outline
 * with a solid blade closing the lower-left, rebuilt as clean SVG.
 */
export function PlanosMark({
  className,
  hex = "currentColor",
  blade = "currentColor",
}: {
  className?: string;
  hex?: string;
  blade?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 108"
      className={className}
      aria-hidden="true"
      fill="none"
    >
      {/* Hexagon outline, open at the lower left */}
      <path
        d="M 26 79 L 26 31 L 50 9 L 74 31 L 74 71 L 50 93 L 41 87"
        stroke={hex}
        strokeWidth={11}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* The blade: solid parallelogram closing the P's bowl */}
      <path d="M 22 72 L 40 82 L 40 106 L 22 96 Z" fill={blade} />
    </svg>
  );
}

export function PlanosWordmark({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`inline-flex items-baseline gap-[0.18em] ${className ?? ""}`}>
      <PlanosMark
        className="h-[1.15em] w-auto self-center"
        hex={dark ? "var(--color-steel-soft)" : "var(--color-steel-deep)"}
        blade={dark ? "var(--color-paper)" : "var(--color-ink)"}
      />
      <span className="font-sans font-semibold tracking-[-0.03em] lowercase leading-none">
        planos
      </span>
    </span>
  );
}
