import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { VS } from './vtheme';
import { prog, easeOut, clamp01 } from '../utils';
import { Photo, VContours, VFade } from './vui';
import { LogoDraw } from './LogoDraw';
import { ShineRing } from '../ui';

export const VFinal: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
    const kick = prog(f, 84, 112, easeOut);
  const pill = prog(f, 164, 200, easeOut);
  const url = prog(f, 198, 238, easeOut);
  const out = prog(f, VS.final.dur - 30, VS.final.dur);
  const word = 'Ya disponible';
  return (
    <VFade dur={VS.final.dur} inF={12} outF={1}>
      <AbsoluteFill style={{ background: C.ink }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
          <Photo src="oba-fondo-principal.jpg" f={f} dur={VS.final.dur} z0={1.04} z1={1.14} />
        </div>
        <AbsoluteFill style={{ background: 'rgba(8,6,4,0.66)' }} />
        <VContours cx={540} cy={640} rings={14} base={60} gap={54} t={t} seed={3} opacity={0.16} />

        <div style={{ position: 'absolute', left: 0, right: 0, top: 640 - 158, display: 'flex', justifyContent: 'center' }}>
          <LogoDraw f={Math.max(0, f - 8)} w={620} color={C.cream} />
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 900, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 22, color: 'rgba(250,225,192,0.7)', letterSpacing: `${0.7 - 0.42 * kick}em`, opacity: kick }}>NUEVA WEB</div>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 950, textAlign: 'center', fontFamily: FONT, fontWeight: 300, fontSize: 84, lineHeight: 1, color: C.cream, whiteSpace: 'pre' }}>
          {word.split('').map((ch, i) => {
            const li = clamp01((prog(f, 100, 140) - (i / word.length) * 0.5) / 0.5);
            return <span key={i} style={{ display: 'inline-block', whiteSpace: 'pre', opacity: li, transform: `translateY(${(1 - li) * 50}px)`, filter: `blur(${(1 - li) * 10}px)` }}>{ch}</span>;
          })}
        </div>

        <div style={{ position: 'absolute', left: 270, top: 1150, width: 540, height: 100, borderRadius: 999, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 27, letterSpacing: '0.22em', color: '#fff', opacity: pill, transform: `translateY(${(1 - pill) * 30}px) scale(${0.96 + 0.04 * pill})` }}>
          RESERVA TU MESA
          <ShineRing angle={(f * 5) % 360} />
        </div>

        <div style={{ position: 'absolute', left: 0, right: 0, top: 1310, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 28, color: C.cream, letterSpacing: `${0.5 - 0.3 * url}em`, opacity: url }}>obarestaurante.es</div>

        <AbsoluteFill style={{ background: '#000', opacity: out }} />
      </AbsoluteFill>
    </VFade>
  );
};
