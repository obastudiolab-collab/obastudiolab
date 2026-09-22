import React from 'react';
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from 'remotion';
import { C, FONT } from '../theme';
import { VS, img } from './vtheme';
import { prog, easeOut } from '../utils';
import { Burger, Lang, Photo, VFade, VLogo } from './vui';

const PG = 76;
const lin = (x: number) => x;

const Header: React.FC<{ dark?: boolean }> = ({ dark }) => (
  <>
    <div style={{ position: 'absolute', left: 60, top: 60 }}><VLogo w={190} dark={dark} style={{ marginTop: -50 }} /></div>
    <Lang dark={dark} />
    <Burger color={dark ? C.text : '#fff'} />
  </>
);

const Title: React.FC<{ f: number; text: string; light?: boolean; y: number; size?: number; x?: number }> = ({ f, text, light, y, size = 50, x = 90 }) => {
  const p = prog(f, 12, 34, easeOut);
  return (
    <div style={{ position: 'absolute', left: x, right: x, top: y, fontFamily: FONT, fontWeight: 300, fontSize: size, lineHeight: 1.05, color: light ? '#fff' : C.text, opacity: p, transform: `translateY(${(1 - p) * 30}px)`, textShadow: light ? '0 3px 30px rgba(0,0,0,0.4)' : 'none' }}>{text}</div>
  );
};

const Restaurante: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill style={{ background: C.cream }}>
    <Header dark />
    <div style={{ position: 'absolute', left: 90, top: 250, width: 900, height: 1180, overflow: 'hidden', opacity: prog(f, 4, 20) }}>
      <Photo src="oba-galeria-restaurante.jpg" f={f} dur={PG + 16} z0={1.04} z1={1.18} y0={0} y1={-30} />
    </div>
    <Title f={f} text="Cuaderno Dos" y={1500} />
  </AbsoluteFill>
);

const CARDS = ['oba-paraje-pinar.webp', 'oba-paraje-afluente.webp', 'oba-paraje-corral.webp', 'oba-paraje-acantilado.webp'];
const Menu: React.FC<{ f: number }> = ({ f }) => {
  const scroll = -1160 * prog(f, 8, 76, lin);
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: scroll }}>
        {CARDS.map((c, i) => {
          const a = prog(f, 2 + i * 5, 18 + i * 5, easeOut);
          return (
            <div key={c} style={{ position: 'absolute', left: 60, top: 300 + i * 600, width: 960, height: 585, background: C.paper, boxShadow: '0 2px 4px rgba(60,40,20,0.06), 0 18px 40px -16px rgba(60,40,20,0.28)', border: '1px solid rgba(26,20,12,0.06)', opacity: a, transform: `translateY(${(1 - a) * 60}px)` }}>
              <Img src={staticFile(img(c))} style={{ position: 'absolute', left: 20, top: 20, width: 920, height: 545, objectFit: 'contain' }} />
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 210, background: `linear-gradient(${C.cream} 65%, rgba(250,225,192,0))`, zIndex: 3 }} />
      <div style={{ zIndex: 4, position: 'absolute', inset: 0 }}><Header dark /></div>
    </AbsoluteFill>
  );
};

const Huerto: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill style={{ background: '#000' }}>
    <Photo src="DJI_0750.jpg" f={f} dur={PG + 16} z0={1.05} z1={1.2} />
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.7) 100%)' }} />
    <Header />
    <Title f={f} text="El origen de nuestra cocina" y={1400} light size={62} />
  </AbsoluteFill>
);

const PAR = [
  ['oba-paraje-foto-cueva-de-los-angeles.webp', 'Cueva de los Ángeles'],
  ['oba-paraje-foto-alcala-del-jucar.webp', 'Alcalá del Júcar'],
  ['oba-paraje-foto-jorquera.webp', 'Jorquera'],
];
const Parajes: React.FC<{ f: number }> = ({ f }) => {
  const scroll = -1020 * prog(f, 6, 74, lin);
  return (
    <AbsoluteFill style={{ background: C.cream }}>
      <div style={{ position: 'absolute', left: 0, right: 0, top: scroll }}>
        {PAR.map(([p, n], i) => {
          const a = prog(f, 2 + i * 8, 18 + i * 8, easeOut);
          return (
            <div key={p} style={{ position: 'absolute', left: 60, top: 300 + i * 780, width: 960, opacity: a, transform: `translateY(${(1 - a) * 50}px)` }}>
              <div style={{ position: 'relative', width: 960, height: 640, overflow: 'hidden', background: '#111' }}>
                <Photo src={p} f={f} dur={PG + 16} z0={1.04} z1={1.15} x0={i % 2 ? 20 : -20} x1={i % 2 ? -20 : 20} />
              </div>
              <div style={{ fontFamily: FONT, fontWeight: 300, fontSize: 34, color: C.text, marginTop: 22 }}>{n}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 210, background: `linear-gradient(${C.cream} 65%, rgba(250,225,192,0))`, zIndex: 3 }} />
      <div style={{ zIndex: 4, position: 'absolute', inset: 0 }}><Header dark /></div>
    </AbsoluteFill>
  );
};

const SHOP = [
  ['shop-cuaderno-dos.jpg', 'Bono Cuaderno Dos', 'Desde 195 €'],
  ['shop-cuaderno-medio.jpg', 'Bono Cuaderno Medio', 'Desde 155 €'],
  ['shop-experiencia-hotel.jpg', 'Experiencia + Hotel', 'Desde 405 €'],
  ['shop-experiencia-total.jpg', 'Experiencia Total', 'Desde 580 €'],
];
const Tienda: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill style={{ background: C.cream }}>
    <Header dark />
    <Title f={f} text="Nueva tienda online" y={250} size={50} x={60} />
    {SHOP.map(([p, n, pr], i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const a = prog(f, 8 + i * 7, 28 + i * 7, easeOut);
      return (
        <div key={p} style={{ position: 'absolute', left: 60 + col * 495, top: 390 + row * 660, width: 465, opacity: a, transform: `translateY(${(1 - a) * 60}px)` }}>
          <div style={{ position: 'relative', width: 465, height: 520, overflow: 'hidden', background: '#111' }}>
            <Photo src={p} f={Math.max(0, f - 8 - i * 7)} dur={70} z0={1.04} z1={1.16} />
          </div>
          <div style={{ fontFamily: FONT, fontWeight: 400, fontSize: 28, color: C.text, marginTop: 22 }}>{n}</div>
          <div style={{ fontFamily: FONT, fontStyle: 'italic', fontWeight: 300, fontSize: 22, color: 'rgba(26,26,26,0.55)', marginTop: 6 }}>{pr}</div>
        </div>
      );
    })}
  </AbsoluteFill>
);

export const VSections: React.FC = () => {
  const f = useCurrentFrame();
  const pages = [Restaurante, Menu, Huerto, Parajes, Tienda];
  return (
    <VFade dur={VS.sections.dur} inF={10} outF={8}>
      <AbsoluteFill style={{ background: C.ink }}>
        {pages.map((Pg, i) => {
          const lf = f - i * PG;
          if (lf < 0 || lf > PG + 26) return null;
          const p = i === 0 ? 1 : prog(lf, 0, 16, easeOut);
          return (
            <div key={i} style={{ position: 'absolute', inset: 0, clipPath: `inset(${100 - 100 * p}% 0 0 0)` }}>
              <Pg f={lf} />
            </div>
          );
        })}
      </AbsoluteFill>
    </VFade>
  );
};
