/**
 * Contenu editorial.
 * Source : presentation generale page 7 (grille des creneaux) et page 5
 * (deroule), dossier partenaire fondateur, brief equipe v1.0.
 *
 * Absents volontairement : total de participants attendus (brief 3.4),
 * tarifs partenaires, logos medias (brief 12), lieu (brief 3.3),
 * references clients des Junior-Entreprises, noms d'intervenants.
 */

export type Creneau = {
  heure: string;
  intitule: string;
  detail?: string;
  format: string;
  statut?: "ouvert" | "arrete";
};

export type Soiree = {
  jour: string;
  titre: string;
  horaires: string;
  produit?: boolean;
  creneaux: Creneau[];
};

export const SOIREES: Soiree[] = [
  {
    jour: "Jeudi 12",
    titre: "L'ouverture",
    horaires: "17h30 - 23h00",
    creneaux: [
      {
        heure: "17h30",
        intitule: "Atelier débat tournant",
        detail: "Trente minutes par table, cinq à six personnes, un thème par table. Accueil en continu à chaque rotation.",
        format: "Brise-glace",
        statut: "arrete",
      },
      {
        heure: "19h00",
        intitule: "Keynote d'ouverture et prise de parole des partenaires",
        detail: "Format court, trente minutes.",
        format: "Organisation",
        statut: "arrete",
      },
      {
        heure: "19h30",
        intitule: "Table ronde LP : ce que les LPs attendent des GPs en 2027",
        detail: "Fonds régionaux en levée, family offices, institutionnels, fonds de fonds.",
        format: "Créneau ouvert",
        statut: "ouvert",
      },
      {
        heure: "20h30",
        intitule: "Comment se construit un deal : sourcing et dealmaking",
        format: "Créneau ouvert",
        statut: "ouvert",
      },
      {
        heure: "21h30",
        intitule: "Cocktail dînatoire et networking",
        format: "Chaque soir",
        statut: "arrete",
      },
    ],
  },
  {
    jour: "Vendredi 13",
    titre: "L'écosystème",
    horaires: "18h00 - 23h00",
    produit: true,
    creneaux: [
      {
        heure: "18h00",
        intitule: "LBO : structuration, levier, création de valeur",
        format: "Créneau ouvert",
        statut: "ouvert",
      },
      {
        heure: "19h15",
        intitule: "Speed dating dirigeants et fonds",
        detail: "Rendez-vous appairés avec des entreprises pré-qualifiées, instruites en amont. Six à huit rendez-vous par fonds partenaire.",
        format: "Atelier",
        statut: "arrete",
      },
      {
        heure: "20h30",
        intitule: "Build-up et croissance externe : construire un leader",
        format: "Créneau ouvert",
        statut: "ouvert",
      },
      {
        heure: "21h30",
        intitule: "Cocktail dînatoire et networking",
        format: "Chaque soir",
        statut: "arrete",
      },
    ],
  },
  {
    jour: "Samedi 14",
    titre: "La finale",
    horaires: "18h00 - 23h00",
    creneaux: [
      {
        heure: "18h00",
        intitule: "Branding et création de communauté",
        detail: "Nouveau grand levier du deal et du talent sourcing ?",
        format: "Créneau ouvert",
        statut: "ouvert",
      },
      {
        heure: "19h15",
        intitule: "Transmission d'entreprise et search funds",
        format: "Créneau ouvert",
        statut: "ouvert",
      },
      {
        heure: "20h30",
        intitule: "Restitution de la compétition, remise des prix et soirée finale",
        detail: "Restitution devant le jury des fonds partenaires, puis remise des prix devant un large public.",
        format: "Temps fort",
        statut: "arrete",
      },
      {
        heure: "21h30",
        intitule: "Cocktail dînatoire et networking",
        format: "Chaque soir",
        statut: "arrete",
      },
    ],
  },
];

/** Chiffres soutenables. Aucun total agrege. */
export const CHIFFRES = [
  { valeur: "6 à 8", libelle: "rendez-vous par fonds partenaire, le vendredi", note: "Entreprises pré-qualifiées, créneaux de vingt minutes, dossier transmis dix jours avant." },
  { valeur: "~100", libelle: "étudiants finance présélectionnés", note: "Appel à candidatures relayé dans toutes les écoles du pays." },
  { valeur: "48 h", libelle: "de production sur un cas d'investissement", note: "Thèse, modèle financier à trois scénarios, note de recommandation." },
  { valeur: "3", libelle: "journées libres, ouvertes aux formats des partenaires", note: "L'événement se tient en soirée. Les journées vous appartiennent." },
  { valeur: "4", libelle: "paliers de partenariat, exclusivité sectorielle au premier", note: "Un seul acteur par secteur au palier le plus élevé." },
  { valeur: "20 nov.", libelle: "rapport partenaire nominatif livré", note: "Ventilation de l'audience, organisations présentes, rendez-vous générés." },
] as const;

export const CALENDRIER = [
  { date: "30 septembre", texte: "Clôture des engagements partenaires" },
  { date: "Début octobre", texte: "Programme publié, créneaux et sujets figés" },
  { date: "12 au 14 novembre", texte: "Les trois soirées" },
  { date: "20 novembre", texte: "Rapport partenaire nominatif livré" },
] as const;

/**
 * Les quatre publics de l'edition.
 *
 * `intitule` est en registre professionnel : le quatrieme public est
 * designe "Jeunes talents en finance", jamais "Etudiants". Le vocabulaire
 * etudiant reste reserve a la page de candidature, ou il est a sa place.
 *
 * `page` est un identifiant du registre de `data/pages.ts`, jamais un
 * chemin ecrit a la main. Une cible non publiee ne rend aucun lien : la
 * ligne se termine alors sur son texte.
 */
export const PUBLICS = [
  {
    intitule: "Fonds d'investissement",
    texte: "Du sourcing, pas uniquement de la communication. Une soirée avec des dirigeants et des intermédiaires régionaux relève du deal flow : autre ligne budgétaire que l'événementiel, autre arbitre, et aucune concurrence avec les rendez-vous parisiens de novembre.",
    page: "partenaires",
    lien: "Devenir partenaire",
  },
  {
    intitule: "Dirigeants de PME et d'ETI",
    texte: "Ouvrir son capital, préparer une transmission, financer une croissance externe. Rencontrer plusieurs investisseurs le même soir, sur des dossiers instruits en amont, sans engager de processus.",
    page: "reserver",
    lien: "Réserver sa place",
  },
  {
    intitule: "Banques d'affaires et conseils",
    texte: "Les prescripteurs de la place réunis sur trois soirées, aux côtés de Lyon Place Financière. Être dans la pièce où les opérations se discutent, pas seulement en amont.",
    page: "programme",
    lien: "Le programme des trois soirées",
  },
  {
    intitule: "Jeunes talents en finance",
    texte: "Une compétition d'analyse d'investissement encadrée par les équipes des fonds, une restitution devant un jury de seniors, et quarante-huit heures de production qui documentent le travail mieux qu'un CV.",
    /* "Le hackathon" sur la page d'accueil s'ecarte du vocabulaire dedouble
       de CONVENTIONS.md, qui reserve le mot a la page de candidature
       etudiante et impose ailleurs "competition d'analyse
       d'investissement". Demande explicite : ne pas remettre en conformite
       sans redemander. */
    page: "competition",
    lien: "Le hackathon",
  },
] as const;
