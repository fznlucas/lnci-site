/**
 * Constantes de l'evenement : nom, dates, contacts, titre et chapeau de
 * l'accueil.
 *
 * Lieu : on ecrit "Lyon", jamais le lieu exact, qui est annonce aux
 * pre-inscrits. Aucune date au jour pres tant qu'elle n'est pas confirmee.
 * Source : Figma, Site / Hero (version A2) et Site / Pied de page.
 */

export const EVENEMENT = {
  nom: "Les Nuits du Capital Investissement",
  /* Pastille posee au-dessus du titre de l'accueil. */
  surTitre: "Première édition · Lyon · Mi-janvier 2027",
  /* Version courte de la pastille, en mobile (Figma). */
  surTitreCourt: "Première édition · Lyon",
  dates: "Mi-janvier 2027",
  duree: "Deux jours",
  ville: "Lyon",
  lieu: "Lyon", // lieu exact annonce aux pre-inscrits
  domaine: "nuitsducapitalinvestissement.fr",
  email: "contact@nuitsducapitalinvestissement.fr",
  /* Vide tant que l'URL n'est pas fournie : tout lien LinkedIn est alors
     masque. Ne pas inventer d'URL. */
  linkedin: "", // TODO(LNCI): URL de la page LinkedIn
  appui: "Avec l’appui de Lyon Place Financière",
  /* Titre bicolore : ligne attenuee puis ligne pleine. Le trait d'union
     de "rendez-vous" est insecable (U+2011) : le mot ne se coupe pas en
     fin de ligne. */
  titreAccueil: { attenue: "Le rendez‑vous annuel", plein: "du capital investissement" },
  chapeauAccueil:
    "Deux jours pour réunir fonds, banques, conseils, dirigeants et étudiants autour du financement des entreprises, et la finale d’un hackathon le vendredi soir.",
  /* Infos a points du hero, dans l'ordre d'affichage. */
  infosAccueil: ["Mi-janvier 2027", "Lyon", "2 jours", "+350 participants"],
  /* Phrase d'identite du pied de page. */
  phrasePied: "Le rendez-vous annuel du capital investissement. Mi-janvier 2027, Lyon.",
} as const;
