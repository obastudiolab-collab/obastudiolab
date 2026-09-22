import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { FONT } from '../theme';
import { VS } from './vtheme';
import { prog, easeOut } from '../utils';
import { Burger, Lang, Photo, VFade, VLogo } from './vui';

const BG = ['oba-fondo-principal.jpg', 'oba-restaurante.jpg', 'oba-entorno.jpg', 'oba-nosotros.jpg'];
const WORDS = ['RESTAURANTE', 'ENTORNO', 'NOSOTROS'];

export const VHome: React.FC = () => {
  const f = useCurrentFrame();
  const seg = 46;
  const active = Math.min(3, Math.floor(f / seg));
  return (
    <VFade dur={VS.home.dur} inF={12} outF={10}>
      <AbsoluteFill style={{ background: '#000' }}>
        {BG.map((b, i) => {
          const op = i === 0 ? 1 - prog(f, seg - 8, seg + 6) * (active >= 1 ? 1 : 0)
            : Math.min(prog(f, i * seg - 8, i * seg + 6), i < 3 ? 1 - prog(f, (i + 1) * seg - 8, (i + 1) * seg + 6) : 1);
          return (
            <div key={b} style={{ position: 'absolute', inset: 0, opacity: op, filter: `blur(${(1 - op) * 10}px)` }}>
              <Photo src={b} f={f - Math.max(0, i * seg - 8)} dur={90} z0={1.04} z1={1.16} x0={i % 2 ? 24 : -24} x1={i % 2 ? -24 : 24} />
            </div>
          );
        })}
        <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 35%, rgba(0,0,0,0.65) 100%)' }} />
        <div style={{ position: 'absolute', left: 60, top: 60, opacity: prog(f, 6, 24) }}><VLogo w={190} style={{ marginTop: -50 }} /></div>
        <div style={{ opacity: prog(f, 6, 24) }}><Lang /><Burger color="#fff" /></div>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 60 }}>
          {WORDS.map((w, i) => {
            const p = prog(f, 10 + i * 8, 34 + i * 8, easeOut);
            const on = active === i + 1;
            const dim = active === 0 || on ? 1 : 0.42;
            return (
              <div key={w} style={{ position: 'relative', fontFamily: FONT, fontWeight: 500, fontSize: 72, color: '#fff', opacity: p * dim, transform: `translateY(${(1 - p) * 60}px) scale(${on ? 1.04 : 1})`, filter: `blur(${(1 - p) * 10}px)`, paddingBottom: 14 }}>
                {w}
                <div style={{ position: 'absolute', left: 0, bottom: 0, height: 3, width: '100%', background: '#fff', transform: `scaleX(${on ? prog(f, (i + 1) * seg, (i + 1) * seg + 16) : 0})`, transformOrigin: 'left' }} />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </VFade>
  );
};
