# HANDOFF v2 : site des Nuits du Capital Investissement

> Pour Lucas (le dev) et pour Claude Code. Ce document remplace la v1 (qui partait sur Next.js).
> On garde **ta stack et ton repo** (`fznlucas/lnci-site`) tels quels. On change le contenu, les pages et quelques composants pour coller au nouveau deck et aux remarques de Hedi.
> À copier dans le repo sous `docs/HANDOFF.md`.

---

## 0. Ce qui a changé depuis la V0 du repo

- **L'événement** : première édition, **mi-janvier 2027, Lyon, deux jours** (jeudi = journée professionnelle, vendredi = journée ouverte + finale du hackathon). Plus de « trois soirées », plus de « 12, 13 et 14 novembre 2026 ».
- **Conversion principale** : la **pré-inscription** (prénom, nom, e-mail, poste) via un formulaire du site, prêt à être branché sur un back-end (§8). La billetterie arrivera plus tard, envoyée aux pré-inscrits.
- **Conversion secondaire** : **devenir partenaire**.

### Remarques de Hedi (à respecter)

| Remarque | Traduction dans le site |
|---|---|
| DA validée, premium et lisible | On garde tes tokens, ta typo, tes composants. Rien de neuf côté couleurs. |
| Ajuster dates, nombre de soirées, contenus de l'ancien deck | 2 jours, « Mi-janvier 2027 » partout, jamais de jour précis. Contenus du nouveau deck (§7). |
| Ne pas transposer le deck, retirer « Ce que l'édition engage » et la partie calendrier | Suppression de `sections/Chiffres.tsx` et `sections/Calendrier.tsx`, de `CHIFFRES` et `CALENDRIER`. |
| S'inspirer de sites d'événements (type AdoptAI) | Hero plein écran avec arc animé, sections pleine largeur, CTA répétés, nav collante. |
| Un arc en hero avec les partenaires et leurs logos | Nouveau composant `ArcPartenaires` (§6.1). |
| CTA très clairs | « Se pré-inscrire » dans la nav, le hero, chaque fin de page et le pied. « Devenir partenaire » en second. |
| Pré-inscription : nom, prénom, mail, poste | Page `/preinscription` avec le formulaire du site (§8). |

### Arbitrages validés par l'équipe (ils priment sur `CONVENTIONS.md`)

1. **Le deck + Hedi font foi** sur le contenu et sur les demandes visuelles. La structure technique du repo reste la référence.
2. **Animation** : seul le hero bouge (arc + logos + halo). Pas d'apparition au scroll ailleurs.
3. **Contenus désormais autorisés** : le mot « hackathon » partout, les logos partenaires, les logos médias, les chiffres d'audience (« +350 participants », « environ 100 professionnels le jeudi », « environ 250 le vendredi »). Sans en abuser : un mur de logos sur l'accueil, pas trois.
4. **Multi-pages** : on garde ton registre `data/pages.ts`.

Ces écarts doivent être **écrits dans `CONVENTIONS.md`** (texte prêt au §4).

---

## 1. Règles de travail

1. Lire `CLAUDE.md` puis `CONVENTIONS.md` **après** les avoir mis à jour avec le §4.
2. **Aucune attribution** : pas de `Co-Authored-By`, aucune mention de Claude dans les commits, PR, code ou site. `.claude/settings.json` contient déjà `{"attribution": {"commit": "", "pr": ""}, "includeCoAuthoredBy": false}`. Ne pas y toucher.
3. Commits petits, en français : `feat(hero): arc animé des partenaires`, `chore(data): passage à deux jours`…
4. **Pas de nouvelle dépendance npm.** Formulaires et validation faits à la main (§8).
5. Aucun secret commité (`.env*` dans `.gitignore`). Les variables publiques sont au §8.
6. Rien d'inventé : quand une info manque (URL LinkedIn, URL de l'API, logos HD, photos), laisser la valeur vide + `// TODO(LNCI): …`. Le composant doit alors masquer proprement l'élément.
7. Textes du site : français, apostrophe typographique ’, espace insécable avant `: ; ! ?` et dans `« »`. **Jamais de tiret cadratin.**
8. `npm run lint` et `npm run build` doivent passer avant chaque push.

---

## 2. Sources

### Figma (vérité visuelle)

Fichier : `https://www.figma.com/design/XPvk3XJUVbd0v5BZ5Z8h3I` → page **🌐Site web**. **Le Figma fait foi** (textes, mise en page, tons).

