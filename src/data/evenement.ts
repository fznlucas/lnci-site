// lieu : « Lyon » suffit, le lieu exact est réservé aux préinscrits
// pas de date au jour près tant qu'elle n'est pas confirmée

export const EVENEMENT = {
  nom: "Les Nuits du Capital Investissement",
  // pastille au-dessus du titre de l'accueil, version courte en mobile
  surTitre: "Première édition · Lyon · Mi-janvier 2027",
  surTitreCourt: "Première édition · Lyon",
  dates: "Mi-janvier 2027",
  duree: "Deux jours",
  ville: "Lyon",
  lieu: "Lyon", // jamais le lieu exact
  domaine: "nuitsducapitalinvestissement.fr",
  email: "contact@nuitsducapitalinvestissement.fr",
  // VITE_LINKEDIN_URL (.env ou secrets du dépôt au build)
  // vide = tous les liens linkedin masqués, ne pas inventer d'url
  linkedin: import.meta.env.VITE_LINKEDIN_URL ?? "", // TODO(LNCI): URL de la page LinkedIn
  appui: "Avec l’appui de Lyon Place Financière",
  // le trait d'union de rendez‑vous est insécable (U+2011) pour ne pas couper le mot
  titreAccueil: { attenue: "Le rendez‑vous annuel", plein: "du capital investissement" },
  chapeauAccueil:
    "Deux jours pour réunir fonds, banques, conseils, dirigeants et étudiants autour du financement des entreprises, et la finale d’un hackathon le vendredi soir.",
  // infos à points du hero, dans l'ordre d'affichage
  infosAccueil: ["Mi-janvier 2027", "Lyon", "2 jours", "+350 participants"],
  phrasePied: "Le rendez-vous annuel du capital investissement. Mi-janvier 2027, Lyon.",
} as const;
