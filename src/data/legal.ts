/**
 * Pages legales : en-tetes et rubriques.
 *
 * Source : Figma, Site / Hero de page et Site / Texte legal. Les champs
 * entre crochets sont a completer par l'equipe avant la mise en ligne.
 *
 * Ecarts au Figma, voulus : la page Confidentialite ne mentionne plus
 * Tally (les donnees passent par le site, arbitrage de l'equipe) et liste
 * aussi le formulaire de contact.
 */

export type Bloc = { titre: string; texte: string };

export const MENTIONS_LEGALES = {
  pastille: "Mentions légales",
  titre: { attenue: "Mentions", plein: "légales" },
  texte: "Éditeur, hébergement et propriété intellectuelle.",
  // TODO(LNCI): date de mise à jour, structure porteuse, forme juridique, adresse, directeur de la publication.
  miseAJour: "[à compléter]",
  blocs: [
    {
      titre: "Éditeur du site",
      texte:
        "[Nom de la structure porteuse], [forme juridique], [adresse]. Directeur de la publication : [nom]. Contact : contact@nuitsducapitalinvestissement.fr.",
    },
    { titre: "Hébergement", texte: "OVHcloud, 2 rue Kellermann, 59100 Roubaix, France." },
    {
      titre: "Propriété intellectuelle",
      texte:
        "Les contenus, logos et visuels du site sont la propriété de leurs auteurs respectifs. Toute reproduction sans autorisation est interdite.",
    },
    { titre: "Crédits", texte: "Conception et développement : équipe LNCI." },
  ] satisfies Bloc[],
} as const;

export const CONFIDENTIALITE = {
  pastille: "Confidentialité",
  titre: { attenue: "Politique de", plein: "confidentialité" },
  texte: "Ce que nous faisons de vos données, et rien de plus.",
  // TODO(LNCI): date de mise à jour et hébergeur du serveur des formulaires.
  miseAJour: "[à compléter]",
  blocs: [
    {
      titre: "Données collectées",
      texte:
        "Prénom, nom, adresse e-mail professionnelle et poste (et, si vous l’indiquez, votre entreprise ou école) via le formulaire de pré-inscription. Vos coordonnées et votre message via le formulaire de contact.",
    },
    {
      titre: "Finalité",
      texte:
        "Vous informer de l’ouverture de la billetterie et du programme, et répondre à vos messages. Rien d’autre.",
    },
    {
      titre: "Traitement",
      texte:
        "Les formulaires sont envoyés par le site au serveur de l’équipe d’organisation ([hébergeur à compléter]). Les données ne sont jamais revendues.",
    },
    {
      titre: "Durée de conservation",
      texte: "Jusqu’à la fin de l’édition 2027, puis suppression, sauf accord explicite.",
    },
    {
      titre: "Vos droits",
      texte:
        "Accès, rectification, suppression : contact@nuitsducapitalinvestissement.fr. Vous pouvez aussi saisir la CNIL.",
    },
  ] satisfies Bloc[],
} as const;
