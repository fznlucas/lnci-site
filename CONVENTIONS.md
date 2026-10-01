# Conventions du site, Les Nuits du Capital Investissement

## Arbitrages de l'équipe, édition 2027

Décidés avec Hedi sur la base du nouveau deck. Ils priment sur les règles
plus bas quand ils les contredisent.

- Le Figma (fichier XPvk3XJUVbd0v5BZ5Z8h3I, page Site web) fait foi sur le
  visuel : quand une règle plus bas le contredit, c'est le Figma qui
  l'emporte et la règle est corrigée ici.

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
- Motion : une seule animation, l'arc du programme (`ArcSoiree`). Le hero
  est fixe. `prefers-reduced-motion` fige l'arc du programme.
- Les trois tons du kit (Nuit, Électrique, Clair) s'utilisent comme fonds de
  section, comme sur les posts. Le ton Électrique est autorisé en fond de
  section (pas en fond de page entière).
- Aucune image de remplissage : pas de photo tant qu'on n'a pas la vraie.
- Fin de page : le Bandeau d'action du Figma, sans ombre. L'ombre unique
  d'une page est celle de la carte du formulaire de pré-inscription.

Ce fichier fait autorite sur toute production de code dans ce depot.
Il transcrit la charte de marque, edition 2026. Chaque regle renvoie a sa page.

## Interdits absolus

Ces points sont la source de presque toutes les derives. Ils ne se discutent pas.

- **Aucune icone, aucun pictogramme.** Pas de lucide, pas de heroicons, pas de
  puce graphique, pas de fleche ajoutee a un lien ou a un bouton. Charte page 9.
  Seule exception, venue du Figma : la bascule + / − des questions de la FAQ,
  dessinee en CSS (deux traits dans une pastille), sans bibliotheque.
- **Aucune barre d'accent verticale** en tete de bloc. Charte page 9.
- **Aucune bordure pleine de couleur.** Le filet pointille est le seul
  separateur du systeme. Bordure pleine autorisee uniquement en `border-bordure`
  sur les champs et les cartes claires, et, comme dans le Figma, en accent sur
  le champ actif et en `border-accent-detail` sur la question ouverte de la
  FAQ, et en `border-erreur` sur un champ en erreur. Charte pages 9 et 12.
- **Une seule ombre dans la page**, celle du panneau nuit. Charte page 12.
- **Aucun emoji**, nulle part. Charte page 13.
- **Aucune italique.** Charte page 8.
- **Aucun degrade multicolore, aucun dore.** Charte pages 2 et 6.
- **Aucun tiret cadratin** dans les textes, y compris les metadonnees.
  Brief equipe 3.3.

## Couleurs

Toute couleur absente de `src/styles/index.css` doit etre arbitree avant usage.
Aucune valeur hexadecimale en dur dans un composant. On utilise les classes
issues des tokens : `bg-nuit`, `text-encre`, `border-bordure`, etc.

Le rouge `erreur` (`erreur-sur-nuit` sur fond nuit) sert uniquement au
contour et au message des champs en erreur. Il est AA sur les deux fonds.

Les bleus electriques ne servent jamais de fond de page. Deux familles de fond
au maximum par page. Charte page 7.

## Typographie

Une seule famille, Schibsted Grotesk, jouee sur les graisses. Charte page 8.
Aucune seconde famille, aucun serif : la hierarchie se joue sur le corps et
sur la graisse, jamais sur un changement de fonte.

Les corps, graisses et interlignes sont ceux des styles de texte du kit
Figma (titre/h1 a h4, donnee, corps/large, base et dense, legende,
surtitre, bouton), tenus par `src/styles/typographie.css` : `text-d-*` pour
l'affichage, `text-w-*` pour la lecture. Le tableau de correspondance est en
tete de ce fichier. Les chiffres sont en 800, comme dans le Figma ; le 900
reste reserve au logotype.

**Titre bicolore, la regle.** Ligne 1 en valeur attenuee, ligne 2 en pleine
valeur, meme corps, meme graisse, jamais plus de deux lignes. Utiliser le
composant `TitreBicolore`. Charte page 8.

Ne pas accentuer un seul mot dans un titre par une couleur ou une graisse
differente : la regle bicolore travaille par ligne, pas par mot.

## Rayons

`rounded-bouton` 8 et `rounded-champ` 8 (variable rayon/bouton du kit
Figma), `rounded-plaque` 15 (logos du hero), `rounded-piece` 16 (cartes
imbriquees dans un panneau), `rounded-carte` 20,
`rounded-panneau` 24, `rounded-pastille` 999. Aucune autre valeur.
Valeurs tenues par `src/styles/tokens.css`.

## Composants

Cinq composants suffisent pour construire le site : bouton, champ, carte de
soiree, pastille, cartouche d'intervenant. Charte page 12. S'y ajoutent
`LogoPartenaire` et `ArcPartenaires`. Ne pas introduire
de librairie de composants : elle apporterait des styles a neutraliser.

Regles d'assemblage : une seule carte sombre par groupe, interligne du courant
entre 1,45 et 1,55.

## Gabarit

Largeur de contenu 1200 px via la classe `contenu` (gabarit du Figma :
1200 px dans une fenêtre de 1440, marges 40 en tablette, 20 en mobile). Grille 12 colonnes,
gouttiere 24. Rythme vertical de 8 px, donc espacements multiples de 8.
Charte page 11.

## Contenu, regles fermes

- **Ne jamais mentionner le lieu** avant annonce officielle, y compris dans les
  metadonnees, les donnees structurees et les fichiers telechargeables.
  Formulation retenue : "Lyon". Brief 3.3, charte page 15.
- **Aucun tarif partenaire** sur le site.
- Le nom s'ecrit "Les Nuits du Capital Investissement", capitales initiales,
  sans trait d'union. Aucun sigle en communication externe. Charte page 2.

## Motion

Motion sobre. Les transitions repondent a une action de l'utilisateur.
Pas d'apparition au defilement sur chaque section. `prefers-reduced-motion`
est respecte dans la base CSS.

## Accessibilite

Focus visible conserve, contrastes verifies sur fond nuit, navigation au
clavier fonctionnelle, libelles de formulaire toujours presents.
