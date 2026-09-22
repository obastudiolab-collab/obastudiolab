import React from 'react';
import { Composition } from 'remotion';
import { Film } from './Film';
import { VFilm } from './v/VFilm';
import { Film2 } from './v2/Film2';
import { VTOTAL as V2TOTAL } from './v2/vtheme';
import { VTOTAL, VW, VH } from './v/vtheme';
import { FPS, H, TOTAL, W } from './theme';

export const Root: React.FC = () => (
  <>
    <Composition id="Film" component={Film} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
    <Composition id="FilmVertical" component={VFilm} durationInFrames={VTOTAL} fps={FPS} width={VW} height={VH} />
    <Composition id="FilmVertical2" component={Film2} durationInFrames={V2TOTAL} fps={FPS} width={VW} height={VH} />
  </>
);
