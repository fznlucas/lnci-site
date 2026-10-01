import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Logotype } from "@/components/brand/Logotype";
import { Halo } from "@/components/brand/Halo";
import { Bouton } from "@/components/ui/Bouton";
import { ACTION, ENTREES_BARRE } from "@/data/pages";
import { EVENEMENT } from "@/data/evenement";
import { bloquerDefilement } from "@/lib/defilement";

/**
 * En-tete. Figma : Site / En-tete.
 *
 * Sans fond, pose par-dessus le hero de chaque page (position fixe) : le
 * premier bloc de chaque page reserve donc sa hauteur en haut (88px, 72
 * en mobile). Il prend un fond nuit voile et un filet seulement apres
 * defilement, pour se detacher du contenu.
 *
 * Desktop (>= 1024) : Logo / Ligne, quatre liens tertiaires, le bouton
 * primaire de pre-inscription. En dessous : le logo (monogramme seul en
 * mobile) et le bouton du menu, deux traits dans une pastille, aucune
 * icone. Menu ouvert : panneau nuit plein ecran, entrees en titre/h3
 * separees par des filets, bouton pleine largeur, e-mail en legende.
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
      className={`text-sur-nuit fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        defile && !ouvert ? "filet-bas-sur-nuit bg-nuit/80 backdrop-blur-md" : "bg-transparent"
      }`}
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
            <Bouton key={e.id} variante="tertiaire" ton="nuit" to={e.chemin}>
              {e.libelleCourt ?? e.libelle}
            </Bouton>
          ))}
        </nav>

        <Bouton to={ACTION.chemin} ton="nuit" className="hidden lg:inline-flex">
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
        <div id="menu-mobile" className="bg-nuit fixed inset-0 overflow-hidden lg:hidden">
          <Halo ton="nuit" taille={420} style={{ right: -120, top: 120 }} />
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
              ton="nuit"
              onClick={() => setOuvert(false)}
              className="mt-10 w-full"
            >
              {ACTION.libelle}
            </Bouton>
            <a
              href={`mailto:${EVENEMENT.email}`}
              className="text-w-legende text-sur-nuit-legende hover:text-sur-nuit mt-6 no-underline"
            >
              {EVENEMENT.email}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
