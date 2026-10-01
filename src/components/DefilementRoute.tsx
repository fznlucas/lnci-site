import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { defilerVers, demarrerDefilementFluide } from "@/lib/defilement";

/**
 * Defilement du site : demarre le defilement fluide (lib/defilement.ts),
 * puis, a chaque changement d'adresse, place la page.
 *
 *   nouvelle page        en haut, sans animation ; ou directement a
 *                        l'ancre de l'adresse (#faq, #formulaire)
 *   ancre sur la meme    defilement fluide jusqu'a l'ancre
 *   page
 *
 * Le routeur ne le fait pas de lui-meme.
 */
export function DefilementRoute() {
  const { pathname, hash } = useLocation();
  const pagePrecedente = useRef<string | null>(null);

  useEffect(() => demarrerDefilementFluide(), []);

  useEffect(() => {
    const nouvellePage = pagePrecedente.current !== pathname;
    pagePrecedente.current = pathname;

    if (hash) {
      const cible = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (cible) {
        defilerVers(cible, { immediat: nouvellePage });
        return;
      }
    }
    if (nouvellePage) defilerVers(0, { immediat: true });
  }, [pathname, hash]);

  return null;
}
