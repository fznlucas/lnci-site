/**
 * Types des formulaires : ce qui est envoye au serveur et ce qu'il
 * repond. C'est le contrat d'API de docs/HANDOFF.md (section 8.3), ecrit
 * en TypeScript : le back-end doit accepter exactement ces champs.
 *
 * Les listes (poste, sujet) sont envoyees sous forme d'identifiants
 * courts ; leurs libelles, affiches dans le formulaire, sont a cote.
 */

/* ------------------------------------------------------------------ */
/* Listes                                                              */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Donnees envoyees                                                    */
/* ------------------------------------------------------------------ */

/** Champs ajoutes a chaque envoi, sans saisie de l'utilisateur. */
export type Contexte = {
  /* Page d'origine et parametres utm_* eventuels. */
  source: string;
  /* Date d'envoi, au format ISO. */
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

/* ------------------------------------------------------------------ */
/* Saisie et reponse                                                   */
/* ------------------------------------------------------------------ */

/** Valeurs brutes du formulaire, toutes en texte (ou booleen). */
export type Saisie = Record<string, string | boolean>;

/** Message d'erreur par nom de champ. */
export type Erreurs = Record<string, string>;

/**
 * Issue d'un envoi, telle que le formulaire l'affiche :
 *   ok            201 : redirection vers /merci
 *   erreurs       400 : messages sous les champs
 *   message       409 ou autre refus explique : message en tete
 *   indisponible  pas de back-end configure, ou serveur en panne
 */
export type Resultat =
  | { etat: "ok" }
  | { etat: "erreurs"; erreurs: Erreurs }
  | { etat: "message"; message: string }
  | { etat: "indisponible"; message: string };
