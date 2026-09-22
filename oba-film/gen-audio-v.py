s = open('make-audio.js', encoding='utf-8').read()
s = s.replace('const TOTAL_FRAMES = 2460;', 'const TOTAL_FRAMES = 1186;')
s = s.replace("public/ambient.wav", "public/ambient-v.wav")
start = s.index('const S = {')
end = s.index('/* Reverb ligera')
events = '''
const S = { home: 72, phil: 250, sec: 488, fin: 856 };
[S.home, S.phil, S.sec, S.fin].forEach((f) => swish(f - 8, 0.8, 1));
[46, 92, 138].forEach((o) => swish(S.home + o - 4, 0.45, 0.5));
for (let i = 0; i < 8; i++) { click(S.phil + 12 + i * 22 + 4, 0.55, i % 2 ? 0.25 : -0.25); if (i % 2 === 0) swish(S.phil + 12 + i * 22 - 4, 0.4, 0.35); }
for (let i = 1; i < 5; i++) { swish(S.sec + i * 76 - 2, 0.55, 0.8); click(S.sec + i * 76 + 12, 0.6, i % 2 ? 0.2 : -0.2); }
swish(S.fin + 84, 0.5, 0.45);
swish(S.fin + 148, 0.6, 0.6);
click(S.fin + 170, 0.5, 0);
{ const i0 = Math.floor(((S.fin + 84) / FPS) * SR); for (let k = 0; k < SR * 4 && i0 + k < N; k++) { const tt = k / SR; const v = Math.sin(TAU * 196 * tt) * Math.exp(-tt * 1.0) * 0.09 + Math.sin(TAU * 293.66 * tt) * Math.exp(-tt * 1.3) * 0.055 + Math.sin(TAU * 392 * tt) * Math.exp(-tt * 1.6) * 0.03; L[i0 + k] += v; R[i0 + k] += v; } }

'''
s = s[:start] + events + s[end:]
s = s.replace('s += 11.6', 's += 6.2')
open('make-audio-v.js', 'w', encoding='utf-8').write(s)
print('ok')
