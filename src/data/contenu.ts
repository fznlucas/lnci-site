/**
 * Contenu editorial de l'evenement : programme des deux jours, faits du
 * hero, concept, hackathon et bandeaux d'action.
 *
 * Source : Figma (page Site web), composants Site / Programme (arc),
 * Programme (detail), Hero, Concept, Hackathon (apercu et deroule),
 * Relais ecoles et Bandeau d'action. Les textes absents du Figma viennent
 * du handoff (docs/HANDOFF.md, section 7).
 *
 * Toujours absents : tarifs partenaires, lieu exact, noms d'intervenants.
 */

/* ------------------------------------------------------------------ */
/* Programme                                                           */
/* ------------------------------------------------------------------ */

/** Libelle de la pastille d'un creneau. */
export type FormatCreneau = "Sur invitation" | "Ouvert" | "Temps fort";

export type Creneau = {
  heure: string;
  intitule: string;
  detail: string;
  format: FormatCreneau;
};

export type Soiree = {
  id: "jeudi" | "vendredi";
  /* Libelles de l'onglet de l'arc : complet, puis court en mobile. */
  onglet: string;
  ongletCourt: string;
  /* Pastille de la liste detaillee. */
  pastille: string;
  titre: string;
  horaires: string;
  affluence: string;
  creneaux: Creneau[];
};

export const SOIREES: Soiree[] = [
  {
    id: "jeudi",
    onglet: "Jeudi · Journée pro",
    ongletCourt: "Jeudi",
    pastille: "Jour 1 · Jeudi",
    titre: "La journée professionnelle",
    horaires: "17h30 à 23h00",
    affluence: "environ 100 professionnels",
    creneaux: [
      {
        heure: "17h30",
        intitule: "Atelier débat tournant",
        detail:
          "Fonds, conseils et dirigeants en petits groupes, on tourne toutes les vingt minutes.",
        format: "Sur invitation",
      },
      {
        heure: "19h00",
        intitule: "Keynote d’ouverture",
        detail: "Le mot des partenaires et le lancement officiel de l’édition.",
        format: "Ouvert",
      },
      {
        heure: "19h30",
        intitule: "Table ronde : marque employeur et sourcing de talents",
        detail: "Comment les fonds attirent et gardent les meilleurs profils.",
        format: "Ouvert",
      },
      {
        heure: "20h30",
        intitule: "Table ronde : comment se construit un deal",
        detail: "De la lettre d’intention au closing, raconté par ceux qui le font.",
        format: "Ouvert",
      },
      {
        heure: "21h30",
        intitule: "Cocktail dînatoire et networking",
        detail: "Le moment où les rendez-vous se prennent.",
        format: "Temps fort",
      },
    ],
  },
  {
    id: "vendredi",
    onglet: "Vendredi · Journée ouverte",
    ongletCourt: "Vendredi",
    pastille: "Jour 2 · Vendredi",
    titre: "La journée ouverte et la finale",
    horaires: "16h00 à 1h00",
    affluence: "environ 250 participants",
    creneaux: [
      {
        heure: "16h00",
        intitule: "Speed-meetings dirigeants et fonds",
        detail: "Des rendez-vous de quinze minutes, préparés à l’avance.",
        format: "Sur invitation",
      },
      {
        heure: "17h45",
        intitule: "LBO : structuration, levier, création de valeur",
        detail: "Ce qui fait vraiment la performance d’une opération.",
        format: "Ouvert",
      },
      {
        heure: "19h00",
        intitule: "Build-up et croissance externe",
        detail: "Acheter pour grandir : méthode, pièges et retours d’expérience.",
        format: "Ouvert",
      },
      {
        heure: "20h15",
        intitule: "Finale du hackathon et remise des prix",
        detail: "Les équipes finalistes face au jury, devant toute la salle.",
        format: "Temps fort",
      },
      {
        heure: "21h15",
        intitule: "Soirée de clôture",
        detail: "On termine ensemble, tard.",
        format: "Ouvert",
      },
    ],
  },
];

