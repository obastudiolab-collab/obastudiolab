import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT, SCENES } from '../theme';
import { prog, easeOut, lerp } from '../utils';
import { Contours, Cursor, Fade, Logo, Screen, ShineRing, SW, SH } from '../ui';

export const Burger: React.FC<{ color: string }> = ({ color }) => (
  <div style={{ position: 'absolute', right: 48, top: 34, width: 32, height: 22, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
    {[0, 1, 2].map((i) => (<div key={i} style={{ height: 2, background: color, borderRadius: 1 }} />))}
  </div>
);

export const Lang: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const a = dark ? 'rgba(26,26,26,0.45)' : 'rgba(255,255,255,0.55)';
  const b = dark ? C.text : '#fff';
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 36, textAlign: 'center', fontFamily: FONT, fontSize: 14, letterSpacing: '0.08em' }}>
      <span style={{ color: b, textDecoration: 'underline', textUnderlineOffset: 4 }}>ES</span>
      <span style={{ color: a, margin: '0 8px' }}>/</span>
      <span style={{ color: a }}>EN</span>
    </div>
  );
};

const HomePage: React.FC<{ f: number }> = ({ f }) => {
  const t = f / 30;
  const hover = prog(f, 150, 182);
  const words = ['RESTAURANTE', 'ENTORNO', 'NOSOTROS'];
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.soil }}>
      <Contours cx={SW * 0.62 - hover * 90} cy={SH * 0.55} rings={15} base={30} gap={42} t={t} seed={3} w={SW} h={SH} opacity={0.2} />
      <Contours cx={SW * 0.2 + hover * 60} cy={SH * 0.25} rings={7} base={20} gap={46} t={t * 0.8} seed={7} w={SW} h={SH} opacity={0.1} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.45) 100%)' }} />

      <div style={{ opacity: prog(f, 20, 60), position: 'absolute', inset: 0 }}>
        <div style={{ position: 'absolute', left: 48, top: 26 }}><Logo w={74} /></div>
        <Lang />
        <Burger color="#fff" />
      </div>

      <div style={{ position: 'absolute', left: 64, right: 64, top: SH / 2 - 30, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        {words.map((w, i) => {
          const p = prog(f, 50 + i * 16, 96 + i * 16, easeOut);
          const isTarget = i === 0;
          const dim = isTarget ? 1 : 1 - 0.5 * hover;
          return (
            <div key={w} style={{ position: 'relative', fontFamily: FONT, fontWeight: 500, fontSize: 42, color: '#fff', opacity: p * dim, transform: `translateY(${(1 - p) * 26}px)`, filter: `blur(${(1 - p) * 8}px)`, paddingBottom: 10 }}>
              {w}
              {isTarget && (
                <div style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%', background: '#fff', transform: `scaleX(${hover})`, transformOrigin: 'left' }} />
              )}
            </div>
          );
        })}
      </div>

      <div style={{ position: 'absolute', left: SW / 2 - 100, bottom: 46, width: 200, height: 50, borderRadius: 999, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontSize: 13, letterSpacing: '0.2em', color: '#fff', opacity: prog(f, 100, 140) }}>
        RESERVAR
        <ShineRing angle={(f * 5) % 360} />
      </div>
    </div>
  );
};

const P1 = [
  'Cuaderno Dos es un viaje por los paisajes, las historias y la',
  'memoria gastronómica de nuestra tierra. Inspirado en Las 1000',
  'recetas de la cocina de Albacete, publicado por Carmina Useros',
  'en 1971, reinterpretamos el recetario tradicional desde una',
  'mirada contemporánea. El menú se desarrolla a través de',
  'diferentes parajes, donde cada pase reúne pequeñas elaboraciones',
  'que conviven entre sí, proponiendo una nueva forma de recorrer',
  'un menú degustación.',
];
const NAT = [
  'Maridaje vivo que expresa nuestra filosofía a través de la',
  'fermentación. Cada bebida nace de un constante proceso de',
  'investigación y experimentación, donde ingredientes de nuestro',
  'entorno se transforman mediante levaduras salvajes.',
];
const MAT = [
  'Recorrido por variedades ancestrales y minoritarias del',
  'territorio nacional. Una selección de vinos con identidad,',
  'elaborados por pequeños productores que preservan un',
  'patrimonio vitivinícola único.',
];

