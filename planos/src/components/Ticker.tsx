import { ticker } from "@/content/content";

/**
 * Drafting-stamp marquee. Two identical runs make the CSS loop seamless;
 * the animation is disabled under prefers-reduced-motion (globals.css).
 */
export function Ticker() {
  const run = (hidden: boolean) => (
    <ul
      aria-hidden={hidden}
      className="flex shrink-0 items-center"
    >
      {ticker.map((item) => (
        <li key={item} className="anno flex items-center text-steel-soft/80">
          <span className="px-6">{item}</span>
          <span aria-hidden className="h-1 w-1 rotate-45 bg-azure-soft/60" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="border-y border-paper/10 bg-ink py-4 text-paper">
      <div className="marquee flex w-full overflow-hidden">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
