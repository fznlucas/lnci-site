// seule liste de liens du site : un libellé ou un chemin se corrige ici
// publiee: false masque la page partout sauf dans le pied de page (grisée, pas cliquable)
// /merci et la 404 n'y sont pas exprès, aucun lien ne doit y mener

export type Groupe = "evenement" | "partenaires" | "participer" | "legal";

export type Page = {
  id: string;
  libelle: string;
  /** libellé de la barre de navigation s'il diffère */
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

// publiées ou non, pour le pied de page
export function pagesDuGroupe(groupe: Groupe): Page[] {
  return PAGES.filter((p) => p.groupe === groupe);
}

// attention : ne filtre pas sur publiee
export function page(id: string): Page | undefined {
  return PAGES.find((p) => p.id === id);
}

// quatre entrées max dans la barre, en plus du bouton d'action
const BARRE = ["programme", "hackathon", "partenaires", "contact"];

export const ENTREES_BARRE: Page[] = BARRE.map((id) => page(id)).filter(
  (p): p is Page => p !== undefined && p.publiee,
);

// bouton d'action de la barre, du menu mobile et du pied de page
export const ACTION = page("preinscription") as Page;

// bande basse du pied de page
export const LEGAL = pagesDuGroupe("legal");
