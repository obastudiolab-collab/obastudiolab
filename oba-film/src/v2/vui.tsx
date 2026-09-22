import React from 'react';
import { AbsoluteFill, Img, Solid, staticFile, useCurrentFrame } from 'remotion';
import { noise } from '@remotion/effects/noise';
import { C, FONT } from '../theme';
import { VW, VH, img } from './vtheme';
import { prog, blobPath } from '../utils';

/* Grano de pelicula con el efecto noise() de @remotion/effects (WebGL) */
export const VGrain: React.FC<{ opacity?: number }> = ({ opacity = 0.16 }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay', opacity }}>
      <Solid width={VW} height={VH} color="#808080" effects={[noise({ amount: 0.9, seed: Math.floor(frame / 2) % 48 })]} />
    </AbsoluteFill>
  );
};

/* Las transiciones entre escenas las gestiona TransitionSeries (focusPull de remocn) */
export const VFade: React.FC<{ dur?: number; inF?: number; outF?: number; children: React.ReactNode }> = ({ children }) => (
  <AbsoluteFill>{children}</AbsoluteFill>
);

/* Foto real con movimiento lento (Ken Burns) */
export const Photo: React.FC<{ src: string; f: number; dur: number; z0?: number; z1?: number; x0?: number; x1?: number; y0?: number; y1?: number; style?: React.CSSProperties; pos?: string }> = ({ src, f, dur, z0 = 1.05, z1 = 1.18, x0 = 0, x1 = 0, y0 = 0, y1 = 0, style, pos = 'center' }) => {
  const p = Math.min(1, Math.max(0, f / dur));
  const z = z0 + (z1 - z0) * p;
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      <Img src={staticFile(img(src))} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `translate(${x0 + (x1 - x0) * p}px, ${y0 + (y1 - y0) * p}px) scale(${z})` }} />
    </div>
  );
};

export const VLogo: React.FC<{ w: number; dark?: boolean; style?: React.CSSProperties }> = ({ w, dark, style }) => (
  <Img src={staticFile(dark ? 'oba-logo-dark.png' : 'oba-logo.png')} style={{ width: w, height: 'auto', display: 'block', ...style }} />
);

export const VContours: React.FC<{ cx: number; cy: number; rings?: number; base?: number; gap?: number; t?: number; seed?: number; stroke?: string; opacity?: number }> = ({ cx, cy, rings = 14, base = 40, gap = 40, t = 0, seed = 1, stroke = C.cream, opacity = 0.16 }) => (
  <svg width={VW} height={VH} style={{ position: 'absolute', left: 0, top: 0 }}>
    {Array.from({ length: rings }).map((_, r) => (
      <path key={r} d={blobPath(cx, cy, base + r * gap, seed + r * 0.35, t)} fill="none" stroke={stroke} strokeWidth={1.4} opacity={opacity * (1 - r / (rings * 1.25))} />
    ))}
  </svg>
);

export const Burger: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ position: 'absolute', right: 60, top: 78, width: 50, height: 34, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    {[0, 1, 2].map((i) => (<div key={i} style={{ height: 3, background: color, borderRadius: 2 }} />))}
  </div>
);

export const Lang: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const a = dark ? 'rgba(26,26,26,0.45)' : 'rgba(255,255,255,0.6)';
  const b = dark ? C.text : '#fff';
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center', fontFamily: FONT, fontSize: 26, letterSpacing: '0.08em' }}>
      <span style={{ color: b, textDecoration: 'underline', textUnderlineOffset: 6 }}>ES</span>
      <span style={{ color: a, margin: '0 12px' }}>/</span>
      <span style={{ color: a }}>EN</span>
    </div>
  );
};

export const Tag: React.FC<{ n: string; label: string; light?: boolean; f: number }> = ({ n, label, light = true, f }) => (
  <div style={{ position: 'absolute', left: 60, right: 60, bottom: 70, display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 22, letterSpacing: '0.34em', color: light ? 'rgba(250,225,192,0.85)' : 'rgba(26,26,26,0.6)', opacity: prog(f, 8, 24), textShadow: light ? '0 2px 12px rgba(0,0,0,0.45)' : 'none' }}>
    <span>{label}</span><span>{n} / 05</span>
  </div>
);
