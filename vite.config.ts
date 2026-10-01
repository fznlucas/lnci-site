import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { PAGES } from "./src/data/pages.ts";
import {
  ACCUEIL,
  IMAGE_PARTAGE,
  REFERENCEMENT,
  SITE,
  imagePartage,
  type Referencement,
} from "./src/data/referencement.ts";

export default defineConfig({
  // A adapter au nom du depot si le site reste sur GitHub Pages.
  base: "/",
  plugins: [react(), tailwindcss(), pagesStatiques()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
});

/**
 * Pages statiques pour le partage et le sitemap, au build seulement.
 *
 * Le site est une application monopage : sans JavaScript, toutes les
 * adresses renvoient le meme index.html. Les reseaux sociaux (LinkedIn, X,
 * messageries) n'executent pas le JavaScript : sans ce plugin, chaque page
 * partagee afficherait le titre et l'image de l'accueil.
 *
 * Apres le build, pour chaque page publiee du registre (src/data/pages.ts)
 * et pour /merci, le plugin ecrit dist/<chemin>/index.html : une copie de
 * dist/index.html dont le titre, la description, l'adresse canonique et les
 * balises og: et twitter: viennent de src/data/referencement.ts (noindex
 * et pas d'adresse canonique pour /merci). Avec la configuration Nginx du handoff (try_files $uri
 * $uri/ /index.html), /programme sert dist/programme/index.html sans autre
 * reglage. Il ecrit aussi dist/sitemap.xml a partir des memes pages.
 *
 * Il signale enfin les images de partage absentes de public/.
 */
function pagesStatiques(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "lnci-pages-statiques",
    apply: "build",
    configResolved(c) {
      config = c;
    },
    closeBundle() {
      const sortie = path.resolve(config.root, config.build.outDir);
      const gabarit = readFileSync(path.join(sortie, "index.html"), "utf-8");

      // Pages publiees ayant leur propre adresse (pas d'ancre comme
      // /preinscription#faq), puis /merci, hors registre et non indexee.
      const pages: { chemin: string; ref: Referencement }[] = PAGES.filter(
        (p) => p.publiee && !p.chemin.includes("#") && REFERENCEMENT[p.id],
      ).map((p) => ({ chemin: p.chemin, ref: REFERENCEMENT[p.id] }));
      pages.push({ chemin: "/merci", ref: REFERENCEMENT.merci });

      for (const { chemin, ref } of pages) {
        const dossier = path.join(sortie, chemin.slice(1));
        mkdirSync(dossier, { recursive: true });
        writeFileSync(path.join(dossier, "index.html"), avecReferencement(gabarit, chemin, ref));
      }

      const indexees = ["/", ...pages.filter((p) => p.ref.indexer !== false).map((p) => p.chemin)];
      writeFileSync(path.join(sortie, "sitemap.xml"), sitemap(indexees));

      const images = new Set(
        [ACCUEIL, ...pages.map((p) => p.ref)].map((r) => r.image ?? IMAGE_PARTAGE),
      );
      for (const image of images) {
        if (!existsSync(path.join(config.publicDir, image))) {
          config.logger.warn(`Image de partage absente : public${image} (1 200 x 630 attendue).`);
        }
      }
    },
  };
}

/** Copie de index.html avec le referencement d'une page. */
function avecReferencement(html: string, chemin: string, ref: Referencement): string {
  const adresse = SITE + chemin;
  const image = imagePartage(ref);
  let page = html
    .replace(/<title>[^<]*<\/title>/, `<title>${echappe(ref.titre)}</title>`)
    .replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/, `$1${adresse}$2`);

  const metas: [string, string][] = [
    ['name="description"', ref.description],
    ['property="og:url"', adresse],
    ['property="og:title"', ref.titre],
    ['property="og:description"', ref.description],
    ['property="og:image"', image],
    ['name="twitter:image"', image],
  ];
  for (const [cle, valeur] of metas) {
    const motif = new RegExp(`(<meta\\s+${cle}\\s+content=")[^"]*(")`);
    if (!motif.test(page)) throw new Error(`index.html : balise ${cle} introuvable.`);
    page = page.replace(motif, `$1${echappe(valeur)}$2`);
  }

  if (ref.indexer === false) {
    page = page
      .replace(/\s*<link\s+rel="canonical"[^>]*>/, "")
      .replace("</head>", '  <meta name="robots" content="noindex" />\n  </head>');
  }
  return page;
}

function sitemap(chemins: string[]): string {
  const urls = chemins.map((c) => `  <url><loc>${SITE}${c}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<!-- Genere au build par vite.config.ts a partir de src/data/pages.ts. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function echappe(texte: string): string {
  return texte.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
