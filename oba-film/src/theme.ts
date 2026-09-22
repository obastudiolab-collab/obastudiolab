import { loadFont } from '@remotion/google-fonts/Archivo';
import { loadFont as loadItalic } from '@remotion/google-fonts/Archivo';

const roman = loadFont('normal', { weights: ['300', '400', '500', '600', '700'] });
loadItalic('italic', { weights: ['300', '400'] });

export const FONT = roman.fontFamily;

export const C = {
  ink: '#0c0c0c',
  soil: '#15110d',
  soil2: '#1d1812',
  cream: '#fae1c0',
  paper: '#f9f2e2',
  shop: '#f3e8d3',
  accent: '#9d7759',
  accentDark: '#806148',
  text: '#1a1a1a',
  olive: '#6f7a4e',
  moss: '#4f5b3d',
  clay: '#a3654a',
  ochre: '#a88a55',
  line: 'rgba(250,225,192,0.14)',
};

export const W = 1920;
export const H = 1080;
export const FPS = 30;

export const SCENES = {
  intro: { from: 0, dur: 300 },
  site: { from: 280, dur: 520 },
  philosophy: { from: 780, dur: 420 },
  experience: { from: 1180, dur: 480 },
  shop: { from: 1640, dur: 540 },
  final: { from: 2160, dur: 300 },
};
export const TOTAL = 2460;
