import {
  DOORS,
  OUTER,
  PLAN_H,
  PLAN_W,
  SLABS,
  U,
  WALLS,
  WALL_H,
  WINDOWS,
  project,
  segLength,
  type Seg,
} from "./plan";

/**
 * The blueprint-to-volume graphic. Pure function of its props so parents
 * can drive it from springs, scroll progress, or leave it static.
 *
 * draw  0→1: linework draws itself in (dashoffset), staggered per segment
 * tilt  0→1: top-down sheet pivots into isometric view
 * lift  0→1: walls extrude to full height (reads only once tilted)
 */
export function ExtrusionScene({
  draw = 1,
  tilt = 0,
  lift = 0,
  className,
  children,
}: {
  draw?: number;
  tilt?: number;
  lift?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const z = WALL_H * lift;
  const flatDecorOpacity = Math.max(0, 1 - tilt * 2.2);
  const volumeOpacity = Math.min(1, Math.max(0, (tilt - 0.25) * 2));

  const drawnSeg = (seg: Seg, i: number, total: number, zLevel = 0) => {
    const [x1, y1, x2, y2] = seg;
    const [ax, ay] = project(x1, y1, zLevel, tilt);
    const [bx, by] = project(x2, y2, zLevel, tilt);
    const len = segLength(seg) * U;
    // Stagger: segment i draws inside its own window of the 0..1 draw range.
    const start = (i / total) * 0.55;
    const t = Math.min(1, Math.max(0, (draw - start) / 0.45));
    return { ax, ay, bx, by, len, t };
  };

  return (
    <svg
      viewBox="-280 -250 560 500"
      className={className}
      role="img"
      aria-label="A 2D floor plan extruding into a 3D wireframe building model"
    >
      {/* ── Base plan linework (walls at z=0) ── */}
      {WALLS.map((seg, i) => {
        const { ax, ay, bx, by, len, t } = drawnSeg(seg, i, WALLS.length);
        return (
          <line
            key={`w${i}`}
            x1={ax}
            y1={ay}
            x2={bx}
            y2={by}
            stroke="var(--color-line-strong)"
            strokeWidth={i < OUTER.length ? 2.25 : 1.5}
            strokeDasharray={len}
            strokeDashoffset={len * (1 - t)}
            strokeLinecap="round"
          />
        );
      })}

      {/* ── Flat-sheet decorations: door swings & window ticks ── */}
      <g opacity={flatDecorOpacity * Math.min(1, draw * 1.4)}>
        {DOORS.map(([hx, hy, ex, ey], i) => {
          // Leaf drawn open; swing arc runs leaf-tip → closed position
          // (leaf vector rotated 90° about the hinge, back onto the wall gap).
          const cx = hx - (ey - hy);
          const cy = hy + (ex - hx);
          const [ax, ay] = project(hx, hy, 0, tilt);
          const [bx, by] = project(ex, ey, 0, tilt);
          const [px, py] = project(cx, cy, 0, tilt);
          const r = Math.hypot(bx - ax, by - ay);
          return (
            <g key={`d${i}`}>
              <line
                x1={ax}
                y1={ay}
                x2={bx}
                y2={by}
                stroke="var(--color-line)"
                strokeWidth={1.25}
              />
              <path
                d={`M ${bx} ${by} A ${r} ${r} 0 0 1 ${px} ${py}`}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth={1}
                strokeDasharray="3 4"
              />
            </g>
          );
        })}
        {WINDOWS.map((seg, i) => {
          const [x1, y1, x2, y2] = seg;
          const horizontal = y1 === y2;
          const off = 0.14;
          const [ax, ay] = project(
            x1 + (horizontal ? 0 : off),
            y1 + (horizontal ? off : 0),
            0,
            tilt,
          );
          const [bx, by] = project(
            x2 + (horizontal ? 0 : off),
            y2 + (horizontal ? off : 0),
            0,
            tilt,
          );
          const [cx, cy] = project(
            x1 - (horizontal ? 0 : off),
            y1 - (horizontal ? off : 0),
            0,
            tilt,
          );
          const [dx, dy] = project(
            x2 - (horizontal ? 0 : off),
            y2 - (horizontal ? off : 0),
            0,
            tilt,
          );
          return (
            <g key={`win${i}`} stroke="var(--color-line)" strokeWidth={1}>
              <line x1={ax} y1={ay} x2={bx} y2={by} />
              <line x1={cx} y1={cy} x2={dx} y2={dy} />
            </g>
          );
        })}
      </g>

      {/* ── Extruded volume: verticals, wall tops, slab outlines ── */}
      <g opacity={volumeOpacity}>
        {WALLS.map((seg, i) => {
          const [x1, y1, x2, y2] = seg;
          const [ax, ay] = project(x1, y1, 0, tilt);
          const [bx, by] = project(x2, y2, 0, tilt);
          const [tx1, ty1] = project(x1, y1, z, tilt);
          const [tx2, ty2] = project(x2, y2, z, tilt);
          return (
            <g key={`v${i}`} stroke="var(--color-line)" strokeWidth={1.1}>
              <line x1={ax} y1={ay} x2={tx1} y2={ty1} />
              <line x1={bx} y1={by} x2={tx2} y2={ty2} />
            </g>
          );
        })}
        {WALLS.map((seg, i) => {
          const [x1, y1, x2, y2] = seg;
          const [ax, ay] = project(x1, y1, z, tilt);
          const [bx, by] = project(x2, y2, z, tilt);
          return (
            <line
              key={`t${i}`}
              x1={ax}
              y1={ay}
              x2={bx}
              y2={by}
              stroke="var(--color-line-strong)"
              strokeWidth={i < OUTER.length ? 1.8 : 1.2}
              strokeLinecap="round"
            />
          );
        })}
        {SLABS.map((slabZ, i) => {
          if (z < slabZ - 0.01) return null;
          const pts = [
            [0, 0],
            [PLAN_W, 0],
            [PLAN_W, PLAN_H],
            [0, PLAN_H],
          ]
            .map(([x, y]) => project(x, y, slabZ, tilt).join(","))
            .join(" ");
          return (
            <polygon
              key={`s${i}`}
              points={pts}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth={1}
              strokeDasharray="2 5"
            />
          );
        })}
      </g>

      {children}
    </svg>
  );
}
