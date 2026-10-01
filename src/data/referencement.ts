/**
 * Referencement : titre, description et image de partage de chaque page,
 * adresse du site.
 *
 * Le titre et la description par defaut sont ceux du handoff (section 9),
 * repris dans index.html. Les descriptions des autres pages reprennent le
 * chapeau de leur hero (Figma). `indexer: false` pose un noindex.
 *
 * Deux lecteurs :
 *   - src/lib/useTitre.ts, dans le navigateur, a chaque changement de page ;
 *   - vite.config.ts, au build : une copie de index.html par page publiee
 *     (dist/programme/index.html…) avec ces valeurs dans les balises, pour
 *     les reseaux sociaux qui n'executent pas le JavaScript, et le
 *     sitemap.xml.
 * Ce fichier n'importe rien : il est lu aussi par Node au build.
 *
 * Images de partage : 1 200 x 630, dans public/og/. Sans `image`, une page
 * prend celle de l'accueil.
 */

export const SITE = "https://nuitsducapitalinvestissement.fr";

/** Image de partage par defaut (public/og/og-accueil.png). */
export const IMAGE_PARTAGE = "/og/og-accueil.png";

export type Referencement = {
  titre: string;
  description: string;
  indexer?: boolean;
  /** Chemin dans public/, ex. "/og/og-programme.png". Defaut : IMAGE_PARTAGE. */
  image?: string;
};

const SUFFIXE = " · Les Nuits du Capital Investissement";

export const ACCUEIL: Referencement = {
  titre: "Les Nuits du Capital Investissement · Lyon, mi-janvier 2027",
  description:
    "Deux jours pour réunir fonds, banques, conseils, dirigeants et étudiants à Lyon, mi-janvier 2027. Tables rondes, rendez-vous qualifiés et finale du hackathon. Pré-inscriptions ouvertes.",
};

export const REFERENCEMENT: Record<string, Referencement> = {
  programme: {
    titre: `Programme${SUFFIXE}`,
    description:
      "Deux jours, du jeudi soir à la finale : tables rondes, rendez-vous qualifiés et finale du hackathon. Tout se passe en fin de journée et en soirée.",
  },
  hackathon: {
    titre: `Hackathon${SUFFIXE}`,
    description:
      "Un cas d’investissement complet, mené par des équipes d’étudiants sélectionnés dans toute la France, jusqu’à la finale du vendredi soir devant le jury.",
  },
  partenaires: {
    titre: `Devenir partenaire${SUFFIXE}`,
    description:
      "Trois lignes budgétaires mobilisables, un seul événement : sourcing, recrutement et communication. Statut de partenaire fondateur pour la première édition.",
  },
  preinscription: {
    titre: `Se pré-inscrire${SUFFIXE}`,
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

/** Adresse absolue de l'image de partage d'une page. */
export function imagePartage(r: Referencement): string {
  return SITE + (r.image ?? IMAGE_PARTAGE);
}
