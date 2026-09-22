import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { C } from '../theme';
import { VS } from './vtheme';
import { VGrain } from './vui';
import { VIntro } from './VIntro';
import { VHome } from './VHome';
import { VPhil } from './VPhil';
import { VSections } from './VSections';
import { VFinal } from './VFinal';

export const VFilm: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <Sequence from={VS.intro.from} durationInFrames={VS.intro.dur}><VIntro /></Sequence>
    <Sequence from={VS.home.from} durationInFrames={VS.home.dur}><VHome /></Sequence>
    <Sequence from={VS.phil.from} durationInFrames={VS.phil.dur}><VPhil /></Sequence>
    <Sequence from={VS.sections.from} durationInFrames={VS.sections.dur}><VSections /></Sequence>
    <Sequence from={VS.final.from} durationInFrames={VS.final.dur}><VFinal /></Sequence>
    <VGrain />
    <Audio src={staticFile('ambient-v.wav')} />
  </AbsoluteFill>
);
