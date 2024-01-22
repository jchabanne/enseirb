# Docker

## Prérequis

- Installer nodeJS
- Installer Docker

## Les bases

#### Télécharger une image

```sh
$ docker pull nginx:1.27.1-bookworm
$ docker image ls
```

#### Exécuter une image

```sh
$ docker run nginx:1.27.1-bookworm
$ docker ps # dans une autre fenêtre
```

L'option `-d` permet d'exécuter le conteneur en mode détaché.

```sh
$ docker run -d nginx:1.27.1-bookworm
```

> Un conteneur est créé chaque fois qu'une image est exécutée

#### Gérer les conteneurs

```sh
$ docker ps # pour récupérer l'id d'un conteneur
$ docker stop <container-id>
$ docker ps --all # pour lister également les conteneurs arrêtés
$ docker start <container-id>
$ docker rm <container-id> <container-id> ...
```

L'option `--name` permet de définir le nom du conteneur

```sh
$ docker run -d --name web-server nginx:1.27.1-bookworm
$ docker ps
```

> On ne peut pas lancer plusieurs conteneurs avec le même nom.

#### Port mapping

Essayer d'accéder à l'url `http://localhost`. Nginx ne devrais pas être accessible.

Utiliser l'option `-p` pour mapper un port de la machine sur le port du conteneur.

```sh
$ docker stop <container-name>
$ docker rm <container-name>
$ docker run -d --name web-server -p 8080:80 nginx:1.27.1-bookworm
```

> Accéder à l'URL `http://localhost:8080`

Exécuter une autre instance de nginx sur un port différent.

```sh
$ docker run -d --name web-server-2 -p 9090:80 nginx:1.26.0-bookworm
```

> Accéder à l'URL `http://localhost:9090`

## Exercice 1 : host network

> Créer une branche `docker` depuis la branche `main`.

> Créer un projet contenant 2 dossiers : `api` et `nginx`.
> Récupérer les fichiers présents dans le dossier TP.
> Exécuter la commande `npm install`

### API

#### Etape 1

Implémenter la fonction `createServer` dans le fichier `server.mjs`.
Définir un endpoint `GET /feature/:code` retournant un objet json de la forme `{"code": code, "enabled": true}`.

#### Etape 2

Modifier le fichier `index.mjs` pour lancer l'API sur le port `3000`.

> Exécuter la commande `node api/index.mjs` et accéder à l'URL `http://localhost/feature/feat1`.
> Vérifier que l'appel retourne bien `{"code": "feat1", "enabled": true}`

#### Etape 3

Construire l'image de l'API en complétant le fichier `api/Dockerfile`
puis en exécutant la commande `docker buildx build -f api/Dockerfile -t feature/api .`.

Exécuter un conteneur avec la commande `docker run -d --name feature-api --network host feature/api`.

### Nginx

#### Etape 1

Adapter la configuration dans le fichier `nginx.conf` pour que le service soit accessible depuis le port `8080`.
Modifier également la directive `proxy_pass` pour transférer la requête reçue au conteneur de l'API.

#### Etape 2

Construire l'image docker avec la commande `docker buildx build -f nginx/Dockerfile -t feature/nginx ./nginx`.

Exécuter un conteneur avec la commande `docker run -d --rm --name feature-nginx --network host feature/nginx`.

### Validation

Vérifier que tout fonctionne avec ces 2 URL :
- `http://localhost:8080/feature/feat_code`
- `http://localhost:3000/feature/feat_code`

> Faire un commit

## Exercice 2 : bridge network

### API

Modifier le fichier `index.mjs` pour que l'API écoute le port `80`.

Modifier le fichier `package.json` pour exécuter le conteneur avec un réseau de type `bridge`
et le garder accessible sur le port `3000`.

### Nginx

Adapter l'URL de l'API dans le fichier `nginx.conf`.

Modifier le fichier `package.json` pour exécuter le conteneur avec un réseau de type `bridge`
et le rendre accessible sur le port `80`.

> Utiliser la commande `ip addr show docker0` pour trouver l'information nécessaire.

### Validation

Vérifier que tout fonctionne avec ces 2 URL :
- `http://localhost/feature/feat_code`
- `http://localhost:3000/feature/feat_code`

> Faire un commit

## Exercice 3 : user defined network

Créer un nouveau réseau avec la commande suivante :

```sh
$ docker network create -d bridge feature-net
```

- Modifier le fichier `package.json` pour exécuter les conteneurs avec le réseau défini.
- Modifier le fichier `nginx.conf` pour communiquer correctement avec l'API.

### Validation

Vérifier que tout fonctionne avec ces 2 URL :
- `http://localhost/feature/feat_code`
- `http://localhost:3000/feature/feat_code`

> Faire un commit

### Isoler le conteneur de l'API

