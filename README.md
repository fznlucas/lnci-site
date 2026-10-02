# Les Nuits du Capital Investissement

Site de la première édition des Nuits du Capital Investissement : deux jours à
Lyon, mi-janvier 2027, pour réunir fonds, banques, conseils, dirigeants et
étudiants autour du financement des entreprises, avec la finale d'un hackathon.

## Stack

Vite, React 19, TypeScript, Tailwind CSS v4, react-router, Lenis. Site statique,
servi par Nginx.

## Lancer le projet

Node 22 ou plus récent.

```sh
npm install
cp .env.example .env   # puis remplir les valeurs (voir docs/DEPLOIEMENT.md)
npm run dev            # http://localhost:5173
```

| Commande               | Rôle                                      |
| ---------------------- | ----------------------------------------- |
| `npm run lint`         | ESLint                                    |
| `npm run types`        | vérification TypeScript                   |
| `npm run format:check` | Prettier (`npm run format` pour corriger) |
| `npm run build`        | types puis build dans `dist/`             |
| `npm run preview`      | sert `dist/` en local                     |

## Structure

```
src/
  data/          les contenus du site
  pages/         une page par route
  sections/      les sections des maquettes
  components/    en-tête, pied de page, arc du programme, ui/, brand/
  formulaires/   types, validation et envoi des formulaires
  lib/           tons, défilement, titre de page, utilitaires
  styles/        tokens, typographie, Tailwind
public/          logos, images de partage, polices, icônes
deploy/          configuration Nginx
docs/            back-end, déploiement, charte et maquette
```

## Modifier les contenus

Tous les textes sont dans `src/data/` : programme et sections (`contenu.ts`),
événement (`evenement.ts`), partenaires et paliers (`partenaires.ts`), FAQ
(`faq.ts`), équipe (`equipe.ts`), pages légales (`legal.ts`), titres et
descriptions des pages (`referencement.ts`). Le registre des pages
(`pages.ts`) publie ou masque une page partout à la fois.

Aucun texte n'est écrit en dur dans les composants.

## Documentation

- [AGENTS.md](AGENTS.md) : le projet, ses règles et son fonctionnement.
- [docs/BACKEND.md](docs/BACKEND.md) : contrat d'API des formulaires.
- [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md) : mise en ligne sur le serveur OVH.
- [docs/CHARTE-ET-MAQUETTE.md](docs/CHARTE-ET-MAQUETTE.md) : charte, tons, tokens,
  composants et contenu page par page.

## Contenus encore attendus

Marqués `TODO(LNCI)` dans le code (`git grep "TODO(LNCI)"`). Tant qu'ils
manquent, l'élément concerné est masqué.

- Réponses de la FAQ (quatre questions restent masquées).
- Adresse de la page LinkedIn (`VITE_LINKEDIN_URL`).
- Mentions légales : structure porteuse, forme juridique, adresse, directeur de
  la publication, date de mise à jour ; hébergeur du serveur des formulaires.
- Logos des partenaires en haute définition, et logos des médias.
- PDF de la plaquette partenaires (`public/docs/`).
