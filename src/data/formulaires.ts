/**
 * Textes des formulaires de pre-inscription et de contact.
 *
 * Source : Figma, Site / Formulaire (section de pre-inscription et carte
 * du formulaire). La mention de Tally du Figma est retiree : les donnees
 * passent par le site (arbitrage de l'equipe). Le formulaire de contact
 * n'a pas de maquette : il reprend la carte de la pre-inscription.
 *
 * Les listes (postes, sujets) sont dans src/formulaires/types.ts, avec
 * leurs identifiants envoyes au serveur.
 */

export const SECTION_PREINSCRIPTION = {
  pastille: "Pré-inscription",
  titre: { attenue: "Soyez les premiers", plein: "informés" },
  chapeau:
    "Les dates exactes et la billetterie arrivent très vite. Pré-inscrivez-vous : vous recevrez le lien de la billetterie en priorité, dès son ouverture.",
  avantages: [
    "Le lien de la billetterie avant tout le monde",
    "Le programme détaillé dès sa publication",
    "Aucun engagement, désinscription en un clic",
  ],
} as const;

export const FORMULAIRE_PREINSCRIPTION = {
  titre: "Formulaire de pré-inscription",
  champs: {
    prenom: "Prénom",
    nom: "Nom",
    email: "E-mail professionnel",
    poste: "Poste",
    organisation: "Entreprise ou école",
  },
  consentement:
    "En envoyant ce formulaire, j’accepte que mes données servent uniquement à être informé·e de l’événement.",
  bouton: "Se pré-inscrire",
  boutonEnvoi: "Envoi en cours…",
  note: "Formulaire sécurisé. Données jamais revendues.",
} as const;

export const FORMULAIRE_CONTACT = {
  titre: "Écrire à l’équipe",
  champs: {
    prenom: "Prénom",
    nom: "Nom",
    email: "E-mail",
    organisation: "Organisation",
    sujet: "Sujet",
    message: "Message",
  },
  consentement:
    "En envoyant ce formulaire, j’accepte que mes données servent uniquement à traiter ma demande.",
  bouton: "Envoyer le message",
  boutonEnvoi: "Envoi en cours…",
  note: "Réponse sous 48 h. Données jamais revendues.",
} as const;