Modifier les fichiers `index.mjs`, `nginx.conf` et `package.json` pour que l'API ne soit plus accessible publiquement.

> On peut utiliser le nom du conteneur comme nom de domaine

### Validation

- Vérifier que l'URL `http://localhost:3000/feature/feat_code` ne répond plus.
- Vérifier que l'URL `http://localhost/feature/feat_code` répond toujours.

> Faire un commit

## Exercice 4 : volume

### Prise en main de Redis

Démarrer un server Redis

```sh
$ docker run -d --rm --network host --name feature-redis redis:7.4.0-bookworm redis-server
```

Se connecter au server

```sh
$ docker run -it --rm --network host redis:7.4.0-bookworm redis-cli -h 127.0.0.1
```

Insérer une clé puis récupérer sa valeur

```sh
> set feat1 enabled
> get feat1
> exit
```

Arrêter le serveur

```sh
$ docker stop feature-redis
```

### Connexion à l'API

#### Etape 1

Démarrer un conteneur `feature-redis` depuis l'image `redis-server` et relié au réseau `feature-net`.

```sh
$ docker run -d --rm --network feature-net --name feature-redis redis:7.4.0-bookworm redis-server
```

Valider en se connectant à l'instance.

```sh
$ docker run -it --rm --network feature-net redis:7.4.0-bookworm redis-cli -h feature-redis
```

#### Etape 2

Créer le fichier `api/redisClient.mjs` permettant de se connecter à la base Redis.

```javascript
// redisClient.mjs
import { createClient } from "redis";

const client = await createClient({ url: "redis://" })
  .on("error", (error) => console.log(error))
  .connect();

export async function getKey(key) {
  return await client.get(key);
}
```

Créer le fichier `api/featureStore.mjs` permettant de récupérer l'état d'une feature en appelant le `redisClient`.

Appeler le `featureStore` depuis le fichier `api/server.mjs`.

### Validation

- Insérer dans la base Redis une clé `feat123` avec la valeur `enabled`.
- Récupérer l'état de la feature avec l'URL `http://localhost/feature/feat123`.

> Supprimer le conteneur `feature-redis` et démarrer une nouvelle instance.

Se connecter à la base redis et récupérer la clé `feat123`.
La valeur devrait être vide.

> Faire un commit

### Named volume

> L'objectif d'un volume est de conserver des données même si un conteneur est supprimé,
> ou de partager des données entre plusieurs conteneurs.

Créer un volume `feature-redis-data`

```sh
$ docker volume create feature-redis-data
$ docker volume ls
```

Démarrer un server Redis en utilisant le volume créé :

```sh
$ docker run -d --rm --network feature-net -v feature-redis-data --name feature-redis redis:7.4.0-bookworm redis-server
```

- Insérer une clé `feat123` avec la valeur `enabled`.
- Supprimer le conteneur `feature-redis`.
- Relancer une instance et récupérer la valeur de la clé `feat123`.

### Host volume

> Permet de choisir le dossier ou le fichier associé au volume.

Créer le fichier `api/.env` contenant une clé `REDIS_URL`.

Récupérer la valeur de la clé dans le fichier `api/redisClient.mjs` (à la place de l'URL en dur).

Modifier le fichier `api/Dockerfile` pour ajouter l'option `--env-file src/.env` dans la commande `node`.

Construire une nouvelle image de l'API et exécuter un conteneur avec la commande :

```sh
$ docker run -d --network feature-net -v ./api/.env:/usr/app/src/.env --name feature-api feature/api
```

### Validation

Récupérer l'état de la feature avec l'URL `http://localhost/feature/feat123`.

> Faire un commit

## Exercice 5 : docker compose

> Docker compose permet de gérer plusieurs conteneurs de façon atomique
> afin de faciliter le déploiement d'applications multi-conteneurs

Commencer par supprimer toutes les ressources créées jusque là :
- conteneurs
- images
- volumes
- network

#### Redis

Créer un fichier `docker-compose.yml` permettant de lancer un conteneur `feature-redis`.
Utiliser la commande `docker compose up -d` pour exécuter le conteneur.
Se connecter à l'instance redis pour valider le bon fonctionnement.

Arrêter le conteneur avec la commande `docker compose stop`
puis nettoyer les ressources créées avec la commande `docker compose down`.

#### API

Dans le fichier `docker-compose.yml`, ajouter un service pour construire l'image `feature/api`
et lancer un conteneur `feature-api`.
Construire l'image avec la commande `docker compose build` puis démarrer l'application (`docker compose up -d`).

#### Nginx

Ajouter un dernier service pour construire l'image `feature/nginx` et lancer un conteneur `feature-nginx`.

### Validation

- Ajouter dans la base redis une clé `feat123` avec la valeur `enabled`.
- Récupérer l'état de la feature avec l'URL `http://localhost/feature/feat123`.

> Faire un commit **propre** et push
