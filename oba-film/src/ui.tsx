import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { C, FONT, W, H } from './theme';
import { blobPath, kf, KF, prog, easeOut } from './utils';

/* Grano de papel sutil sobre toda la escena */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.09 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 40;
  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay', opacity }}>
      <svg width={W} height={H}>
        <filter id={`g${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={seed} stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width={W} height={H} filter={`url(#g${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/* Curvas de nivel orgánicas: mapa topográfico / raíces / fermentación */
export const Contours: React.FC<{
  cx: number; cy: number; rings?: number; base?: number; gap?: number;
  t?: number; seed?: number; stroke?: string; sw?: number; opacity?: number; w?: number; h?: number;
}> = ({ cx, cy, rings = 14, base = 40, gap = 34, t = 0, seed = 1, stroke = C.cream, sw = 1, opacity = 0.16, w = W, h = H }) => {
  const paths = [];
  for (let r = 0; r < rings; r++) {
    paths.push(
      <path key={r} d={blobPath(cx, cy, base + r * gap, seed + r * 0.35, t)} fill="none" stroke={stroke} strokeWidth={sw} opacity={opacity * (1 - r / (rings * 1.25))} />
    );
  }
  return (
    <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0 }}>
      {paths}
    </svg>
  );
};

export const Fade: React.FC<{ dur: number; inF?: number; outF?: number; children: React.ReactNode }> = ({ dur, inF = 24, outF = 24, children }) => {
  const f = useCurrentFrame();
  const o = Math.min(prog(f, 0, inF), 1 - prog(f, dur - outF, dur));
  return <AbsoluteFill style={{ opacity: o }}>{children}</AbsoluteFill>;
};

/* Borde con destello rotatorio, como el botón RESERVAR de la web */
export const ShineRing: React.FC<{ angle: number; radius?: number }> = ({ angle, radius = 999 }) => (
  <div
    style={{
      position: 'absolute', inset: -1, borderRadius: radius, padding: 1, pointerEvents: 'none',
      background: `conic-gradient(from ${angle}deg, transparent 0deg, transparent 300deg, rgba(255,255,255,0.85) 340deg, rgba(255,255,255,0.95) 353deg, transparent 360deg)`,
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
    }}
  />
);

export const Cursor: React.FC<{ pts: KF[]; clicks?: number[]; dark?: boolean }> = ({ pts, clicks = [], dark = false }) => {
  const f = useCurrentFrame();
  const { x, y } = kf(f, pts);
  const first = pts[0][0];
  const vis = prog(f, first, first + 12);
  const fill = dark ? C.text : C.cream;
  const stroke = dark ? C.cream : C.ink;
  let press = 1;
  clicks.forEach((c) => {
    const d = f - c;
    if (d >= 0 && d < 10) press = 1 - 0.14 * Math.sin((d / 10) * Math.PI);
  });
  return (
    <>
      {clicks.map((c) => {
        const p = prog(f, c, c + 24, easeOut);
        if (f < c || f > c + 26) return null;
        return (
          <div key={c} style={{ position: 'absolute', left: x - 22, top: y - 22, width: 44, height: 44, borderRadius: 44, border: `1px solid ${dark ? C.text : C.cream}`, opacity: (1 - p) * 0.7, transform: `scale(${0.3 + p * 1.1})`, pointerEvents: 'none' }} />
        );
      })}
      <svg width="28" height="34" viewBox="0 0 28 34" style={{ position: 'absolute', left: x, top: y, opacity: vis, transform: `scale(${press})`, transformOrigin: '2px 2px', filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.35))', pointerEvents: 'none', zIndex: 50 }}>
        <path d="M2 2 L2 26 L8.5 20.5 L13 31 L17.5 29 L13 18.5 L22 18.5 Z" fill={fill} stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    </>
  );
};

