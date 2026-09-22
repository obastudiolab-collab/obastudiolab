// Banda sonora ambiental sintetizada (placeholder original, sin derechos): drones orgánicos,
// viento lejano, agua, percusión mínima y sonidos de interfaz sincronizados con la animación.
const fs = require('fs');
const SR = 44100;
const FPS = 30;
const TOTAL_FRAMES = 1154;
const DUR = TOTAL_FRAMES / FPS;
const N = Math.floor(DUR * SR);
const L = new Float32Array(N);
const R = new Float32Array(N);

let seed = 1337;
const rand = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const noise = () => rand() * 2 - 1;
const TAU = Math.PI * 2;

/* Pad: acordes abiertos con LFOs lentísimos y ligera desafinación estéreo */
const notes = [
  { f: 55.0, a: 0.11, per: 31, ph: 0, from: 0, to: DUR },
  { f: 82.41, a: 0.08, per: 23, ph: 1, from: 2, to: DUR },
  { f: 110.0, a: 0.06, per: 37, ph: 2, from: 6, to: DUR },
  { f: 130.81, a: 0.045, per: 29, ph: 3, from: 14, to: 66 },
  { f: 164.81, a: 0.04, per: 41, ph: 4, from: 20, to: DUR },
  { f: 98.0, a: 0.05, per: 27, ph: 5, from: 28, to: 60 },
  { f: 146.83, a: 0.035, per: 33, ph: 6, from: 40, to: 76 },
  { f: 220.0, a: 0.02, per: 19, ph: 7, from: 50, to: DUR },
];
for (let i = 0; i < N; i++) {
  const t = i / SR;
  let l = 0, r = 0;
  for (const n of notes) {
    const env = Math.min(1, Math.max(0, (t - n.from) / 6)) * Math.min(1, Math.max(0, (n.to - t) / 6));
    if (env <= 0) continue;
    const lfo = 0.55 + 0.45 * Math.sin(TAU * t / n.per + n.ph);
    const d = 0.25 + 0.1 * Math.sin(t * 0.13 + n.ph);
    const a = n.a * env * lfo;
    l += a * (Math.sin(TAU * (n.f - d) * t) + 0.25 * Math.sin(TAU * (n.f - d) * 2 * t));
    r += a * (Math.sin(TAU * (n.f + d) * t) + 0.25 * Math.sin(TAU * (n.f + d) * 2 * t));
  }
  L[i] = l; R[i] = r;
}

/* Viento lejano: ruido filtrado con corte y ganancia que respiran */
{
  let yl = 0, yr = 0, y2l = 0, y2r = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const cut = 0.012 + 0.02 * (0.5 + 0.5 * Math.sin(TAU * t / 17));
    const g = 0.03 + 0.055 * (0.5 + 0.5 * Math.sin(TAU * t / 23 + 1.3));
    yl += cut * (noise() - yl); y2l += cut * (yl - y2l);
    yr += cut * (noise() - yr); y2r += cut * (yr - y2r);
    L[i] += y2l * g * 5; R[i] += y2r * g * 5;
  }
}

/* Agua: ruido de banda media con destellos irregulares */
{
  let hl = 0, ll = 0, hr = 0, lr = 0;
  for (let i = 0; i < N; i++) {
    const t = i / SR;
    const g = 0.010 + 0.012 * Math.max(0, Math.sin(TAU * t / 9 + 0.7)) + 0.006 * Math.max(0, Math.sin(TAU * t / 5.3));
    const wl = noise(), wr = noise();
    hl += 0.35 * (wl - hl); ll += 0.05 * (hl - ll);
    hr += 0.35 * (wr - hr); lr += 0.05 * (hr - lr);
    const cl = (hl - ll) * (0.6 + 0.4 * Math.sin(TAU * 7.3 * t + 2 * Math.sin(t * 0.9)));
    const cr = (hr - lr) * (0.6 + 0.4 * Math.sin(TAU * 6.1 * t + 2 * Math.sin(t * 1.1)));
    L[i] += cl * g * 3.2; R[i] += cr * g * 3.2;
  }
}

/* Percusión muy contenida: golpe grave suave cada ~11.6 s */
for (let s = 0.6; s < DUR - 3; s += 6.2) {
  const i0 = Math.floor(s * SR);
  for (let k = 0; k < SR * 2.2 && i0 + k < N; k++) {
    const tt = k / SR;
    const f0 = 46 + 18 * Math.exp(-tt * 9);
    const v = Math.sin(TAU * f0 * tt) * Math.exp(-tt * 2.8) * 0.16 * (1 - Math.exp(-tt * 220));
    L[i0 + k] += v; R[i0 + k] += v;
  }
}

