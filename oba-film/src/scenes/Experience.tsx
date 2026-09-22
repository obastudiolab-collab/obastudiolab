import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT, SCENES } from '../theme';
import { prog, easeOut, lerp } from '../utils';
import { Cursor, Fade, Logo, PaperCard, Screen, ShineRing, SW, SH } from '../ui';
import { Burger, Lang } from './Site';

const CARDS = [
  { l: '01 · HUERTA', name: '01. Huerta', place: 'Calzada de Vergara', c: '39,17114° N, 1,53659° O', pases: ['Pases de temporada — próximamente.'] },
  { l: '02 · PINAR', name: '02. Pinar', place: 'Pinar de Don Vicente', c: '39,3262° N, −1,4507° O', pases: ['Cuajada de castañas', 'Pastel de avellanas', 'Escabeche de setas', 'Crema de trufas', 'Setas del momento', 'Jalea de montaña'] },
  { l: '03 · AFLUENTE', name: '03. Afluente', place: 'Tamayo', c: '39.371° N, −1.44876° O', pases: [] },
  { l: '04 · CORRAL', name: '04. Corral', place: 'Casa de Doña Tránsito', c: '', pases: [] },
  { l: '05 · ACANTILADO', name: '05. Acantilado', place: 'Barranco del Molinar', c: '', pases: [] },
  { l: '06 · MONTE BAJO', name: '06. Monte Bajo', place: 'Casas del Cerro', c: '', pases: [] },
];
const PALETTES = [
  [C.olive, C.moss, C.ochre],
  [C.moss, C.olive, C.clay],
  [C.clay, C.ochre, C.moss],
  [C.ochre, C.clay, C.olive],
  [C.olive, C.clay, C.moss],
  [C.moss, C.ochre, C.clay],
];

