# e-mjpm API [![CircleCI](https://circleci.com/gh/SocialGouv/eMJPM-api.svg?style=svg)](https://circleci.com/gh/SocialGouv/eMJPM-api)

## Get Started

```sh
git clone git@github.com:SocialGouv/eMJPM-api.git

cd eMJPM-api

npm install

npm start
```

## Dev

### Workflow GIT

- branche `master` : PROD
- branche `recette` : RECETTE
- branche `develop` : DEV

⚠️ Les PRs doivent être faites sur la branche DEV

⚠️ Les branches master, recette et dev, ne doivent recevoir **que des pulls requests**

Plus de détails : https://nvie.com/posts/a-successful-git-branching-model/

### Run

Pour lancer un PostgreSQL sur le port 5434 : `docker-compose up`

Les users et noms des dbs sont définis dans les `docker-compose` et sont initialisés par le script [db/postgres-init.sh](./db/postgres-init.sh) :

- le super user Postgres est `postgres`
- le user pour l'api est `api`
- 3 bases sont créées initialement : `emjpm_prod, emjpm_dev, emjpm_test` et l'user api a accès à toutes ces bases.

## Seeds

### Developement

```sh
./node_modules/.bin/knex migrate:latest --env development

./node_modules/.bin/knex seed:run --env development
```

Les comptes de dev sont définis dans les [seeds](https://github.com/SocialGouv/eMJPM-api/blob/master/db/seeds/development/0000-users.js)

### Tests

```sh
# setup la base de test
docker exec emjpm-postgres createdb emjpm_test -U postgres

./node_modules/.bin/knex migrate:latest --env test

./node_modules/.bin/knex seed:run --env test
```

## Prod

- Créer le fichier `docker-compose.override.yaml` avec les valeurs de production
- Builder l'image :
- `docker-compose build`
- Lancer PostgreSQL + l'API : `docker-compose restart`

### Executer une commande sur le container de l'API:

`docker exec emjpm-api ./node_modules/.bin/knex migrate:latest --env production`

### Se connecter à Postgres:

`docker exec -it emjpm-postgres psql -U postgres`

### Récupérer un dump Postgres:

#### Complet

`` docker exec -t -u postgres emjpm-postgres pg_dumpall -c > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``

#### Données uniquement

`` ssh xxxx@yyyyy -t sudo docker exec -t -u postgres emjpm-postgres pg_dump -a --inserts emjpm_prod > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql ``

### Restaurer un dump Postgres:

Depuis le host docker : `cat dump.sql | sudo docker exec -i emjpm-postgres psql -U postgres` [db]

### Tunnel SSH pour accéder à Postgres à distance:

Ouvre le port 1111 en local vers le Postgres distant

`ssh -L 1111:localhost:5434 mitech@xxxxxxxxxx` (utiliser l'IP externe de la machine)

### Restaurer un dump :

`cat /path/to/dump_16-04-2018_11_51_55.sql | psql -U postgres -p 1111 -h 127.0.0.1`

### Executer un script local sur machine distante :

`ssh xxx@88.191.188.xxx "cd /path/to/projext && NODE_ENV=production node" < node.js`

### CRON :

`0 0 * * * https://api.emjpm-preprod.num.social.gouv.fr/api/v1/email/relance-mandataires-inactifs`
