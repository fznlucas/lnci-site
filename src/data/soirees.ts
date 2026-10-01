/**
 * Les trois soirees.
 *
 * ATTENTION, contenu non stabilise. Les intitules et les horaires different
 * entre la charte page 11 et la presentation generale. Les valeurs ci-dessous
 * suivent la charte, qui est le support qui prescrit le site.
 * Voir le document d'arbitrage, points 2.3 et 9.2.
 */

/**
 * Une ligne du programme. Le format est un intitule de dispositif, pas un
 * engagement : il decrit ce que la sequence est, table ronde, atelier,
 * cocktail. A valider avec le comite avant publication, comme le reste du
 * contenu de ce fichier.
 */
export type Sequence = { heure: string; libelle: string; format: string };

export type Soiree = {
  id: string;
  jour: string;
  jourCourt: string;
  intitule: string;
  horaires: string;
  sequences: Sequence[];
  mention: string;
  miseEnAvant?: boolean;
};

export const SOIREES: Soiree[] = [
  {
    id: "jeudi",
    jour: "Jeudi 12 novembre",
    jourCourt: "Jeudi 12",
    intitule: "L'ouverture du marche",
    horaires: "17h30 - 23h00",
    sequences: [
      { heure: "17h30", libelle: "Atelier debat tournant", format: "Atelier" },
      { heure: "19h00", libelle: "Levee de fonds", format: "Table ronde" },
      { heure: "21h30", libelle: "Cocktail dinatoire", format: "Cocktail" },
    ],
    mention: "Voir le detail",
  },
  {
    id: "vendredi",
    jour: "Vendredi 13 novembre",
    jourCourt: "Vendredi 13",
    intitule: "Les operations et les dirigeants",
    horaires: "18h00 - 23h00",
    sequences: [
      { heure: "18h00", libelle: "LBO et creation de valeur", format: "Table ronde" },
      { heure: "19h00", libelle: "Atelier de deal-making", format: "Rendez-vous appaires" },
      { heure: "20h00", libelle: "Pitchs de PME et de start-up", format: "Pitchs" },
      { heure: "21h30", libelle: "Cocktail dinatoire", format: "Cocktail" },
    ],
    mention: "Soiree mise en avant",
    miseEnAvant: true,
  },
  {
    id: "samedi",
    jour: "Samedi 14 novembre",
    jourCourt: "Samedi 14",
    intitule: "La finale et la cloture",
    horaires: "18h00 - 23h00",
    sequences: [
      { heure: "18h00", libelle: "Restitution devant le jury", format: "Restitution" },
      { heure: "20h30", libelle: "Remise des prix", format: "Ceremonie" },
      { heure: "21h30", libelle: "Cocktail dinatoire", format: "Cocktail" },
    ],
    mention: "Voir le detail",
  },
];
