import type { FormEvent } from "react";
import { NavLink } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Bouton } from "@/components/ui/Bouton";
import { EVENEMENT } from "@/data/evenement";
import { LEGAL, pagesDuGroupe, type Page } from "@/data/pages";

/**
 * Logos deposes en pied de page.
 *
 * N'y figurent que les organisations dont l'autorisation d'usage de marque
 * est acquise. Une organisation sans autorisation ecrite n'entre pas dans
 * ce tableau, meme si son fichier est disponible dans public/logos.
 * Ajouter un logo, c'est ajouter une ligne ici et rien d'autre.
 *
 * `hauteur` est la hauteur d'affichage en pixels, reglee logo par logo pour
 * que chacun pese optiquement autant que les autres : un bloc carre doit
 * etre plus bas qu'un logotype horizontal pour ne pas l'ecraser. Les
 * fichiers font 120px de haut, donc restent nets en haute densite.
 */
const LOGOS = [
  { fichier: "dealmakers-club-blanc.png", nom: "Deal Makers Club", groupe: "co-organisation", hauteur: 34 },
  { fichier: "iae-lyon-junior-conseil-blanc.png", nom: "IAE Lyon Junior Conseil", groupe: "co-organisation", hauteur: 30 },
  { fichier: "iaelyon-finance-club-blanc.png", nom: "iaelyon Finance Club", groupe: "co-organisation", hauteur: 30 },
  { fichier: "iaelyon-school-blanc.png", nom: "iaelyon School of Management", groupe: "appui", hauteur: 30 },
  { fichier: "lyon-place-financiere-couleur.png", nom: "Lyon Place Financière", groupe: "appui", hauteur: 26 },
] as const;

/**
 * Registre des deux groupes. Ces organisations co-organisent l'evenement ou
 * lui apportent leur appui : ce ne sont pas des partenaires payants et elles
 * ne doivent jamais paraitre sous un titre partenaires. Les deux intitules
 * sont ceux-ci, mot pour mot.
 */
const GROUPES_LOGOS = [
  { cle: "co-organisation", intitule: "Co-organisé par" },
  { cle: "appui", intitule: "Avec l'appui de" },
] as const;

/* Les trois colonnes de liens. La largeur de grille est reglee colonne par
   colonne : la derniere prend une part de plus, ses libelles etant les plus
   longs, et les quatre parts remplissent alors les douze colonnes. */
const COLONNES = [
  { titre: "L'événement", groupe: "evenement" as const, largeur: "lg:col-span-2" },
  { titre: "Partenaires", groupe: "partenaires" as const, largeur: "lg:col-span-2" },
  { titre: "Participer", groupe: "participer" as const, largeur: "lg:col-span-3" },
];

const CLASSE_LIEN =
  "text-w-legende text-sur-nuit-body no-underline transition-colors hover:text-sur-nuit";

/**
 * Une entree du plan du site.
 *
 * Publiee, c'est un lien. Non publiee, c'est un span : rien de cliquable,
 * donc aucune 404 possible, et aucun curseur ni effet de survol qui
 * laisserait croire le contraire. Le titre au survol dit ce qu'il en est.
 */
function Entree({ page }: { page: Page }) {
  if (page.publiee) {
    return (
      <NavLink to={page.chemin} className={CLASSE_LIEN}>
        {page.libelle}
      </NavLink>
    );
  }

  return (
    <span
      title="Prochainement"
      aria-disabled="true"
      className="text-w-legende text-sur-nuit-legende opacity-[0.55]"
    >
      {page.libelle}
    </span>
  );
}

/**
 * Pied de page.
 *
 * Il porte l'identite institutionnelle : co-organisateurs, appuis, egide, et
 * la formulation officielle du lieu tant qu'il n'est pas annonce. Aucun logo
 * media, brief 12.
 *
 * Les colonnes de liens sont servies par le registre de src/data/pages.ts.
 * Elles montrent l'ensemble du perimetre, les pages a venir comprises, mais
 * seules les pages publiees sont cliquables. Voir la note du registre sur la
 * difference de traitement avec la barre de navigation.
 */
