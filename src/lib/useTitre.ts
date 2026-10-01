import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { imagePartage, SITE, type Referencement } from "@/data/referencement";

/**
 * Titre, description et partage de la page courante, a appeler en tete de
 * chaque page avec son entree de data/referencement.ts.
 *
 * Met a jour <title>, la meta description, l'adresse canonique (pages
 * indexees seulement), og:url,
 * og:title, og:description, og:image et twitter:image, et, pour les pages
 * a ne pas indexer (merci, 404), une meta robots noindex, retiree en
 * quittant la page.
 *
 * Les reseaux sociaux n'executent pas le JavaScript : pour eux, les memes
 * valeurs sont ecrites dans le HTML de chaque page au build (vite.config.ts).
 */
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

    // Pas d'adresse canonique sur une page non indexee (merci, 404).
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
