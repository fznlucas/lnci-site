/**
 * L'equipe d'organisation, affichee sur /contact.
 *
 * Source : Figma, Site / Equipe. Aucun telephone, aucun e-mail personnel.
 * Les avatars sont en initiales tant qu'il n'y a pas de photo.
 */

export type Membre = {
  nom: string;
  initiales: string;
  role: string;
  structure: string;
  /* Chemin sous public/, carre. Vide : avatar en initiales. */
  photo: string;
};

export const EQUIPE = {
  pastille: "L’équipe",
  titre: { attenue: "Ceux qui organisent", plein: "la première édition" },
  chapeau:
    "Une équipe d’étudiants et de jeunes professionnels, déjà rodée à l’organisation d’événements : plus de 650 participants réunis depuis 2025.",
  membres: [
    {
      nom: "Hedi Laggoune",
      initiales: "HL",
      role: "Référent général",
      structure: "Président, iaelyon Finance Club",
      photo: "",
    },
    {
      nom: "Valentin Thiault",
      initiales: "VT",
      role: "Co-organisateur",
      structure: "Président, DealMakers Club",
      photo: "",
    },
    {
      nom: "Nino Coursodon",
      initiales: "NC",
      role: "Événementiel et logistique",
      structure: "Porte-parole, Junior-Entreprises Lyonnaises",
      photo: "",
    },
    {
      nom: "Pierre-Louis Ravier",
      initiales: "PR",
      role: "Relations partenariats",
      structure: "Président, IAE Lyon Junior Conseil",
      photo: "",
    },
  ] satisfies Membre[],
} as const;
