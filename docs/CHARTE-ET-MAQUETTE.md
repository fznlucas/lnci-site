# Charte et maquette : site des Nuits du Capital Investissement

> Référence de la refonte du site : contenu, charte, tons par page, tokens, composants et pages. Le Figma (`XPvk3XJUVbd0v5BZ5Z8h3I`) fait foi sur le visuel ; le résumé des règles du code est dans `AGENTS.md`.

---

## 0. Ce qui a changé depuis la V0 du repo

- **L'événement** : première édition, **mi-janvier 2027, Lyon, deux jours** (jeudi = journée professionnelle, vendredi = journée ouverte + finale du hackathon). Plus de « trois soirées », plus de « 12, 13 et 14 novembre 2026 ».
- **Conversion principale** : la **pré-inscription** (prénom, nom, e-mail, poste) via un formulaire du site, prêt à être branché sur un back-end (§8). La billetterie arrivera plus tard, envoyée aux pré-inscrits.
- **Conversion secondaire** : **devenir partenaire**.

### Remarques de Hedi (à respecter)

| Remarque                                                                               | Traduction dans le site                                                                                    |
| -------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| DA validée, premium et lisible                                                         | On garde tes tokens, ta typo, tes composants. Rien de neuf côté couleurs.                                  |
| Ajuster dates, nombre de soirées, contenus de l'ancien deck                            | 2 jours, « Mi-janvier 2027 » partout, jamais de jour précis. Contenus du nouveau deck (§7).                |
| Ne pas transposer le deck, retirer « Ce que l'édition engage » et la partie calendrier | Suppression de `sections/Chiffres.tsx` et `sections/Calendrier.tsx`, de `CHIFFRES` et `CALENDRIER`.        |
| S'inspirer de sites d'événements (type AdoptAI)                                        | Hero plein écran avec arc animé, sections pleine largeur, CTA répétés, nav collante.                       |
| Un arc en hero avec les partenaires et leurs logos                                     | Nouveau composant `ArcPartenaires` (§6.1).                                                                 |
| CTA très clairs                                                                        | « Se pré-inscrire » dans la nav, le hero, chaque fin de page et le pied. « Devenir partenaire » en second. |
| Pré-inscription : nom, prénom, mail, poste                                             | Page `/preinscription` avec le formulaire du site (§8).                                                    |

### Arbitrages validés par l'équipe

1. **Le deck + Hedi font foi** sur le contenu et sur les demandes visuelles. La structure technique du repo reste la référence.
2. **Animation** : l'arc du programme (`ArcSoiree`, §6.5) reste l'animation principale, le hero est fixe. S'y ajoutent, en finition : défilement fluide, apparition des sections au défilement, survols, ouverture de la FAQ et sélecteur Jeudi / Vendredi. Tout est coupé avec `prefers-reduced-motion`.
3. **Contenus désormais autorisés** : le mot « hackathon » partout, les logos partenaires, les logos médias, les chiffres d'audience (« +350 participants », « environ 100 professionnels le jeudi », « environ 250 le vendredi »). Sans en abuser : un mur de logos sur l'accueil, pas trois.
4. **Multi-pages** : on garde ton registre `data/pages.ts`.

---

## 1. Règles de travail

1. Commits petits, en français, sans ligne `Co-Authored-By` : `feat(hero): arc des partenaires`, `chore(data): passage à deux jours`…
2. Pas de nouvelle dépendance npm sans raison forte. Formulaires et validation sont faits à la main (§8) ; seule exception retenue : Lenis, pour le défilement fluide.
3. Aucun secret commité (`.env*` dans `.gitignore`, sauf `.env.example`). Les variables publiques sont au §8.
4. Rien d'inventé : quand une info manque (URL LinkedIn, URL de l'API, logos HD, photos), laisser la valeur vide + `// TODO(LNCI): …`. Le composant masque alors proprement l'élément.
5. Textes du site : français, apostrophe typographique ’, espace insécable avant `: ; ! ?` et dans `« »`. **Jamais de tiret cadratin.**
6. `npm run lint`, `npm run types` et `npm run build` doivent passer avant chaque push.

---

## 2. Sources

### Figma (vérité visuelle)

Fichier : `https://www.figma.com/design/XPvk3XJUVbd0v5BZ5Z8h3I` → page **🌐Site web**. **Le Figma fait foi** (textes, mise en page, tons).

