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
  // à passer au nom du dépôt si le site reste sur github pages
  base: "/",
  plugins: [react(), tailwindcss(), pagesStatiques()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "./src") },
  },
});

// les réseaux sociaux n'exécutent pas le js : sans ça toute page partagée
// afficherait le titre et l'image de l'accueil
// au build, écrit dist/<chemin>/index.html par page publiée (+ /merci) avec son
// référencement, plus le sitemap ; avec try_files $uri $uri/ /index.html côté nginx,
// /programme sert dist/programme/index.html sans autre réglage
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

      // pas les ancres type /preinscription#faq ; /merci est hors registre et non indexée
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