/** Textes de la section arc (accueil et en-tete de /programme). */
export const PROGRAMME = {
  pastille: "Programme",
  titre: { attenue: "Deux jours,", plein: "du jeudi soir à la finale" },
  chapeau:
    "Tout se passe en fin de journée et en soirée, un format pensé pour les agendas des dirigeants et des investisseurs.",
  lien: "Voir le programme complet",
  legende: "Programme indicatif, affiné avec les partenaires.",
  /* Note de bas de la liste detaillee. */
  note: "Programme indicatif : les intitulés sont affinés avec les partenaires. Le lieu exact est communiqué aux pré-inscrits.",
} as const;

/* ------------------------------------------------------------------ */
/* Accueil                                                             */
/* ------------------------------------------------------------------ */

/** Chiffres du hero de l'accueil. */
export const FAITS = [
  { valeur: "+350", libelle: "participants sur deux jours" },
  { valeur: "100", libelle: "professionnels le jeudi" },
  { valeur: "250", libelle: "participants le vendredi" },
  { valeur: "~100", libelle: "étudiants en finale du hackathon" },
] as const;

/** Surtitre pose sous l'arc des logos du hero. */
export const SURTITRE_LOGOS_HERO = "Ils soutiennent la première édition";

export const CONCEPT = {
  pastille: "Le concept",
  titre: { attenue: "Deux jours,", plein: "un écosystème au complet" },
  chapeau:
    "Fonds, banques, conseils, dirigeants et étudiants sélectionnés, réunis autour du financement des entreprises à chaque étape de leur vie : croissance, transmission, ouverture de capital.",
  cartes: [
    {
      titre: "Un temps fort à créer",
      texte:
        "Fonds, banquiers d’affaires, conseils et entreprises se croisent toute l’année en rendez-vous bilatéraux. Il manquait le moment où tout l’écosystème se retrouve.",
    },
    {
      titre: "La rencontre avant tout",
      texte:
        "Pas une succession de conférences : la place est donnée à ce qui compte dans ce métier, la rencontre, le sourcing et le deal-making.",
    },
    {
      titre: "Toutes les générations",
      texte:
        "Étudiants, jeunes talents, investisseurs, dirigeants : du hackathon aux rendez-vous qualifiés, tous les métiers dialoguent.",
    },
  ],
  /* Les deux premieres lignes sont attenuees. */
  manifeste: [
    "Ce n’est pas un cycle de conférences.",
    "Ce n’est pas un forum écoles-entreprises.",
    "C’est le moment de l’année où l’écosystème se retrouve, et où les opérations naissent.",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Hackathon                                                           */
/* ------------------------------------------------------------------ */

export const HACKATHON = {
  pastille: "Le hackathon",
  titre: { attenue: "Les fonds s’affrontent", plein: "par équipes interposées" },
  chapeau:
    "Un cas d’investissement complet, mené par des équipes d’étudiants sélectionnés dans toute la France. Tout se joue en présentiel, jusqu’à la finale du vendredi soir devant le jury.",
  actions: {
    decouvrir: "Découvrir le hackathon",
    prevenir: "Être prévenu des candidatures",
    coacher: "Coacher une équipe",
  },
  /* Les trois etapes de l'apercu de l'accueil. */
  etapes: [
    {
      titre: "Chaque fonds coache une équipe",
      texte: "Sur sa propre idée, via ses juniors : les fonds se mesurent indirectement.",
    },
    {
      titre: "Un jury de seniors et de partners",
      texte: "Coaching et jury séparés, livrables anonymisés, notation impartiale.",
    },
    {
      titre: "La finale, le vendredi soir",
      texte: "Devant toute la salle : visibilité maximale pour les équipes et les fonds.",
    },
  ],
  chiffres: [
    { valeur: "~100", libelle: "étudiants en finale" },
    { valeur: "2 jours", libelle: "de production sur place" },
    { valeur: "40", libelle: "bénévoles mobilisés" },
    { valeur: "1 jury", libelle: "de seniors et de partners" },
  ],
} as const;

/** Hero de /hackathon (Figma : chapeau plus court que celui de l'apercu). */
export const HERO_HACKATHON = {
  pastille: "Le hackathon",
  titre: HACKATHON.titre,
  chapeau:
    "Un cas d’investissement complet, mené par des équipes d’étudiants sélectionnés dans toute la France, jusqu’à la finale du vendredi soir devant le jury.",
} as const;

export const HACKATHON_DEROULE = {
  pastille: "Comment ça marche",
  titre: { attenue: "Quatre étapes,", plein: "une seule finale" },
  chapeau: "Coaching et jury sont strictement séparés : les livrables sont anonymisés.",
  etapes: [
    {
      titre: "Présélection à distance",
      texte: "Les équipes candidatent via les Finance Clubs et les Junior-Entreprises.",
    },
    {
      titre: "Un fonds coache chaque équipe",
      texte: "Sur sa propre idée, via ses juniors : les fonds se mesurent indirectement.",
    },
    {
      titre: "Deux jours de production",
      texte: "Le jeudi et le vendredi, sur place, avec l’appui des coachs.",
    },
    {
      titre: "La finale du vendredi soir",
      texte: "Devant le jury et toute la salle, puis la remise des prix.",
    },
  ],
  livrable: {
    surtitre: "Le livrable",
    titre: "Un IC Package complet, comme en comité d’investissement.",
    pieces: [
      "Thèse d’investissement",
      "Modèle financier à trois scénarios",
      "Note de recommandation",
    ],
  },
} as const;

export const RELAIS_ECOLES = {
  pastille: "Relais",
  titre: { attenue: "Relayé auprès des écoles", plein: "de tout le pays" },
  chapeau:
    "Par l’Union des Clubs de Finance de France et la Confédération Nationale des Junior-Entreprises.",
  ecoles: [
    "EDHEC",
    "Dauphine-PSL",
    "Sorbonne Université",
    "Centrale Lyon",
    "INSA Lyon",
    "Grenoble INP-Ensimag",
    "Pôle Léonard de Vinci",
    "Epitech",
    "iaelyon",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Bandeaux d'action de fin de page                                    */
/* ------------------------------------------------------------------ */

export type Bandeau = {
  pastille: string;
  titre: { attenue: string; plein: string };
  texte: string;
};

export const BANDEAUX = {
  accueil: {
    pastille: "Pré-inscriptions ouvertes",
    titre: { attenue: "Soyez les premiers", plein: "informés" },
    texte:
      "Les dates exactes et la billetterie arrivent très vite. Laissez votre nom, votre e-mail et votre poste : vous recevrez le lien en priorité.",
  },
  programme: {
    pastille: "Pré-inscription",
    titre: { attenue: "Le programme vous parle ?", plein: "Pré‑inscrivez‑vous." },
    texte: "Vous recevrez le programme détaillé et le lien de la billetterie en priorité.",
  },
  hackathon: {
    pastille: "Pré-inscription",
    titre: { attenue: "Étudiant ou étudiante ?", plein: "Soyez prévenus en premier." },
    texte:
      "Pré-inscrivez-vous en choisissant « Étudiant·e » : on vous écrit dès l’ouverture des candidatures.",
  },
} satisfies Record<string, Bandeau>;

/* ------------------------------------------------------------------ */
/* Contact, merci, 404                                                 */
/* ------------------------------------------------------------------ */

export const HERO_CONTACT = {
  pastille: "Contact",
  titre: { attenue: "Une question ?", plein: "Écrivez-nous." },
  texte:
    "Une seule adresse pour tout : participation, partenariat, presse. On vous répond sous 48 h.",
  action: "Nous écrire",
} as const;

export const MERCI = {
  pastille: "Pré-inscription confirmée",
  titre: { attenue: "C’est noté,", plein: "merci !" },
  texte:
    "Vous recevrez le lien de la billetterie en priorité, dès son ouverture. En attendant, suivez l’aventure sur LinkedIn.",
  linkedin: "Suivre sur LinkedIn",
  retour: "Retour à l’accueil",
} as const;

export const INTROUVABLE = {
  grand: "404",
  pastille: "Page introuvable",
  titre: { attenue: "Cette page s’est perdue", plein: "dans une data room." },
  texte: "Le lien est peut-être cassé, ou la page a déménagé. L’essentiel est sur l’accueil.",
  retour: "Retour à l’accueil",
} as const;
