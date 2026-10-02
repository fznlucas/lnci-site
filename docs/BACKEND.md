# Back-end des formulaires

Le site est statique. Ses deux formulaires (pré-inscription et contact) envoient
leurs données en JSON à une API à fournir. Ce document est le contrat entre le
front et cette API.

## Brancher l'API côté front

Tout l'envoi passe par un seul fichier : `src/formulaires/envoi.ts`.

1. Renseigner `VITE_API_URL` (adresse de l'API, sans barre finale), dans `.env`
   en local ou dans les variables du build en production (voir
   [DEPLOIEMENT.md](DEPLOIEMENT.md)).
2. Rebuilder le site : la variable est injectée au build.

Tant que `VITE_API_URL` est vide, rien n'est envoyé : le formulaire affiche un
message de repli avec l'adresse de contact.

Le front appelle :

| Formulaire      | Page              | Requête                                |
| --------------- | ----------------- | -------------------------------------- |
| Pré-inscription | `/preinscription` | `POST ${VITE_API_URL}/preinscriptions` |
| Contact         | `/contact`        | `POST ${VITE_API_URL}/contacts`        |

En-têtes envoyés : `Content-Type: application/json`, `Accept: application/json`.
Les types exacts sont dans `src/formulaires/types.ts`, la validation navigateur
dans `src/formulaires/validation.ts`.

## POST /preinscriptions

| Champ          | Type    | Obligatoire | Règle                                                  |
| -------------- | ------- | ----------- | ------------------------------------------------------ |
| `prenom`       | string  | oui         | non vide                                               |
| `nom`          | string  | oui         | non vide                                               |
| `email`        | string  | oui         | adresse e-mail valide                                  |
| `poste`        | string  | oui         | une des valeurs de la liste ci-dessous                 |
| `organisation` | string  | non         | peut être vide                                         |
| `consentement` | boolean | oui         | doit valoir `true`                                     |
| `source`       | string  | oui         | page d'origine, avec ses paramètres `utm_*` et `poste` |
| `envoyeLe`     | string  | oui         | date ISO 8601 de l'envoi, côté navigateur              |

Valeurs de `poste` : `fonds`, `banque-conseil`, `dirigeant`, `etudiant`,
`institution`, `presse`, `autre`.

```json
{
  "prenom": "Camille",
  "nom": "Martin",
  "email": "camille.martin@exemple.fr",
  "poste": "etudiant",
  "organisation": "iaelyon",
  "consentement": true,
  "source": "/preinscription?poste=etudiant&utm_source=linkedin",
  "envoyeLe": "2026-11-04T09:12:00.000Z"
}
```

## POST /contacts

| Champ          | Type    | Obligatoire | Règle                                  |
| -------------- | ------- | ----------- | -------------------------------------- |
| `prenom`       | string  | oui         | non vide                               |
| `nom`          | string  | oui         | non vide                               |
| `email`        | string  | oui         | adresse e-mail valide                  |
| `organisation` | string  | non         | peut être vide                         |
| `sujet`        | string  | oui         | une des valeurs de la liste ci-dessous |
| `message`      | string  | oui         | non vide                               |
| `consentement` | boolean | oui         | doit valoir `true`                     |
| `source`       | string  | oui         | page d'origine                         |
| `envoyeLe`     | string  | oui         | date ISO 8601 de l'envoi               |

Valeurs de `sujet` : `participation`, `partenariat`, `presse`, `autre`.

```json
{
  "prenom": "Camille",
  "nom": "Martin",
  "email": "camille.martin@exemple.fr",
  "organisation": "Exemple Capital",
  "sujet": "partenariat",
  "message": "Bonjour, nous aimerions recevoir la plaquette.",
  "consentement": true,
  "source": "/contact?sujet=partenariat",
  "envoyeLe": "2026-11-04T09:12:00.000Z"
}
```

## Réponses attendues

Le front lit le code HTTP, puis le corps JSON s'il a la forme attendue.

**201** : enregistré. Le front redirige vers `/merci`.

```json
{ "ok": true }
```

**400** : un ou plusieurs champs refusés. Les messages s'affichent sous les
champs, la clé est le nom du champ.

```json
{ "ok": false, "erreurs": { "email": "Cette adresse e-mail ne semble pas valide." } }
```

**409** : refus global, par exemple une pré-inscription déjà enregistrée pour
cette adresse. Le message s'affiche en tête du formulaire.

```json
{ "ok": false, "message": "Cette adresse est déjà pré-inscrite." }
```

**5xx**, réseau coupé ou corps illisible : le front affiche un message générique
avec l'adresse de contact. Le corps n'est pas lu.

Les messages renvoyés sont affichés tels quels : en français, avec l'apostrophe
typographique (’) et une espace insécable avant `: ; ! ?`.

## Exigences côté serveur

**Validation.** Refaire tous les contrôles du tableau ci-dessus : la validation
du navigateur se contourne. Limiter les longueurs (par exemple 100 caractères
pour les noms, 254 pour l'e-mail, 5 000 pour le message) et ignorer tout champ
inconnu.

**Anti-spam.** Le formulaire contient un champ piège `site_web`, caché aux
humains, et impose 3 secondes entre l'affichage et l'envoi. Le front ne transmet
jamais `site_web` : si une requête le contient non vide, répondre `201` sans rien
enregistrer. Ajouter une limite de débit par adresse IP (par exemple
10 requêtes par minute).

**CORS.** N'autoriser que l'origine du site :
`Access-Control-Allow-Origin: https://nuitsducapitalinvestissement.fr`
(et `https://www.nuitsducapitalinvestissement.fr` si le sous-domaine est servi),
méthodes `POST, OPTIONS`, en-tête `Content-Type`. Répondre au pré-vol `OPTIONS`.

**RGPD.**

- Stocker le consentement avec sa date (`consentement_le`, horodatage serveur) et
  la page d'origine.
- Durée de conservation annoncée sur le site : jusqu'à la fin de l'édition 2027,
  puis suppression, sauf accord explicite. Prévoir une purge programmée.
- Suppression sur demande : une demande à l'adresse de contact doit pouvoir
  effacer toutes les lignes liées à un e-mail.
- Données hébergées dans l'Union européenne ; indiquer l'hébergeur du serveur des
  formulaires dans la page Confidentialité (`src/data/legal.ts`).
- Ne pas journaliser le contenu des messages ni les adresses e-mail en clair.

## Schéma de table suggéré

PostgreSQL, à adapter.

```sql
create table preinscriptions (
  id               bigserial primary key,
  prenom           varchar(100) not null,
  nom              varchar(100) not null,
  email            varchar(254) not null,
  poste            varchar(20)  not null check (poste in
                     ('fonds', 'banque-conseil', 'dirigeant', 'etudiant',
                      'institution', 'presse', 'autre')),
  organisation     varchar(200) not null default '',
  source           varchar(500) not null,
  envoye_le        timestamptz  not null,  -- horloge du navigateur
  consentement_le  timestamptz  not null default now(),
  cree_le          timestamptz  not null default now(),
  unique (email)                            -- 409 si déjà pré-inscrit
);

create table contacts (
  id               bigserial primary key,
  prenom           varchar(100)  not null,
  nom              varchar(100)  not null,
  email            varchar(254)  not null,
  organisation     varchar(200)  not null default '',
  sujet            varchar(20)   not null check (sujet in
                     ('participation', 'partenariat', 'presse', 'autre')),
  message          varchar(5000) not null,
  source           varchar(500)  not null,
  envoye_le        timestamptz   not null,
  consentement_le  timestamptz   not null default now(),
  cree_le          timestamptz   not null default now()
);

create index on contacts (email);
```
