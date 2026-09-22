import React from 'react';
import { useCurrentFrame } from 'remotion';
import { C, FONT, SCENES } from '../theme';
import { prog, easeOut, lerp } from '../utils';
import { Contours, Cursor, Fade, Logo, PaperCard, Screen, SW, SH } from '../ui';

const SHOP = C.shop;

const PRODUCTS = [
  { n: 'Cuaderno Dos', s: '8 parajes', p: '195 €', pal: [C.olive, C.moss, C.ochre] },
  { n: 'Cuaderno Medio', s: '6 parajes', p: '155 €', pal: [C.clay, C.ochre, C.moss] },
  { n: 'Pack Noche', s: 'Cuaderno Medio + alojamiento', p: '215 €', pal: [C.moss, C.clay, C.olive] },
];

const Btn: React.FC<{ x: number; y: number; w: number; h?: number; children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }> = ({ x, y, w, h = 56, children, dark, style }) => (
  <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, background: dark ? C.text : C.accent, color: dark ? C.cream : '#fff', fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: '0.18em', display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>{children}</div>
);

const typed = (s: string, f: number, a: number, b: number) => s.slice(0, Math.floor(prog(f, a, b, (x) => x) * s.length));

export const Shop: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / 30;
  const dur = SCENES.shop.dur;

  const scrollY = -110 * prog(f, 92, 150);
  const added = f >= 246;
  const cart = added ? 1 : 0;
  const prodP = prog(f, 168, 216);
  const drawer = prog(f, 252, 298, easeOut) * (1 - prog(f, 322, 336));
  const checkout = prog(f, 326, 372);
  const step1 = prog(f, 340, 360);
  const step2 = prog(f, 372, 392);
  const step3 = prog(f, 424, 444);
  const thanks = prog(f, 462, 500);

  const cursorPts: [number, number, number][] = [
    [66, 1320, 690], [132, 292, 396], [168, 292, 396],
    [222, 1040, 560], [246, 1050, 548], [250, 1050, 548],
    [300, 1330, 707], [320, 1330, 707],
    [400, 500, 500], [448, 290, 678], [456, 290, 678], [500, 1200, 500],
  ];

  const header = (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 92, background: SHOP, zIndex: 5 }}>
      <div style={{ position: 'absolute', left: 48, top: 26 }}><Logo w={74} dark /></div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 36, textAlign: 'center', fontFamily: FONT, fontWeight: 600, fontSize: 13, letterSpacing: '0.42em', color: C.text }}>REGALA OBA-</div>
      <div style={{ position: 'absolute', right: 48, top: 36, fontFamily: FONT, fontSize: 13, letterSpacing: '0.2em', color: C.text }}>SELECCIÓN ({cart})</div>
      <div style={{ position: 'absolute', left: 60, right: 60, bottom: 0, height: 1, background: 'rgba(0,0,0,0.1)' }} />
    </div>
  );

  return (
    <Fade dur={dur} inF={30} outF={26}>
      <Screen
        urls={[{ f: 0, t: 'regalaoba.myshopify.com' }, { f: 170, t: 'regalaoba.myshopify.com/cuaderno-dos' }, { f: 328, t: 'regalaoba.myshopify.com/checkout' }]}
        bg={SHOP}
      >
        <div style={{ position: 'absolute', inset: 0, background: SHOP }}>
          {/* catálogo */}
          <div style={{ position: 'absolute', left: 0, top: scrollY, width: SW, height: 1200 }}>
            <div style={{ position: 'absolute', left: 60, top: 118, display: 'flex', gap: 34, fontFamily: FONT, fontSize: 12, letterSpacing: '0.24em', color: 'rgba(26,26,26,0.5)', opacity: prog(f, 16, 46) }}>
              <span style={{ color: C.text, borderBottom: `1px solid ${C.text}`, paddingBottom: 4 }}>EXPERIENCIAS</span>
              <span>CUADERNOS</span><span>PACKS</span><span>FERMENTADOS</span>
            </div>
            <div style={{ position: 'absolute', left: 60, top: 170, fontFamily: FONT, fontWeight: 300, fontSize: 68, lineHeight: 1.05, color: C.text, letterSpacing: '-0.01em', opacity: prog(f, 22, 66), transform: `translateY(${(1 - prog(f, 22, 66, easeOut)) * 30}px)` }}>
              Regalar una mesa.
            </div>
            <div style={{ position: 'absolute', left: 62, top: 262, fontFamily: FONT, fontStyle: 'italic', fontWeight: 300, fontSize: 17, color: 'rgba(26,26,26,0.55)', opacity: prog(f, 44, 84) }}>
              Experiencias, cuadernos y piezas hechas con la raíz de oba-.
            </div>
            {PRODUCTS.map((p, i) => {
              const a = prog(f, 62 + i * 12, 106 + i * 12, easeOut);
              const hov = i === 0 ? prog(f, 140, 166) : 0;
              return (
                <div key={p.n} style={{ position: 'absolute', left: 60 + i * 488, top: 380, opacity: a, transform: `translateY(${(1 - a) * 40}px)` }}>
                  <div style={{ transform: `scale(${1 + 0.018 * hov})`, transformOrigin: 'center' }}>
                    <PaperCard w={464} h={260} seed={i * 3.1 + 2} palette={p.pal} t={t + hov * 2} />
                  </div>
                  <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between', fontFamily: FONT, color: C.text }}>
                    <div>
                      <div style={{ fontSize: 20, fontWeight: 500 }}>{p.n}</div>
                      <div style={{ fontSize: 13, fontStyle: 'italic', color: 'rgba(26,26,26,0.5)', marginTop: 4 }}>{p.s}</div>
                    </div>
                    <div style={{ fontSize: 18, fontWeight: 300, letterSpacing: '0.04em' }}>{p.p}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ficha de producto */}
          {prodP > 0 && (
            <div style={{ position: 'absolute', inset: 0, background: SHOP, clipPath: `inset(${100 - 100 * prodP}% 0 0 0)`, zIndex: 4 }}>
              <div style={{ position: 'absolute', left: 100, top: 132 }}>
                <PaperCard w={660} h={560} seed={2} palette={PRODUCTS[0].pal} t={t} />
              </div>
              <div style={{ position: 'absolute', left: 860, top: 148, fontFamily: FONT, fontSize: 12, letterSpacing: '0.28em', color: 'rgba(26,26,26,0.5)', opacity: prog(f, 200, 230) }}>EXPERIENCIAS</div>
              <div style={{ position: 'absolute', left: 858, top: 176, fontFamily: FONT, fontWeight: 300, fontSize: 60, color: C.text, opacity: prog(f, 204, 240), transform: `translateY(${(1 - prog(f, 204, 240, easeOut)) * 20}px)` }}>Cuaderno Dos</div>
              <div style={{ position: 'absolute', left: 860, top: 258, fontFamily: FONT, fontWeight: 300, fontSize: 26, color: C.text, letterSpacing: '0.04em', opacity: prog(f, 214, 244) }}>195 €</div>
              {['Una mesa en oba-: el menú degustación de ocho parajes,', 'reinterpretado a partir de Las 1000 recetas de la', 'cocina de Albacete, de Carmina Useros.'].map((l, i) => (
                <div key={l} style={{ position: 'absolute', left: 860, top: 320 + i * 28, fontFamily: FONT, fontSize: 16, color: '#2a2a2a', opacity: prog(f, 220 + i * 6, 246 + i * 6) }}>{l}</div>
              ))}
              <div style={{ position: 'absolute', left: 860, top: 446, fontFamily: FONT, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(26,26,26,0.5)', opacity: prog(f, 230, 256) }}>CANTIDAD · 1</div>
              <Btn x={860} y={520} w={380} style={{ opacity: prog(f, 230, 256), background: added ? C.text : C.accent }}>
                {added ? 'AÑADIDO A LA SELECCIÓN' : 'AÑADIR A LA SELECCIÓN'}
              </Btn>
            </div>
          )}

          {/* cajón de selección */}
          {drawer > 0.001 && (
            <div style={{ position: 'absolute', left: lerp(SW, SW - 460, drawer), top: 0, width: 460, height: SH, background: C.paper, boxShadow: '-30px 0 90px rgba(60,40,20,0.28)', zIndex: 8 }}>
              <div style={{ position: 'absolute', left: 36, top: 116, fontFamily: FONT, fontWeight: 700, fontSize: 13, letterSpacing: '0.28em', color: C.text }}>TU SELECCIÓN</div>
              <div style={{ position: 'absolute', left: 36, top: 148, width: 388, height: 1, background: 'rgba(0,0,0,0.12)' }} />
              <div style={{ position: 'absolute', left: 36, top: 176 }}><PaperCard w={118} h={82} seed={2} palette={PRODUCTS[0].pal} t={t} /></div>
              <div style={{ position: 'absolute', left: 176, top: 184, fontFamily: FONT, fontSize: 19, fontWeight: 500, color: C.text }}>Cuaderno Dos</div>
              <div style={{ position: 'absolute', left: 176, top: 214, fontFamily: FONT, fontStyle: 'italic', fontSize: 13, color: 'rgba(26,26,26,0.5)' }}>8 parajes · 1 ud.</div>
              <div style={{ position: 'absolute', right: 36, top: 186, fontFamily: FONT, fontSize: 17, fontWeight: 300 }}>195 €</div>
              <div style={{ position: 'absolute', left: 36, top: 600, width: 388, height: 1, background: 'rgba(0,0,0,0.12)' }} />
              <div style={{ position: 'absolute', left: 36, top: 620, fontFamily: FONT, fontSize: 12, letterSpacing: '0.2em', color: 'rgba(26,26,26,0.55)' }}>SUBTOTAL</div>
              <div style={{ position: 'absolute', right: 36, top: 614, fontFamily: FONT, fontSize: 20, fontWeight: 300 }}>195 €</div>
              <Btn x={36} y={680} w={388} h={54}>FINALIZAR COMPRA</Btn>
            </div>
          )}

          {/* pago */}
          {checkout > 0 && (
            <div style={{ position: 'absolute', inset: 0, background: SHOP, opacity: checkout, zIndex: 9 }}>
              <Contours cx={1300} cy={560} rings={11} base={30} gap={36} t={t} seed={6} stroke={C.text} opacity={0.12} w={SW} h={SH} />
              <div style={{ position: 'absolute', left: 100, top: 134, width: 780 }}>
                <div style={{ position: 'relative', height: 2, background: 'rgba(0,0,0,0.12)' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, height: 2, background: C.text, width: `${(step1 * 0.5 + step2 * 0.25 + step3 * 0.25) * 100}%` }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16, fontFamily: FONT, fontSize: 12, letterSpacing: '0.24em' }}>
                  {[['01 DATOS', step1], ['02 MENSAJE', step2], ['03 PAGO', step3]].map(([l, p]) => (
                    <div key={l as string} style={{ color: C.text, opacity: 0.35 + 0.65 * (p as number) }}>{l as string}</div>
                  ))}
                </div>
              </div>

              <div style={{ position: 'absolute', left: 100, top: 250, fontFamily: FONT, fontWeight: 300, fontSize: 44, color: C.text }}>Un mensaje para quien lo recibe.</div>
              <div style={{ position: 'absolute', left: 100, top: 330, width: 640, height: 150, border: '1px solid rgba(0,0,0,0.25)', padding: '22px 26px', fontFamily: FONT, fontStyle: 'italic', fontWeight: 300, fontSize: 21, color: C.text, lineHeight: 1.5, boxSizing: 'border-box' }}>
                {typed('Para quien comparte la mesa contigo.', f, 376, 420)}
                <span style={{ opacity: Math.floor(f / 10) % 2 === 0 ? 1 : 0 }}>|</span>
              </div>
              <Btn x={100} y={650} w={380} style={{ opacity: prog(f, 424, 450) }}>PAGAR · 195 €</Btn>

              <div style={{ position: 'absolute', left: 1020, top: 250, width: 440, background: C.paper, padding: '30px 34px', boxSizing: 'border-box', boxShadow: '0 10px 24px -12px rgba(60,40,20,0.22)', border: '1px solid rgba(26,20,12,0.06)', opacity: prog(f, 340, 380) }}>
                <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 12, letterSpacing: '0.28em', color: C.text }}>RESUMEN</div>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.12)', margin: '18px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 16, color: C.text }}><span>Cuaderno Dos</span><span>195 €</span></div>
                <div style={{ height: 1, background: 'rgba(0,0,0,0.12)', margin: '18px 0' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: FONT, fontSize: 20, fontWeight: 300, color: C.text }}><span>Total</span><span>195 €</span></div>
              </div>
            </div>
          )}

          {/* gracias */}
          {thanks > 0 && (
            <div style={{ position: 'absolute', inset: 0, background: C.ink, opacity: thanks, zIndex: 12 }}>
              <Contours cx={SW / 2} cy={SH / 2} rings={12} base={40} gap={40} t={t} seed={11} opacity={0.16} w={SW} h={SH} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: 290, textAlign: 'center', fontFamily: FONT, fontWeight: 300, fontSize: 110, color: C.cream, letterSpacing: `${0.2 * (1 - thanks)}em` }}>Gracias.</div>
              <svg width="60" height="60" viewBox="0 0 60 60" style={{ position: 'absolute', left: SW / 2 - 30, top: 460 }}>
                <circle cx="30" cy="30" r="28" fill="none" stroke={C.cream} strokeWidth="1" opacity="0.5" strokeDasharray={176} strokeDashoffset={176 * (1 - thanks)} />
                <path d="M17 31 L26 40 L43 21" fill="none" stroke={C.cream} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" strokeDasharray={50} strokeDashoffset={50 * (1 - prog(f, 480, 510))} />
              </svg>
              <div style={{ position: 'absolute', left: 0, right: 0, top: 560, textAlign: 'center', fontFamily: FONT, fontStyle: 'italic', fontWeight: 300, fontSize: 18, color: 'rgba(250,225,192,0.6)', opacity: prog(f, 486, 520) }}>Tu regalo llega por correo electrónico.</div>
            </div>
          )}

          {header}
        </div>
        <Cursor pts={cursorPts} clicks={[168, 246, 320, 452]} dark={thanks < 0.5} />
      </Screen>
    </Fade>
  );
};
