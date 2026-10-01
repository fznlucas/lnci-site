import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Defilement a chaque changement de page : en haut de la nouvelle page, ou
 * jusqu'a l'ancre de l'adresse (#faq, #formulaire) si elle existe. Le
 * routeur ne le fait pas de lui-meme.
 */
export function DefilementRoute() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const cible = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (cible) {
        cible.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
