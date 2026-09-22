import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { VS, VW, VH } from './vtheme';
import { prog, easeOut } from '../utils';
import { Photo, VFade } from './vui';

const WORDS: { t: string; x: number; y: number }[] = [
  { t: 'territorio', x: 290, y: 330 },
  { t: 'origen', x: 790, y: 480 },
  { t: 'entorno', x: 220, y: 700 },
  { t: 'fermentación', x: 690, y: 910 },
  { t: 'memoria', x: 310, y: 1130 },
  { t: 'naturaleza', x: 800, y: 1330 },
  { t: 'producto', x: 240, y: 1530 },
  { t: 'tiempo', x: 640, y: 1730 },
];
const STEP = 22;
const START = 12;
const BG = ['DJI_0750.jpg', 'oba-paraje-foto-cueva-de-los-angeles.webp', 'oba-pack-noche.jpg', 'oba-paraje-foto-alcala-del-jucar.webp'];
const CROSS: [number, number][] = [[0, 2], [1, 3], [2, 4], [3, 5], [4, 6], [5, 7], [0, 3], [2, 5], [4, 7]];

export const VPhil: React.FC = () => {
  const f = useCurrentFrame();
  const seg = VS.phil.dur / BG.length;
  const pos = WORDS.map((w, i) => ({
    ...w,
    x: w.x + Math.sin(f * 0.03 + i * 1.7) * 12,
    y: w.y + Math.cos(f * 0.026 + i * 2.3) * 9,
    a: START + i * STEP,
  }));

  return (
    <VFade dur={VS.phil.dur} inF={10} outF={10}>
      <AbsoluteFill style={{ background: C.ink }}>
        {BG.map((b, i) => {
          const op = Math.min(prog(f, i * seg - 12, i * seg + 8), i < BG.length - 1 ? 1 - prog(f, (i + 1) * seg - 12, (i + 1) * seg + 8) : 1);
          return (
            <div key={b} style={{ position: 'absolute', inset: 0, opacity: i === 0 ? Math.min(1, 1 - prog(f, seg - 12, seg + 8) + 0) : op }}>
              <Photo src={b} f={Math.max(0, f - i * seg + 12)} dur={seg + 30} z0={1.06} z1={1.18} x0={i % 2 ? 24 : -24} x1={i % 2 ? -24 : 24} />
            </div>
          );
        })}
        <AbsoluteFill style={{ background: 'rgba(8,6,4,0.62)' }} />

        <svg width={VW} height={VH} style={{ position: 'absolute', left: 0, top: 0 }}>
          {CROSS.map(([a, b]) => {
            const pa = pos[a];
            const pb = pos[b];
            const q = prog(f, pb.a + 12, pb.a + 42);
            if (q <= 0) return null;
            return <line key={`c${a}-${b}`} x1={pa.x} y1={pa.y} x2={pa.x + (pb.x - pa.x) * q} y2={pa.y + (pb.y - pa.y) * q} stroke={C.cream} strokeWidth={1} opacity={0.22} />;
          })}
          {pos.slice(0, -1).map((pa, i) => {
            const pb = pos[i + 1];
            const q = prog(f, pb.a - 6, pb.a + 16);
            if (q <= 0) return null;
            return <line key={`s${i}`} x1={pa.x} y1={pa.y} x2={pa.x + (pb.x - pa.x) * q} y2={pa.y + (pb.y - pa.y) * q} stroke={C.cream} strokeWidth={1.6} opacity={0.6} />;
          })}
          {pos.map((p, i) => {
            const s = prog(f, p.a, p.a + 14, easeOut);
            const ring = prog(f, p.a, p.a + 30);
            if (f < p.a) return null;
            return (
              <g key={p.t}>
                <circle cx={p.x} cy={p.y} r={5.5 * s} fill={C.cream} />
                <circle cx={p.x} cy={p.y} r={5 + 22 * ring} fill="none" stroke={C.cream} strokeWidth={1} opacity={0.5 * (1 - ring)} />
              </g>
            );
          })}
        </svg>

        {pos.map((p, i) => {
          const o = prog(f, p.a + 2, p.a + 22, easeOut);
          const right = p.x < VW / 2;
          return (
            <div key={p.t} style={{ position: 'absolute', top: p.y, transform: `translateY(-50%) translateX(${(right ? 1 : -1) * (1 - o) * 14}px)`, [right ? 'left' : 'right']: right ? p.x + 24 : VW - p.x + 24, fontFamily: FONT, fontWeight: 500, fontSize: 34, letterSpacing: `${0.14 - 0.08 * o}em`, color: C.cream, opacity: o, textShadow: '0 2px 18px rgba(0,0,0,0.5)', whiteSpace: 'nowrap' }}>
              {p.t}
            </div>
          );
        })}
      </AbsoluteFill>
    </VFade>
  );
};
