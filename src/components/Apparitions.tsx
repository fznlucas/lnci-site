import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { mouvementReduit } from "@/lib/defilement";

/**
 * Apparition des sections au defilement : fondu et montee de 16px, 500 ms,
 * ease-out, une seule fois par element (classes .apparition et
 * .est-visible, styles/theme-tailwind.css).
 *
 * Rien a declarer dans les sections : a chaque page, ce composant prend
 * chaque section de premier niveau de <main>, sauf la premiere (le hero,
 * jamais anime), et anime les blocs enfants directs de son conteneur
 * .contenu. Une liste en grille (ol ou ul en display: grid) n'est pas
 * animee d'un bloc : ses cartes arrivent l'une apres l'autre, a 60 ms
 * d'ecart.
 *
 * Seuls l'opacite et la translation changent : la mise en page ne bouge
 * pas. Une fois l'element arrive, ses classes sont retirees (il retrouve
 * ses propres transitions, au survol par exemple). En mouvement reduit,
 * rien n'est masque ni anime.
 */
const DUREE = 500;
const ECART = 60;

export function Apparitions() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    if (mouvementReduit() || !("IntersectionObserver" in window)) return;

    const cibles: { el: HTMLElement; delai: number }[] = [];
    const sections = [...document.querySelectorAll<HTMLElement>("main section")].filter(
      (s) => !s.parentElement?.closest("section"),
    );
    for (const section of sections.slice(1)) {
      const conteneurs = [...section.querySelectorAll<HTMLElement>(".contenu")].filter(
        (c) => !c.parentElement?.closest(".contenu"),
      );
      for (const conteneur of conteneurs) {
        for (const bloc of conteneur.children) {
          if (!(bloc instanceof HTMLElement)) continue;
          const grille =
            /^(OL|UL)$/.test(bloc.tagName) && getComputedStyle(bloc).display === "grid";
          if (grille) {
            [...bloc.children].forEach((carte, i) => {
              if (carte instanceof HTMLElement) cibles.push({ el: carte, delai: i * ECART });
            });
          } else {
            cibles.push({ el: bloc, delai: 0 });
          }
        }
      }
    }

    const minuteries: number[] = [];
    const terminer = (el: HTMLElement) => {
      el.classList.remove("apparition", "est-visible");
      el.style.transitionDelay = "";
    };

    const auCroisement = (entrees: IntersectionObserverEntry[], obs: IntersectionObserver) => {
      for (const entree of entrees) {
        if (!entree.isIntersecting) continue;
        const el = entree.target as HTMLElement;
        obs.unobserve(el);
        el.classList.add("est-visible");
        const delai = parseFloat(el.style.transitionDelay) || 0;
        minuteries.push(window.setTimeout(() => terminer(el), DUREE + delai + 50));
      }
    };
    /* Marge basse de 8 % : l'element arrive un peu apres son entree a
       l'ecran. Sauf dans une zone epinglee (l'arc du programme, attribut
       data-zone-epinglee, pose des le premier rendu), qui ne bouge plus une
       fois collee : un element pose dans ses 8 % du bas ne serait jamais
       revele. */
    const observateur = new IntersectionObserver(auCroisement, {
      rootMargin: "0px 0px -8% 0px",
    });
    const observateurEpingle = new IntersectionObserver(auCroisement);

    for (const { el, delai } of cibles) {
      el.classList.add("apparition");
      if (delai) el.style.transitionDelay = `${delai}ms`;
      (el.closest("[data-zone-epinglee]") ? observateurEpingle : observateur).observe(el);
    }

    return () => {
      observateur.disconnect();
      observateurEpingle.disconnect();
      minuteries.forEach(clearTimeout);
      cibles.forEach(({ el }) => terminer(el));
    };
  }, [pathname]);

  return null;
}
