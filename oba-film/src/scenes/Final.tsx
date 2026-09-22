import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, W, H, SCENES } from '../theme';
import { prog, easeOut } from '../utils';
import { Contours, Fade, Logo } from '../ui';

export const Final: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dur = SCENES.final.dur;
  const conv = prog(f, 0, 150);
  const logoIn = prog(f, 60, 140, easeOut);
  const urlIn = prog(f, 130, 200, easeOut);
  const lineIn = prog(f, 110, 190);
  const out = prog(f, dur - 40, dur);
  return (
    <Fade dur={dur} inF={30} outF={1}>
      <AbsoluteFill style={{ background: C.ink }}>
        <Contours cx={W / 2} cy={470} rings={16} base={120 - 90 * conv} gap={30 + 16 * (1 - conv)} t={t} seed={2 + conv} opacity={0.2} />
        <Contours cx={W / 2} cy={470} rings={8} base={40} gap={22} t={t * 1.3} seed={8} opacity={0.12 * conv} />

        <div style={{ position: 'absolute', left: 0, right: 0, top: 270, display: 'flex', justifyContent: 'center', opacity: logoIn, filter: `blur(${(1 - logoIn) * 12}px)`, transform: `scale(${0.96 + 0.04 * logoIn})` }}>
          <Logo w={400} />
        </div>
        <div style={{ position: 'absolute', left: W / 2 - 150 * lineIn, width: 300 * lineIn, top: 604, height: 1, background: 'rgba(250,225,192,0.35)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 632, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 24, color: C.cream, letterSpacing: `${0.6 - 0.36 * urlIn}em`, opacity: urlIn }}>
          obarestaurante.es
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 688, textAlign: 'center', fontFamily: FONT, fontWeight: 300, fontStyle: 'italic', fontSize: 15, color: 'rgba(250,225,192,0.45)', letterSpacing: '0.12em', opacity: prog(f, 170, 220) }}>
          Casas-Ibáñez · Albacete
        </div>
        <AbsoluteFill style={{ background: '#000', opacity: out }} />
      </AbsoluteFill>
    </Fade>
  );
};