/* Marco de pantalla con barra de URL fina; el contenido usa coordenadas 1560x836 */
export const SW = 1560;
export const SH = 836;
export const Screen: React.FC<{ urls: { f: number; t: string }[]; children: React.ReactNode; bg?: string; enter?: number; scaleTo?: number }> = ({ urls, children, bg = C.soil, enter = 40, scaleTo = 1 }) => {
  const f = useCurrentFrame();
  const e = prog(f, 0, enter, easeOut);
  let cur = urls[0].t;
  let prev = urls[0].t;
  let mix = 1;
  urls.forEach((u, i) => {
    if (f >= u.f) {
      prev = i > 0 ? urls[i - 1].t : u.t;
      cur = u.t;
      mix = prog(f, u.f, u.f + 14);
    }
  });
  const drift = (f / 500) * 8;
  return (
    <div style={{ position: 'absolute', left: (W - SW) / 2, top: 100 + (1 - e) * 26 - drift * 0.4, width: SW, height: SH + 44, borderRadius: 10, overflow: 'hidden', opacity: e, transform: `scale(${(0.955 + 0.045 * e) * scaleTo})`, boxShadow: '0 50px 140px rgba(0,0,0,0.65), 0 0 0 1px rgba(250,225,192,0.08)', background: bg }}>
      <div style={{ height: 44, background: '#0e0b08', display: 'flex', alignItems: 'center', position: 'relative', borderBottom: '1px solid rgba(250,225,192,0.07)' }}>
        <div style={{ display: 'flex', gap: 8, marginLeft: 20 }}>
          {[0, 1, 2].map((i) => (<div key={i} style={{ width: 9, height: 9, borderRadius: 9, background: 'rgba(250,225,192,0.16)' }} />))}
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', fontFamily: FONT, fontSize: 13, letterSpacing: '0.14em', color: 'rgba(250,225,192,0.55)' }}>
          <span style={{ position: 'absolute', left: 0, right: 0, opacity: 1 - mix }}>{prev}</span>
          <span style={{ position: 'relative', opacity: mix }}>{cur}</span>
        </div>
      </div>
      <div style={{ position: 'relative', width: SW, height: SH, overflow: 'hidden' }}>{children}</div>
    </div>
  );
};

export const Logo: React.FC<{ w: number; dark?: boolean; style?: React.CSSProperties }> = ({ w, dark, style }) => (
  <Img src={staticFile(dark ? 'oba-logo-dark.png' : 'oba-logo.png')} style={{ width: w, height: 'auto', display: 'block', ...style }} />
);

/* Tarjeta tipo "postal": papel con grano y manchas abstractas de acuarela (sin fotografía) */
export const PaperCard: React.FC<{ w: number; h: number; seed: number; label?: string; palette?: string[]; t?: number; style?: React.CSSProperties; children?: React.ReactNode }> = ({ w, h, seed, label, palette = [C.olive, C.clay, C.ochre], t = 0, style, children }) => {
  const blobs = [0, 1, 2].map((i) => {
    const cx = w * (0.34 + 0.16 * Math.sin(seed * 2.1 + i * 1.9));
    const cy = h * (0.52 + 0.12 * Math.cos(seed * 1.3 + i * 2.4));
    return <path key={i} d={blobPath(cx + i * 22, cy + i * 8, Math.min(w, h) * (0.24 - i * 0.04), seed + i * 1.3, t * 0.4)} fill={palette[i % palette.length]} opacity={0.5 - i * 0.08} />;
  });
  const lines = [0, 1].map((i) => (
    <path key={i} d={blobPath(w * 0.42, h * 0.5, Math.min(w, h) * (0.3 + i * 0.05), seed * 1.7 + i, t * 0.3)} fill="none" stroke={C.text} strokeWidth={1} opacity={0.55} />
  ));
  return (
    <div style={{ position: 'relative', width: w, height: h, background: C.paper, overflow: 'hidden', boxShadow: '0 1px 2px rgba(60,40,20,0.06), 0 10px 24px -12px rgba(60,40,20,0.22)', border: '1px solid rgba(26,20,12,0.06)', ...style }}>
      <svg width={w} height={h} style={{ position: 'absolute', left: 0, top: 0 }}>{blobs}{lines}</svg>
      {label && (
        <div style={{ position: 'absolute', right: 22, top: 18, fontFamily: FONT, fontStyle: 'italic', fontWeight: 300, fontSize: 15, letterSpacing: '0.08em', color: C.text, opacity: 0.8 }}>{label}</div>
      )}
      {children}
    </div>
  );
};
