// aucun import ici : vite.config.ts lit aussi ce fichier au build (pages html par route et sitemap)
// l'accueil doit rester aligné avec index.html, les descriptions reprennent le chapeau des heros
// images de partage en 1200 x 630 dans public/og/, exportées du figma (cadres 189:3098 à 189:3218)

export const SITE = "https://nuitsducapitalinvestissement.fr";

export const IMAGE_PARTAGE = "/og/og-accueil.png";

export type Referencement = {
  titre: string;
  description: string;
  /** false pose un noindex */
  indexer?: boolean;
  /** chemin dans public/, IMAGE_PARTAGE par défaut */
  image?: string;
};

const SUFFIXE = " · Les Nuits du Capital Investissement";

export const ACCUEIL: Referencement = {
  image: IMAGE_PARTAGE,
  titre: "Les Nuits du Capital Investissement · Lyon, mi-janvier 2027",
  description:
    "Deux jours pour réunir fonds, banques, conseils, dirigeants et étudiants à Lyon, mi-janvier 2027. Tables rondes, rendez-vous qualifiés et finale du hackathon. Pré-inscriptions ouvertes.",
};

export const REFERENCEMENT: Record<string, Referencement> = {
  programme: {
    titre: `Programme${SUFFIXE}`,
    image: "/og/og-programme.png",
    description:
      "Deux jours, du jeudi soir à la finale : tables rondes, rendez-vous qualifiés et finale du hackathon. Tout se passe en fin de journée et en soirée.",
  },
  hackathon: {
    titre: `Hackathon${SUFFIXE}`,
    image: "/og/og-hackathon.png",
    description:
      "Un cas d’investissement complet, mené par des équipes d’étudiants sélectionnés dans toute la France, jusqu’à la finale du vendredi soir devant le jury.",
  },
  partenaires: {
    titre: `Devenir partenaire${SUFFIXE}`,
    image: "/og/og-partenaires.png",
    description:
      "Trois lignes budgétaires mobilisables, un seul événement : sourcing, recrutement et communication. Statut de partenaire fondateur pour la première édition.",
  },
  preinscription: {
    titre: `Se pré-inscrire${SUFFIXE}`,
    image: "/og/og-preinscription.png",
    description:
      "Les dates exactes et la billetterie arrivent très vite. Pré-inscrivez-vous : vous recevrez le lien de la billetterie en priorité, dès son ouverture.",
  },
  contact: {
    titre: `Contact${SUFFIXE}`,
    description:
      "Une seule adresse pour tout : participation, partenariat, presse. On vous répond sous 48 h.",
  },
  "mentions-legales": {
    titre: `Mentions légales${SUFFIXE}`,
    description: "Éditeur, hébergement et propriété intellectuelle.",
  },
  confidentialite: {
    titre: `Confidentialité${SUFFIXE}`,
    description: "Ce que nous faisons de vos données, et rien de plus.",
  },
  merci: {
    titre: `Pré-inscription confirmée${SUFFIXE}`,
    description: "Vous recevrez le lien de la billetterie en priorité, dès son ouverture.",
    indexer: false,
  },
  introuvable: {
    titre: `Page introuvable${SUFFIXE}`,
    description: "Le lien est peut-être cassé, ou la page a déménagé.",
    indexer: false,
  },
};

export function imagePartage(r: Referencement): string {
  return SITE + (r.image ?? IMAGE_PARTAGE);
}
