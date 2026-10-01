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
 *   tout. Un menu annonce ce qui existe ; une entree morte dans un menu est
 *   une impasse, et la charte page 11 n'y admet que quatre entrees, trop
 *   peu pour en gaspiller une.
 *
 *   Le pied de page AFFICHE, en etat inerte. L'entree est rendue en span,
 *   grisee et non cliquable, jamais en lien. Le pied de page est un plan du
 *   site : montrer ce qui vient a pour valeur d'annoncer le perimetre de
 *   l'evenement, sans jamais mener a une 404.
 *
 * Conditions de publication arretees :
 *
 *   le-off         a partir de trois creneaux confirmes.
 *   intervenants   a partir des premiers noms acquis.
 *   candidater     selon le maintien du dispositif.
 *
 *   competition et faq n'ont pas de condition arretee a ce jour.
 */

export type Groupe = "evenement" | "partenaires" | "participer" | "legal";

export type Page = {
  id: string;
  libelle: string;
  chemin: string;
  groupe: Groupe;
  publiee: boolean;
};

export const PAGES: Page[] = [
  { id: "programme", libelle: "Programme", chemin: "/programme", groupe: "evenement", publiee: true },
  { id: "competition", libelle: "La compétition d'analyse", chemin: "/competition", groupe: "evenement", publiee: true },
  { id: "intervenants", libelle: "Intervenants", chemin: "/intervenants", groupe: "evenement", publiee: false },

  { id: "partenaires", libelle: "Partenaires", chemin: "/partenaires", groupe: "partenaires", publiee: true },
  { id: "le-off", libelle: "Le Off", chemin: "/le-off", groupe: "partenaires", publiee: false },
  { id: "contact", libelle: "Contact", chemin: "/contact", groupe: "partenaires", publiee: true },

  { id: "reserver", libelle: "Réserver sa place", chemin: "/reserver", groupe: "participer", publiee: true },
  { id: "candidater", libelle: "Candidater", chemin: "/candidater", groupe: "participer", publiee: false },
  { id: "faq", libelle: "Questions fréquentes", chemin: "/faq", groupe: "participer", publiee: false },

  { id: "mentions-legales", libelle: "Mentions légales", chemin: "/mentions-legales", groupe: "legal", publiee: true },
  { id: "confidentialite", libelle: "Confidentialité", chemin: "/confidentialite", groupe: "legal", publiee: true },
];

/** Les pages publiees d'un groupe. Sert la barre de navigation. */
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
 * Entrees de la barre de navigation. Charte page 11 : quatre au maximum,
 * plus le bouton d'action. Seuls les identifiants sont declares ici, les
 * libelles et les chemins restent ceux du registre. Une entree dont la
 * page n'est pas publiee disparait de la barre.
 */
const BARRE = ["programme", "intervenants", "partenaires", "contact"];

export const ENTREES_BARRE: Page[] = BARRE.map((id) => page(id)).filter(
  (p): p is Page => p !== undefined && p.publiee,
);

/** Le bouton d'action de la barre et du menu mobile. */
export const ACTION = page("reserver") as Page;

/** Le groupe legal, servi a la bande basse du pied de page. */
export const LEGAL = pagesDuGroupe("legal");
