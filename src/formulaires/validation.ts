// le serveur doit refaire ces contrôles, ici ça évite juste un aller-retour
import { POSTES, SUJETS, type Erreurs, type Saisie } from "@/formulaires/types";

// permissif exprès, le vrai contrôle c'est la réception du mail
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const texte = (s: Saisie, champ: string) => String(s[champ] ?? "").trim();

function obligatoire(s: Saisie, champ: string, message: string, erreurs: Erreurs) {
  if (texte(s, champ) === "") erreurs[champ] = message;
}

function email(s: Saisie, erreurs: Erreurs) {
  const valeur = texte(s, "email");
  if (valeur === "") erreurs.email = "Indiquez votre adresse e-mail.";
  else if (!EMAIL.test(valeur)) erreurs.email = "Cette adresse e-mail ne semble pas valide.";
}

function consentement(s: Saisie, erreurs: Erreurs) {
  if (s.consentement !== true)
    erreurs.consentement = "Cochez cette case pour envoyer le formulaire.";
}

export function validerPreInscription(s: Saisie): Erreurs {
  const erreurs: Erreurs = {};
  obligatoire(s, "prenom", "Indiquez votre prénom.", erreurs);
  obligatoire(s, "nom", "Indiquez votre nom.", erreurs);
  email(s, erreurs);
  if (!POSTES.some((p) => p.id === texte(s, "poste")))
    erreurs.poste = "Choisissez votre poste dans la liste.";
  consentement(s, erreurs);
  return erreurs;
}

export function validerContact(s: Saisie): Erreurs {
  const erreurs: Erreurs = {};
  obligatoire(s, "prenom", "Indiquez votre prénom.", erreurs);
  obligatoire(s, "nom", "Indiquez votre nom.", erreurs);
  email(s, erreurs);
  if (!SUJETS.some((j) => j.id === texte(s, "sujet")))
    erreurs.sujet = "Choisissez un sujet dans la liste.";
  obligatoire(s, "message", "Écrivez votre message.", erreurs);
  consentement(s, erreurs);
  return erreurs;
}
