import { Easing, interpolate } from 'remotion';

export const ease = Easing.bezier(0.65, 0, 0.35, 1);
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);

export const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

export const prog = (f: number, a: number, b: number, e = ease) =>
  interpolate(f, [a, b], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: e,
  });

export const rnd = (i: number) => {
  const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export type KF = [number, number, number];
export const kf = (f: number, pts: KF[]) => {
  if (f <= pts[0][0]) return { x: pts[0][1], y: pts[0][2] };
  for (let i = 0; i < pts.length - 1; i++) {
    const [fa, xa, ya] = pts[i];
    const [fb, xb, yb] = pts[i + 1];
    if (f < fb) {
      const t = ease((f - fa) / (fb - fa));
      return { x: lerp(xa, xb, t), y: lerp(ya, yb, t) };
    }
  }
  const l = pts[pts.length - 1];
  return { x: l[1], y: l[2] };
};

export const blobPath = (cx: number, cy: number, r: number, seed: number, t = 0, n = 64) => {
  let d = '';
  for (let i = 0; i <= n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 +
      0.22 * Math.sin(a * 2 + seed + t * 0.5) +
      0.14 * Math.sin(a * 3 - seed * 1.7 + t * 0.35) +
      0.08 * Math.sin(a * 5 + seed * 2.3 - t * 0.6);
    const x = cx + Math.cos(a) * r * k;
    const y = cy + Math.sin(a) * r * k;
    d += (i === 0 ? 'M' : 'L') + x.toFixed(1) + ' ' + y.toFixed(1);
  }
  return d + 'Z';
};
