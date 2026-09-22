import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import { C, SCENES } from './theme';
import { Grain } from './ui';
import { Intro } from './scenes/Intro';
import { Site } from './scenes/Site';
import { Philosophy } from './scenes/Philosophy';
import { Experience } from './scenes/Experience';
import { Shop } from './scenes/Shop';
import { Final } from './scenes/Final';

export const Film: React.FC = () => (
  <AbsoluteFill style={{ background: C.ink }}>
    <Sequence from={SCENES.intro.from} durationInFrames={SCENES.intro.dur}><Intro /></Sequence>
    <Sequence from={SCENES.site.from} durationInFrames={SCENES.site.dur}><Site /></Sequence>
    <Sequence from={SCENES.philosophy.from} durationInFrames={SCENES.philosophy.dur}><Philosophy /></Sequence>
    <Sequence from={SCENES.experience.from} durationInFrames={SCENES.experience.dur}><Experience /></Sequence>
    <Sequence from={SCENES.shop.from} durationInFrames={SCENES.shop.dur}><Shop /></Sequence>
    <Sequence from={SCENES.final.from} durationInFrames={SCENES.final.dur}><Final /></Sequence>
    <Grain />
    <Audio src={staticFile('ambient.wav')} />
  </AbsoluteFill>
);
