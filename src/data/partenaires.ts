// aucun prix nulle part : la grille tarifaire s'envoie sur demande

// logos

export type Logo = {
  id: string;
  nom: string;
  // sous public/logos/, en webp sans perte ; fichier absent = nom affiché en texte
  fichier: string;
  // taille réelle du fichier en px, pour réserver la place avant chargement
  largeur: number;
  hauteur: number;
};

// TODO(LNCI): fichiers HD, et retirer tout partenaire non confirmé avant mise en ligne
export const LOGOS: Logo[] = [
  {
    id: "onlylyon",
    nom: "ONLYLYON Invest",
    fichier: "partenaires/onlylyon.webp",
    largeur: 178,
    hauteur: 87,
  },
  {
    id: "metropole",
    nom: "Métropole de Lyon",
    fichier: "partenaires/metropole.webp",
    largeur: 215,
    hauteur: 87,
  },
  {
    id: "ville-de-lyon",
    nom: "Ville de Lyon",
    fichier: "partenaires/villedelyon.webp",
    largeur: 225,
    hauteur: 87,
  },
  {
    id: "region-aura",
    nom: "Région Auvergne-Rhône-Alpes",
    fichier: "partenaires/region-aura.webp",
    largeur: 183,
    hauteur: 87,
  },
  {
    id: "arkea",
    nom: "Arkéa Capital",
    fichier: "partenaires/arkea.webp",
    largeur: 100,
    hauteur: 87,
  },
  { id: "bnp", nom: "BNP Paribas", fichier: "partenaires/bnp.webp", largeur: 239, hauteur: 87 },
  {
    id: "caisse-epargne",
    nom: "Caisse d’Épargne",
    fichier: "partenaires/caisse-epargne.webp",
    largeur: 242,
    hauteur: 87,
  },
  {
    id: "lyon-place-financiere",
    nom: "Lyon Place Financière",
    fichier: "lyon-place-financiere-couleur.webp",
    largeur: 120,
    hauteur: 120,
  },
  {
    id: "iaelyon",
    nom: "iaelyon School of Management",
    fichier: "iaelyon-school-couleur.webp",
    largeur: 600,
    hauteur: 120,
  },
  {
    id: "jean-moulin",
    nom: "Université Jean Moulin Lyon 3",
    fichier: "partenaires/jean-moulin.webp",
    largeur: 141,
    hauteur: 93,
  },
  {
    id: "dealmakers",
    nom: "DealMakers Club",
    fichier: "dealmakers-club-couleur.webp",
    largeur: 477,
    hauteur: 120,
  },
];

function logos(ids: string[]): Logo[] {
  return ids.map((id) => LOGOS.find((l) => l.id === id)).filter((l): l is Logo => l !== undefined);
}

// mur : tous les logos, dans l'ordre d'affichage
export const LOGOS_PARTENAIRES = LOGOS;

// arc du hero, de gauche à droite
export const LOGOS_HERO = logos([
  "arkea",
  "onlylyon",
  "metropole",
  "bnp",
  "lyon-place-financiere",
  "caisse-epargne",
  "region-aura",
]);

// pied de page, logos en version blanche
export const CO_ORGANISATEURS: Logo[] = [
  {
    id: "dealmakers",
    nom: "DealMakers Club",
    fichier: "dealmakers-club-blanc.webp",
    largeur: 477,
    hauteur: 120,
  },
  {
    id: "iae-lyon-junior-conseil",
    nom: "IAE Lyon Junior Conseil",
    fichier: "iae-lyon-junior-conseil-blanc.webp",
    largeur: 381,
    hauteur: 120,
  },
  {
    id: "iaelyon-finance-club",
    nom: "iaelyon Finance Club",
    fichier: "iaelyon-finance-club-blanc.webp",
    largeur: 197,
    hauteur: 120,
  },
];

// mur de logos (accueil et /partenaires)

