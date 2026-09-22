import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { prog, easeOut } from '../utils';
import { VContours } from './vui';
import { LogoDraw } from './LogoDraw';

export const VIntro: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const tag = prog(f, 70, 100, easeOut);
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <VContours cx={540} cy={900} rings={16} base={40} gap={56} t={t * 1.4} seed={2} stroke={C.text} opacity={0.13 * prog(f, 0, 30)} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 900 - 195, display: 'flex', justifyContent: 'center' }}>
        <LogoDraw f={Math.max(0, f - 6)} w={720} color={C.text} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 1070, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 22, color: 'rgba(26,26,26,0.6)', letterSpacing: `${0.7 - 0.42 * tag}em`, opacity: tag }}>NUEVA WEB</div>
    </AbsoluteFill>
  );
};
