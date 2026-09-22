import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';
import { C, FONT, W, H, SCENES } from '../theme';
import { prog, clamp01, rnd, easeOut } from '../utils';
import { Contours, Fade } from '../ui';

type Mode = 'rise' | 'dissolve' | 'squash' | 'stretch' | 'stack';
type Item = { text: string; at: number; dur: number; x: number; y: number; size: number; mode: Mode; align?: 'left' | 'right' | 'center'; idx: string };

const ITEMS: Item[] = [
  { text: 'territorio', at: 20, dur: 100, x: 180, y: 300, size: 210, mode: 'stretch', idx: '01' },
  { text: 'origen', at: 70, dur: 90, x: 1740, y: 560, size: 170, mode: 'dissolve', align: 'right', idx: '02' },
  { text: 'entorno', at: 120, dur: 100, x: 260, y: 640, size: 190, mode: 'stack', idx: '03' },
  { text: 'transformación', at: 170, dur: 110, x: 960, y: 420, size: 168, mode: 'squash', align: 'center', idx: '04' },
  { text: 'fermentación', at: 230, dur: 110, x: 200, y: 250, size: 176, mode: 'rise', idx: '05' },
  { text: 'memoria', at: 270, dur: 90, x: 1740, y: 720, size: 200, mode: 'dissolve', align: 'right', idx: '06' },
  { text: 'naturaleza', at: 300, dur: 90, x: 240, y: 560, size: 190, mode: 'stretch', idx: '07' },
  { text: 'producto', at: 330, dur: 90, x: 1600, y: 300, size: 150, mode: 'rise', align: 'right', idx: '08' },
  { text: 'tiempo', at: 350, dur: 70, x: 960, y: 540, size: 300, mode: 'squash', align: 'center', idx: '09' },
];

const Word: React.FC<{ it: Item; f: number }> = ({ it, f }) => {
  const pIn = prog(f, it.at, it.at + 34);
  const pOut = prog(f, it.at + it.dur - 34, it.at + it.dur);
  if (f < it.at - 2 || f > it.at + it.dur + 2) return null;
  const chars = it.text.split('');
  const n = chars.length;
  const tx = it.align === 'right' ? '-100%' : it.align === 'center' ? '-50%' : '0';
  const tracking = it.mode === 'stretch' ? `${(0.5 * (1 - pIn) - 0.05 * pOut).toFixed(3)}em` : '-0.02em';

  const letters = chars.map((ch, i) => {
    const d = (i / n) * 0.6;
    const li = clamp01((pIn - d) / 0.4);
    const lo = clamp01((pOut - d) / 0.4);
    const vis = li * (1 - lo);
    let style: React.CSSProperties = { display: 'inline-block', opacity: vis, whiteSpace: 'pre' };
    if (it.mode === 'rise') {
      style.transform = `translateY(${(1 - li) * 60 - lo * 26}px)`;
      style.filter = `blur(${(1 - li) * 10 + lo * 10}px)`;
    } else if (it.mode === 'dissolve') {
      const r = rnd(i + it.text.length);
      style.transform = `translate(${(r - 0.5) * 60 * ((1 - li) + lo)}px, ${(rnd(i * 3) - 0.5) * 40 * ((1 - li) + lo)}px)`;
      style.filter = `blur(${(1 - li) * 16 + lo * 16}px)`;
    } else if (it.mode === 'squash') {
      style.transform = `scaleY(${Math.max(0.001, li * (1 - lo * 0.85))})`;
      style.transformOrigin = 'bottom';
    } else if (it.mode === 'stretch') {
      style.filter = `blur(${(1 - li) * 6 + lo * 12}px)`;
    }
    return <span key={i} style={style}>{ch}</span>;
  });

  const base: React.CSSProperties = {
    position: 'absolute', left: it.x, top: it.y, transform: `translateX(${tx}) translateY(-50%)`,
    fontFamily: FONT, fontWeight: 300, fontSize: it.size, lineHeight: 1, letterSpacing: tracking,
    color: C.cream, whiteSpace: 'pre',
  };

  return (
    <>
      <div style={base}>
        {it.mode === 'stack' ? (
          <>
            {[-14, 0, 14].map((o, k) => (
              <div key={k} style={{ position: k === 1 ? 'relative' : 'absolute', left: 0, top: 0, opacity: (0.22 + k * 0.28) * pIn * (1 - pOut), transform: `translate(${o * pIn * (1 - pOut)}px, ${o * 0.5 * pIn}px)`, filter: `blur(${(1 - pIn) * 12 + pOut * 12}px)`, color: k === 1 ? C.cream : C.accent }}>{it.text}</div>
            ))}
          </>
        ) : letters}
      </div>
      <div style={{ position: 'absolute', left: it.align === 'right' ? it.x - 80 : it.align === 'center' ? it.x - 40 : it.x, top: it.y + it.size * 0.62, fontFamily: FONT, fontSize: 13, letterSpacing: '0.3em', color: 'rgba(250,225,192,0.45)', opacity: pIn * (1 - pOut), transform: it.align === 'right' ? 'translateX(0)' : 'none' }}>
        {it.idx} — {it.text.toUpperCase()}
      </div>
    </>
  );
};

export const Philosophy: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dur = SCENES.philosophy.dur;
  const cx = 960 + Math.sin(t * 0.3) * 360;
  const cy = 540 + Math.cos(t * 0.24) * 200;
  const frag = prog(f, 0, 40) * (1 - prog(f, 90, 120));
  return (
    <Fade dur={dur} inF={30} outF={26}>
      <AbsoluteFill style={{ background: C.ink }}>
        <Contours cx={cx} cy={cy} rings={20} base={60} gap={46} t={t * 1.2} seed={9} opacity={0.17} />
        <Contours cx={W - cx * 0.6} cy={H - cy * 0.5} rings={9} base={30} gap={54} t={t} seed={13} opacity={0.08} />

        {[0.2, 0.5, 0.8].map((p, i) => (
          <div key={i} style={{ position: 'absolute', left: W * p, top: 0, width: 1, height: H * prog(f, 10 + i * 10, 90 + i * 10), background: C.line }} />
        ))}

        <div style={{ position: 'absolute', left: 0, right: 0, top: H / 2 - 40, textAlign: 'center', fontFamily: FONT, fontWeight: 400, fontSize: 17, letterSpacing: '0.42em', color: 'rgba(250,225,192,0.7)', opacity: frag * 0.0 }} />
        <div style={{ position: 'absolute', left: 190, bottom: 150, fontFamily: FONT, fontWeight: 300, fontStyle: 'italic', fontSize: 22, color: 'rgba(250,225,192,0.6)', opacity: prog(f, 4, 50) * (1 - prog(f, 96, 130)), letterSpacing: '0.04em' }}>
          Oba-, que en bonifaciano significa raíz.
        </div>

        {ITEMS.map((it) => (
          <Word key={it.text} it={it} f={f} />
        ))}

        <div style={{ position: 'absolute', right: 190, top: 128, fontFamily: FONT, fontSize: 13, letterSpacing: '0.28em', color: 'rgba(250,225,192,0.45)' }}>
          {String(Math.min(9, Math.max(1, ITEMS.filter((i) => f >= i.at).length))).padStart(2, '0')} / 09
        </div>
      </AbsoluteFill>
    </Fade>
  );
};