export const Experience: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dur = SCENES.experience.dur;

  const panel = prog(f, 308, 362, easeOut);
  const dimCards = 1 - 0.55 * panel;
  const hover = prog(f, 150, 168) * (1 - prog(f, 262, 280));
  const chipSel = prog(f, 300, 322);
  const guests = f >= 350 ? 2 : 1;
  const timeSel = prog(f, 378, 392);
  const confirm = prog(f, 408, 440);
  const btnHover = prog(f, 396, 404);

  const cursorPts: [number, number, number][] = [
    [40, 1300, 720], [130, 780, 471], [250, 780, 471], [298, 567, 276], [312, 567, 276],
    [344, 1500, 286], [352, 1500, 286], [372, 1226, 386], [380, 1226, 386], [398, 1290, 587], [406, 1290, 587],
    [452, 1290, 587], [480, 1300, 700],
  ];

  const cardW = 464;
  const cardH = 283;
  const xs = [60, 548, 1036];

  return (
    <Fade dur={dur} inF={30} outF={26}>
      <Screen urls={[{ f: 0, t: 'obarestaurante.es/menu/' }, { f: 312, t: 'thefork.es · reserva' }]} bg={C.cream}>
        <div style={{ position: 'absolute', inset: 0, background: C.cream }}>
          <div style={{ position: 'absolute', left: 48, top: 26 }}><Logo w={74} dark /></div>
          <Lang dark />
          <Burger color={C.text} />

          <div style={{ position: 'absolute', left: 60, top: 118, opacity: prog(f, 20, 60), transform: `translateY(${(1 - prog(f, 20, 60, easeOut)) * 14}px)` }}>
            <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 32, color: C.text, letterSpacing: '0.01em' }}>00 — CUADERNO DOS</div>
            <div style={{ fontFamily: FONT, fontSize: 15, lineHeight: 1.75, color: '#2a2a2a', marginTop: 16, width: 620 }}>
              Cuaderno Dos nace de “Las 1000 recetas de la cocina de Albacete”, el libro que Carmina Useros escribió en 1971. Construimos un menú por parajes.
            </div>
          </div>
          <div style={{ position: 'absolute', left: 940, top: 128, width: 540, fontFamily: FONT, fontWeight: 300, fontStyle: 'italic', fontSize: 14, lineHeight: 1.7, color: 'rgba(26,26,26,0.5)', opacity: prog(f, 36, 76) }}>
            “Esta edición es para ellos, como representantes de toda la juventud de nuestra tierra, para que amen las costumbres tradicionales de nuestros guisos.”
          </div>

          {[['CUADERNO DOS · 8 PARAJES · 195€', 372, 390], ['CUADERNO MEDIO · 6 PARAJES · 155€', 778, 410]].map(([txt, x, w], i) => {
            const p = prog(f, 60 + i * 12, 90 + i * 12);
            const sel = i === 0 ? chipSel : 0;
            return (
              <div key={txt as string} style={{ position: 'absolute', left: x as number, top: 250, width: w as number, height: 52, background: sel > 0 ? C.accentDark : C.accent, color: '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: '0.15em', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: p, transform: `translateY(${(1 - p) * 12}px) scale(${1 - 0.02 * sel})` }}>{txt as string}</div>
            );
          })}

          <div style={{ opacity: dimCards }}>
            {CARDS.map((c, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              const p = prog(f, 84 + i * 10, 124 + i * 10, easeOut);
              const isHover = i === 1;
              return (
                <div key={c.l} style={{ position: 'absolute', left: xs[col], top: 330 + row * (cardH + 24), opacity: p, transform: `translateY(${(1 - p) * 34}px)` }}>
                  <PaperCard w={cardW} h={cardH} seed={i * 2.3 + 1} label={c.l} palette={PALETTES[i]} t={t}>
                    {isHover && (
                      <div style={{ position: 'absolute', inset: 0, background: C.paper, opacity: hover, display: 'flex', alignItems: 'center', gap: 28, padding: '0 36px' }}>
                        <div style={{ flex: '0 0 160px' }}>
                          <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 18, color: C.text }}>{c.name}</div>
                          <div style={{ fontFamily: FONT, fontStyle: 'italic', fontSize: 12.5, color: 'rgba(26,26,26,0.55)', marginTop: 6 }}>{c.place}</div>
                          <div style={{ fontFamily: FONT, fontSize: 11, color: 'rgba(26,26,26,0.4)', marginTop: 5 }}>{c.c}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {c.pases.map((ps, k) => {
                            const pp = prog(f, 156 + k * 6, 178 + k * 6);
                            return (
                              <div key={ps} style={{ display: 'flex', gap: 10, fontFamily: FONT, fontSize: 13, color: '#2a2a2a', opacity: pp, transform: `translateX(${(1 - pp) * 10}px)` }}>
                                <span style={{ color: C.accent, fontWeight: 600, fontSize: 10.5, paddingTop: 2 }}>{String(k + 1).padStart(2, '0')}</span>
                                <span>{ps}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PaperCard>
                </div>
              );
            })}
          </div>

          {/* panel de reserva */}
          {panel > 0.001 && <div style={{ position: 'absolute', left: lerp(SW, 1040, panel), top: 90, width: 500, height: 680, background: C.paper, boxShadow: '-30px 0 90px rgba(60,40,20,0.28)', border: '1px solid rgba(26,20,12,0.06)' }}>
            <div style={{ position: 'absolute', left: 36, top: 34, fontFamily: FONT, fontWeight: 700, fontSize: 13, letterSpacing: '0.28em', color: C.text }}>RESERVA</div>
            <div style={{ position: 'absolute', left: 36, top: 60, width: 428, height: 1, background: 'rgba(0,0,0,0.12)' }} />
            <div style={{ position: 'absolute', left: 36, top: 92, fontFamily: FONT, fontWeight: 300, fontSize: 24, color: C.text }}>Cuaderno Dos</div>
            <div style={{ position: 'absolute', left: 36, top: 126, fontFamily: FONT, fontStyle: 'italic', fontSize: 13, color: 'rgba(26,26,26,0.5)' }}>8 parajes · 195€</div>

            <div style={{ position: 'absolute', left: 36, top: 190, fontFamily: FONT, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(26,26,26,0.55)' }}>COMENSALES</div>
            <div style={{ position: 'absolute', left: 340, top: 172, width: 124, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: FONT, color: C.text }}>
              <div style={{ width: 38, height: 38, border: '1px solid rgba(0,0,0,0.25)', borderRadius: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>−</div>
              <div style={{ fontSize: 20, fontWeight: 500 }}>{guests}</div>
              <div style={{ width: 38, height: 38, border: '1px solid rgba(0,0,0,0.25)', borderRadius: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: f >= 350 && f < 362 ? 'rgba(157,119,89,0.25)' : 'transparent' }}>+</div>
            </div>

            <div style={{ position: 'absolute', left: 36, top: 262, fontFamily: FONT, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(26,26,26,0.55)' }}>HORA</div>
            {['20:30', '21:00', '21:30'].map((h, i) => {
              const sel = i === 1 ? timeSel : 0;
              return (
                <div key={h} style={{ position: 'absolute', left: 36 + i * 104, top: 286, width: 92, height: 40, border: '1px solid rgba(0,0,0,0.22)', background: sel > 0.5 ? C.text : 'transparent', color: sel > 0.5 ? C.cream : C.text, fontFamily: FONT, fontSize: 14, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{h}</div>
              );
            })}

            <div style={{ position: 'absolute', left: 36, top: 470, width: 428, height: 54, borderRadius: 999, background: confirm > 0.5 ? C.text : C.accent, color: '#fff', fontFamily: FONT, fontWeight: 600, fontSize: 13, letterSpacing: '0.22em', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `scale(${1 - 0.012 * btnHover})` }}>
              {confirm > 0.5 ? (
                <svg width="26" height="26" viewBox="0 0 26 26">
                  <path d="M5 13.5 L11 19 L21 7" fill="none" stroke={C.cream} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={40} strokeDashoffset={40 * (1 - prog(f, 424, 446))} />
                </svg>
              ) : 'RESERVAR'}
              {confirm < 0.5 && <ShineRing angle={(f * 6) % 360} />}
            </div>
            <div style={{ position: 'absolute', left: 36, top: 542, width: 428, textAlign: 'center', fontFamily: FONT, fontStyle: 'italic', fontSize: 13, color: 'rgba(26,26,26,0.55)', opacity: prog(f, 432, 460) }}>Mesa confirmada · gestión vía TheFork</div>

            <div style={{ position: 'absolute', left: 36, bottom: 30, fontFamily: FONT, fontSize: 12, lineHeight: 1.9, color: 'rgba(26,26,26,0.55)', opacity: prog(f, 340, 380) }}>
              <span style={{ fontWeight: 600, color: C.text }}>Info:</span> info.restauranteoba@gmail.com<br />
              <span style={{ fontWeight: 600, color: C.text }}>Reservas:</span> +34 604 962 117
            </div>
          </div>}
        </div>
        <Cursor pts={cursorPts} clicks={[300, 350, 378, 404]} dark />
      </Screen>
    </Fade>
  );
};
