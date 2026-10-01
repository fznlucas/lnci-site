/**
 * Constantes de l'evenement.
 *
 * Regle ferme du brief 3.3 : ne jamais mentionner le lieu avant annonce
 * officielle, y compris dans les metadonnees. La formulation retenue par
 * la charte page 15 est "Lyon, a confirmer".
 */

export const EVENEMENT = {
  nom: "Les Nuits du Capital Investissement",
  surTitre: "Lyon · 12, 13 et 14 novembre 2026",
  dates: "12, 13 et 14 novembre 2026",
  ville: "Lyon",
  lieu: "Lyon, à confirmer",
  domaine: "nuitsducapitalinvestissement.fr",
  /* Adresse de contact, construite sur le domaine. */
  email: "contact@nuitsducapitalinvestissement.fr",
  /* URL LinkedIn de l'evenement. Vide tant qu'elle n'est pas fournie : le
     pied de page n'affiche alors aucun lien. Ne pas inventer d'URL, une
     adresse plausible mais fausse est pire qu'une absence. CLAUDE.md. */
  linkedin: "",
  egide: "Sous l'égide de Lyon Place Financière",
  titreAccueil: "Trois soirees ou le capital investissement regional se retrouve",
  chapeauAccueil:
    "Fonds regionaux et nationaux, banques d'affaires, boutiques de transmission, " +
    "conseils et dirigeants de PME et d'ETI.",
  /* Version courte, pour le bandeau d'accueil qui tient en deux lignes. */
  chapeauCourt:
    "Fonds regionaux et nationaux, banques d'affaires, conseils et dirigeants " +
    "de PME et d'ETI.",
} as const;
