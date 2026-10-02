# Les Nuits du Capital Investissement : site

Site de la première édition des Nuits du Capital Investissement, deux jours à
Lyon mi-janvier 2027 : tables rondes, rendez-vous qualifiés entre fonds,
banques, conseils et dirigeants, et finale d'un hackathon étudiant. Site
statique, en français, déployé sur un serveur OVH.

## Stack et commandes

Vite, React 19, TypeScript, Tailwind CSS v4, react-router, Lenis (défilement
fluide). Utilitaires : clsx et tailwind-merge (`src/lib/cn.ts`). Node 22+.

```sh
npm install
npm run dev            # http://localhost:5173
npm run lint           # ESLint
npm run types          # vérification TypeScript
npm run format:check   # Prettier (npm run format pour corriger)
npm run build          # types puis build dans dist/
npm run preview        # sert dist/
```

`lint`, `types`, `format:check` et `build` doivent passer avant chaque push ; la
CI (`.github/workflows/ci.yml`) les lance sur chaque push et pull request.

Pas de nouvelle dépendance sans raison forte : pas de bibliothèque de
composants, pas de bibliothèque d'icônes.

## Structure

```
src/
  data/          tous les contenus : textes, programme, partenaires, FAQ,
                 équipe, pages légales, référencement, registre des pages
  pages/         une page par route, qui assemble des sections
  sections/      les sections des maquettes (Hero, Concept, Paliers…)
  components/    composants partagés : en-tête, pied de page, arc du
                 programme, apparitions ; ui/ (Bouton, Pastille, Etiquette,
                 Champ…) ; brand/ (logotype, halos, arcs, titre bicolore)
  formulaires/   types, validation, envoi et hook des deux formulaires
  lib/           tons, défilement, cadre (ton de l'en-tête et du pied),
                 titre de page, cn
  styles/        tokens.css (couleurs, rayons), typographie.css, Tailwind
public/          logos (WebP), images de partage (og/), polices, icônes
deploy/          configuration Nginx
docs/            back-end, déploiement, charte et maquette
vite.config.ts   build, dont une page HTML par route pour les aperçus de partage
```

- **Changer un texte** : uniquement dans `src/data/`. Aucun texte en dur dans
  les composants.
- **Publier ou masquer une page** : `src/data/pages.ts` (`publiee`). Barre de
  navigation, pied de page, routes et sitemap lisent ce registre. Titre et
  description de la page : `src/data/referencement.ts`.
- **Contenu manquant** : on n'invente rien (chiffre, nom, partenaire, date).
  On laisse le champ vide avec un `// TODO(LNCI): …` et l'élément est masqué.
  `git grep "TODO(LNCI)"` liste ce qui reste à fournir.

Noms de fichiers, composants, props et variables en français, comme le reste du
projet.

## Règles de la charte

Le Figma fait foi : fichier `XPvk3XJUVbd0v5BZ5Z8h3I` (kit sur la page
Composants, pages du site, concepts « tons et rythme », refonte mobile au nœud
`216:5641`). Le détail est dans [docs/CHARTE-ET-MAQUETTE.md](docs/CHARTE-ET-MAQUETTE.md).

- **Trois tons de section** : Nuit, Clair et Électrique (`src/lib/tons.ts`,
  prop `ton` des sections). Électrique seulement sur `/hackathon`, jamais en fond
  de page entière. L'en-tête et le pied de page prennent le ton déclaré par la
  page (`useCadre`, `src/lib/cadre.ts`).
- **Pastilles pleines, étiquettes douces** : la pastille au-dessus d'un titre est
  pleine (couleur du bouton primaire du ton) ; les étiquettes posées dans une
  liste ou une carte (statuts des créneaux, « Exclusif », écoles, médias) sont en
  style doux (composant `Etiquette`).
- **Titre bicolore** : ligne 1 atténuée, ligne 2 pleine, même corps
  (`TitreBicolore`). Jamais un mot isolé en couleur.
- **Halos jamais coupés** : ils sont posés dans une couche masquée qui les
  efface avant le bord de la section. Pas de `filter: blur()` : un dégradé
  radial au profil calculé (`src/components/brand/degradeHalo.ts`).