export const MUR = {
  pastille: "Partenaires",
  titre: { attenue: "Ils soutiennent", plein: "la première édition" },
  chapeau: "Institutions, banques et acteurs de la place lyonnaise s’engagent à nos côtés.",
  benefices: [
    {
      surtitre: "Deal flow",
      texte: "Des rendez-vous qualifiés avec des dirigeants du territoire.",
    },
    {
      surtitre: "Recrutement",
      texte: "Un accès direct à une centaine d’étudiants présélectionnés.",
    },
    {
      surtitre: "Communication",
      texte: "Une prise de parole dans le programme, pas juste un logo.",
    },
  ],
  actions: { partenaire: "Devenir partenaire", plaquette: "Recevoir la plaquette" },
} as const;

// page /partenaires

export const HERO_PARTENAIRES = {
  pastille: "Devenir partenaire",
  titre: { attenue: "Construisons ensemble", plein: "le rendez-vous du capital investissement" },
  chapeau:
    "Trois lignes budgétaires mobilisables, un seul événement : sourcing, recrutement et communication.",
  actions: { plaquette: "Recevoir la plaquette", ecrire: "Écrire à l’équipe" },
} as const;

// objets des mails préremplis
export const OBJET_PLAQUETTE = "Demande de plaquette partenaires";

export const OBJET_GRILLE = "Demande de grille tarifaire";

export const BENEFICES = {
  pastille: "Bénéfices",
  titre: { attenue: "Ce que vous", plein: "y gagnez" },
  chapeau: "Trois lignes budgétaires différentes, un seul événement.",
  cartes: [
    {
      surtitre: "Deal flow",
      titre: "Du business généré en région",
      texte:
        "Mise en relation avec des dirigeants, des cibles et des intermédiaires du territoire. Le vendredi est construit pour cela.",
      preuve: { valeur: "5", libelle: "rendez-vous avec des entreprises pré-qualifiées" },
    },
    {
      surtitre: "Recrutement",
      titre: "La marque employeur et le vivier",
      texte:
        "L’événement finance le plus visible auprès des étudiants de toute la France, relayé par les Finance Clubs et les Junior-Entreprises.",
      preuve: { valeur: "~100", libelle: "étudiants présélectionnés, jugés sur pièces" },
    },
    {
      surtitre: "Communication",
      titre: "Une prise de parole, pas un logo",
      texte:
        "Votre créneau nominatif dans le programme, votre sujet, vos intervenants, et une couverture pensée pour être reprise.",
      preuve: { valeur: "1", libelle: "rapport chiffré, livré après l’événement" },
    },
  ],
} as const;

export const STATUT_FONDATEUR = {
  pastille: "Première édition",
  titre: { attenue: "Le statut", plein: "de partenaire fondateur" },
  chapeau:
    "Réservé aux partenaires de la première édition, il récompense ceux qui construisent l’événement avec nous.",
  cartes: [
    {
      titre: "Vos conditions gelées",
      texte:
        "Les conditions de la première édition sont conservées sur les deux éditions suivantes.",
    },
    {
      titre: "Priorité de reconduction",
      texte: "Votre créneau et votre format vous restent réservés.",
    },
    {
      titre: "Le Cercle des Fondateurs",
      texte: "Un bloc distinct et permanent, cité à chaque édition.",
    },
    {
      titre: "Vous écrivez le format",
      texte: "Les fondateurs choisissent leurs sujets et façonnent l’événement.",
    },
  ],
} as const;