const RestaurantePage: React.FC<{ f: number }> = ({ f }) => {
  const t = f / 30;
  const scroll = -420 * prog(f, 320, 432);
  const tabSwitch = prog(f, 460, 486);
  const btn = (label: string, x: number, w: number) => (
    <div style={{ position: 'absolute', left: x, top: 470, width: w, height: 52, background: C.accent, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(f, 290, 318), transform: `translateY(${(1 - prog(f, 290, 318)) * 14}px)` }}>{label}</div>
  );
  const line = (txt: string, i: number, y: number, x = 640, s = 16, from = 246, o = 1) => {
    const p = prog(f, from + i * 5, from + 24 + i * 5, easeOut);
    return (
      <div key={txt} style={{ position: 'absolute', left: x, top: y + i * (s * 1.75), fontFamily: FONT, fontSize: s, color: '#2a2a2a', opacity: p * o, transform: `translateY(${(1 - p) * 10}px)`, whiteSpace: 'nowrap' }}>{txt}</div>
    );
  };
  const tabX = lerp(640, 758, tabSwitch);
  const tabW = lerp(76, 190, tabSwitch);
  return (
    <div style={{ position: 'absolute', inset: 0, background: C.cream }}>
      {/* panel lateral fijo (sin fotografía): curvas de nivel */}
      <div style={{ position: 'absolute', left: 150, top: 70, width: 440, height: 700, background: C.soil, overflow: 'hidden', opacity: prog(f, 240, 290), transform: `translateY(${(1 - prog(f, 240, 290, easeOut)) * 30}px)` }}>
        <Contours cx={220} cy={360 + scroll * 0.25} rings={13} base={22} gap={34} t={t} seed={4} w={440} h={700} opacity={0.3} />
        <div style={{ position: 'absolute', left: 28, bottom: 26, fontFamily: FONT, fontSize: 12, letterSpacing: '0.24em', color: 'rgba(250,225,192,0.55)' }}>00 — CUADERNO DOS</div>
      </div>

      <div style={{ position: 'absolute', left: 0, top: scroll, width: SW, height: 1400 }}>
        <div style={{ position: 'absolute', left: 640, top: 150, fontFamily: FONT, fontWeight: 700, fontSize: 17, letterSpacing: '0.06em', color: C.text, opacity: prog(f, 240, 270) }}>00 — CUADERNO DOS</div>
        {P1.map((l, i) => line(l, i, 196))}
        {btn('MENÚ ACTUAL', 640, 170)}
        {btn('RESERVAR', 826, 148)}
        {btn('REGALA OBA-', 990, 172)}
        <div style={{ position: 'absolute', left: 640, top: 590, width: 700 * prog(f, 330, 380), height: 1, background: 'rgba(0,0,0,0.14)' }} />
        <div style={{ position: 'absolute', left: 640, top: 630, fontFamily: FONT, fontWeight: 700, fontSize: 17, letterSpacing: '0.06em', color: C.text, opacity: prog(f, 340, 370) }}>MARIDAJES</div>
        <div style={{ position: 'absolute', left: 640, top: 676, fontFamily: FONT, fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', color: C.text, opacity: prog(f, 350, 380) }}>NATURA</div>
        <div style={{ position: 'absolute', left: 758, top: 676, fontFamily: FONT, fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', color: '#6a6a62', opacity: prog(f, 350, 380) }}>MATICES OLVIDADOS</div>
        <div style={{ position: 'absolute', left: 978, top: 676, fontFamily: FONT, fontWeight: 700, fontSize: 14, letterSpacing: '0.06em', color: '#6a6a62', opacity: prog(f, 350, 380) }}>CONTRASTES</div>
        <div style={{ position: 'absolute', left: 640, top: 706, width: 700, height: 1, background: 'rgba(0,0,0,0.12)' }} />
        <div style={{ position: 'absolute', left: tabX, top: 705, width: tabW, height: 2, background: C.text, opacity: prog(f, 350, 380) }} />
        {NAT.map((l, i) => line(l, i, 740, 640, 15, 376, 1 - tabSwitch))}
        {MAT.map((l, i) => line(l, i, 740, 640, 15, 470, tabSwitch))}
        <div style={{ position: 'absolute', left: 640, top: 900, width: 148, height: 42, background: C.accent, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 11, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: prog(f, 400, 430) }}>VER MARIDAJE</div>
      </div>

      <div style={{ position: 'absolute', left: 0, top: 0, right: 0, height: 96, background: `linear-gradient(${C.cream}, rgba(250,225,192,0))`, opacity: 0.9 }} />
      <div style={{ position: 'absolute', left: 48, top: 26 }}><Logo w={74} dark /></div>
      <Lang dark />
      <Burger color={C.text} />
    </div>
  );
};

export const Site: React.FC = () => {
  const f = useCurrentFrame();
  const dur = SCENES.site.dur;
  const wipe = prog(f, 198, 248);
  const cursorPts: [number, number, number][] = [[70, 1230, 640], [165, 236, 440], [250, 236, 440], [330, 830, 520], [445, 855, 252], [462, 855, 252]];
  return (
    <Fade dur={dur} inF={30} outF={26}>
      <Screen urls={[{ f: 0, t: 'obarestaurante.es' }, { f: 222, t: 'obarestaurante.es/restaurante/' }]}>
        <HomePage f={f} />
        {f >= 196 && (
          <div style={{ position: 'absolute', inset: 0, clipPath: `inset(0 ${100 - 100 * wipe}% 0 0)` }}>
            <RestaurantePage f={f} />
          </div>
        )}
        <Cursor pts={cursorPts} clicks={[195, 458]} dark={f >= 226} />
      </Screen>
    </Fade>
  );
};
