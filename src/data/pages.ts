/**
 * Registre des pages du site.
 *
 * Source unique des liens. La barre de navigation, le pied de page et le
 * plan du site lisent ce fichier et filtrent sur `publiee`. Aucune liste
 * de liens n'est ecrite ailleurs : un libelle ou un chemin ne se corrige
 * qu'ici.
 *
 * `publiee: false` suspend l'exposition d'une page sans la supprimer.
 * Passer une page en ligne se fait en basculant ce booleen, sans toucher au
 * reste du code.
 *
 * Les deux consommateurs ne traitent pas ce booleen de la meme facon, et
 * c'est voulu :
 *
 *   La barre de navigation FILTRE. Une page non publiee n'y figure pas du
 *   tout : une entree morte dans un menu est une impasse.
 *
 *   Le pied de page AFFICHE, en etat inerte. L'entree est rendue en span,
 *   grisee et non cliquable, jamais en lien. Montrer ce qui vient annonce
 *   le perimetre de l'evenement, sans jamais mener a une 404.
 *
 * `/merci` et la page 404 ne sont pas dans le registre : aucun lien ne
 * doit y mener.
 */

export type Groupe = "evenement" | "partenaires" | "participer" | "legal";

export type Page = {
  id: string;
  libelle: string;
  /* Libelle de la barre de navigation, quand il differe du libelle. */
  libelleCourt?: string;
  chemin: string;
  groupe: Groupe;
  publiee: boolean;
};

export const PAGES: Page[] = [
  {
    id: "programme",
    libelle: "Programme",
    chemin: "/programme",
    groupe: "evenement",
    publiee: true,
  },
  {
    id: "hackathon",
    libelle: "Hackathon",
    chemin: "/hackathon",
    groupe: "evenement",
    publiee: true,
  },
  {
    id: "intervenants",
    libelle: "Intervenants",
    chemin: "/intervenants",
    groupe: "evenement",
    publiee: false,
  },

  {
    id: "partenaires",
    libelle: "Devenir partenaire",
    libelleCourt: "Partenaires",
    chemin: "/partenaires",
    groupe: "partenaires",
    publiee: true,
  },
  { id: "le-off", libelle: "Le Off", chemin: "/le-off", groupe: "partenaires", publiee: false },

  {
    id: "preinscription",
    libelle: "Se pré-inscrire",
    chemin: "/preinscription",
    groupe: "participer",
    publiee: true,
  },
  { id: "contact", libelle: "Contact", chemin: "/contact", groupe: "participer", publiee: true },
  {
    id: "faq",
    libelle: "Questions fréquentes",
    chemin: "/preinscription#faq",
    groupe: "participer",
    publiee: true,
  },

  {
    id: "mentions-legales",
    libelle: "Mentions légales",
    chemin: "/mentions-legales",
    groupe: "legal",
    publiee: true,
  },
  {
    id: "confidentialite",
    libelle: "Confidentialité",
    chemin: "/confidentialite",
    groupe: "legal",
    publiee: true,
  },
];

/** Les pages publiees d'un groupe. */
export function pagesPubliees(groupe: Groupe): Page[] {
  return PAGES.filter((p) => p.groupe === groupe && p.publiee);
}

/** Toutes les pages d'un groupe, publiees ou non. Sert le pied de page. */
export function pagesDuGroupe(groupe: Groupe): Page[] {
  return PAGES.filter((p) => p.groupe === groupe);
}

/** Une page par son identifiant, publiee ou non. */
export function page(id: string): Page | undefined {
  return PAGES.find((p) => p.id === id);
}

/**
 * Entrees de la barre de navigation : quatre au maximum, plus le bouton
 * d'action. Seuls les identifiants sont declares ici. Une entree dont la
 * page n'est pas publiee disparait de la barre.
 */
const BARRE = ["programme", "hackathon", "partenaires", "contact"];

export const ENTREES_BARRE: Page[] = BARRE.map((id) => page(id)).filter(
  (p): p is Page => p !== undefined && p.publiee,
);

/** Le bouton d'action de la barre, du menu mobile et du pied de page. */
export const ACTION = page("preinscription") as Page;

/** Le groupe legal, servi a la bande basse du pied de page. */
export const LEGAL = pagesDuGroupe("legal");
