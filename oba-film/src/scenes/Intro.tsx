import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, W, H, SCENES } from '../theme';
import { prog, easeOut } from '../utils';
import { Contours, Fade, Logo } from '../ui';

export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dur = SCENES.intro.dur;

  const lineIn = prog(f, 20, 120);
  const logoIn = prog(f, 90, 170, easeOut);
  const tag = prog(f, 150, 240, easeOut);
  const coords = prog(f, 60, 130);

  return (
    <Fade dur={dur} inF={30} outF={24}>
      <AbsoluteFill style={{ background: C.ink }}>
        <Contours cx={1380} cy={620} rings={16} base={30} gap={38} t={t} seed={2} opacity={0.2 * prog(f, 0, 100)} />
        <Contours cx={520} cy={330} rings={8} base={20} gap={44} t={t * 0.8} seed={5} opacity={0.1 * prog(f, 30, 130)} />

        {/* líneas finas de composición */}
        <div style={{ position: 'absolute', left: W / 2 - (W * 0.36) * lineIn, width: W * 0.72 * lineIn, top: H / 2 + 96, height: 1, background: C.line }} />
        <div style={{ position: 'absolute', left: 168, top: 120, width: 1, height: 840 * lineIn, background: C.line }} />
        <div style={{ position: 'absolute', right: 168, top: 120, width: 1, height: 840 * lineIn, background: C.line }} />

        <div style={{ position: 'absolute', left: 190, top: 128, fontFamily: FONT, fontSize: 13, letterSpacing: '0.28em', color: 'rgba(250,225,192,0.5)', opacity: coords }}>
          39.287366° N, −1.469556° O
        </div>
        <div style={{ position: 'absolute', right: 190, top: 128, fontFamily: FONT, fontSize: 13, letterSpacing: '0.28em', color: 'rgba(250,225,192,0.5)', opacity: coords }}>
          CASAS-IBÁÑEZ · ALBACETE
        </div>

        {/* logotipo */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 300, display: 'flex', justifyContent: 'center', opacity: logoIn, filter: `blur(${(1 - logoIn) * 14}px)`, transform: `translateY(${(1 - logoIn) * 14}px) scale(${0.97 + 0.03 * logoIn})` }}>
          <Logo w={420} />
        </div>

        {/* tipografía cinética */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: H / 2 + 128, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 17, color: 'rgba(250,225,192,0.72)', letterSpacing: `${0.7 - 0.42 * tag}em`, opacity: tag }}>
          COCINA CON RAÍZ
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: H / 2 + 168, textAlign: 'center', fontFamily: FONT, fontWeight: 300, fontStyle: 'italic', fontSize: 15, color: 'rgba(250,225,192,0.4)', letterSpacing: '0.1em', opacity: prog(f, 190, 260) }}>
          una nueva forma de entrar en oba-
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
