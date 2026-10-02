// remplace filter: blur() : le profil d'un disque flouté par une gaussienne est
// précalculé (convolution numérique) et passé à un radial-gradient, même rendu
// sans rien recalculer au défilement
// profil = disque de rayon 1, flou d'écart-type s (= valeur du blur() css) :
// opacité à 25 rayons réguliers de 0 à 1 + 3s (`etendue`), positions en % de l'étendue
type Profil = { etendue: number; arrets: readonly (readonly [number, number])[] };

// Halo : flou = 0,1375 du cadre, disque = 0,7 du cadre
export const PROFIL_SECTION: Profil = {
  etendue: 2.1786,
  arrets: [
    [0, 0.9608],
    [4.17, 0.9574],
    [8.33, 0.9468],
    [12.5, 0.9282],
    [16.67, 0.9002],
    [20.83, 0.8616],
    [25, 0.8114],
    [29.17, 0.7495],
    [33.33, 0.6767],
    [37.5, 0.5954],
    [41.67, 0.5089],
    [45.83, 0.4214],
    [50, 0.3371],
    [54.17, 0.26],
    [58.33, 0.1929],
    [62.5, 0.1375],
    [66.67, 0.094],
    [70.83, 0.0615],
    [75, 0.0385],
    [79.17, 0.023],
    [83.33, 0.0132],
    [87.5, 0.0072],
    [91.67, 0.0037],
    [95.83, 0.0018],
    [100, 0],
  ],
};

// HaloHero : flou = 11 % du diamètre (6,875 / 31,25 du rayon)
export const PROFIL_HERO: Profil = {
  etendue: 1.66,
  arrets: [
    [0, 1],
    [4.17, 1],
    [8.33, 0.9999],
    [12.5, 0.9996],
    [16.67, 0.999],
    [20.83, 0.9974],
    [25, 0.9936],
    [29.17, 0.9857],
    [33.33, 0.9701],
    [37.5, 0.9425],
    [41.67, 0.8977],
    [45.83, 0.8315],
    [50, 0.7425],
    [54.17, 0.6336],
    [58.33, 0.5124],
    [62.5, 0.39],
    [66.67, 0.2775],
    [70.83, 0.1837],
    [75, 0.1126],
    [79.17, 0.0637],
    [83.33, 0.0332],
    [87.5, 0.0159],
    [91.67, 0.0069],
    [95.83, 0.0028],
    [100, 0],
  ],
};

export function degradeHalo(couleur: string, profil: Profil): string {
  const arrets = profil.arrets.map(
    ([position, opacite]) =>
      `color-mix(in srgb, ${couleur} ${(opacite * 100).toFixed(2)}%, transparent) ${position}%`,
  );
  return `radial-gradient(circle closest-side, ${arrets.join(", ")})`;
}
