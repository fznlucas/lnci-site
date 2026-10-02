import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Halo } from "@/components/brand/Halo";
import { Bouton } from "@/components/ui/Bouton";
import { ACTION, ENTREES_BARRE } from "@/data/pages";
import { EVENEMENT } from "@/data/evenement";
import { cn } from "@/lib/cn";
import type { TonEnTete } from "@/lib/cadre";
import { bloquerDefilement, surDefilement } from "@/lib/defilement";

// figma : site / en-tête
// fixe et transparent sur le hero : le premier bloc de chaque page réserve 88px (72 en mobile)
// ton électrique sur /hackathon : fond accent voilé au défilement, jamais le fond nuit
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

  // lu à chaque image, mais react ignore le set tant que le seuil n'est pas franchi
  useEffect(() => {
    const f = () => setDefile(window.scrollY > 24);
    f();
    return surDefilement(f);
  }, []);

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
        // filet toujours là (transparent en haut) pour que rien ne bouge quand il apparaît
        // blur-none explicite sinon la transition du flou ne s'anime pas
        "text-sur-nuit fixed inset-x-0 top-0 z-50 border-b border-dotted backdrop-blur-none",
        "transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
        defile && !ouvert
          ? cn(FOND_DEFILE[ton], "border-white/28 backdrop-blur-md")
          : "border-transparent bg-transparent",
      )}
    >
      {/* écarts resserrés sous xl : avec ceux du figma il faudrait 998px, on n'en a que 944 */}
      <div className="contenu relative z-10 flex h-[72px] items-center justify-between gap-6 sm:h-[88px] xl:gap-10">
        <NavLink
          to="/"
          onClick={() => setOuvert(false)}
          className="shrink-0 no-underline"
          aria-label={EVENEMENT.nom}
        >
          <Logotype variante="ligne" />
        </NavLink>

        <nav
          className="hidden items-center gap-6 lg:flex xl:gap-9"
          aria-label="Navigation principale"
        >
          {ENTREES_BARRE.map((e) => (
            <Bouton key={e.id} variante="tertiaire" ton={ton} to={e.chemin}>
              {e.libelleCourt ?? e.libelle}
            </Bouton>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-3">
          <Bouton to={ACTION.chemin} ton={ton}>
            {ACTION.libelle}
          </Bouton>

          {/* pas d'icône : deux traits de 20 et 12px (figma), le court est un 20px réduit
              en scaleX pour former une croix à l'ouverture */}
          <Bouton
            variante="nu"
            onClick={() => setOuvert((v) => !v)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
            className="rounded-pastille flex size-10 flex-col items-center justify-center gap-1.5 border border-white/15 bg-white/10 lg:hidden"
          >
            <span
              className="h-0.5 w-5 rounded-full bg-current transition-transform duration-300"
              style={{ transform: ouvert ? "translateY(4px) rotate(45deg)" : "none" }}
            />
            <span
              className="h-0.5 w-5 rounded-full bg-current transition-transform duration-300"
              style={{
                transform: ouvert
                  ? "translateY(-4px) rotate(-45deg)"
                  : "translateX(4px) scaleX(0.6)",
              }}
            />
          </Bouton>
        </div>
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
