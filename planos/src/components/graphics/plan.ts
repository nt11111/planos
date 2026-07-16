/**
 * Shared floor-plan geometry.
 *
 * One plan, three views: the flat blueprint (top-down), the vectorized
 * overlay, and the extruded isometric volume all render from this data —
 * the site's core visual metaphor (2D sheet → 3D solid) is literal.
 *
 * Units are "plan meters"; scale with U when rendering.
 */

export type Seg = readonly [number, number, number, number];

export const PLAN_W = 10;
export const PLAN_H = 8;

/** Building shell, clockwise. */
export const OUTER: readonly Seg[] = [
  [0, 0, 10, 0],
  [10, 0, 10, 8],
  [10, 8, 0, 8],
  [0, 8, 0, 0],
];

/** Interior partitions, with door gaps left open. */
export const INNER: readonly Seg[] = [
  [4, 0, 4, 2],
  [4, 3, 4, 5],
  [4, 5, 6, 5],
  [7, 5, 10, 5],
];

export const WALLS: readonly Seg[] = [...OUTER, ...INNER];

/** Door swings: [hingeX, hingeY, leafEndX, leafEndY] — quarter arc from leaf to jamb. */
export const DOORS: readonly Seg[] = [
  [4, 3, 5, 3],
  [7, 5, 7, 6],
];

/** Window ticks on the shell (drawn as double lines on the flat sheet). */
export const WINDOWS: readonly Seg[] = [
  [1.5, 0, 2.8, 0],
  [6.6, 0, 7.9, 0],
  [10, 2, 10, 3.4],
  [2, 8, 3.4, 8],
  [6.2, 8, 7.6, 8],
];

/** Unique wall endpoints — the "nodes" shown during vectorization. */
export const NODES: readonly (readonly [number, number])[] = (() => {
  const seen = new Set<string>();
  const pts: [number, number][] = [];
  for (const [x1, y1, x2, y2] of WALLS) {
    for (const [x, y] of [
      [x1, y1],
      [x2, y2],
    ] as const) {
      const k = `${x},${y}`;
      if (!seen.has(k)) {
        seen.add(k);
        pts.push([x, y]);
      }
    }
  }
  return pts;
})();

/** Wall height and slab levels of the extruded volume, in plan meters. */
export const WALL_H = 4.4;
export const SLABS = [2.2, 4.4];

const C30 = Math.cos(Math.PI / 6);
const CX = PLAN_W / 2;
const CY = PLAN_H / 2;

/** Default render scale: plan meters → px. */
export const U = 30;

function isoRaw(x: number, y: number, z: number): [number, number] {
  return [(x - y) * C30, (x + y) * 0.5 - z];
}

/**
 * Project a plan point. `tilt` blends the top-down sheet (0) into the
 * isometric view (1); both are centered on the plan's midpoint so the
 * graphic pivots in place. z only reads in the isometric view.
 */
export function project(
  x: number,
  y: number,
  z: number,
  tilt: number,
  u: number = U,
): [number, number] {
  const fx = (x - CX) * u;
  const fy = (y - CY) * u;
  const [ix0, iy0] = isoRaw(x, y, z);
  const [icx, icy] = isoRaw(CX, CY, WALL_H / 2);
  const ix = (ix0 - icx) * u;
  const iy = (iy0 - icy) * u;
  return [fx + (ix - fx) * tilt, fy + (iy - fy) * tilt];
}

export function segLength([x1, y1, x2, y2]: Seg): number {
  return Math.hypot(x2 - x1, y2 - y1);
}
