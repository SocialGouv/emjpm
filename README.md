# e-mjpm API

## Get Started

```sh
git clone git@github.com:SocialGouv/eMJPM-api.git

cd eMJPM-api

npm install
```

## Run

`docker-compose up`


## Seeds


### Developement

```sh

docker exec -it emjpm-postgres createdb -U postgres backendlebontuteur_db_1

./node_modules/.bin/knex migrate:latest --env development

./node_modules/.bin/knex seed:run --env development
```

### Tests

```sht

docker exec -it emjpm-postgres createdb -U postgres backendlebontuteur_db_1_test

./node_modules/.bin/knex migrate:latest --env test

./node_modules/.bin/knex seed:run --env test
```

## Env

 - `CORS_WHITELIST` : ajouter un host à la whitelist CORS
 - `PORT` : port
 - `SECRET_KEY` : sessions secret key