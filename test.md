# eMJPM


## création d'une base de données de test

```bash
export PGUSER=emjpm
export PGPASSWORD=test
psql -h localhost -p 5434 < ./scripts/dev/before_seeds_creation.sql
psql -h localhost -p 5434 < ./.k8s/postgres/restore/configmap/anonymize.sql
pg_dump -h localhost -p 5434 -Fc > ./packages/api/__test__/database/test-seed.dump
```

## Test

```sh
# Build all the packages
$ yarn test

# Build the "<package-name>"
$ yarn workspace <package-name> test

# For example for "@emjpm/api"
$ yarn workspace @emjpm/api test

# executing the test in the same condition than the ci
$ yarn workspace @emjpm/api test --maxWorkers=2 --coverage
```

## E2E tests

**Local testing**

```sh
#
# Ensure to have a clean new postgres volume
$ docker-compose rm -sfv
$ docker volume rm -f emjpm_emjpm-pgdata
$ docker system prune --all
$ docker system prune --volumes
#

# Start a new db
$ docker-compose up db

# Initialize the db
$ yarn workspace @emjpm/knex run migrate --env test
$ yarn workspace @emjpm/knex run seeds --env test
# Instantiate the initial seed
$ PGPASSWORD=test pg_dump --host localhost --port 5434 --username=postgres -Fc emjpm > optional/e2e/.runners/puppetteer/test-seed.dump

# Or if you have the test-seed.dump
# The e2e script will retore the db before each scenario with
$ PGPASSWORD=test pg_restore --host localhost --port 5434 --username postgres -e --if-exists --clean --dbname=emjpm optional/e2e/.runners/puppetteer/test-seed.dump

# start the dev server
$ yarn dev
$ docker-compose up hasura
$ docker-compose up maildev

# Install the e2e runner env
$ yarn e2e
# short for
$ yarn --cwd optional/e2e/.runners/puppetteer

# Run the test
$ yarn e2e test

#if your db is broken
$ psql --host localhost --port 5434 --username postgres --dbname emjpm -e -f./optional/e2e/.runners/puppetteer/drop.sql
```

**Remote**

```sh
#
# Ensure to have a clean new postgres volume
$ docker-compose rm -sfv
$ docker volume rm -f emjpm_emjpm-pgdata
#

# Optional
# pull the latest images
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.built.yaml pull

# Start a new db
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.built.yaml up db
# or
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.build.yaml up db --build

# Initialize the db
$ yarn workspace @emjpm/knex run migrate --env test
$ yarn workspace @emjpm/knex run seeds --env test

# Instantiate the initial seed
$ PGPASSWORD=test pg_dump --host localhost --port 5434 --username=postgres -Fc emjpm > optional/e2e/.runners/puppetteer/test-seed.dump

# Optional
# The e2e script will retore the db before each scenario with
$ PGPASSWORD=test pg_restore --host localhost --port 5434 --username postgres -e --if-exists --clean --dbname=emjpm optional/e2e/.runners/puppetteer/test-seed.dump

$ docker-compose stop

$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.built.yaml up

# Install the e2e runner env
$ yarn e2e
# short for
$ yarn --cwd optional/e2e/.runners/puppetteer

# Run the test
$ yarn e2e test
```
