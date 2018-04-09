# e-mjpm API

## Get Started

```sh
git clone git@github.com:SocialGouv/eMJPM-api.git

cd eMJPM-api

npm install
```

## Run

`docker-compose up`

### Create Database

```sh
docker exec -it emjpm-postgres createdb -U postgres backendlebontuteur_db_1
```

### Seed

```sh
./node_modules/.bin/knex migrate:latest --env development

./node_modules/.bin/knex seed:run --env development
```
