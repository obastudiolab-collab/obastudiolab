import React from 'react';
import { Easing, interpolate } from 'remotion';

/* Logo oba- reconstruido con primitivas (arcos y lineas con extremos redondeados),
   medido sobre el PNG original (IoU 0.95). Cada parte es un "actor": el trazo se dibuja
   con pathLength=1 y un escalonado tipo pixel2motion (anticipacion 20 / accion 50 / cierre 30). */

const SWK = 72.5;
const E = Easing.bezier(0.65, 0, 0.35, 1);
const seg = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: E });

const circleTop = (cx: number, cy: number, r: number) =>
  `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r}`;
const circleLeft = (cx: number, cy: number, r: number) =>
  `M ${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r} ${cy} A ${r} ${r} 0 1 1 ${cx - r} ${cy}`;
const circleRightCCW = (cx: number, cy: number, r: number) =>
  `M ${cx + r} ${cy} A ${r} ${r} 0 1 0 ${cx - r} ${cy} A ${r} ${r} 0 1 0 ${cx + r} ${cy}`;

type Part = { id: string; d: string; a: number; b: number };
const PARTS: Part[] = [
  { id: 'o', d: circleTop(369, 1175, 175.2), a: 0, b: 26 },
  { id: 'b-stem', d: 'M 655 587 L 655 1345', a: 12, b: 34 },
  { id: 'b-bowl', d: circleLeft(831.5, 1175, 175.2), a: 22, b: 48 },
  { id: 'a-bowl', d: circleRightCCW(1297.5, 1173.5, 176), a: 34, b: 60 },
  { id: 'a-stem', d: 'M 1473 995 L 1473 1345', a: 48, b: 66 },
  { id: 'dash', d: 'M 1630 1170.5 L 1806 1170.5', a: 56, b: 74 },
];

export const LOGO_DRAW_FRAMES = 74;

export const LogoDraw: React.FC<{ f: number; w: number; color: string; style?: React.CSSProperties }> = ({ f, w, color, style }) => {
  const h = (w * 880) / 1720;
  const settle = interpolate(f, [LOGO_DRAW_FRAMES - 6, LOGO_DRAW_FRAMES + 8, LOGO_DRAW_FRAMES + 22], [1, 1.014, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return (
    <svg width={w} height={h} viewBox="140 530 1720 880" style={{ display: 'block', scale: `${settle}`, ...style }}>
      {PARTS.map((p) => {
        const t = seg(f, p.a, p.b);
        return (
          <path
            key={p.id}
            d={p.d}
            pathLength={1}
            fill="none"
            stroke={color}
            strokeWidth={SWK}
            strokeLinecap="round"
            strokeDasharray="1 1"
            strokeDashoffset={1 - t}
            opacity={t > 0.001 ? 1 : 0}
          />
        );
      })}
    </svg>
  );
};
