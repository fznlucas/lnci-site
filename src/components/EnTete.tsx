import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Halo } from "@/components/brand/Halo";
import { Bouton } from "@/components/ui/Bouton";
import { ACTION, ENTREES_BARRE } from "@/data/pages";
import { EVENEMENT } from "@/data/evenement";
import { cn } from "@/lib/cn";
import type { TonEnTete } from "@/lib/cadre";
import { bloquerDefilement } from "@/lib/defilement";

/**
 * En-tete. Figma : Site / En-tete.
 *
 * Bloque en haut (position fixe), transparent sur le hero : le premier
 * bloc de chaque page reserve donc sa hauteur en haut (88px, 72 en
 * mobile). Des que la page defile, il prend un fond nuit voile et floute
 * et un filet, en 300 ms, pour se detacher du contenu.
 *
 * Ton (prop `ton`, choisi par la page via lib/cadre.ts) : Nuit partout ;
 * Electrique sur /hackathon, ou l'en-tete reste vraiment transparent sur
 * le hero et prend au defilement un fond accent voile (85 %) et floute,
 * jamais le fond nuit. Boutons et menu mobile suivent le ton.
 *
 * Desktop (>= 1024) : Logo / Ligne, quatre liens tertiaires, le bouton
 * primaire de pre-inscription. En dessous : le logo (monogramme seul en
 * mobile) et le bouton du menu, deux traits dans une pastille, aucune
 * icone. Menu ouvert : panneau nuit plein ecran, entrees en titre/h3
 * separees par des filets, bouton pleine largeur, e-mail en legende.
 */
/* Fond apres defilement et fond du menu mobile, selon le ton. */
const FOND_DEFILE: Record<TonEnTete, string> = {
  nuit: "bg-nuit/80",
  electrique: "bg-[var(--entete-electrique)]",
};
const FOND_MENU: Record<TonEnTete, string> = {
  nuit: "bg-nuit",
  electrique: "fond-electrique",
};

export function EnTete({ ton = "nuit" }: { ton?: TonEnTete }) {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const f = () => setDefile(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  /* Menu ouvert : la page dessous ne defile plus. */
  useEffect(() => {
    document.body.style.overflow = ouvert ? "hidden" : "";
    bloquerDefilement(ouvert);
    return () => {
      document.body.style.overflow = "";
      bloquerDefilement(false);
    };
  }, [ouvert]);

  return (
    <header
      className={cn(
        /* Fond, flou et filet arrivent ensemble en 300 ms. Le filet existe
           toujours (transparent en haut de page) : rien ne bouge quand il
           apparait. Le flou part de 0 pour que la transition s'anime. */
        "text-sur-nuit fixed inset-x-0 top-0 z-50 border-b border-dotted backdrop-blur-none",
        "transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
        defile && !ouvert
          ? cn(FOND_DEFILE[ton], "border-white/28 backdrop-blur-md")
          : "border-transparent bg-transparent",
      )}
    >
      <div className="contenu relative z-10 flex h-[72px] items-center justify-between gap-10 sm:h-[88px]">
        <NavLink
          to="/"
          onClick={() => setOuvert(false)}
          className="shrink-0 no-underline"
          aria-label={EVENEMENT.nom}
        >
          <Logotype variante="ligne" />
        </NavLink>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Navigation principale">
          {ENTREES_BARRE.map((e) => (
            <Bouton key={e.id} variante="tertiaire" ton={ton} to={e.chemin}>
              {e.libelleCourt ?? e.libelle}
            </Bouton>
          ))}
        </nav>

        <Bouton to={ACTION.chemin} ton={ton} className="hidden lg:inline-flex">
          {ACTION.libelle}
        </Bouton>

        <Bouton
          variante="nu"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-controls="menu-mobile"
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="rounded-pastille flex size-10 flex-col gap-[6px] border border-white/15 bg-white/10 lg:hidden"
        >
          <span
            className="h-px w-[18px] bg-current transition-transform duration-300"
            style={ouvert ? { transform: "translateY(3.5px) rotate(45deg)" } : undefined}
          />
          <span
            className="h-px w-[18px] bg-current transition-transform duration-300"
            style={ouvert ? { transform: "translateY(-3.5px) rotate(-45deg)" } : undefined}
          />
        </Bouton>
      </div>

      {ouvert && (
        <div
          id="menu-mobile"
          className={cn("fixed inset-0 overflow-hidden lg:hidden", FOND_MENU[ton])}
        >
          <Halo ton={ton} taille={420} style={{ right: -120, top: 120 }} />
          <nav
            className="contenu relative flex flex-col pt-[96px] sm:pt-[112px]"
            aria-label="Navigation principale"
          >
            {ENTREES_BARRE.map((e) => (
              <NavLink
                key={e.id}
                to={e.chemin}
                onClick={() => setOuvert(false)}
                className="filet-sur-nuit text-d-sous-titre text-sur-nuit py-5 no-underline"
              >
                {e.libelleCourt ?? e.libelle}
              </NavLink>
            ))}
            <Bouton
              to={ACTION.chemin}
              ton={ton}
              onClick={() => setOuvert(false)}
              className="mt-10 w-full"
            >
              {ACTION.libelle}
            </Bouton>
            <a
              href={`mailto:${EVENEMENT.email}`}
              className={cn(
                "lien-glisse text-w-legende mt-6 self-start hover:text-white",
                ton === "electrique" ? "text-white/75" : "text-sur-nuit-legende",
              )}
            >
              {EVENEMENT.email}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
