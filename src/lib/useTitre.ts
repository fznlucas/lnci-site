import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { imagePartage, SITE, type Referencement } from "@/data/referencement";

// les réseaux sociaux n'exécutent pas le js : les mêmes valeurs sont aussi écrites
// dans le html de chaque page au build (vite.config.ts), garder les deux alignés
function meta(attribut: "name" | "property", cle: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attribut}="${cle}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribut, cle);
    document.head.appendChild(el);
  }
  return el;
}

function canonique() {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  return el;
}

export function useTitre(referencement: Referencement) {
  const { titre, description, indexer = true } = referencement;
  const image = imagePartage(referencement);
  const { pathname } = useLocation();

  useEffect(() => {
    const adresse = SITE + pathname;
    document.title = titre;
    meta("name", "description").content = description;
    meta("property", "og:url").content = adresse;
    meta("property", "og:title").content = titre;
    meta("property", "og:description").content = description;
    meta("property", "og:image").content = image;
    meta("name", "twitter:image").content = image;

    // pas de canonique sur une page non indexée (merci, 404)
    if (indexer) {
      canonique().href = adresse;
      return;
    }
    document.head.querySelector('link[rel="canonical"]')?.remove();
    const robots = meta("name", "robots");
    robots.content = "noindex";
    return () => robots.remove();
  }, [titre, description, image, indexer, pathname]);
}
