# Les Nuits du Capital Investissement · site

Site de la première édition (Lyon, mi-janvier 2027). Site statique :
Vite, React 19, TypeScript, Tailwind v4, react-router. Aucune autre
dépendance.

## Lancer le projet

```sh
npm install
cp .env.example .env   # puis renseigner les valeurs, voir plus bas
npm run dev            # http://localhost:5173
npm run lint           # ESLint
npm run build          # vérification des types puis build dans dist/
npm run preview        # sert dist/ en local
```

`npm run lint` et `npm run build` doivent passer avant chaque push.

## Où sont les choses

```
src/
  data/          TOUS les contenus : textes, programme, partenaires, FAQ,
                 équipe, pages légales, référencement, registre des pages
  formulaires/   types, validation et envoi des formulaires (voir plus bas)
  pages/         une page par route, qui assemble des sections
  sections/      les sections du Figma (Hero, Concept, Paliers…)
  components/    composants partagés : en-tête, pied de page, arcs,
                 ui/ (Bouton, Pastille, Champ…), brand/ (logo, halo, titre)
  styles/        tokens.css (couleurs, rayons), typographie.css, Tailwind
  lib/           cn (classes), useTitre (titre et description par page)
public/
  logos/         logos des partenaires et des co-organisateurs (WebP)
  fonts/         police Schibsted Grotesk (woff2, licence OFL)
  og/            images de partage 1 200 x 630 (og-accueil.png par défaut)
  robots.txt
vite.config.ts   build, dont les pages HTML de partage et le sitemap
docs/HANDOFF.md  le cahier des charges de la refonte
```

- **Changer un texte** : uniquement dans `src/data/`. Aucun texte n'est
  écrit en dur dans les composants.
- **Ajouter ou publier une page** : `src/data/pages.ts` (le registre).
  La barre de navigation, le pied de page, les routes et le sitemap le
  lisent. Ajouter son titre et sa description dans
  `src/data/referencement.ts`.
- **Règles visuelles** : `CONVENTIONS.md` (le Figma fait foi) et `CLAUDE.md`.
- **Maquettes** : Figma `XPvk3XJUVbd0v5BZ5Z8h3I`, page « Site web ».

## Variables d'environnement

Publiques, injectées au build (fichier `.env`, ou secrets du dépôt en CI).
Ne jamais y mettre de secret.

| Variable | Rôle | Vide |
|---|---|---|
| `VITE_API_URL` | adresse de l'API des formulaires, sans barre finale | les formulaires affichent un message de repli avec l'adresse de contact |
| `VITE_LINKEDIN_URL` | page LinkedIn de l'événement | les liens LinkedIn sont masqués |

## Référencement et partage

Tout est dans `src/data/referencement.ts` : titre, description, image de
partage et indexation de chaque page.

- **Dans le navigateur**, `useTitre` (appelé en tête de chaque page) met à
  jour le titre, la description, l'adresse canonique et les balises `og:`
  et `twitter:`. `/merci` et la page 404 reçoivent un `noindex`.
- **Au build**, les réseaux sociaux n'exécutant pas le JavaScript,
  `vite.config.ts` écrit une copie de `index.html` par page publiée
  (`dist/programme/index.html`…) avec ses propres balises, et génère
  `dist/sitemap.xml` à partir du registre. Rien à maintenir à la main.
- **Images de partage** : 1 200 × 630, dans `public/og/`. Une page sans
  `image` prend `og-accueil.png`. Pour en donner une à une page, déposer
  le fichier (ex. `public/og/og-programme.png`) et ajouter
  `image: "/og/og-programme.png"` à son entrée. Le build signale toute
  image absente. `twitter:card` vaut `summary_large_image`.
- `public/robots.txt` exclut `/merci` et pointe vers le sitemap.

## Brancher le back-end des formulaires

Deux formulaires : pré-inscription (`/preinscription`) et contact
(`/contact`). Tout l'envoi passe par **un seul fichier**,
`src/formulaires/envoi.ts`. Pour brancher l'API, il suffit de renseigner
`VITE_API_URL` ; le code ne change pas tant que l'API respecte ce contrat :

```
POST ${VITE_API_URL}/preinscriptions
{ "prenom", "nom", "email", "poste", "organisation", "consentement": true,
  "source": "/preinscription?poste=etudiant", "envoyeLe": "2026-10-01T12:00:00Z" }

POST ${VITE_API_URL}/contacts
{ "prenom", "nom", "email", "organisation", "sujet", "message",
  "consentement": true, "source", "envoyeLe" }

→ 201 { "ok": true }                                  redirection vers /merci
→ 400 { "ok": false, "erreurs": { "email": "…" } }    messages sous les champs
→ 409 { "ok": false, "message": "…" }                 message en tête du formulaire
→ 5xx                                                 message générique + adresse de contact
```

- `poste` : `fonds`, `banque-conseil`, `dirigeant`, `etudiant`,
  `institution`, `presse`, `autre`.
- `sujet` : `participation`, `partenariat`, `presse`, `autre`.
- Les types exacts sont dans `src/formulaires/types.ts`.
- `organisation` peut être vide. `source` donne la page d'origine et ses
  paramètres `utm_*` et `poste`.
- Le navigateur valide déjà les champs (`validation.ts`), mais le serveur
  doit refaire tous les contrôles. L'API doit autoriser l'origine du site
  (CORS).
- Anti-spam côté navigateur : champ piège `site_web` (jamais envoyé) et
  délai minimal de 3 s avant l'envoi.

## Déploiement

Build statique (`dist/`) servi par Nginx sur le VPS. Le serveur sert la
page HTML de chaque route quand elle existe, et `index.html` pour toute
autre route (application monopage) :

```nginx
location / { try_files $uri $uri/index.html /index.html; }
```

`$uri/index.html` (et non `$uri/`) sert `dist/programme/index.html` pour
`/programme` sans redirection vers `/programme/`. Configuration complète au
§10 de `docs/HANDOFF.md`.

## Ce qui reste à fournir

Les valeurs manquantes sont marquées `TODO(LNCI)` dans le code :
`grep -rn "TODO(LNCI)" src index.html`.