- Cadre **Composants du site** : une section = un composant `Site / …` avec les variantes `Appareil=Desktop | Tablette | Mobile` (1440 / 834 / 390). Un composant = un fichier dans `src/sections/` (ou `components/` pour l'en-tête et le pied).
- Cadre **Pages du site** : les 10 pages montées avec ces composants, dans les 3 tailles.

| Composant Figma | Ton | Fichier |
|---|---|---|
| Site / En-tête | transparent, posé sur le hero | `components/EnTete.tsx` |
| Site / Hero (Version = A2 retenue, A, B · Dôme, C · Orbite) | Nuit | `sections/Hero.tsx` (on code A2) |
| Site / Concept | Clair + encart Électrique | `sections/Concept.tsx` |
| Site / Programme (aperçu) | Nuit | `sections/ProgrammeApercu.tsx` (version de secours, sans animation) |
| Site / Programme (arc) | Nuit | `sections/Programme.tsx` + `components/ArcSoiree.tsx` (le composant animé du repo, à garder et à rebrancher sur les contenus Figma) |
| Site / Animations (propositions) | — | non retenues, rien à coder. Seule animation du site : l'arc du programme (version du repo) |
| Site / Hackathon (aperçu) | Électrique | `sections/HackathonApercu.tsx` |
| Site / Partenaires (mur) | Clair | `sections/MurPartenaires.tsx` |
| Site / Bandeau d’action | Nuit | `sections/BandeauAction.tsx` (props : pastille, titre ligne 1, ligne 2, texte, boutons) |
| Site / Hero de page | Nuit | `sections/HeroPage.tsx` (mêmes props) |
| Site / Programme (détail) | Clair, temps forts en Électrique | `sections/ProgrammeDetail.tsx` |
| Site / Le Off | Nuit | `sections/LeOff.tsx` |
| Site / Hackathon (déroulé) | Nuit + livrable Électrique | `sections/HackathonDeroule.tsx` |
| Site / Relais écoles | Clair | `sections/RelaisEcoles.tsx` |
| Site / Bénéfices | Clair | `sections/Benefices.tsx` |
| Site / Statut fondateur | Électrique | `sections/StatutFondateur.tsx` |
| Site / Paliers | Nuit, Platine en Électrique | `sections/Paliers.tsx` |
| Site / Visibilité | Clair + encart Nuit | `sections/Visibilite.tsx` |
| Site / Formulaire | Nuit | `sections/FormulairePreInscription.tsx` (§8) |
| Site / FAQ | Clair | `sections/Faq.tsx` |
| Site / Équipe | Clair | `sections/Equipe.tsx` |
| Site / Écran (Type = Merci, 404) | Nuit | `pages/Merci.tsx`, `pages/Introuvable.tsx` |
| Site / Texte légal (Type = Mentions légales, Confidentialité) | Clair | `pages/MentionsLegales.tsx`, `pages/Confidentialite.tsx` |
| Site / Pied de page | Nuit bas | `components/PiedDePage.tsx` |

Composition des pages :

| Page | Sections |
|---|---|
| `/` | Hero (A2) · Concept · Programme (arc) · Hackathon (aperçu) · Partenaires (mur) · Bandeau |
| `/programme` | Programme (arc) en tête de page (halo du hero, sans lien « Voir le programme complet ») · Programme (détail) · Le Off · Bandeau |
| `/hackathon` | Hero de page · Hackathon (déroulé) · Relais écoles · Bandeau |
| `/partenaires` | Hero de page · Bénéfices · Statut fondateur · Le Off · Partenaires (mur) · Paliers · Visibilité · Bandeau |
| `/preinscription` | Formulaire · FAQ |
| `/contact` | Hero de page · Équipe · FAQ |
| `/merci`, 404 | Écran |
| `/mentions-legales`, `/confidentialite` | Hero de page · Texte légal |

Règles visuelles (identiques aux posts et bannières du kit) :
- **Trois tons** : Nuit (`#0A0F2B`), Électrique (dégradé `#2440D0 → #2B48E0` avec halo cyan), Clair (`#F4F6FC` avec halo lavande `#A9B8FF`). Les coupures entre sections sont nettes, c'est voulu.
- **Halos** : le composant `Décor / Halo` du kit, comme sur les posts : un cercle plein couleur `accent/halo` (Nuit `#2B48E0`, Électrique cyan, Clair lavande) avec un flou de 220 px sur 800 px. En CSS : `div` rond, `background: var(--halo)`, `filter: blur(110px)`, `pointer-events:none`. Il peut déborder à gauche ou à droite, jamais en haut ou en bas d'une section (sauf en haut de page).
- **Arcs** : ellipses en pointillé blanc ou `accent-detail` (`stroke-dasharray: 2 10`), en fond.
- **Header** : sans fond, en `position: absolute` sur le hero ; il prend `bg-nuit/80 backdrop-blur` seulement après défilement.
- **Cartes** : rayon 24, pleines, variable `surface/carte` selon le ton : Clair → blanc avec bordure `bordure` ; Nuit → `#141C4A` ; Électrique → `#0A0F2B`. Plus de cartes transparentes « verre ».
- **Arcs pointillés** : jamais par-dessus du texte, des chiffres, des boutons ou des cartes. Ils passent dans les zones vides (souvent en bas de section).
- **Arc du programme (animation)** : reprendre `ArcSoiree` tel quel (section épinglée au scroll sur desktop, arc qui se trace, heures qui s'allument de 4 à 7 px et de 11 à 14 px, détail du créneau en fondu, onglets Jeudi / Vendredi ; arc vertical sans épinglage sous 1024 px). Seuls changent les contenus (créneaux du Figma, deux journées) et les couleurs : points non atteints `trait/filet`, atteints `accent/surtitre`. Respecter `prefers-reduced-motion`.
- **Alignement** : les cartes d'une même ligne ont toutes la même hauteur (`grid` + `items-stretch`). Padding des cartes : 32 px (24 en mobile). Éléments de liste pleine largeur : 24 × 28 (20 en mobile). Grands panneaux (Manifeste, Livrable, Rapport, Formulaire) : 48 (28 en mobile). Écart des grilles : 24 (16 en mobile). Dans une même ligne de cartes, les éléments internes sont alignés aussi (titres sur 1 ou 2 lignes → les descriptions démarrent à la même hauteur : `grid-rows-subgrid` ou `min-h` sur le titre). Numéros (01, 02…) dans une colonne de largeur fixe. Les mises en page à deux colonnes (hero, Le Off, Hackathon) sont alignées en haut ET en bas : la colonne la plus courte s'étire (`justify-between`) ou ses cartes grandissent. Sections : padding vertical 128 / 104 / 80 (desktop / tablette / mobile), identique en haut et en bas.
- **Pastilles** : composant `Pastille` du kit, style Doux, arrondies (999) avec un point. Couleurs = variables `etiquette/*` selon le ton (comme l'étiquette des posts) : Clair → fond bleu 10 %, texte et point bleus ; Nuit → fond blanc 10 %, texte blanc, point cyan `#38B6F5` ; Électrique → fond blanc 18 %, texte et point blancs.
- **Bouton primaire** : variables `action/fond` et `action/texte` : Clair → bleu `#2B48E0` texte blanc ; Nuit → bleu lumineux `#3555F2` texte blanc ; Électrique → **blanc, texte bleu**. Secondaire : contour pointillé, texte `accent/surtitre` (blanc sur Électrique).
- **Halo des heros** : tous les heros (accueil, heros de page, Merci, 404) ont le même halo que l'accueil, en haut à droite (desktop : 932 px, x 758, y −326).
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
    ArcPartenaires.tsx            ✚ arc animé du hero
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
      CarteSoiree.tsx             ✎ lit contenu.ts, deux jours
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

## 4. Mise à jour de `CONVENTIONS.md` et `CLAUDE.md`

Ajouter en tête de `CONVENTIONS.md`, juste après le titre :

```md
## Arbitrages de l'équipe, édition 2027

Décidés avec Hedi sur la base du nouveau deck. Ils priment sur les règles
plus bas quand ils les contredisent.

- L'événement dure deux jours, mi-janvier 2027, à Lyon. Plus de « soirées »
  au pluriel dans les titres, plus de date au jour près tant qu'elle n'est
  pas confirmée.
- Le mot « hackathon » est autorisé partout. « Compétition d'analyse
  d'investissement » reste possible en description.
- Logos partenaires autorisés (mur de logos sur l'accueil et la page
  partenaires, arc du hero). Uniquement des partenaires confirmés.
- Logos ou noms de médias autorisés sur la page partenaires.
- Chiffres d'audience autorisés : « +350 participants sur les deux jours »,
  « environ 100 professionnels le jeudi », « environ 250 participants le
  vendredi », « environ 100 étudiants en finale ».
- Toujours interdits : tarifs partenaires, lieu exact (on écrit « Lyon »),
  icônes, flèches, emoji, italique, tiret cadratin, plus d'une ombre par page.
- Motion : le hero est animé (arc des partenaires, halo). Aucune autre
  animation automatique. `prefers-reduced-motion` fige l'arc.
- Les trois tons du kit (Nuit, Électrique, Clair) s'utilisent comme fonds de
  section, comme sur les posts. Le ton Électrique est autorisé en fond de
  section (pas en fond de page entière).
- Aucune image de remplissage : pas de photo tant qu'on n'a pas la vraie.
- Le panneau d'action de l'accueil reprend l'ombre unique de la page.
```

Dans la section **Contenu, règles fermes**, supprimer les puces « Aucun chiffre d'audience », « Aucun logo de media » et « Vocabulaire dédoublé ». Dans **Composants**, ajouter `LogoPartenaire` et `ArcPartenaires` à la liste. Dans **Gabarit**, corriger « 1160 px » en « 1440 px » (valeur réelle de `--contenu-max`).

Dans `CLAUDE.md`, point 7 : remplacer par « Aucune mention du lieu exact de l'événement. “Lyon” suffit. »

---

## 5. Tokens : correspondance Figma ↔ repo

Aucune nouvelle couleur. Tout existe déjà dans `tokens.css`.

| Figma (variable) | Mode Clair | Mode Nuit | Classe Tailwind |
|---|---|---|---|
| `surface/page` | `--page` | `--nuit` | `bg-page` / `bg-nuit` |
| `surface/alternance` | `--page-alt` | `--nuit-haut` | `bg-page-alt` |
| `surface/carte` | blanc | `--nuit-aplat` | `bg-white` / `bg-nuit-aplat` |
| `texte/titre` | `--encre` | blanc | `text-encre` / `text-sur-nuit` |
| `texte/attenue` (ligne 1 bicolore) | `--titre-ligne1` | `--titre-ligne1` à 70 % | via `TitreBicolore` |
| `texte/courant` | `--courant` | `--text-sur-nuit-body` | `text-texte-courant` / `text-sur-nuit-body` |
| `texte/legende` | `--legende` | `--text-sur-nuit-legende` | `text-legende` / `text-sur-nuit-legende` |
| `accent/surtitre` | `--accent` | `--accent-clair` | `text-accent` / `text-accent-clair` |
| `action/fond` (bouton primaire) | `--accent` | `--accent-survol` | voir note |
| `trait/filet` | filet pointillé | filet sur nuit | `filet-bloc` / `filet-sur-nuit` |
| `nuit/bas` (pied, bandeaux) | | | `bg-nuit-bas` |

Note bouton primaire : sur fond nuit, le primaire est en `bg-accent-survol` (plus lumineux), survol en `bg-accent-detail`. Sur fond clair, `bg-accent`, survol `bg-accent-survol`. Ajouter ce cas dans `Bouton.tsx` via la prop `sombre` existante.

Typographie : **le Figma utilise les styles du kit**. `typographie.css` doit être réaligné sur ces valeurs (mêmes noms de classes qu'aujourd'hui, nouvelles valeurs) :

| Style Figma (kit) | Usage | Classe repo | Valeur à mettre |
|---|---|---|---|
| `web/display-l` | H1 de l'accueil (desktop) | `text-d-hero` | 88 px / 0,96, 800, -3 % |
| `web/display-m` | H1 des autres pages (desktop), H1 accueil tablette | `text-d-hero-page` (nouveau) | 64 px / 1, 800, -2,5 % |
| `web/display-s` | H1 en mobile | (responsive des deux précédents) | 42 px / 1,04, 800, -2 % |
| `titre/h1` | titres des pages légales | `text-d-titre-page` | 56 px / 1,1, 800, -2,5 % |
| `titre/h2` | titres de section (desktop, tablette) | `text-d-titre` | 40 px / 1,15, 800, -2 % |
| `titre/h3` | titres de section mobile, manifeste, niveaux | `text-d-sous-titre` | 28 px / 1,2, 700, -1,5 % |
| `titre/h4` | titres de carte, questions FAQ | `text-d-bloc` | 20 px / 1,3, 700, -1 % |
| `donnee` | chiffres et faits | `text-d-chiffre` | 44 px / 1, 800, -2 % |
| `surtitre` | composant Surtitre | `text-w-surtitre uppercase` | 12 px, 700, +18 % |
| `corps/large` | chapeaux desktop | `text-w-chapeau` (nouveau) | 19 px / 1,65 |
| `corps/base` | texte courant | `text-w-courant` | 17 px / 1,65 |
| `corps/dense` | texte des cartes | `text-w-dense` (nouveau) | 15 px / 1,6 |
| `base bold` | avantages, valeurs mobiles | `text-w-courant font-bold` | 17 px, 700 |
| `legende` | légendes, notes | `text-w-legende` | 13 px / 1,5, 500 |
| `bouton` / `bouton lien` | dans `Bouton.tsx` | | 15 px, 600 |

Rayons inchangés : bouton 14, carte 20, panneau 24, champ 14, pastille 999.
Marges latérales : 24 (mobile) / 32 (≥ 40rem) / 40 (≥ 64rem). Sections : `py-18 lg:py-28` (72 / 112 px).

---

## 6. Composants

### 6.1 `ArcPartenaires` (nouveau, pièce maîtresse du hero)

Figma : `Site / Hero`, version **A2 (retenue)**. Titre « Le rendez-vous annuel / du capital investissement » (`titre/h1`, 4 lignes en desktop) aligné en haut et en bas avec la colonne de droite (chapeau, infos à points, appui Lyon Place Financière, boutons). En dessous, l'arc avec les 7 logos ; en tablette et mobile, les 7 logos passent sur deux rangées centrées (4 + 3) sous l'arc.

Composition (SVG + logos en absolu, `aria-hidden` sur le décor) :
1. **Halo** = `Décor / Halo` : cercle flou (accent, flou 220) centré au sommet de l'arc.
2. **Arcs** = `Décor / Arc`, forme Horizon : deux ellipses en pointillé (trait 3 px, `stroke-dasharray="2 16"` pour l'arc principal, 2 px et `2 22` pour l'arc secondaire), mises à l'échelle de la largeur (×1,33 en desktop, ×0,9 tablette, ×0,62 mobile).
3. **Logos** = `LogoPartenaire` sur plaque blanche, posés **sur l'arc principal**. Desktop 9 logos (55 px de haut), tablette 7 (46), mobile 5 (33).

Animation :
- Les logos **glissent lentement le long de l'orbite**, de gauche à droite, un tour complet en 60 s, en boucle. Position calculée avec `requestAnimationFrame` sur l'équation du cercle (angle de -90° ± 30° en desktop, ± 25° tablette, ± 18° mobile). Un logo qui sort à droite réapparaît à gauche avec un fondu d'opacité aux extrémités.
- Pause au survol de l'arc et quand l'onglet est caché (`document.visibilityState`).
- Halo : respiration d'opacité 0,45 → 0,6, 6 s, `alternate`.
- Au chargement : les deux arcs se dessinent (`stroke-dashoffset`, 1,2 s, `ease-out`).
- `prefers-reduced-motion: reduce` : rien ne bouge, les logos restent aux positions de la maquette.

Squelette :

```tsx
// components/ArcPartenaires.tsx
import { useEffect, useRef, useState } from "react";
import { LOGOS_PARTENAIRES } from "@/data/partenaires";
import { LogoPartenaire } from "@/components/ui/LogoPartenaire";

const TOUR_MS = 60_000;

export function ArcPartenaires() {
  const boite = useRef<HTMLDivElement>(null);
  const [l, setL] = useState(1440);
  const [t, setT] = useState(0); // 0..1, progression du tour
  const [pause, setPause] = useState(false);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setL(e.contentRect.width));
    if (boite.current) ro.observe(boite.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let id = 0, debut = performance.now() - t * TOUR_MS;
    const boucle = (now: number) => {
      if (!pause && document.visibilityState === "visible") setT(((now - debut) % TOUR_MS) / TOUR_MS);
      else debut = now - t * TOUR_MS;
      id = requestAnimationFrame(boucle);
    };
    id = requestAnimationFrame(boucle);
    return () => cancelAnimationFrame(id);
  }, [pause]); // eslint-disable-line react-hooks/exhaustive-deps

  const mobile = l < 640, tablette = l < 1024 && !mobile;
  const n = mobile ? 5 : tablette ? 7 : 9;
  const k = mobile ? 0.62 : tablette ? 0.9 : 1.333;    // échelle de Décor / Arc (1080 de large)
  const a = 810 * k, b = 540 * k, haut = 77 * k;       // demi-axes et sommet de l'arc principal
  const demi = mobile ? 17 : tablette ? 28 : 36;       // demi-ouverture en degrés
  const logos = LOGOS_PARTENAIRES.slice(0, n);
  // … halo + les deux ellipses de Décor / Arc, puis :
  // pour chaque logo i : d = (-demi + 2*demi*((i/(n-1) + t) % 1)) en radians
  // x = l/2 + a*sin(d), y = haut + b - b*cos(d) ; opacité réduite près des bords
  return <div ref={boite} onMouseEnter={() => setPause(true)} onMouseLeave={() => setPause(false)} className="relative h-[240px] overflow-hidden sm:h-[380px] lg:h-[440px]" aria-label="Partenaires de l'édition">{/* … */}</div>;
}
```

### 6.2 `LogoPartenaire` (nouveau)

Reprend `Post / Emplacement logo` (taille S = 220×110, plaque blanche ou transparent). Props : `nom`, `fichier`, `fond: "plaque" | "transparent"`, `hauteur?`. Plaque = `bg-white rounded-bouton`, logo centré à 76 % de la largeur, hauteur 88 sur le mur de logos, 55 dans l'arc, image en `object-contain`, `alt={nom}`, `loading="lazy"`, `decoding="async"`.

`data/partenaires.ts` → `LOGOS_PARTENAIRES` (ordre d'affichage) :

| Nom | Fichier `public/logos/partenaires/` |
|---|---|
| ONLYLYON Invest | `onlylyon.png` |
| Métropole de Lyon | `metropole.png` |
| Ville de Lyon | `villedelyon.png` |
| Région Auvergne-Rhône-Alpes | `region-aura.png` |
| Arkéa Capital | `arkea.png` |
| BNP Paribas | `bnp.png` |
| Caisse d'Épargne | `caisse-epargne.png` |
| iaelyon School of Management | `iaelyon.png` |
| Université Jean Moulin Lyon 3 | `jean-moulin.png` |
| Lyon Place Financière | `lyon-place-financiere.png` |
| DealMakers Club | `dealmakers.png` |

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

### 6.5 `CarteSoiree` et `ArcSoiree`
- L'accueil affiche le programme avec **deux `CarteSoiree`** (= `Carte` du kit, ton Nuit) : pastille « Jour 1 · Jeudi » / « Jour 2 · Vendredi », titre, 3 lignes horaires (« 17h30 · atelier débat tournant »), lien « Voir le détail ». `CarteSoiree` lit `SOIREES` de `contenu.ts` (supprimer l'import de `data/soirees.ts`).
- `ArcSoiree` n'est plus utilisé sur l'accueil. Le garder dans le repo, adapté à deux jours (`SOIREES` à 2 entrées, `useState(0)`), pour un usage futur sur `/programme`.

### 6.6 `Pastille`
Styles du kit → tons du repo : **Doux** = `invitation` (« Jour 1 · Jeudi », « Sur invitation »), **Accent** = `complet` (« Temps fort », « Exclusif »), **Contour** = `ouvert` (« Ouvert », écoles, options du poste, médias), **Nuit** = `date`.

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
  { id: "programme", libelle: "Programme", chemin: "/programme", groupe: "evenement", publiee: true },
  { id: "hackathon", libelle: "Hackathon", chemin: "/hackathon", groupe: "evenement", publiee: true },
  { id: "intervenants", libelle: "Intervenants", chemin: "/intervenants", groupe: "evenement", publiee: false },

  { id: "partenaires", libelle: "Devenir partenaire", chemin: "/partenaires", groupe: "partenaires", publiee: true },
  { id: "le-off", libelle: "Le Off", chemin: "/le-off", groupe: "partenaires", publiee: false },

  { id: "preinscription", libelle: "Se pré-inscrire", chemin: "/preinscription", groupe: "participer", publiee: true },
  { id: "contact", libelle: "Contact", chemin: "/contact", groupe: "participer", publiee: true },
  { id: "faq", libelle: "Questions fréquentes", chemin: "/preinscription#faq", groupe: "participer", publiee: false },

  { id: "mentions-legales", libelle: "Mentions légales", chemin: "/mentions-legales", groupe: "legal", publiee: true },
  { id: "confidentialite", libelle: "Confidentialité", chemin: "/confidentialite", groupe: "legal", publiee: true },
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
      { heure: "17h30", intitule: "Atelier débat tournant", detail: "Fonds, conseils et dirigeants en petits groupes, on tourne toutes les vingt minutes.", format: "Sur invitation", statut: "arrete" },
      { heure: "19h00", intitule: "Keynote d’ouverture", detail: "Le mot des partenaires et le lancement officiel de l’édition.", format: "Ouvert", statut: "arrete" },
      { heure: "19h30", intitule: "Table ronde : marque employeur et sourcing de talents", detail: "Comment les fonds attirent et gardent les meilleurs profils.", format: "Ouvert", statut: "ouvert" },
      { heure: "20h30", intitule: "Table ronde : comment se construit un deal", detail: "De la lettre d’intention au closing, raconté par ceux qui le font.", format: "Ouvert", statut: "ouvert" },
      { heure: "21h30", intitule: "Cocktail dînatoire et networking", detail: "Le moment où les rendez-vous se prennent.", format: "Temps fort", statut: "arrete" },
    ],
  },
  {
    jour: "Vendredi · journée ouverte",
    titre: "La journée ouverte et la finale",
    horaires: "16h à 1h · environ 250 participants",
    produit: true,
    creneaux: [
      { heure: "16h00", intitule: "Speed-meetings dirigeants et fonds", detail: "Des rendez-vous de quinze minutes, préparés à l’avance.", format: "Sur invitation", statut: "arrete" },
      { heure: "17h45", intitule: "LBO : structuration, levier, création de valeur", detail: "Ce qui fait vraiment la performance d’une opération.", format: "Ouvert", statut: "ouvert" },
      { heure: "19h00", intitule: "Build-up et croissance externe", detail: "Acheter pour grandir : méthode, pièges et retours d’expérience.", format: "Ouvert", statut: "ouvert" },
      { heure: "20h15", intitule: "Finale du hackathon et remise des prix", detail: "Les équipes finalistes face au jury, devant toute la salle.", format: "Temps fort", statut: "arrete" },
      { heure: "21h15", intitule: "Soirée de clôture", detail: "On termine ensemble, tard.", format: "Ouvert", statut: "arrete" },
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
  { intitule: "Fonds d’investissement", texte: "Du sourcing en région, un vivier de talents et un hackathon à vos couleurs.", page: "partenaires", lien: "Devenir partenaire" },
  { intitule: "Dirigeants", texte: "Rencontrer les fonds qui investissent sur le territoire, sans intermédiaire.", page: "preinscription", lien: "Se pré-inscrire" },
  { intitule: "Banques et conseils", texte: "Retrouver en une soirée les acteurs avec qui vous faites les opérations.", page: "preinscription", lien: "Se pré-inscrire" },
  { intitule: "Étudiants", texte: "Le hackathon, la finale et un accès direct aux équipes qui recrutent.", page: "hackathon", lien: "Le hackathon" },
] as const;
```

### 7.4 Accueil `/`

Ordre des sections (Figma ligne « Accueil ») :

1. **Hero** [nuit] : surtitre `EVENEMENT.surTitre` · `h1` bicolore « Les Nuits du / Capital Investissement » · chapeau à droite (desktop) · actions **Se pré-inscrire** (primaire) + **Devenir partenaire** (secondaire) · `ArcPartenaires` pleine largeur · bandeau `FAITS` (4 colonnes desktop, 2 tablette et mobile, filet pointillé au-dessus de chaque fait, valeur en `donnee`). Au-dessus du H1 : Pastille Contour « Lyon · Mi-janvier 2027 · Première édition ».
2. **Le concept** [clair] : surtitre « Le concept » · titre « Deux jours, / un écosystème au complet » · chapeau « Fonds d’investissement, banques, conseils, dirigeants et étudiants sélectionnés se retrouvent autour du financement des entreprises, à chaque étape de leur vie : croissance, transmission, ouverture de capital. » · 3 cartes :
   - 01 **Un temps fort à créer** : « Fonds, banquiers d’affaires, conseils et entreprises se croisent toute l’année en rendez-vous bilatéraux. Il manquait le moment où tout l’écosystème se retrouve. »
   - 02 **La rencontre avant tout** : « Pas une succession de conférences : la place est donnée à ce qui compte dans ce métier, la rencontre, le sourcing et le deal-making. »
   - 03 **Toutes les générations** : « Étudiants, jeunes talents, investisseurs, dirigeants : du hackathon aux rendez-vous qualifiés, tous les métiers dialoguent. »
   - Manifeste (filet au-dessus, `text-d-sous-titre`, deux premières lignes atténuées) : « Ce n’est pas un cycle de conférences. / Ce n’est pas un forum écoles-entreprises. / C’est le moment de l’année où l’écosystème se retrouve, et où les opérations naissent. »
3. **Publics** [clair alternance] : surtitre « Pour qui » · titre « Deux jours pensés / pour chaque métier » · `PUBLICS` en 4 colonnes avec filet au-dessus et lien de fin.
4. **Programme** [nuit] : à gauche surtitre « Programme » · titre « Deux jours, / du jeudi soir à la finale » · chapeau · Bouton secondaire « Le programme complet » ; à droite deux `CarteSoiree` ton Nuit (§6.5).
5. **Hackathon** [clair] : 2 colonnes. Gauche : surtitre « Le hackathon » · titre « Les fonds s’affrontent / par équipes interposées » · chapeau « Un cas d’investissement complet, mené par des équipes d’étudiants sélectionnés dans toute la France. Tout se joue en présentiel, jusqu’à la finale du vendredi soir devant le jury. » · 3 étapes numérotées (01 Chaque fonds coache une équipe / 02 Un jury de seniors et de partners / 03 La finale, le vendredi soir, textes Figma) · actions « Découvrir le hackathon » (sur-clair) + lien « Être prévenu des candidatures ». Droite : photo `hackathon.webp` (rayon 24) + 3 chiffres « ~100 étudiants en finale · 2 jours de production · 40 bénévoles ».
6. **Partenaires** [nuit-bas] : centré · surtitre « Partenaires » · titre « Ils soutiennent / la première édition » · chapeau « Institutions, banques et acteurs de la place lyonnaise s’engagent à nos côtés. » · mur de 11 `LogoPartenaire` plaque · 3 bénéfices courts (Deal flow / Recrutement / Communication) · actions « Devenir partenaire » + lien « Recevoir la plaquette ».
7. **Pré-inscription** [clair, contient le **panneau nuit**, seule ombre de la page] : surtitre « Pré-inscription » · titre « Soyez les premiers / informés » · texte « Les dates exactes et la billetterie arrivent très vite. Laissez votre nom, votre e-mail et votre poste : vous recevrez le lien en priorité, dès l’ouverture. » · bouton « Se pré-inscrire » + note « Gratuit, sans engagement. » Halo bleu en haut à droite du panneau.

Supprimés : `Chiffres` (« Ce que l'édition engage ») et `Calendrier`.

### 7.5 Programme `/programme`
1. Hero [nuit] : « Programme » · `h1` « Deux jours, / du jeudi soir à la finale » · « Tout se passe en fin de journée et en soirée, un format pensé pour les agendas des dirigeants et des investisseurs. Les matinées restent libres pour les formats des partenaires. » · « Se pré-inscrire ». Arc pointillé décoratif en haut à droite.
2. Jour 1 [clair] : pastille « Jour 1 · Jeudi », titre « La journée professionnelle », infos « 17h30 à 23h · environ 100 professionnels », liste des créneaux (ligne : heure / intitulé + détail / pastille `format`).
3. Jour 2 [clair alternance] : idem vendredi, puis mention « Programme indicatif : les intitulés seront affinés avec les partenaires. Le lieu exact sera communiqué aux pré-inscrits. »
4. Le Off [clair] : « Les matinées / appartiennent aux partenaires » + liste des formats (Petit-déjeuner, Atelier, Déjeuner, Rencontre fonds et dirigeants, Rencontre avec des LPs) + lien « Proposer un format » → `/partenaires`.
5. `BandeauAction` [nuit-bas] : « Le programme vous parle ? / Pré-inscrivez-vous. » · « Vous recevrez le programme détaillé et le lien de la billetterie en priorité. » · Se pré-inscrire + Devenir partenaire.

### 7.6 Hackathon `/hackathon`
1. Hero [nuit] : « Le hackathon » · `h1` « Les fonds s’affrontent / par équipes interposées » · chapeau (Figma) · « Être prévenu des candidatures » (→ `/preinscription?poste=etudiant`) + « Coacher une équipe » (→ `/partenaires`) · photo pleine largeur · 4 faits : ~100 Étudiants en finale / 2 jours De production sur place / 40 Bénévoles mobilisés / 1 jury Seniors et partners.
2. Déroulé [clair] : « Quatre étapes, / une seule finale » · 4 cartes : Présélection à distance / Un fonds coache chaque équipe / Deux jours de production / La finale du vendredi soir.
3. Livrable [clair alternance] : « Un IC Package / complet » · 01 Thèse d’investissement · 02 Modèle financier à trois scénarios · 03 Note de recommandation.
4. Relais [clair] : « Relayé auprès des écoles / de tout le pays » · « Par l’Union des Clubs de Finance de France et la Confédération Nationale des Junior-Entreprises. » · pastilles : EDHEC, Dauphine-PSL, Sorbonne Université, Centrale Lyon, INSA Lyon, Grenoble INP-Ensimag, Pôle Léonard de Vinci, Epitech, iaelyon.
5. `BandeauAction` : « Étudiant ou étudiante ? / Soyez prévenus en premier. » · « Pré-inscrivez-vous en choisissant « Étudiant·e » : on vous écrit dès l’ouverture des candidatures. »

### 7.7 Partenaires `/partenaires`  (aucun prix affiché)
1. Hero [nuit] : « Devenir partenaire » · `h1` « Construisons ensemble / le rendez-vous du capital investissement » · « Trois lignes budgétaires mobilisables, un seul événement : sourcing, recrutement et communication. Les partenaires de la première édition obtiennent le statut de fondateur. » · « Recevoir la plaquette » (mailto avec objet) + « Écrire à l’équipe » · rangée « Déjà à nos côtés » (7 logos).
2. Bénéfices [clair] : « Ce que vous / y gagnez » · 3 cartes avec preuve chiffrée (5 rendez-vous / ~100 étudiants / 1 rapport), textes Figma.
3. Statut fondateur [nuit] : « Le statut / de partenaire fondateur » · 4 cartes pointillées : Vos conditions gelées · Priorité de reconduction · Le Cercle des Fondateurs · Vous écrivez le format.
4. Le Off [clair] : « Les matinées / vous appartiennent » · 4 points numérotés.
5. Niveaux [clair alternance] : « Quatre niveaux / d’engagement » · Platine (carte nuit, pastille « Exclusif »), Or, Argent, Bronze avec leurs listes (Figma) · note Union des Clubs de Finance de France + « Recevoir la grille tarifaire ».
6. Visibilité et rapport [clair] : « Une couverture qui dure / plus que deux jours » · 3 colonnes médias (Presse économique, Écoles et universités, Comptes finance) en pastilles ou logos médias quand on les a · encart « Ce que vous recevez après l’événement » (6 éléments).
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
| Formulaire | Où | Champs |
|---|---|---|
| `preinscription` | `/preinscription` (+ lien `?poste=etudiant` qui présélectionne le poste) | Prénom*, Nom*, E-mail*, Poste* (Fonds d’investissement · Banque, conseil, avocat · Dirigeant·e d’entreprise · Étudiant·e · Institution, réseau · Presse · Autre), Entreprise ou école, Consentement RGPD* |
| `contact` | `/contact` et `/partenaires` (« Écrire à l’équipe ») | Prénom*, Nom*, E-mail*, Organisation, Sujet* (Participation · Partenariat · Presse · Autre), Message*, Consentement RGPD* |

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

## 10. Déploiement (VPS OVH, géré par Lucas)

1. `npm ci && npm run build` → `dist/`.
2. Copie : `rsync -az --delete dist/ user@vps:/var/www/lnci/`.
3. Nginx :
```nginx
server {
  server_name nuitsducapitalinvestissement.fr www.nuitsducapitalinvestissement.fr;
  root /var/www/lnci;
  index index.html;
  location / { try_files $uri $uri/ /index.html; }   # fallback SPA obligatoire
  location /assets/ { expires 1y; add_header Cache-Control "public, immutable"; }
  location = /index.html { add_header Cache-Control "no-cache"; }
  gzip on; gzip_types text/css application/javascript image/svg+xml;
}
```
4. HTTPS : `certbot --nginx -d nuitsducapitalinvestissement.fr -d www.nuitsducapitalinvestissement.fr` (une fois le DNS d'Aurélien et Zakaria pointé).
5. Option : GitHub Action sur `main` (build + rsync via clé SSH en secret `VPS_SSH_KEY`). Les `VITE_*` sont injectés au build depuis les secrets du repo.
6. `vite.config.ts` : `base: "/"` (déjà le cas).

---

## 11. Checklist de recette

- [ ] Plus aucune trace de « trois soirées », « 12, 13 et 14 novembre », « 2026 » comme date d'événement (`grep -ri "novembre\|soirées" src index.html`).
- [ ] « Ce que l'édition engage » et le calendrier ont disparu.
- [ ] Hero : arc animé, logos qui glissent, pause au survol, figé en reduced-motion.
- [ ] « Se pré-inscrire » présent dans nav, hero, bas de chaque page, pied.
- [ ] Formulaires : validation, états (envoi, erreur, succès), anti-spam, redirection `/merci`, message de repli si `VITE_API_URL` est vide.
- [ ] Aucun prix, aucun lieu exact, aucun numéro de téléphone, aucun e-mail perso.
- [ ] Aucune icône, aucune flèche, aucun emoji, aucun tiret cadratin (`grep -rn "—" src`).
- [ ] Une seule ombre par page.
- [ ] Desktop 1440, tablette 834, mobile 390 conformes au Figma.
- [ ] 404 et rafraîchissement direct sur `/programme` OK sur le VPS (fallback Nginx).
- [ ] `npm run lint` et `npm run build` sans erreur.
- [ ] Commits sans attribution.

---

## 12. Prompt à donner à Claude Code

```
Lis docs/HANDOFF.md en entier, puis CLAUDE.md et CONVENTIONS.md.
Commence par appliquer le §4 (mise à jour de CONVENTIONS.md et CLAUDE.md), commit.
Puis, dans cet ordre, un commit par étape :
1. data/ : evenement.ts, pages.ts, contenu.ts, partenaires.ts, equipe.ts, faq.ts (§7). Supprime soirees.ts, CHIFFRES, CALENDRIER.
2. typographie.css réaligné sur les styles du kit (§5), puis composants : LogoPartenaire, ArcPartenaires (§6.1), EnTete, PiedDePage, CarteSoiree et ArcSoiree à deux jours, Accordeon.
3. Formulaires (§8) : src/formulaires/ (types, validation, envoi), champs du kit, FormulairePreInscription, FormulaireContact.
4. Accueil (§7.4) en supprimant Chiffres et Calendrier.
5. Pages Programme, Hackathon, Partenaires, Pré-inscription, Contact, Merci, 404, Mentions légales, Confidentialité + routes dans App.tsx.
6. index.html, useTitre, robots, sitemap, .env.example, README (§8.4).
Code lisible pour un dev qui reprend : commentaires en tête de fichier, noms en français, contenus dans src/data/.
Respecte la stack existante, n'ajoute aucune dépendance, garde les noms en français.
Compare chaque page au Figma (page 🌐Site web, frame « Pages du site ») en desktop, tablette et mobile.
Aucune ligne Co-Authored-By, aucune mention de Claude nulle part.
Termine par la checklist du §11 et liste-moi ce qui reste en TODO(LNCI).
```