- Cadre **Composants du site** : une section = un composant `Site / …` avec les variantes `Appareil=Desktop | Tablette | Mobile` (1440 / 834 / 390). Un composant = un fichier dans `src/sections/` (ou `components/` pour l'en-tête et le pied).
- Cadre **Pages du site** : les 10 pages montées avec ces composants, dans les 3 tailles.

| Composant Figma                                               | Ton                              | Fichier                                                                                                                             |
| ------------------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Site / En-tête                                                | transparent, posé sur le hero    | `components/EnTete.tsx`                                                                                                             |
| Site / Hero (Version = A2 retenue, A, B · Dôme, C · Orbite)   | Nuit                             | `sections/Hero.tsx` (on code A2)                                                                                                    |
| Site / Concept                                                | Clair + encart Électrique        | `sections/Concept.tsx`                                                                                                              |
| Site / Programme (aperçu)                                     | Nuit                             | `sections/ProgrammeApercu.tsx` (version de secours, sans animation)                                                                 |
| Site / Programme (arc)                                        | Nuit                             | `sections/Programme.tsx` + `components/ArcSoiree.tsx` (le composant animé du repo, à garder et à rebrancher sur les contenus Figma) |
| Site / Animations (propositions)                              | —                                | non retenues, rien à coder. Seule animation du site : l'arc du programme (version du repo)                                          |
| Site / Hackathon (aperçu)                                     | Électrique                       | `sections/HackathonApercu.tsx`                                                                                                      |
| Site / Partenaires (mur)                                      | Clair                            | `sections/MurPartenaires.tsx`                                                                                                       |
| Site / Bandeau d’action                                       | Nuit                             | `sections/BandeauAction.tsx` (props : pastille, titre ligne 1, ligne 2, texte, boutons)                                             |
| Site / Hero de page                                           | Nuit                             | `sections/HeroPage.tsx` (mêmes props)                                                                                               |
| Site / Programme (détail)                                     | Clair, temps forts en Électrique | `sections/ProgrammeDetail.tsx`                                                                                                      |
| Site / Le Off                                                 | Nuit                             | `sections/LeOff.tsx`                                                                                                                |
| Site / Hackathon (déroulé)                                    | Nuit + livrable Électrique       | `sections/HackathonDeroule.tsx`                                                                                                     |
| Site / Relais écoles                                          | Clair                            | `sections/RelaisEcoles.tsx`                                                                                                         |
| Site / Bénéfices                                              | Clair                            | `sections/Benefices.tsx`                                                                                                            |
| Site / Statut fondateur                                       | Électrique                       | `sections/StatutFondateur.tsx`                                                                                                      |
| Site / Paliers                                                | Nuit, Platine en Électrique      | `sections/Paliers.tsx`                                                                                                              |
| Site / Visibilité                                             | Clair + encart Nuit              | `sections/Visibilite.tsx`                                                                                                           |
| Site / Formulaire                                             | Nuit                             | `sections/FormulairePreInscription.tsx` (§8)                                                                                        |
| Site / FAQ                                                    | Clair                            | `sections/Faq.tsx`                                                                                                                  |
| Site / Équipe                                                 | Clair                            | `sections/Equipe.tsx`                                                                                                               |
| Site / Écran (Type = Merci, 404)                              | Nuit                             | `pages/Merci.tsx`, `pages/Introuvable.tsx`                                                                                          |
| Site / Texte légal (Type = Mentions légales, Confidentialité) | Clair                            | `pages/MentionsLegales.tsx`, `pages/Confidentialite.tsx`                                                                            |
| Site / Pied de page                                           | Nuit bas                         | `components/PiedDePage.tsx`                                                                                                         |

Composition des pages :

| Page                                    | Sections                                                                                                                        |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                     | Hero (A2) · Concept · Programme (arc) · Hackathon (aperçu) · Partenaires (mur) · Bandeau                                        |
| `/programme`                            | Programme (arc) en tête de page (halo du hero, sans lien « Voir le programme complet ») · Programme (détail) · Le Off · Bandeau |
| `/hackathon`                            | Hero de page · Hackathon (déroulé) · Relais écoles · Bandeau                                                                    |
| `/partenaires`                          | Hero de page · Bénéfices · Statut fondateur · Le Off · Partenaires (mur) · Paliers · Visibilité · Bandeau                       |
| `/preinscription`                       | Formulaire · FAQ                                                                                                                |
| `/contact`                              | Hero de page · Équipe · FAQ                                                                                                     |
| `/merci`, 404                           | Écran                                                                                                                           |
| `/mentions-legales`, `/confidentialite` | Hero de page · Texte légal                                                                                                      |

Règles visuelles (identiques aux posts et bannières du kit) :

- **Trois tons** : Nuit (`#0A0F2B`), Électrique (dégradé `#2440D0 → #2B48E0` avec halo cyan), Clair (`#F4F6FC` avec halo lavande `#A9B8FF`). Les coupures entre sections sont nettes, c'est voulu.
- **Halos** : le composant `Décor / Halo` du kit, comme sur les posts : un cercle plein couleur `accent/halo` (Nuit `#2B48E0`, Électrique cyan, Clair lavande) avec un flou de 220 px sur 800 px. En CSS : `div` rond, `background: var(--halo)`, `filter: blur(110px)`, `pointer-events:none`. Il peut déborder à gauche ou à droite, jamais en haut ou en bas d'une section (sauf en haut de page).
- **Arcs** : ellipses en pointillé blanc ou `accent-detail` (`stroke-dasharray: 2 10`), en fond.
- **Header** : sans fond, en `position: absolute` sur le hero ; il prend `bg-nuit/80 backdrop-blur` seulement après défilement.
- **Cartes** : rayon 24, pleines, variable `surface/carte` selon le ton : Clair → blanc avec bordure `bordure` ; Nuit → `#141C4A` ; Électrique → `#0A0F2B`. Plus de cartes transparentes « verre ».

### Tons par page (arbitrage final, Figma : page « 🧪 Concepts · tons et rythme »)

- **Électrique uniquement sur /hackathon**, en alternance avec Clair. Partout ailleurs : Nuit et Clair seulement.
- Accueil (concept B) : Hero N · Concept C (manifeste en panneau Nuit) · Programme (arc) N · Hackathon (aperçu) N, collé au programme avec un filet pointillé en haut · Partenaires (mur) C · Bandeau N, collé au pied de page.
- /programme : Arc N · Détail C (temps forts en Nuit) · Le Off N · Bandeau C.
- /partenaires : Hero N · Bénéfices C · Statut fondateur N · Le Off C · Mur N · Paliers C (Platine en carte Nuit) · Visibilité N (rapport en panneau Clair) · Bandeau C.
- /hackathon : Hero É · Déroulé C · Relais écoles É · Bandeau C.
- Chaque section fait au moins la hauteur de l'écran sur desktop (min 900 px à 1 440), contenu centré verticalement.
- Deux sections du même ton qui se touchent : halos loin de la jonction, jamais coupés.
- En Électrique : cartes numérotées fond blanc, numéro bleu, titre bleu nuit ; halo cyan `#38B6F5`.
- Arc du programme : heures atteintes 22 px Bold cyan, point 18 px ; heures à venir 17 px Bold blanc 70 %, point 12 px blanc 55 %.
- **Pastille au-dessus des deux colonnes** : dans toute section à deux colonnes (texte à gauche, texte, cartes ou formulaire à droite), la pastille est posée seule au-dessus des deux colonnes. La colonne de droite commence au niveau du haut du titre, jamais au niveau de la pastille.
- **Arcs pointillés** : jamais par-dessus du texte, des chiffres, des boutons ou des cartes. Ils passent dans les zones vides (souvent en bas de section).
- **Arc du programme (animation)** : reprendre `ArcSoiree` tel quel (section épinglée au scroll sur desktop, arc qui se trace, heures qui s'allument de 4 à 7 px et de 11 à 14 px, détail du créneau en fondu, onglets Jeudi / Vendredi ; arc vertical sans épinglage sous 1024 px). Seuls changent les contenus (créneaux du Figma, deux journées) et les couleurs : points non atteints `trait/filet`, atteints `accent/surtitre`. Respecter `prefers-reduced-motion`.
- **Alignement** : les cartes d'une même ligne ont toutes la même hauteur (`grid` + `items-stretch`). Padding des cartes : 32 px (24 en mobile). Éléments de liste pleine largeur : 24 × 28 (20 en mobile). Grands panneaux (Manifeste, Livrable, Rapport, Formulaire) : 48 (28 en mobile). Écart des grilles : 24 (16 en mobile). Dans une même ligne de cartes, les éléments internes sont alignés aussi (titres sur 1 ou 2 lignes → les descriptions démarrent à la même hauteur : `grid-rows-subgrid` ou `min-h` sur le titre). Numéros (01, 02…) dans une colonne de largeur fixe. Les mises en page à deux colonnes (hero, Le Off, Hackathon) sont alignées en haut ET en bas : la colonne la plus courte s'étire (`justify-between`) ou ses cartes grandissent. Sections : padding vertical 128 / 104 / 80 (desktop / tablette / mobile), identique en haut et en bas.
- **Pastilles** : composant `Pastille` du kit, style **plein** (Style=Accent), 34 px de haut, arrondies (999) avec un point. Couleurs = `action/fond` et `action/texte`, comme le bouton primaire : Clair → fond `#2B48E0`, texte blanc ; Nuit → fond `#3555F2`, texte blanc ; Électrique → fond blanc, texte `#2B48E0`.
- **Étiquettes de liste** : règle « pastille = plein, étiquette de liste = doux ». La pastille au-dessus d’un titre est pleine ; les étiquettes posées dans une liste ou une carte (statuts des créneaux, « Exclusif », écoles, médias) sont en style **doux**, sans point, arrondies (999), composant `Etiquette` : Sur invitation → fond `#E6EAF9`, texte `#2B48E0` ; Ouvert → contour tireté `#C2CBE4`, texte `#10173F` ; doux selon le ton (Temps fort, « Exclusif », écoles) → Clair : fond bleu 10 %, texte `#2B48E0` ; Nuit : fond blanc 10 %, texte blanc ; Électrique : fond blanc 18 %, texte blanc ; médias (logos à fournir) → fond `#F0F2FB`, texte `#10173F`. Tailles : statuts et « Exclusif » 13 px en 500, 12 × 6 ; médias 13 px, 14 × 8, 36 px de haut ; écoles 17 px gras, 20 × 12, 54 px de haut.
- **Bouton primaire** : variables `action/fond` et `action/texte` : Clair → bleu `#2B48E0` texte blanc ; Nuit → bleu lumineux `#3555F2` texte blanc ; Électrique → **blanc, texte bleu**. Secondaire : contour pointillé, texte `accent/surtitre` (blanc sur Électrique).
- **Halo des heros** : tous les heros (accueil, heros de page, Merci, 404, en-tête de /programme) : disque `#2B48E0` (cyan `#38B6F5` en Électrique), opacité 0,85, diamètre 62,5 % de la largeur, centre à 91 % en x et 6,25 % de la largeur en y, flou = 11 % du diamètre (1 440 : 900 px, centre 1 310 / 90, blur 100 px).
- **Pas d'images de remplissage** : l'équipe a des avatars en initiales (dégradé Électrique), remplaçables plus tard par des photos carrées.
- Logos : le hero n'affiche que 7 partenaires (ONLYLYON Invest, Arkéa Capital, Métropole de Lyon, Région Auvergne-Rhône-Alpes, BNP Paribas, Lyon Place Financière, Caisse d'Épargne), sur des plaques blanches ombrées posées sur l'arc. Tous les partenaires sont dans le mur.
- Logo du header : `Logo / Ligne` (monogramme + nom sur une ligne) ; monogramme seul en mobile. Pied de page : `Logo / Typo`.
- Textes : styles du kit (`titre/h1` à `h4`, `web/display-*`, `corps/*`, `legende`, `donnee`, `surtitre`, `bouton`).

### Deck (vérité contenu)

Le nouveau deck partenaires. Tous les textes du §7 en sont tirés et reformulés pour le web.

### Assets

`assets-lnci-extraits-du-deck.zip` (envoyé à part) :

- `logos-partenaires/*.png` → `public/logos/partenaires/` (noms au §6.2)
- `photos/photo-hackathon.jpg`, `photo-networking.jpg`, `photo-salle.jpg` → `public/photos/` (convertir en `.webp`, 1600px max, qualité 75)

---

## 3. Stack (inchangée)

Vite 8, React 19, TypeScript ~6, Tailwind v4 (`@tailwindcss/vite`, `@theme inline`, `@utility`), react-router-dom 7 (`BrowserRouter`), `clsx` + `tailwind-merge` via `cn`, ESLint 10 flat, Prettier + plugin Tailwind. Alias `@` → `src`. Build statique dans `dist/`.

Arborescence cible (✚ nouveau, ✎ modifié, ✖ supprimé) :

```
src/
  App.tsx                         ✎ routes
  main.tsx
  components/
    ArcPartenaires.tsx            ✚ arc des partenaires du hero (fixe)
    ArcSoiree.tsx                 ✎ deux jours (plus utilisé sur l'accueil)
    EnTete.tsx                    ✎ action « Se pré-inscrire »
    PiedDePage.tsx                ✎ formulaire e-mail remplacé par 2 actions
    MotHorizon.tsx
    (formulaires : voir §8, dossier src/formulaires/)
    Accordeon.tsx                 ✚ FAQ (details/summary natif)
    brand/…                       (inchangé)
    ui/
      Bouton.tsx  Champ.tsx  Pastille.tsx  CartoucheIntervenant.tsx
      LogoPartenaire.tsx          ✚
      CarteSoiree.tsx             ✖ remplacé par ArcSoiree sur l'accueil
  data/
    evenement.ts                  ✎
    pages.ts                      ✎
    contenu.ts                    ✎ (SOIREES 2 jours, FAITS, PUBLICS ; CHIFFRES et CALENDRIER supprimés)
    partenaires.ts                ✚ logos, bénéfices, niveaux, Off, rapport, médias
    equipe.ts                     ✚ 4 référents
    faq.ts                        ✚
    soirees.ts                    ✖ (doublon de contenu.ts)
  pages/
    Accueil.tsx                   ✎ (déplacé depuis sections/Accueil.tsx)
    Programme.tsx                 ✚
    Hackathon.tsx                 ✚
    Partenaires.tsx               ✚
    Preinscription.tsx            ✚
    Contact.tsx                   ✚
    Merci.tsx                     ✚
    MentionsLegales.tsx           ✚
    Confidentialite.tsx           ✚
    Introuvable.tsx               ✚ (404, remplace EnConstruction « n'existe pas »)
    EnConstruction.tsx            (garde pour les pages non publiées)
  sections/
    Hero.tsx  Positionnement.tsx  Publics.tsx  Programme.tsx   ✎
    Hackathon.tsx  Partenaires.tsx  BandeauAction.tsx          ✚
    Chiffres.tsx  Calendrier.tsx                               ✖
  lib/
    cn.ts
    useTitre.ts                   ✚ titre et description par page
```

---

## 4. Règles de la charte

Le résumé des règles à respecter dans le code est dans `AGENTS.md`, à la racine du dépôt. Ce document en garde le détail : tokens (§5), composants (§6) et contenu page par page (§7).

---

## 5. Tokens : correspondance Figma ↔ repo

Aucune nouvelle couleur. Tout existe déjà dans `tokens.css`.

| Figma (variable)                   | Mode Clair       | Mode Nuit                 | Classe Tailwind                             |
| ---------------------------------- | ---------------- | ------------------------- | ------------------------------------------- |
| `surface/page`                     | `--page`         | `--nuit`                  | `bg-page` / `bg-nuit`                       |
| `surface/alternance`               | `--page-alt`     | `--nuit-haut`             | `bg-page-alt`                               |
| `surface/carte`                    | blanc            | `--nuit-aplat`            | `bg-white` / `bg-nuit-aplat`                |
| `texte/titre`                      | `--encre`        | blanc                     | `text-encre` / `text-sur-nuit`              |
| `texte/attenue` (ligne 1 bicolore) | `--titre-ligne1` | `--titre-ligne1` à 70 %   | via `TitreBicolore`                         |
| `texte/courant`                    | `--courant`      | `--text-sur-nuit-body`    | `text-texte-courant` / `text-sur-nuit-body` |
| `texte/legende`                    | `--legende`      | `--text-sur-nuit-legende` | `text-legende` / `text-sur-nuit-legende`    |
| `accent/surtitre`                  | `--accent`       | `--accent-clair`          | `text-accent` / `text-accent-clair`         |
| `action/fond` (bouton primaire)    | `--accent`       | `--accent-survol`         | voir note                                   |
| `trait/filet`                      | filet pointillé  | filet sur nuit            | `filet-bloc` / `filet-sur-nuit`             |
| `nuit/bas` (pied, bandeaux)        |                  |                           | `bg-nuit-bas`                               |

Note bouton primaire : sur fond nuit, le primaire est en `bg-accent-survol` (plus lumineux), survol en `bg-accent-detail`. Sur fond clair, `bg-accent`, survol `bg-accent-survol`. Ajouter ce cas dans `Bouton.tsx` via la prop `sombre` existante.

Typographie : **le Figma utilise les styles du kit**. `typographie.css` doit être réaligné sur ces valeurs (mêmes noms de classes qu'aujourd'hui, nouvelles valeurs) :

| Style Figma (kit)        | Usage                                              | Classe repo                      | Valeur à mettre                                |
| ------------------------ | -------------------------------------------------- | -------------------------------- | ---------------------------------------------- |
| `titre/h1`               | H1 de l'accueil et des heros (desktop)             | `text-d-hero`                    | 56 px / 1,1 (les styles du kit Figma font foi) |
| `web/display-m`          | H1 des autres pages (desktop), H1 accueil tablette | `text-d-hero-page` (nouveau)     | 64 px / 1, 800, -2,5 %                         |
| `web/display-s`          | H1 en mobile                                       | (responsive des deux précédents) | 42 px / 1,04, 800, -2 %                        |
| `titre/h1`               | titres des pages légales                           | `text-d-titre-page`              | 56 px / 1,1, 800, -2,5 %                       |
| `titre/h2`               | titres de section (desktop, tablette)              | `text-d-titre`                   | 40 px / 1,15, 800, -2 %                        |
| `titre/h3`               | titres de section mobile, manifeste, niveaux       | `text-d-sous-titre`              | 28 px / 1,2, 700, -1,5 %                       |
| `titre/h4`               | titres de carte, questions FAQ                     | `text-d-bloc`                    | 20 px / 1,3, 700, -1 %                         |
| `donnee`                 | chiffres et faits                                  | `text-d-chiffre`                 | 44 px / 1, 800, -2 %                           |
| `surtitre`               | composant Surtitre                                 | `text-w-surtitre uppercase`      | 12 px, 700, +18 %                              |
| `corps/large`            | chapeaux desktop                                   | `text-w-chapeau` (nouveau)       | 19 px / 1,65                                   |
| `corps/base`             | texte courant                                      | `text-w-courant`                 | 17 px / 1,65                                   |
| `corps/dense`            | texte des cartes                                   | `text-w-dense` (nouveau)         | 15 px / 1,6                                    |
| `base bold`              | avantages, valeurs mobiles                         | `text-w-courant font-bold`       | 17 px, 700                                     |
| `legende`                | légendes, notes                                    | `text-w-legende`                 | 13 px / 1,5, 500                               |
| `bouton` / `bouton lien` | dans `Bouton.tsx`                                  |                                  | 15 px, 600                                     |

Rayons (kit Figma) : bouton 8, champ 8, carte 24, panneau 24, pièces du livrable 16, plaques de logo 15, pastille 999.
Marges latérales : 24 (mobile) / 32 (≥ 40rem) / 40 (≥ 64rem). Sections : `py-18 lg:py-28` (72 / 112 px).

---

## 6. Composants

### 6.1 `ArcPartenaires` (hero, **fixe**)

Figma : `Site / Hero`, version **A2 (retenue)**. Titre « Le rendez-vous annuel / du capital investissement » (`titre/h1`, 4 lignes en desktop) aligné en haut et en bas avec la colonne de droite (chapeau, infos à points, appui Lyon Place Financière, boutons). En dessous, l'arc avec **7 logos** (Arkéa Capital, ONLYLYON Invest, Métropole de Lyon, BNP Paribas, Lyon Place Financière, Caisse d'Épargne, Région Auvergne-Rhône-Alpes) qui ne se touchent pas ; en tablette et mobile, les 7 logos passent sur deux rangées centrées (4 + 3) sous l'arc.