- **Arcs pointillés jamais sur du texte** : dans les zones vides, en bas de
  section. En mobile, un seul arc par page, en bas du hero.
- **Une seule ombre par page** : celle du panneau du formulaire de
  pré-inscription.
- **Le filet pointillé est le seul séparateur.** Bordure pleine seulement sur les
  champs, les cartes claires, le champ actif et la question ouverte de la FAQ.
- **Pas d'icône, pas de flèche, pas d'emoji, pas d'italique, pas de tiret
  cadratin.** Seule exception : la bascule + / − de la FAQ, dessinée en CSS.
- **Couleurs** : uniquement les tokens de `src/styles/tokens.css`, jamais de
  valeur en dur dans un composant.
- **Rayons** : 8 (bouton, champ), 15 (plaques de logos), 16 (pièces imbriquées),
  20 (carte), 24 (panneau), 999 (pastille).
- **Typographie** : Schibsted Grotesk seule, `text-d-*` pour l'affichage,
  `text-w-*` pour la lecture (`src/styles/typographie.css`, avec l'échelle
  mobile).
- **Contenu interdit** : aucun prix, aucun lieu exact (on écrit « Lyon »), aucun
  numéro de téléphone, aucun e-mail personnel. Une seule adresse :
  `contact@nuitsducapitalinvestissement.fr`.
- **Typographie française** : apostrophe ’, espace insécable avant `: ; ! ?` et
  dans « ».
- **Mouvement** : tout est coupé avec `prefers-reduced-motion: reduce`. On anime
  seulement `transform` et `opacity`.

## Arc du programme

`src/components/ArcSoiree.tsx`, sur l'accueil et en tête de `/programme`.

- **Desktop (≥ 1024 px)** : la section est épinglée pendant 200vh de défilement.
  L'arc se trace de gauche à droite et chaque heure s'allume quand le tracé
  l'atteint ; le détail du créneau change en fondu. La progression est écrite à
  chaque image dans la variable CSS `--avance` : pas de rendu React par image,
  l'état ne change que lorsqu'une heure s'allume.
- **Mobile et tablette** : arc vertical à gauche des créneaux, sans épinglage.
  Une heure s'allume quand elle passe le milieu de l'écran (`--avance-v`).
- **Onglets Jeudi / Vendredi** : `OngletsJour.tsx`, onglets ARIA au clavier,
  indicateur qui glisse en `transform`.
- Le défilement passe par Lenis (`src/lib/defilement.ts`) : un seul abonnement
  (`surDefilement`), appelé une fois par image. Les créneaux viennent de
  `SOIREES` dans `src/data/contenu.ts`.

## Formulaires

Pré-inscription (`/preinscription`) et contact (`/contact`), dans
`src/formulaires/` : types, validation navigateur, hook `useFormulaire`, envoi.

- Envoi en JSON vers `VITE_API_URL` (`POST /preinscriptions`, `POST /contacts`).
  Variable vide : rien n'est envoyé, le formulaire affiche un message de repli.
- Succès : redirection vers `/merci`. Erreurs de champ (400) sous les champs,
  refus global (409) en tête, panne (5xx, réseau) : message générique.
- Anti-spam : champ piège `site_web` (jamais envoyé) et 3 s minimum avant
  l'envoi.

Contrat complet pour le back-end : [docs/BACKEND.md](docs/BACKEND.md).

## Documentation

- [docs/BACKEND.md](docs/BACKEND.md) : contrat d'API des formulaires, exigences
  serveur, RGPD, schéma de table.
- [docs/DEPLOIEMENT.md](docs/DEPLOIEMENT.md) : build, Nginx, Let's Encrypt,
  variables d'environnement, tests après mise en ligne.
- [docs/CHARTE-ET-MAQUETTE.md](docs/CHARTE-ET-MAQUETTE.md) : charte, tons par
  page, tokens, composants et contenu page par page.

## Commits

- En français, petits, un sujet par commit.
- Pas de ligne `Co-Authored-By`.
- Rien n'est poussé directement sur `main` : on passe par une branche et une
  pull request.
