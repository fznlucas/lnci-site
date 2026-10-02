# Déploiement

Le site est un build statique (`dist/`) servi par Nginx sur le serveur OVH, en
HTTPS avec un certificat Let's Encrypt. Domaine : `nuitsducapitalinvestissement.fr`
(le `www` redirige vers le domaine nu).

## 1. Variables d'environnement

Elles sont publiques et injectées au moment du build : il faut rebuilder après
chaque changement. Ne jamais y mettre de secret.

| Variable            | Rôle                                                                                | Vide                                                                    |
| ------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `VITE_API_URL`      | adresse de l'API des formulaires, sans barre finale (voir [BACKEND.md](BACKEND.md)) | les formulaires affichent un message de repli avec l'adresse de contact |
| `VITE_LINKEDIN_URL` | page LinkedIn de l'événement                                                        | le lien LinkedIn est masqué                                             |

En local : copier `.env.example` en `.env` et le remplir. En CI : les déclarer
comme variables du dépôt (Settings > Secrets and variables > Actions).

## 2. Build

Node 22 ou plus récent.

```sh
npm ci
VITE_API_URL=https://api.exemple.fr npm run build
```

Le build vérifie les types, puis écrit `dist/` : `index.html`, une page HTML par
page publiée (`dist/programme/index.html`…, pour les aperçus de partage),
`sitemap.xml`, les fichiers de `public/` et `assets/` (fichiers hachés).

Vérifier en local : `npm run preview`.

## 3. Envoi sur le serveur

Une seule fois, sur le serveur :

```sh
sudo mkdir -p /var/www/lnci /var/www/certbot
sudo chown "$USER" /var/www/lnci
```

À chaque mise en ligne, depuis le poste :

```sh
rsync -az --delete dist/ utilisateur@serveur:/var/www/lnci/
```

`--delete` retire les anciens fichiers hachés. Aucun redémarrage de Nginx n'est
nécessaire.

## 4. Nginx

```sh
sudo apt install nginx
sudo cp deploy/nginx.conf /etc/nginx/sites-available/lnci
sudo ln -s /etc/nginx/sites-available/lnci /etc/nginx/sites-enabled/lnci
sudo rm -f /etc/nginx/sites-enabled/default
```

Ne pas recharger Nginx tout de suite : la configuration pointe vers le certificat,
qui n'existe pas encore (étape suivante).

Ce que fait `deploy/nginx.conf` :

- redirige `http` et `www` vers `https://nuitsducapitalinvestissement.fr` ;
- `try_files $uri $uri/index.html /index.html` : sert la page HTML de la route si
  elle existe, sinon l'application (indispensable pour le rafraîchissement direct
  sur `/programme`) ;
- cache d'un an sur `/assets/`, aucun cache sur les `.html` ;
- gzip ;
- en-têtes de sécurité de base (HSTS, nosniff, frame, referrer, permissions).
  Une Content-Security-Policy est prête en commentaire : l'activer une fois
  l'adresse de l'API connue, en l'ajoutant à `connect-src`.

## 5. Certificat Let's Encrypt

Le DNS du domaine et du `www` doit déjà pointer vers le serveur.

Premier certificat, Nginx arrêté (le port 80 doit être libre) :

```sh
sudo apt install certbot
sudo systemctl stop nginx
sudo certbot certonly --standalone \
  -d nuitsducapitalinvestissement.fr -d www.nuitsducapitalinvestissement.fr
sudo nginx -t && sudo systemctl start nginx
```

Puis passer le renouvellement en mode webroot, pour qu'il se fasse sans arrêter
Nginx :

```sh
sudo certbot certonly --webroot -w /var/www/certbot \
  --cert-name nuitsducapitalinvestissement.fr \
  -d nuitsducapitalinvestissement.fr -d www.nuitsducapitalinvestissement.fr \
  --deploy-hook "systemctl reload nginx"
sudo certbot renew --dry-run
```

Le renouvellement automatique est assuré par le timer installé avec certbot
(`systemctl list-timers | grep certbot`).

## 6. Intégration continue

`.github/workflows/ci.yml` lance le lint, la vérification des types et le build à
chaque push et à chaque pull request. Il ne déploie pas : la mise en ligne reste
manuelle (étapes 2 et 3).

## 7. Tests après mise en ligne

- **Rafraîchissement direct** : ouvrir `https://nuitsducapitalinvestissement.fr/programme`,
  puis `/hackathon`, `/partenaires`, `/contact` et rafraîchir : la page s'affiche,
  sans redirection vers une adresse finissant par `/`.
- **404** : ouvrir `/une-page-qui-nexiste-pas` : la page « Page introuvable »
  s'affiche. Le serveur répond 200 (application monopage) mais la page porte un
  `noindex`.
- **HTTPS** : `http://` et `https://www.` redirigent vers `https://nuitsducapitalinvestissement.fr`.
- **Cache** : `curl -I https://nuitsducapitalinvestissement.fr/` renvoie
  `Cache-Control: no-cache` ; un fichier de `/assets/` renvoie
  `max-age=31536000, immutable`.
- **Aperçus de partage** : tester `/`, `/programme`, `/hackathon`, `/partenaires`
  et `/preinscription` dans le [Post Inspector de LinkedIn](https://www.linkedin.com/post-inspector/)
  et sur [opengraph.xyz](https://www.opengraph.xyz/) : chaque page a son titre et
  son image (1 200 × 630).
- **Formulaires** : une pré-inscription et un message de test mènent à `/merci`
  (si `VITE_API_URL` est renseignée), sinon affichent le message de repli.
- **Référencement** : `https://nuitsducapitalinvestissement.fr/robots.txt` et
  `/sitemap.xml` répondent.
