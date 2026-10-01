import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Bouton } from "@/components/ui/Bouton";
import { ACTION, ENTREES_BARRE } from "@/data/pages";

/**
 * En-tete. Charte page 11 : quatre entrees, plus le bouton de reservation.
 *
 * Trois choses distinguent cette version de la precedente :
 * une barre plus haute avec un vrai rythme horizontal, un filet
 * pointille de separation plutot qu'une bordure pleine, et un fond
 * qui se densifie au defilement pour detacher la barre du hero.
 *
 * CORRIGE : au repos, le lot posait un fond transparent. La barre est
 * dans le flux, pas en survol du hero : elle laissait donc une bande
 * de 81 px au fond de page clair, au-dessus d'un hero nuit, avec un
 * logotype blanc dessus, illisible. Au repos elle prend --nuit, la
 * teinte exacte du hero, donc elle s'y fond ; au defilement elle passe
 * a --nuit-bas et gagne le filet, donc elle s'en detache.
 *
 * Le bouton du menu mobile n'emploie aucune icone : la charte les
 * interdit. Deux traits suffisent.
 *
 * CORRIGE : la nav complete basculait a lg. Logotype 396px, quatre
 * entrees et le bouton font 1010px de large ; dans 1024px de fenetre,
 * moins les marges du gabarit, il reste 944px. La barre debordait donc
 * sur toute la plage 1024 a 1075, et la page prenait un defilement
 * horizontal. Le seuil passe a xl, ou il reste 190px de marge.
 */
export function EnTete() {
  const [ouvert, setOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  useEffect(() => {
    const f = () => setDefile(window.scrollY > 24);
    f();
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);

  return (
    <header
      className="sticky top-0 z-50 text-sur-nuit transition-colors duration-300"
      style={{
        background: defile ? "var(--nuit-bas)" : "var(--nuit)",
        borderBottom: defile ? "var(--filet-bloc-sur-nuit)" : "1px dotted transparent",
      }}
    >
      <div className="contenu flex h-20 items-center justify-between gap-10">
        <NavLink to="/" onClick={() => setOuvert(false)} className="shrink-0 no-underline">
          <Logotype variante="ligne" />
        </NavLink>

        <nav className="hidden items-center gap-9 xl:flex">
          {ENTREES_BARRE.map((e) => (
            <NavLink
              key={e.id}
              to={e.chemin}
              className={({ isActive }) =>
                `text-w-legende no-underline transition-colors ${
                  isActive ? "text-sur-nuit" : "text-sur-nuit-body hover:text-sur-nuit"
                }`
              }
            >
              {e.libelleCourt ?? e.libelle}
            </NavLink>
          ))}
          <Bouton to={ACTION.chemin}>{ACTION.libelle}</Bouton>
        </nav>

        <Bouton
          variante="nu"
          onClick={() => setOuvert((v) => !v)}
          aria-expanded={ouvert}
          aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex size-11 flex-col gap-[6px] xl:hidden"
        >
          <span
            className="h-px w-6 bg-current transition-transform duration-300"
            style={ouvert ? { transform: "translateY(3.5px) rotate(45deg)" } : undefined}
          />
          <span
            className="h-px w-6 bg-current transition-transform duration-300"
            style={ouvert ? { transform: "translateY(-3.5px) rotate(-45deg)" } : undefined}
          />
        </Bouton>
      </div>

      {ouvert && (
        <nav className="contenu flex flex-col pb-8 xl:hidden">
          {ENTREES_BARRE.map((e) => (
            <NavLink
              key={e.id}
              to={e.chemin}
              onClick={() => setOuvert(false)}
              className="border-t border-dotted border-sur-nuit/20 py-4 text-w-courant text-sur-nuit no-underline"
            >
              {e.libelleCourt ?? e.libelle}
            </NavLink>
          ))}
          <Bouton to={ACTION.chemin} onClick={() => setOuvert(false)} className="mt-6 w-full">
            {ACTION.libelle}
          </Bouton>
        </nav>
      )}
    </header>
  );
}
