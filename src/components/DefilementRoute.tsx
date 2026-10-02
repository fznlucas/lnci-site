import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { defilerVers, demarrerDefilementFluide } from "@/lib/defilement";

// le routeur ne replace pas la page tout seul : nouvelle page = en haut ou à l'ancre sans animation,
// ancre sur la même page = défilement fluide
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
