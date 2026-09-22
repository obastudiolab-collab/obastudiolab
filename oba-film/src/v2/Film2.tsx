import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { C } from '../theme';
import { focusPull } from '../remocn/focus-pull';
import { VS, TR } from './vtheme';
import { VGrain } from './vui';
import { VIntro } from './VIntro';
import { VHome } from './VHome';
import { VPhil } from './VPhil';
import { VSections } from './VSections';
import { VFinal } from './VFinal';

const T = (n = TR) => (
  <TransitionSeries.Transition presentation={focusPull({ blur: 22 })} timing={linearTiming({ durationInFrames: n })} />
);

export const Film2: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={VS.intro.dur} name="Intro"><VIntro /></TransitionSeries.Sequence>
      {T()}
      <TransitionSeries.Sequence durationInFrames={VS.home.dur} name="Home"><VHome /></TransitionSeries.Sequence>
      {T()}
      <TransitionSeries.Sequence durationInFrames={VS.phil.dur} name="Conexiones"><VPhil /></TransitionSeries.Sequence>
      {T()}
      <TransitionSeries.Sequence durationInFrames={VS.sections.dur} name="Secciones"><VSections /></TransitionSeries.Sequence>
      {T()}
      <TransitionSeries.Sequence durationInFrames={VS.final.dur} name="Final"><VFinal /></TransitionSeries.Sequence>
    </TransitionSeries>
    <VGrain />
    <Audio src={staticFile('ambient-v2.wav')} />
  </AbsoluteFill>
);