export const LE_OFF = {
  pastille: "Le Off",
  titre: { attenue: "Les matinées", plein: "appartiennent aux partenaires" },
  chapeau:
    "Le programme principal commence en fin de journée. Ouvrez votre propre format le matin, à votre marque, sur un créneau réservé du programme officiel. Vous gardez la main, nous amplifions.",
  formats: [
    "Petit-déjeuner",
    "Atelier",
    "Déjeuner",
    "Rencontre fonds et dirigeants",
    "Rencontre avec des LPs",
  ],
  cartes: [
    {
      titre: "Une audience déjà sur place",
      texte: "Votre format est annoncé dans le programme et relayé aux inscrits.",
    },
    { titre: "Une équipe de bénévoles dédiée", texte: "Accueil, logistique et suivi le jour J." },
    {
      titre: "Intégré au matchmaking",
      texte: "Branché sur le dispositif de rendez-vous qualifiés.",
    },
    {
      titre: "Un seul format par créneau",
      texte: "Mis en avant auprès de nos institutions partenaires.",
    },
  ],
  lien: "Proposer un format",
} as const;

export type Niveau = {
  nom: string;
  etiquette?: string;
  /** carte en ton électrique */
  misEnAvant?: boolean;
  avantages: string[];
};

export const NIVEAUX = {
  pastille: "Offres",
  titre: { attenue: "Quatre niveaux", plein: "d’engagement" },
  chapeau:
    "Au niveau Platine, un seul acteur par secteur. Les fonds d’investissement bénéficient d’une présence multi-acteurs. Grille tarifaire sur demande.",
  liste: [
    {
      nom: "Platine",
      etiquette: "Exclusif",
      misEnAvant: true,
      avantages: [
        "Exclusivité sectorielle",
        "Logo grand format sur tous les supports",
        "Siège au jury final du hackathon",
        "Une équipe coachée à vos couleurs",
        "10 places sur les deux jours",
      ],
    },
    {
      nom: "Or",
      avantages: [
        "Lead d’une table ronde",
        "Accès prioritaire au matchmaking",
        "Logo print, digital et newsletter",
        "6 places",
      ],
    },
    {
      nom: "Argent",
      avantages: [
        "Une place de juré au hackathon",
        "Accès au matchmaking",
        "Logo sur le site et le programme",
        "3 places",
      ],
    },
    {
      nom: "Bronze",
      avantages: [
        "Accès à la journée professionnelle",
        "Stand de visibilité dédié",
        "Logo sur la page partenaires",
        "2 places",
      ],
    },
  ] satisfies Niveau[],
  note: "À partir du niveau Argent, le partenariat inclut l’adhésion annuelle à l’Union des Clubs de Finance de France.",
  action: "Recevoir la grille tarifaire",
} as const;

export const VISIBILITE = {
  pastille: "Visibilité",
  titre: { attenue: "Une couverture qui dure", plein: "plus que deux jours" },
  chapeau:
    "Presse économique, écoles et comptes finance relaient l’édition. Après l’événement, vous recevez un rapport nominatif et chiffré.",
  // noms en pastilles en attendant les logos
  // TODO(LNCI): logos des médias à fournir
  medias: [
    { surtitre: "Presse économique", noms: ["Bref Eco", "Acteurs de l’économie", "Le Point"] },
    { surtitre: "Écoles et universités", noms: ["iaelyon", "IAE France", "Réseau des écoles"] },
    {
      surtitre: "Comptes finance",
      noms: ["Union des Clubs de Finance de France", "Dauphine Finance Club"],
    },
  ],
  rapport: {
    titre: "Ce que vous recevez après l’événement",
    elements: [
      "La ventilation réelle de l’audience",
      "La liste des organisations présentes",
      "Vos rendez-vous générés",
      "Dix photos exploitables",
      "La vidéo de l’édition",
      "Les chiffres de diffusion",
    ],
  },
} as const;

// bandeau de fin de /partenaires
export const CONTACT_PARTENAIRES = {
  pastille: "Partenaires",
  titre: { attenue: "Parlons de", plein: "votre présence" },
  texte:
    "Pierre-Louis Ravier, référent relations partenariats, vous répond sous 48 h et vous envoie la plaquette complète.",
  action: "Écrire à l’équipe",
  // vide = bouton de téléchargement masqué
  plaquettePdf: "", // TODO(LNCI): PDF dans public/docs/
  libellePdf: "Télécharger la plaquette",
} as const;
