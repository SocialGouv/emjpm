# e-mjpm API

## Get Started

```sh
git clone git@github.com:SocialGouv/eMJPM-api.git

cd eMJPM-api

npm install

npm start
```

## Run

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

### Tests

```sh
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

```docker exec -t -u postgres emjpm-postgres pg_dumpall -c > dump_`date +%d-%m-%Y"_"%H_%M_%S`.sql```

### Restaurer un dump Postgres:

`cat dump.sql | docker exec -i emjpm-postgres psql -U postgres`