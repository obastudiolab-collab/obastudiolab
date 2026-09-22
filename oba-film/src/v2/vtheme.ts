export const VW = 1080;
export const VH = 1920;
export const TR = 24;
export const VS = {
  intro: { dur: 100 },
  home: { dur: 190 },
  phil: { dur: 250 },
  sections: { dur: 380 },
  final: { dur: 330 },
};
export const VTOTAL = VS.intro.dur + VS.home.dur + VS.phil.dur + VS.sections.dur + VS.final.dur - TR * 4;
export const img = (n: string) => 'img/' + n;
