import { useEffect } from "react";
import type { Referencement } from "@/data/referencement";

/**
 * Titre et description de la page courante, a appeler en tete de chaque
 * page avec son entree de data/referencement.ts.
 *
 * Met a jour <title>, la meta description, og:title, og:description et,
 * pour les pages a ne pas indexer (merci, 404), une meta robots noindex,
 * retiree en quittant la page.
 */
function meta(selecteur: string, attribut: "name" | "property", cle: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selecteur);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribut, cle);
    document.head.appendChild(el);
  }
  return el;
}

export function useTitre({ titre, description, indexer = true }: Referencement) {
  useEffect(() => {
    document.title = titre;
    meta('meta[name="description"]', "name", "description").content = description;
    meta('meta[property="og:title"]', "property", "og:title").content = titre;
    meta('meta[property="og:description"]', "property", "og:description").content = description;

    if (indexer) return;
    const robots = meta('meta[name="robots"]', "name", "robots");
    robots.content = "noindex";
    return () => robots.remove();
  }, [titre, description, indexer]);
}
