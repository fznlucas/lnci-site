import { NavLink, useLocation } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Bouton } from "@/components/ui/Bouton";
import { LogoPartenaire } from "@/components/ui/LogoPartenaire";
import { EVENEMENT } from "@/data/evenement";
import { ACTION, LEGAL, page, type Page } from "@/data/pages";
import { CO_ORGANISATEURS, OBJET_PLAQUETTE } from "@/data/partenaires";
import { cn } from "@/lib/cn";

/**
 * Pied de page. Figma : Site / Pied de page, ton Nuit bas. Sur l'accueil,
 * qui finit par un bandeau Nuit, le pied prend le meme fond Nuit (concept
 * B, zones nuit fusionnees).
 *
 * Haut : Logo / Typo, phrase d'identite, bouton de pre-inscription, puis
 * trois colonnes de liens. Credits : co-organisateurs en logos blancs et
 * appui de Lyon Place Financiere. Bas : copyright et pages legales.
 *
 * Les liens de page viennent du registre (data/pages.ts) : une page non
 * publiee s'affiche en texte inerte, jamais en lien vers une 404. Les
 * liens e-mail et LinkedIn viennent de data/evenement.ts ; LinkedIn est
 * masque tant que son URL est vide.
 */

type Entree = { libelle: string; page?: Page; href?: string };

const mail = (objet?: string) =>
  `mailto:${EVENEMENT.email}${objet ? `?subject=${encodeURIComponent(objet)}` : ""}`;

function depuisPage(id: string): Entree | null {
  const p = page(id);
  return p ? { libelle: p.libelle, page: p } : null;
}

const COLONNES: { titre: string; entrees: (Entree | null)[] }[] = [
  {
    titre: "L’événement",
    entrees: [depuisPage("programme"), depuisPage("hackathon"), depuisPage("faq")],
  },
  {
    titre: "Partenaires",
    entrees: [
      depuisPage("partenaires"),
      { libelle: "Recevoir la plaquette", href: mail(OBJET_PLAQUETTE) },
      depuisPage("le-off"),
    ],
  },
  {
    titre: "Contact",
    entrees: [
      { libelle: "Nous écrire", href: mail() },
      EVENEMENT.linkedin ? { libelle: "LinkedIn", href: EVENEMENT.linkedin } : null,
    ],
  },
];

const CLASSE_LIEN =
  "text-w-dense text-sur-nuit no-underline transition-colors hover:text-accent-clair";

function Lien({ entree }: { entree: Entree }) {
  if (entree.href) {
    const externe = entree.href.startsWith("http");
    return (
      <a
        href={entree.href}
        className={CLASSE_LIEN}
        {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {entree.libelle}
      </a>
    );
  }
  if (entree.page?.publiee) {
    return (
      <NavLink to={entree.page.chemin} className={CLASSE_LIEN}>
        {entree.libelle}
      </NavLink>
    );
  }
  return (
    <span title="Prochainement" aria-disabled="true" className="text-w-dense text-sur-nuit-legende">
      {entree.libelle}
    </span>
  );
}

export function PiedDePage() {
  const fusionne = useLocation().pathname === "/";
  return (
    <footer className={cn("text-sur-nuit", fusionne ? "bg-nuit" : "bg-nuit-bas")}>
      <div className="contenu flex flex-col gap-12 py-20 sm:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-[380px] flex-col items-start gap-5">
            <Logotype variante="pied" avecMonogramme={false} />
            <p className="text-w-dense text-sur-nuit-body">{EVENEMENT.phrasePied}</p>
            <Bouton to={ACTION.chemin} ton="nuit">
              {ACTION.libelle}
            </Bouton>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:gap-16">
            {COLONNES.map((c) => (
              <nav key={c.titre} aria-label={c.titre}>
                <p className="text-w-surtitre text-sur-nuit-legende uppercase">{c.titre}</p>
                <ul className="mt-3.5 flex flex-col gap-3.5">
                  {c.entrees
                    .filter((e): e is Entree => e !== null)
                    .map((e) => (
                      <li key={e.libelle}>
                        <Lien entree={e} />
                      </li>
                    ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="filet-pied flex flex-col gap-6 pt-8 lg:flex-row lg:items-center lg:gap-8">
          <p className="text-w-surtitre text-sur-nuit-legende uppercase">Co-organisé par</p>
          <ul className="flex flex-wrap items-center gap-6">
            {CO_ORGANISATEURS.map((l) => (
              <li key={l.id} className="h-10 w-[110px]">
                <LogoPartenaire logo={l} fond="transparent" className="h-full w-full" />
              </li>
            ))}
          </ul>
          <p className="text-w-legende text-sur-nuit-legende lg:ml-auto">{EVENEMENT.appui}</p>
        </div>

        <div className="text-w-legende text-sur-nuit-legende flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p>© 2026 {EVENEMENT.nom}</p>
          <p>
            {LEGAL.map((p, i) => (
              <span key={p.id}>
                {i > 0 && " · "}
                <NavLink
                  to={p.chemin}
                  className="text-sur-nuit-legende hover:text-sur-nuit no-underline"
                >
                  {p.libelle}
                </NavLink>
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