Composition (SVG + logos en absolu, `aria-hidden` sur le décor) :

1. **Halo** = halo des heros (voir §5, « Halo des heros »).
2. **Arcs** = deux ellipses en pointillé, mises à l'échelle de la largeur, positions du Figma.
3. **Logos** = `LogoPartenaire` sur plaque blanche, posés sur l'arc principal aux positions du Figma.

**Pas d'animation dans le hero.** Rien ne glisse, rien ne respire. La seule animation du site est l'arc du programme (§6.5).

### 6.2 `LogoPartenaire` (nouveau)

Reprend `Post / Emplacement logo` (taille S = 220×110, plaque blanche ou transparent). Props : `nom`, `fichier`, `fond: "plaque" | "transparent"`, `hauteur?`. Plaque = `bg-white rounded-bouton`, logo centré à 76 % de la largeur, hauteur 88 sur le mur de logos, 55 dans l'arc, image en `object-contain`, `alt={nom}`, `loading="lazy"`, `decoding="async"`.

`data/partenaires.ts` → `LOGOS_PARTENAIRES` (ordre d'affichage) :

| Nom                           | Fichier `public/logos/partenaires/` |
| ----------------------------- | ----------------------------------- |
| ONLYLYON Invest               | `onlylyon.png`                      |
| Métropole de Lyon             | `metropole.png`                     |
| Ville de Lyon                 | `villedelyon.png`                   |
| Région Auvergne-Rhône-Alpes   | `region-aura.png`                   |
| Arkéa Capital                 | `arkea.png`                         |
| BNP Paribas                   | `bnp.png`                           |
| Caisse d'Épargne              | `caisse-epargne.png`                |
| iaelyon School of Management  | `iaelyon.png`                       |
| Université Jean Moulin Lyon 3 | `jean-moulin.png`                   |
| Lyon Place Financière         | `lyon-place-financiere.png`         |
| DealMakers Club               | `dealmakers.png`                    |

`// TODO(LNCI): remplacer par les fichiers HD et retirer tout partenaire non confirmé avant mise en ligne.`

### 6.3 `EnTete` (modifié)

- `BARRE = ["programme", "hackathon", "partenaires", "contact"]`.
- `ACTION = page("preinscription")`, libellé « Se pré-inscrire ».
- **Logo = Logo / Typo** (« LES NUITS DU » + filet pointillé + « CAPITAL INVESTISSEMENT » sur une ligne), 32 px de haut (26 en mobile). Liens = Bouton Tertiaire, action = Bouton Primaire.
- Le reste ne bouge pas (collante 80 px, nuit → nuit-bas + filet au défilement, menu 2 traits sous `xl`).
- Menu mobile ouvert (Figma `Appareil=Mobile, Menu=Ouvert`) : entrées en `titre/h3` séparées par des filets, bouton pleine largeur, e-mail en légende.

### 6.4 `PiedDePage` (modifié)

- **Supprimer le formulaire e-mail** non branché. À la place, sous la phrase d'identité : `Bouton primaire « Se pré-inscrire »` + `Bouton secondaire sombre « Devenir partenaire »`.
- **Logo = Logo / Typo 2 lignes**. Titres de colonnes et de logos = composant Surtitre. Séparateurs = Filet pointillé.
- Phrase d'identité : « Deux jours pour réunir à Lyon celles et ceux qui financent, accompagnent et dirigent les entreprises de la région. Avec un hackathon étudiant en fil rouge. »
- Colonnes générées par le registre (inchangé) : L'événement / Partenaires / Participer.
- Logos : « Co-organisé par » DealMakers Club, IAE Lyon Junior Conseil, iaelyon Finance Club · « Avec l'appui de » iaelyon School of Management + Lyon Place Financière (plaque).
- Bas : domaine · e-mail · Mentions légales · Confidentialité · © 2026.

### 6.5 `ArcSoiree` (la seule animation du site)

- Figma : `Site / Programme (arc)` (nœud 168:7793). Il remplace les cartes du programme sur l'accueil, et sert d'en-tête à la page `/programme` (avec le halo du hero, sans le lien « Voir le programme complet »).
- Reprendre `ArcSoiree` du repo tel quel (voir la règle « Arc du programme » au §5) ; seuls changent les données (deux jours, créneaux du Figma, onglets « Jeudi · Journée pro » / « Vendredi · Journée ouverte ») et les couleurs.
- `CarteSoiree` n'est plus utilisé : à supprimer, ainsi que `Site / Programme (aperçu)` côté code.

### 6.6 `Pastille`

Toutes les pastilles du site sont en style **plein** (Figma : `Pastille`, Style=Accent) : fond `action/fond`, texte et point `action/texte`, donc même couleur que le bouton primaire selon le ton (Clair : bleu, Nuit : bleu vif `#3555F2`, Électrique : blanc et texte bleu). Point visible par défaut. Les étiquettes de liste ne sont pas des pastilles : elles sont en style doux (§2, « Étiquettes de liste »).

### 6.7 Formulaires et `Accordeon`

Voir §8 pour les formulaires. `Accordeon` = liste de `<details>` / `<summary>` stylés (filet bas pointillé, question en `text-d-bloc`, ouverte en `text-accent`), sans icône, premier élément ouvert.

---

## 7. Données et contenu par page

### 7.1 `data/evenement.ts`

```ts
export const EVENEMENT = {
  nom: "Les Nuits du Capital Investissement",
  surTitre: "Lyon · Mi-janvier 2027 · Première édition",
  dates: "Mi-janvier 2027",
  duree: "Deux jours",
  ville: "Lyon",
  lieu: "Lyon", // lieu exact annoncé aux pré-inscrits
  domaine: "nuitsducapitalinvestissement.fr",
  email: "contact@nuitsducapitalinvestissement.fr",
  linkedin: "", // TODO(LNCI): URL de la page LinkedIn
  appui: "Avec l'appui de Lyon Place Financière",
  titreAccueil: { attenue: "Les Nuits du", plein: "Capital Investissement" },
  chapeauAccueil:
    "Deux jours pour réunir fonds, banques, conseils, dirigeants et étudiants autour du financement des entreprises. Des rencontres qualifiées, des tables rondes et un hackathon dont la finale se joue le vendredi soir.",
} as const;
```

### 7.2 `data/pages.ts`

```ts
export const PAGES: Page[] = [
  {
    id: "programme",
    libelle: "Programme",
    chemin: "/programme",
    groupe: "evenement",
    publiee: true,
  },
  {
    id: "hackathon",
    libelle: "Hackathon",
    chemin: "/hackathon",
    groupe: "evenement",
    publiee: true,
  },
  {
    id: "intervenants",
    libelle: "Intervenants",
    chemin: "/intervenants",
    groupe: "evenement",
    publiee: false,
  },

  {
    id: "partenaires",
    libelle: "Devenir partenaire",
    chemin: "/partenaires",
    groupe: "partenaires",
    publiee: true,
  },
  { id: "le-off", libelle: "Le Off", chemin: "/le-off", groupe: "partenaires", publiee: false },

  {
    id: "preinscription",
    libelle: "Se pré-inscrire",
    chemin: "/preinscription",
    groupe: "participer",
    publiee: true,
  },
  { id: "contact", libelle: "Contact", chemin: "/contact", groupe: "participer", publiee: true },
  {
    id: "faq",
    libelle: "Questions fréquentes",
    chemin: "/preinscription#faq",
    groupe: "participer",
    publiee: false,
  },

  {
    id: "mentions-legales",
    libelle: "Mentions légales",
    chemin: "/mentions-legales",
    groupe: "legal",
    publiee: true,
  },
  {
    id: "confidentialite",
    libelle: "Confidentialité",
    chemin: "/confidentialite",
    groupe: "legal",
    publiee: true,
  },
];
const BARRE = ["programme", "hackathon", "partenaires", "contact"];
export const ACTION = page("preinscription") as Page;
```

Dans la barre, le libellé de `partenaires` s'affiche « Partenaires » (prévoir un champ `libelleCourt?`).
`/merci` et la 404 ne sont pas dans le registre (pas de lien vers elles).

### 7.3 `data/contenu.ts`

Supprimer `CHIFFRES` et `CALENDRIER`. Garder les types. `format` porte le libellé de la pastille, `statut` reste pour les points de l'arc.

```ts
export const SOIREES: Soiree[] = [
  {
    jour: "Jeudi · journée professionnelle",
    titre: "La journée professionnelle",
    horaires: "17h30 à 23h · environ 100 professionnels",
    creneaux: [
      {
        heure: "17h30",
        intitule: "Atelier débat tournant",
        detail:
          "Fonds, conseils et dirigeants en petits groupes, on tourne toutes les vingt minutes.",
        format: "Sur invitation",
        statut: "arrete",
      },
      {
        heure: "19h00",
        intitule: "Keynote d’ouverture",
        detail: "Le mot des partenaires et le lancement officiel de l’édition.",
        format: "Ouvert",
        statut: "arrete",
      },
      {
        heure: "19h30",
        intitule: "Table ronde : marque employeur et sourcing de talents",
        detail: "Comment les fonds attirent et gardent les meilleurs profils.",
        format: "Ouvert",
        statut: "ouvert",
      },
      {
        heure: "20h30",
        intitule: "Table ronde : comment se construit un deal",
        detail: "De la lettre d’intention au closing, raconté par ceux qui le font.",
        format: "Ouvert",
        statut: "ouvert",
      },
      {
        heure: "21h30",
        intitule: "Cocktail dînatoire et networking",
        detail: "Le moment où les rendez-vous se prennent.",
        format: "Temps fort",
        statut: "arrete",
      },
    ],
  },
  {
    jour: "Vendredi · journée ouverte",
    titre: "La journée ouverte et la finale",
    horaires: "16h à 1h · environ 250 participants",
    produit: true,
    creneaux: [
      {
        heure: "16h00",
        intitule: "Speed-meetings dirigeants et fonds",
        detail: "Des rendez-vous de quinze minutes, préparés à l’avance.",
        format: "Sur invitation",
        statut: "arrete",
      },
      {
        heure: "17h45",
        intitule: "LBO : structuration, levier, création de valeur",
        detail: "Ce qui fait vraiment la performance d’une opération.",
        format: "Ouvert",
        statut: "ouvert",
      },
      {
        heure: "19h00",
        intitule: "Build-up et croissance externe",
        detail: "Acheter pour grandir : méthode, pièges et retours d’expérience.",
        format: "Ouvert",
        statut: "ouvert",
      },
      {
        heure: "20h15",
        intitule: "Finale du hackathon et remise des prix",
        detail: "Les équipes finalistes face au jury, devant toute la salle.",
        format: "Temps fort",
        statut: "arrete",
      },
      {
        heure: "21h15",
        intitule: "Soirée de clôture",
        detail: "On termine ensemble, tard.",
        format: "Ouvert",
        statut: "arrete",
      },
    ],
  },
];

export const FAITS = [
  { valeur: "Mi-janvier", libelle: "2027, deux jours à Lyon" },
  { valeur: "+350", libelle: "participants sur les deux jours" },
  { valeur: "100", libelle: "professionnels le jeudi soir" },
  { valeur: "1 finale", libelle: "du hackathon, le vendredi soir" },
] as const;

export const PUBLICS = [
  {
    intitule: "Fonds d’investissement",
    texte: "Du sourcing en région, un vivier de talents et un hackathon à vos couleurs.",
    page: "partenaires",
    lien: "Devenir partenaire",
  },
  {
    intitule: "Dirigeants",
    texte: "Rencontrer les fonds qui investissent sur le territoire, sans intermédiaire.",
    page: "preinscription",
    lien: "Se pré-inscrire",
  },
  {
    intitule: "Banques et conseils",
    texte: "Retrouver en une soirée les acteurs avec qui vous faites les opérations.",
    page: "preinscription",
    lien: "Se pré-inscrire",
  },
  {
    intitule: "Étudiants",
    texte: "Le hackathon, la finale et un accès direct aux équipes qui recrutent.",
    page: "hackathon",
    lien: "Le hackathon",
  },
] as const;
```

### 7.4 Accueil `/`

Ordre des sections (Figma ligne « Accueil ») :

1. **Hero** [nuit] : surtitre `EVENEMENT.surTitre` · `h1` bicolore « Le rendez-vous annuel / du capital investissement » · chapeau à droite (desktop) · actions **Se pré-inscrire** (primaire) + **Devenir partenaire** (secondaire) · `ArcPartenaires` pleine largeur (7 logos, fixe) · bandeau `FAITS` (4 colonnes desktop, 2 tablette et mobile, filet pointillé au-dessus de chaque fait, valeur en `donnee`). Au-dessus du H1 : Pastille « Première édition · Lyon · Mi-janvier 2027 ».
2. **Le concept** [clair] : surtitre « Le concept » · titre « Deux jours, / un écosystème au complet » · chapeau « Fonds d’investissement, banques, conseils, dirigeants et étudiants sélectionnés se retrouvent autour du financement des entreprises, à chaque étape de leur vie : croissance, transmission, ouverture de capital. » · 3 cartes :
   - 01 **Un temps fort à créer** : « Fonds, banquiers d’affaires, conseils et entreprises se croisent toute l’année en rendez-vous bilatéraux. Il manquait le moment où tout l’écosystème se retrouve. »
   - 02 **La rencontre avant tout** : « Pas une succession de conférences : la place est donnée à ce qui compte dans ce métier, la rencontre, le sourcing et le deal-making. »
   - 03 **Toutes les générations** : « Étudiants, jeunes talents, investisseurs, dirigeants : du hackathon aux rendez-vous qualifiés, tous les métiers dialoguent. »
   - Manifeste (filet au-dessus, `text-d-sous-titre`, deux premières lignes atténuées) : « Ce n’est pas un cycle de conférences. / Ce n’est pas un forum écoles-entreprises. / C’est le moment de l’année où l’écosystème se retrouve, et où les opérations naissent. »
3. **Publics** [clair alternance] : surtitre « Pour qui » · titre « Deux jours pensés / pour chaque métier » · `PUBLICS` en 4 colonnes avec filet au-dessus et lien de fin.
4. **Programme** [nuit] : `ArcSoiree` (§6.5) : pastille « Programme » · titre « Deux jours, / du jeudi soir à la finale » · onglets Jeudi / Vendredi · arc · détail du créneau · Bouton secondaire « Voir le programme complet ».
5. **Hackathon** [clair] : 2 colonnes. Gauche : surtitre « Le hackathon » · titre « Les fonds s’affrontent / par équipes interposées » · chapeau « Un cas d’investissement complet, mené par des équipes d’étudiants sélectionnés dans toute la France. Tout se joue en présentiel, jusqu’à la finale du vendredi soir devant le jury. » · 3 étapes numérotées (01 Chaque fonds coache une équipe / 02 Un jury de seniors et de partners / 03 La finale, le vendredi soir, textes Figma) · actions « Découvrir le hackathon » (sur-clair) + lien « Être prévenu des candidatures ». Droite : photo `hackathon.webp` (rayon 24) + 3 chiffres « ~100 étudiants en finale · 2 jours de production · 40 bénévoles ».
6. **Partenaires** [nuit-bas] : centré · surtitre « Partenaires » · titre « Ils soutiennent / la première édition » · chapeau « Institutions, banques et acteurs de la place lyonnaise s’engagent à nos côtés. » · mur de 11 `LogoPartenaire` plaque · 3 bénéfices courts (Deal flow / Recrutement / Communication) · actions « Devenir partenaire » + lien « Recevoir la plaquette ».
7. **Pré-inscription** [clair, contient le **panneau nuit**, seule ombre de la page] : surtitre « Pré-inscription » · titre « Soyez les premiers / informés » · texte « Les dates exactes et la billetterie arrivent très vite. Laissez votre nom, votre e-mail et votre poste : vous recevrez le lien en priorité, dès l’ouverture. » · bouton « Se pré-inscrire » + note « Gratuit, sans engagement. » Halo bleu en haut à droite du panneau.

Supprimés : `Chiffres` (« Ce que l'édition engage ») et `Calendrier`.

### 7.5 Programme `/programme`

1. Hero [nuit] : « Programme » · `h1` « Deux jours, / du jeudi soir à la finale » · « Tout se passe en fin de journée et en soirée, un format pensé pour les agendas des dirigeants et des investisseurs. Les matinées restent libres pour les formats des partenaires. » · « Se pré-inscrire ». Arc pointillé décoratif en haut à droite.
2. Jour 1 [clair] : pastille « Jour 1 · Jeudi », titre « La journée professionnelle », infos « 17h30 à 23h · environ 100 professionnels », liste des créneaux (ligne : heure / intitulé + détail / étiquette `format`, style doux).
3. Jour 2 [clair alternance] : idem vendredi, puis mention « Programme indicatif : les intitulés seront affinés avec les partenaires. Le lieu exact sera communiqué aux pré-inscrits. »
4. Le Off [clair] : « Les matinées / appartiennent aux partenaires » + liste des formats (Petit-déjeuner, Atelier, Déjeuner, Rencontre fonds et dirigeants, Rencontre avec des LPs) + lien « Proposer un format » → `/partenaires`.
5. `BandeauAction` [nuit-bas] : « Le programme vous parle ? / Pré-inscrivez-vous. » · « Vous recevrez le programme détaillé et le lien de la billetterie en priorité. » · Se pré-inscrire + Devenir partenaire.

### 7.6 Hackathon `/hackathon`

1. Hero [nuit] : « Le hackathon » · `h1` « Les fonds s’affrontent / par équipes interposées » · chapeau (Figma) · « Être prévenu des candidatures » (→ `/preinscription?poste=etudiant`) + « Coacher une équipe » (→ `/partenaires`) · photo pleine largeur · 4 faits : ~100 Étudiants en finale / 2 jours De production sur place / 40 Bénévoles mobilisés / 1 jury Seniors et partners.
2. Déroulé [clair] : « Quatre étapes, / une seule finale » · 4 cartes : Présélection à distance / Un fonds coache chaque équipe / Deux jours de production / La finale du vendredi soir.
3. Livrable [clair alternance] : « Un IC Package / complet » · 01 Thèse d’investissement · 02 Modèle financier à trois scénarios · 03 Note de recommandation.
4. Relais [clair] : « Relayé auprès des écoles / de tout le pays » · « Par l’Union des Clubs de Finance de France et la Confédération Nationale des Junior-Entreprises. » · étiquettes douces : EDHEC, Dauphine-PSL, Sorbonne Université, Centrale Lyon, INSA Lyon, Grenoble INP-Ensimag, Pôle Léonard de Vinci, Epitech, iaelyon.
5. `BandeauAction` : « Étudiant ou étudiante ? / Soyez prévenus en premier. » · « Pré-inscrivez-vous en choisissant « Étudiant·e » : on vous écrit dès l’ouverture des candidatures. »

### 7.7 Partenaires `/partenaires` (aucun prix affiché)

1. Hero [nuit] : « Devenir partenaire » · `h1` « Construisons ensemble / le rendez-vous du capital investissement » · « Trois lignes budgétaires mobilisables, un seul événement : sourcing, recrutement et communication. Les partenaires de la première édition obtiennent le statut de fondateur. » · « Recevoir la plaquette » (mailto avec objet) + « Écrire à l’équipe » · rangée « Déjà à nos côtés » (7 logos).
2. Bénéfices [clair] : « Ce que vous / y gagnez » · 3 cartes avec preuve chiffrée (5 rendez-vous / ~100 étudiants / 1 rapport), textes Figma.
3. Statut fondateur [nuit] : « Le statut / de partenaire fondateur » · 4 cartes pointillées : Vos conditions gelées · Priorité de reconduction · Le Cercle des Fondateurs · Vous écrivez le format.
4. Le Off [clair] : « Les matinées / vous appartiennent » · 4 points numérotés.
5. Niveaux [clair alternance] : « Quatre niveaux / d’engagement » · Platine (carte nuit, étiquette douce « Exclusif »), Or, Argent, Bronze avec leurs listes (Figma) · note Union des Clubs de Finance de France + « Recevoir la grille tarifaire ».
6. Visibilité et rapport [clair] : « Une couverture qui dure / plus que deux jours » · 3 colonnes médias (Presse économique, Écoles et universités, Comptes finance) en étiquettes grises (emplacements) ou logos médias quand on les a · encart « Ce que vous recevez après l’événement » (6 éléments).
7. Contact [nuit-bas] : « Parlons de / votre présence » · « Pierre-Louis Ravier, référent relations partenariats, vous répond sous 48 h et vous envoie la plaquette complète. » · bouton e-mail + « Télécharger la plaquette (PDF) » (`// TODO(LNCI): PDF dans public/docs/`, masqué tant qu'absent).

### 7.8 Pré-inscription `/preinscription`

1. [nuit] 2 colonnes : gauche `h1` « Soyez les premiers / informés », chapeau, 3 avantages (point accent + filet) : « Le lien de la billetterie avant tout le monde », « Le programme détaillé dès sa publication », « Aucun engagement, désinscription en un clic ». Droite : carte blanche rayon 24 avec `FormulairePreInscription`.
2. FAQ [clair] `id="faq"` : `Accordeon` avec `data/faq.ts` (6 questions du Figma) + lien e-mail.

### 7.9 Contact `/contact`

1. Hero [nuit] : `h1` « Une question ? / Écrivez-nous. » · « Une seule adresse pour tout : participation, partenariat, presse. On vous répond sous 48 h. » · E-mail, LinkedIn (masqué si vide), « Lyon, lieu annoncé aux pré-inscrits ».
2. Équipe [clair] : `data/equipe.ts`, 4 `CartoucheIntervenant` (photo carrée rayon 20, rôle, nom, structure). **Aucun téléphone, aucun e-mail perso.**
   - Hedi Laggoune · Référent général · Président, iaelyon Finance Club
   - Valentin Thiault · Co-organisateur · Président, DealMakers Club
   - Nino Coursodon · Événementiel et logistique · Porte-parole, Junior-Entreprises Lyonnaises
   - Pierre-Louis Ravier · Relations partenariats · Président, IAE Lyon Junior Conseil
3. Orientation [clair alternance] : 3 cartes (Une entreprise ou un fonds → partenaires / Étudiant ou étudiante → hackathon / Journaliste → mailto).

### 7.10 Merci `/merci` (noindex)

Nuit plein écran : surtitre « Pré-inscription confirmée » · `h1` « C’est noté, / merci ! » · texte Figma · « Suivre sur LinkedIn » (masqué si vide) + « Retour à l’accueil » · arc sans logos en bas.

### 7.11 404

Même gabarit : « 404 » en `text-d-chiffre` accent · « Cette page s’est perdue / dans une data room. » · « Retour à l’accueil ».

### 7.12 Mentions légales et Confidentialité

En-tête clair alternance + colonne de lecture 720 px, blocs séparés par des filets. Textes Figma, champs entre crochets à compléter par l'équipe. Hébergeur : OVHcloud, 2 rue Kellermann, 59100 Roubaix.

---

## 8. Formulaires (prêts pour le back-end)

Plus d'iframe Tally : les formulaires sont de **vrais formulaires React**, et tout l'envoi passe par **un seul fichier de service**. Le jour où le back-end existe, le dev ne touche qu'à ce fichier (ou juste à la variable d'environnement).

### 8.1 Les deux formulaires

| Formulaire       | Où                                                                       | Champs                                                                                                                                                                                                    |
| ---------------- | ------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preinscription` | `/preinscription` (+ lien `?poste=etudiant` qui présélectionne le poste) | Prénom*, Nom*, E-mail*, Poste* (Fonds d’investissement · Banque, conseil, avocat · Dirigeant·e d’entreprise · Étudiant·e · Institution, réseau · Presse · Autre), Entreprise ou école, Consentement RGPD* |
| `contact`        | `/contact` et `/partenaires` (« Écrire à l’équipe »)                     | Prénom*, Nom*, E-mail*, Organisation, Sujet* (Participation · Partenariat · Presse · Autre), Message*, Consentement RGPD*                                                                                 |

### 8.2 Organisation du code

```
src/formulaires/
  types.ts          les types des données envoyées (PreInscription, Contact) et de la réponse
  validation.ts     règles de validation, messages d'erreur en français, sans librairie
  envoi.ts          LE SEUL endroit qui parle au serveur : envoyerPreInscription(), envoyerContact()
src/components/ui/Champ.tsx, ListeDeroulante.tsx, CaseConsentement.tsx   (composants du kit)
src/sections/FormulairePreInscription.tsx, FormulaireContact.tsx
```

- `envoi.ts` fait un `fetch` POST en JSON vers `${VITE_API_URL}/preinscriptions` et `${VITE_API_URL}/contacts`.
- Si `VITE_API_URL` est vide (pas encore de back-end) : le formulaire reste affiché mais l'envoi montre « Le formulaire ouvre très vite. En attendant : contact@nuitsducapitalinvestissement.fr ». Rien n'est perdu en silence.
- États gérés partout : saisie, erreurs par champ (sous le champ, `aria-describedby`), envoi en cours (bouton désactivé), erreur serveur (message + garder la saisie), succès (redirection `/merci`).
- Anti-spam sans dépendance : champ piège caché `site_web` (si rempli, on n'envoie pas) + temps minimum de 3 s avant envoi.
- On envoie aussi `source` (page d'origine + paramètres `utm_*` s'il y en a) et `envoyeLe` (date ISO).

### 8.3 Contrat d'API (à donner au dev back-end)

```
POST /preinscriptions
{ "prenom": "…", "nom": "…", "email": "…", "poste": "fonds", "organisation": "…",
  "consentement": true, "source": "/preinscription?poste=etudiant", "envoyeLe": "2026-10-01T12:00:00Z" }
→ 201 { "ok": true }
→ 400 { "ok": false, "erreurs": { "email": "E-mail invalide" } }   (affichées sous les champs)
→ 409 { "ok": false, "message": "Vous êtes déjà pré-inscrit·e." }
→ 5xx  message générique + contact@

POST /contacts
{ "prenom", "nom", "email", "organisation", "sujet": "partenariat", "message", "consentement", "source", "envoyeLe" }
→ mêmes réponses
```

Les valeurs des listes (`poste`, `sujet`) sont des identifiants courts (`fonds`, `banque-conseil`, `dirigeant`, `etudiant`, `institution`, `presse`, `autre` / `participation`, `partenariat`, `presse`, `autre`) définies dans `types.ts`, et leurs libellés à côté.

`.env.example` (commité, sans valeurs) :

```
VITE_API_URL=
VITE_LINKEDIN_URL=
```

### 8.4 Lisibilité du code (pour le dev)

- Noms en français, cohérents avec le repo. Un composant par fichier, fichiers courts.
- Un commentaire en tête de chaque fichier qui dit à quoi il sert. Pas d'astuce illisible.
- Les contenus (textes, créneaux, partenaires, FAQ) restent dans `src/data/`, jamais en dur dans les composants.
- `README.md` à jour : lancer le projet, où sont les contenus, comment brancher le back-end (`VITE_API_URL` + contrat ci-dessus).

---

## 9. SEO, accessibilité, performance

- `index.html` : `<title>Les Nuits du Capital Investissement · Lyon, mi-janvier 2027</title>`, description « Deux jours pour réunir fonds, banques, conseils, dirigeants et étudiants à Lyon, mi-janvier 2027. Tables rondes, rendez-vous qualifiés et finale du hackathon. Pré-inscriptions ouvertes. » (mêmes valeurs en `og:`). Créer `public/partage.png` 1200×630 (template Figma « image de partage »).
- `lib/useTitre.ts` : met à jour `document.title` et la meta description à chaque page.
- `/merci` : `<meta name="robots" content="noindex">` posé par la page.
- `public/robots.txt` + `public/sitemap.xml` (pages publiées seulement).
- Images : `width`/`height` explicites, `loading="lazy"` hors hero, `.webp`.
- Accessibilité : un seul `h1` par page, focus visible conservé, `aria-hidden` sur les décors, `aria-label` sur l'arc, contrastes AA sur nuit.
- Lighthouse mobile ≥ 90 partout.

---

## 10. Déploiement

Voir `docs/DEPLOIEMENT.md` (build, envoi sur le serveur, Nginx, Let's Encrypt, tests après mise en ligne) et `deploy/nginx.conf`.

---

## 11. Checklist de recette

- [ ] Plus aucune trace de « trois soirées », « 12, 13 et 14 novembre », « 2026 » comme date d'événement (`grep -ri "novembre\|soirées" src index.html`).
- [ ] « Ce que l'édition engage » et le calendrier ont disparu.
- [ ] Hero fixe, 7 logos qui ne se touchent pas. Arc du programme animé au scroll, entièrement tracé en reduced-motion.
- [ ] « Se pré-inscrire » présent dans nav, hero, bas de chaque page, pied.
- [ ] Formulaires : validation, états (envoi, erreur, succès), anti-spam, redirection `/merci`, message de repli si `VITE_API_URL` est vide.
- [ ] Aucun prix, aucun lieu exact, aucun numéro de téléphone, aucun e-mail perso.
- [ ] Aucune icône, aucune flèche, aucun emoji, aucun tiret cadratin (`grep -rn "—" src`).
- [ ] Une seule ombre par page.
- [ ] Desktop 1440, tablette 834, mobile 390 conformes au Figma.
- [ ] 404 et rafraîchissement direct sur `/programme` OK sur le VPS (fallback Nginx).
- [ ] `npm run lint` et `npm run build` sans erreur.
- [ ] Commits en français, sans ligne `Co-Authored-By`.

---