/* Sonidos de interfaz sincronizados con la animación (frames globales) */
const click = (frame, gain = 1, pan = 0) => {
  const i0 = Math.floor((frame / FPS) * SR);
  for (let k = 0; k < SR * 0.09 && i0 + k < N; k++) {
    const tt = k / SR;
    const v = ((noise()) * Math.exp(-tt * 950) * 0.16 + Math.sin(TAU * 2100 * tt) * Math.exp(-tt * 560) * 0.07 + Math.sin(TAU * 620 * tt) * Math.exp(-tt * 300) * 0.05) * gain;
    L[i0 + k] += v * (1 - Math.max(0, pan)); R[i0 + k] += v * (1 + Math.min(0, pan));
  }
};
const swish = (frame, len = 0.9, gain = 1) => {
  const i0 = Math.floor((frame / FPS) * SR);
  let lp = 0, hp = 0;
  for (let k = 0; k < SR * len && i0 + k < N; k++) {
    const tt = k / SR;
    const env = Math.sin(Math.PI * (tt / len)) ** 2;
    const x = noise();
    lp += 0.28 * (x - lp);
    hp = lp - (hp + 0.02 * (lp - hp));
    const v = hp * env * 0.11 * gain;
    L[i0 + k] += v; R[i0 + k] += v * 0.9;
  }
};
const soft = (frame) => click(frame, 0.45, 0);


const S = { home: 76, phil: 242, sec: 468, fin: 824 };
[S.home, S.phil, S.sec, S.fin].forEach((f) => swish(f - 8, 0.8, 1));
[46, 92, 138].forEach((o) => swish(S.home + o - 4, 0.45, 0.5));
for (let i = 0; i < 8; i++) { click(S.phil + 12 + i * 22 + 4, 0.55, i % 2 ? 0.25 : -0.25); if (i % 2 === 0) swish(S.phil + 12 + i * 22 - 4, 0.4, 0.35); }
for (let i = 1; i < 5; i++) { swish(S.sec + i * 76 - 2, 0.55, 0.8); click(S.sec + i * 76 + 12, 0.6, i % 2 ? 0.2 : -0.2); }
swish(S.fin + 84, 0.5, 0.45);
swish(S.fin + 148, 0.6, 0.6);
click(S.fin + 170, 0.5, 0);
{ const i0 = Math.floor(((S.fin + 84) / FPS) * SR); for (let k = 0; k < SR * 4 && i0 + k < N; k++) { const tt = k / SR; const v = Math.sin(TAU * 196 * tt) * Math.exp(-tt * 1.0) * 0.09 + Math.sin(TAU * 293.66 * tt) * Math.exp(-tt * 1.3) * 0.055 + Math.sin(TAU * 392 * tt) * Math.exp(-tt * 1.6) * 0.03; L[i0 + k] += v; R[i0 + k] += v; } }

/* Reverb ligera con peines */
const comb = (buf, d, fb, mix) => {
  const out = new Float32Array(buf.length);
  for (let i = 0; i < buf.length; i++) {
    const back = i >= d ? out[i - d] : 0;
    out[i] = buf[i] + back * fb;
  }
  for (let i = 0; i < buf.length; i++) buf[i] += out[i] * mix - buf[i] * 0; // suma de la cola
};
[[0.37, 0.42, 0.22], [0.53, 0.38, 0.18], [0.79, 0.34, 0.14]].forEach(([s, fb, mix]) => {
  const dl = Math.floor(s * SR);
  comb(L, dl, fb, mix); comb(R, Math.floor((s + 0.013) * SR), fb, mix);
});

/* Fundido de entrada/salida y normalización */
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const g = Math.min(1, t / 4) * Math.min(1, (DUR - t) / 4);
  L[i] *= g; R[i] *= g;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.85 / peak;

const buf = Buffer.alloc(44 + N * 4);
buf.write('RIFF', 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write('WAVE', 8); buf.write('fmt ', 12);
buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24);
buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(L[i] * norm * 32767))), 44 + i * 4);
  buf.writeInt16LE(Math.max(-32767, Math.min(32767, Math.round(R[i] * norm * 32767))), 46 + i * 4);
}
fs.writeFileSync('public/ambient-v2.wav', buf);
console.log('ambient.wav', DUR.toFixed(1) + 's', 'peak', peak.toFixed(3));
