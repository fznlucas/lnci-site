// contrat d'api (docs/CHARTE-ET-MAQUETTE.md) : le back-end doit accepter exactement ces champs

// on envoie l'id, le libellé ne sert qu'à l'affichage
export const POSTES = [
  { id: "fonds", libelle: "Fonds d’investissement" },
  { id: "banque-conseil", libelle: "Banque, conseil, avocat" },
  { id: "dirigeant", libelle: "Dirigeant·e d’entreprise" },
  { id: "etudiant", libelle: "Étudiant·e" },
  { id: "institution", libelle: "Institution, réseau" },
  { id: "presse", libelle: "Presse" },
  { id: "autre", libelle: "Autre" },
] as const;

export const SUJETS = [
  { id: "participation", libelle: "Participation" },
  { id: "partenariat", libelle: "Partenariat" },
  { id: "presse", libelle: "Presse" },
  { id: "autre", libelle: "Autre" },
] as const;

export type Poste = (typeof POSTES)[number]["id"];
export type Sujet = (typeof SUJETS)[number]["id"];

// ajouté à chaque envoi, sans saisie
export type Contexte = {
  /** chemin de la page + utm_* éventuels */
  source: string;
  /** date iso */
  envoyeLe: string;
};

export type PreInscription = Contexte & {
  prenom: string;
  nom: string;
  email: string;
  poste: Poste;
  organisation: string;
  consentement: true;
};

export type Contact = Contexte & {
  prenom: string;
  nom: string;
  email: string;
  organisation: string;
  sujet: Sujet;
  message: string;
  consentement: true;
};

export type Saisie = Record<string, string | boolean>;

export type Erreurs = Record<string, string>;

// ok = 201 (vers /merci), erreurs = 400, message = 409 ou autre refus expliqué,
// indisponible = pas d'api configurée ou serveur en panne
export type Resultat =
  | { etat: "ok" }
  | { etat: "erreurs"; erreurs: Erreurs }
  | { etat: "message"; message: string }
  | { etat: "indisponible"; message: string };
