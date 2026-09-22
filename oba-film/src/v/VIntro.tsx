import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { VS } from './vtheme';
import { prog, easeOut } from '../utils';
import { VContours, VFade, VLogo } from './vui';

export const VIntro: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const a = prog(f, 4, 34, easeOut);
  const tag = prog(f, 26, 58, easeOut);
  return (
    <VFade dur={VS.intro.dur} inF={6} outF={12}>
      <AbsoluteFill style={{ background: C.cream }}>
        <VContours cx={540} cy={900} rings={16} base={40} gap={56} t={t * 1.4} seed={2} stroke={C.text} opacity={0.13 * prog(f, 0, 30)} />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 900 - 260, display: 'flex', justifyContent: 'center', opacity: a, filter: `blur(${(1 - a) * 12}px)`, transform: `scale(${0.96 + 0.04 * a})` }}>
          <VLogo w={520} dark />
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 1070, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 22, color: 'rgba(26,26,26,0.6)', letterSpacing: `${0.7 - 0.42 * tag}em`, opacity: tag }}>NUEVA WEB</div>
      </AbsoluteFill>
    </VFade>
  );
};