export function PiedDePage() {
  /* Le formulaire n'est pas branche : sa destination reste a definir. Aucune
     adresse n'est collectee ni transmise tant qu'un traitement declare
     n'existe pas. On retient la soumission pour que la page ne se recharge
     pas, et on ne fait rien d'autre. A remplacer par l'appel au service
     d'envoi le jour ou il est arrete. */
  const soumettre = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-nuit-bas text-sur-nuit">
      <div className="contenu py-20">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {/* Colonne d'identite. Elle porte aussi la capture d'adresse. */}
          <div className="sm:col-span-2 lg:col-span-5">
            <Logotype variante="bloc" avecMonogramme={false} />
            <p className="mt-6 max-w-[38ch] text-w-legende text-sur-nuit-legende">
              Édition Lyon 2026. Trois soirées, du 12 au 14 novembre.
              <br />
              {EVENEMENT.egide}.
            </p>
            <p className="mt-6 text-w-legende text-sur-nuit-legende">{EVENEMENT.lieu}</p>

            {/* Lien en texte, aucune icone. Charte page 9. Rendu seulement
                quand l'URL est renseignee dans le registre de l'evenement. */}
            {EVENEMENT.linkedin && (
              <p className="mt-6">
                <a
                  href={EVENEMENT.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={CLASSE_LIEN}
                >
                  L'événement sur LinkedIn
                </a>
              </p>
            )}

            <hr className="filet-pied my-8" />

            <form onSubmit={soumettre}>
              <p className="text-w-legende text-sur-nuit">
                Être prévenu de l'ouverture des inscriptions.
              </p>

              <div className="mt-4 flex gap-3">
                <label htmlFor="pied-email" className="sr-only">
                  Adresse électronique
                </label>
                <input
                  id="pied-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="prenom.nom@societe.fr"
                  className="contour-sur-nuit h-[40px] min-w-0 flex-1 rounded-champ bg-transparent px-[14px] text-[0.8125rem] text-sur-nuit placeholder:text-sur-nuit-legende focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent"
                />
                <Bouton type="submit">
                  Me tenir informé
                </Bouton>
              </div>

              {/* Mention obligatoire. La reference aux editions suivantes
                  conditionne la reutilisation du fichier en 2027 : ne pas la
                  retirer. L'adresse vient du registre de l'evenement, pour
                  qu'elle ne diverge jamais de la ligne de contact. */}
              <p className="mt-3 text-w-legende text-sur-nuit-legende">
                Votre adresse sert uniquement à vous informer de cette édition
                et des éditions suivantes. Elle n'est ni cédée ni revendue.
                Suppression sur simple demande à {EVENEMENT.email}.
              </p>
            </form>
          </div>

          {COLONNES.map((c) => (
            <nav key={c.groupe} className={c.largeur}>
              <p className="text-w-surtitre uppercase text-sur-nuit-legende">{c.titre}</p>
              <ul className="mt-5 space-y-3">
                {pagesDuGroupe(c.groupe).map((p) => (
                  <li key={p.id}>
                    <Entree page={p} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <hr className="filet-pied my-14" />

        {/* Bande de logos. Poses directement sur le fond nuit : aucun
            conteneur, aucune plaque, aucun cadre. Charte page 9. */}
        <div className="flex flex-col gap-y-10 sm:flex-row sm:flex-wrap sm:gap-x-16">
          {GROUPES_LOGOS.map((g) => (
            <div key={g.cle}>
              <p className="text-w-surtitre uppercase text-sur-nuit-legende">{g.intitule}</p>
              <div className="mt-5 flex flex-wrap items-center gap-x-10 gap-y-6">
                {LOGOS.filter((l) => l.groupe === g.cle).map((l) => (
                  <img
                    key={l.fichier}
                    src={`/logos/${l.fichier}`}
                    alt={l.nom}
                    height={l.hauteur}
                    loading="lazy"
                    className="w-auto opacity-75 transition-opacity hover:opacity-100"
                    style={{ height: l.hauteur }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <hr className="filet-pied my-14" />

        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
            <p className="text-w-legende text-sur-nuit-legende">{EVENEMENT.domaine}</p>
            <a
              href={`mailto:${EVENEMENT.email}`}
              className="text-w-legende text-sur-nuit-legende no-underline transition-colors hover:text-sur-nuit"
            >
              {EVENEMENT.email}
            </a>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {LEGAL.map((p) =>
              p.publiee ? (
                <NavLink
                  key={p.id}
                  to={p.chemin}
                  className="text-w-legende text-sur-nuit-legende no-underline transition-colors hover:text-sur-nuit"
                >
                  {p.libelle}
                </NavLink>
              ) : (
                <span
                  key={p.id}
                  title="Prochainement"
                  aria-disabled="true"
                  className="text-w-legende text-sur-nuit-legende opacity-[0.55]"
                >
                  {p.libelle}
                </span>
              ),
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
