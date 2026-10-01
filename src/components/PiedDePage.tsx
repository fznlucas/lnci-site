import { NavLink } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Bouton, type Ton } from "@/components/ui/Bouton";
import { LogoPartenaire } from "@/components/ui/LogoPartenaire";
import { EVENEMENT } from "@/data/evenement";
import { ACTION, LEGAL, page, type Page } from "@/data/pages";
import { CO_ORGANISATEURS, OBJET_PLAQUETTE } from "@/data/partenaires";
import type { TonPied } from "@/lib/cadre";
import { cn } from "@/lib/cn";

/**
 * Pied de page. Figma : Site / Pied de page. Revele au defilement en
 * desktop (utilitaire pied-revele) : la derniere section remonte pour le
 * decouvrir.
 *
 * Ton (prop `ton`, choisi par la page via lib/cadre.ts) :
 *   nuit-bas     par defaut
 *   nuit         accueil, qui finit par un bandeau Nuit (concept B, zones
 *                nuit fusionnees)
 *   electrique   /hackathon : electrique fonce #1A2A9C, texte blanc, liens
 *                blanc 75 %, filets blanc 20 %
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

type Couleurs = {
  fond: string;
  corps: string;
  legende: string;
  lien: string;
  lienLegal: string;
  inerte: string;
  filet: string;
  bouton: Ton;
};

const NUIT: Omit<Couleurs, "fond"> = {
  corps: "text-sur-nuit-body",
  legende: "text-sur-nuit-legende",
  lien: "text-sur-nuit hover:text-accent-clair",
  lienLegal: "text-sur-nuit-legende hover:text-sur-nuit",
  inerte: "text-sur-nuit-legende",
  filet: "filet-pied",
  bouton: "nuit",
};

const COULEURS: Record<TonPied, Couleurs> = {
  "nuit-bas": { fond: "bg-nuit-bas text-sur-nuit", ...NUIT },
  nuit: { fond: "bg-nuit text-sur-nuit", ...NUIT },
  electrique: {
    fond: "bg-[var(--electrique-pied)] text-white",
    corps: "text-white",
    legende: "text-white",
    lien: "text-white/75 hover:text-white",
    lienLegal: "text-white/75 hover:text-white",
    /* Entree non publiee : en retrait des liens, contraste AA (4,9:1). */
    inerte: "text-white/60",
    filet: "filet-pied-electrique",
    bouton: "electrique",
  },
};

function Lien({ entree, couleurs }: { entree: Entree; couleurs: Couleurs }) {
  const classeLien = cn("lien-glisse text-w-dense", couleurs.lien);
  if (entree.href) {
    const externe = entree.href.startsWith("http");
    return (
      <a
        href={entree.href}
        className={classeLien}
        {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {entree.libelle}
      </a>
    );
  }
  if (entree.page?.publiee) {
    return (
      <NavLink to={entree.page.chemin} className={classeLien}>
        {entree.libelle}
      </NavLink>
    );
  }
  return (
    <span
      title="Prochainement"
      aria-disabled="true"
      className={cn("text-w-dense", couleurs.inerte)}
    >
      {entree.libelle}
    </span>
  );
}

export function PiedDePage({ ton = "nuit-bas" }: { ton?: TonPied }) {
  const c = COULEURS[ton];
  return (
    <footer className={cn("pied-revele", c.fond)}>
      <div className="contenu flex flex-col gap-12 py-20 sm:py-24">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="flex max-w-[380px] flex-col items-start gap-5">
            <Logotype variante="pied" avecMonogramme={false} />
            <p className={cn("text-w-dense", c.corps)}>{EVENEMENT.phrasePied}</p>
            <Bouton to={ACTION.chemin} ton={c.bouton}>
              {ACTION.libelle}
            </Bouton>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:gap-16">
            {COLONNES.map((col) => (
              <nav key={col.titre} aria-label={col.titre}>
                <p className={cn("text-w-surtitre uppercase", c.legende)}>{col.titre}</p>
                <ul className="mt-3.5 flex flex-col gap-3.5">
                  {col.entrees
                    .filter((e): e is Entree => e !== null)
                    .map((e) => (
                      <li key={e.libelle}>
                        <Lien entree={e} couleurs={c} />
                      </li>
                    ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div
          className={cn("flex flex-col gap-6 pt-8 lg:flex-row lg:items-center lg:gap-8", c.filet)}
        >
          <p className={cn("text-w-surtitre uppercase", c.legende)}>Co-organisé par</p>
          <ul className="flex flex-wrap items-center gap-6">
            {CO_ORGANISATEURS.map((l) => (
              <li key={l.id} className="h-10 w-[110px]">
                <LogoPartenaire logo={l} fond="transparent" className="h-full w-full" />
              </li>
            ))}
          </ul>
          <p className={cn("text-w-legende lg:ml-auto", c.legende)}>{EVENEMENT.appui}</p>
        </div>

        <div
          className={cn(
            "text-w-legende flex flex-col gap-2 sm:flex-row sm:justify-between",
            c.legende,
          )}
        >
          <p>© 2026 {EVENEMENT.nom}</p>
          <p>
            {LEGAL.map((p, i) => (
              <span key={p.id}>
                {i > 0 && " · "}
                <NavLink to={p.chemin} className={cn("lien-glisse", c.lienLegal)}>
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
