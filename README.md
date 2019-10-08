# eMJPM

[![Build Status](https://travis-ci.com/SocialGouv/emjpm.svg?branch=master)](https://travis-ci.com/SocialGouv/emjpm?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1ca934db263e43d59cfd7be7fd78ae75)](https://www.codacy.com/app/SocialGouv/emjpm)
[![codecov](https://codecov.io/gh/SocialGouv/emjpm/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/emjpm)

## Installation

Make sure you're using NodeJS 10.15

```sh
# Install all the packages
$ yarn
# This will trigger some build on the `postinstall` script
```

### Build

```sh
# Build all the packages
$ yarn build

# Build the "<package-name>"
$ yarn workspace <package-name> build

# For example for "@emjpm/api"
$ yarn workspace @emjpm/api build
```

### Test

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

The e2e tests are using the latest deployed `socialgouv/emjpm-*` images by default.
To run the tests with

```sh
$ yarn lerna --scope @optional/e2e exec yarn
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.test.yaml up --build

$ NODE_ENV=test yarn workspace @emjpm/knex run migrate
$ NODE_ENV=test yarn workspace @emjpm/knex run seeds

$ yarn run -- lerna --scope @optional/e2e run cypress:run -- --headed
```

## Manual deployment

To build and deploy manually some version :

```sh
# checkout your target branch
git pull

# edit docker-compose.override.yaml and .env

# build locally main docker image as emjpm-base
# you can override API_URL and SENTRY_PUBLIC_DSN env vars here
docker build . -t emjpm-base

# rebuild and launch instance using locally built image
BASE_IMAGE=emjpm-base docker-compose up --build -d

# run migrations and seeds
BASE_IMAGE=emjpm-base docker-compose run knex yarn workspace @emjpm/knex run migrate
BASE_IMAGE=emjpm-base docker-compose run knex yarn workspace @emjpm/knex run seeds
```

## Maintenance

### Database

#### dump production database

connect to PG pod

```bash
kubectl exec -it emjpm-postgres-prod-0 sh
```

dump database

```bash
DUMP_FILE=emjpm_prod_`date +%d-%m-%Y"_"%H_%M_%S`.dump
pg_dump emjpm -U postgres -Fc > /tmp/$DUMP_FILE
```

copy dump on loca

```bash
kubectl cp emjpm-postgres-prod-0:/tmp/$DUMP_FILE ./$DUMP_FILE
```

#### restore production dump on local

```bash
export PGUSER=postgres
export PGPASSWORD=test

cat <<EOF > reset-database.sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = 'emjpm';
DROP DATABASE IF EXISTS emjpm;
CREATE DATABASE emjpm WITH OWNER = emjpm;
EOF

# drop / create database emjpm
cat reset-database.sql | psql -h localhost -p 5434 -U $PGUSER

# restore production dump
pg_restore -h localhost -p 5434 --if-exists --clean -e -Fc -d emjpm ./$DUMP_FILE

psql -h localhost -p 5434 -c "ALTER SCHEMA public OWNER TO emjpm" -U $PGUSER emjpm

rm reset-database.sql
```

#### restore production dump on k8s pod

connect to PG pod

```bash
kubectl exec -it emjpm-postgres-your-feature sh
```

restore production dump

```bash
# drop database emjpm
cat <<EOF > reset-database.sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = 'emjpm';
DROP DATABASE IF EXISTS emjpm;
CREATE DATABASE emjpm WITH OWNER = emjpm;
EOF

cat reset-database.sql | psql -h localhost -U postgres

# restore production dump
pg_restore -h localhost --if-exists --clean -e -Fc -U postgres -d emjpm ./$DUMP_FILE

psql -h localhost -c "ALTER SCHEMA public OWNER TO emjpm" -U postgres emjpm
```


## FAQ

- _If you have the `Can't take lock to run migrations: Migration table is already locked` error_

```sh
$ docker-compose exec db psql -U postgres -d emjpm_test -c 'UPDATE knex_migrations_lock set is_locked=0;'
UPDATE 1
```

- _If you have migration error_

```sh
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.dev.yaml exec api yarn knex migrate:rollback
```

## Release policy

### One click semantic release !

[On a successful `master` branch pipeline click on trigger the `Release` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines)

### Auto

Trigger a custom build on [Travis](https://travis-ci.com/SocialGouv/emjpm) (in the "More options" right menu) on the `master` branch with a custom config:

```yml
env:
  global:
    - RELEASE=true
```

You can change the lerna arguments though the `LERNA_ARGS` variable.

```yml
env:
  global:
    - LERNA_ARGS="--force-publish --yes"
    - RELEASE=true
```

### Manual

You need an [Github token](https://github.com/settings/tokens/new) to release.

```sh
#
# Bump, push to git and publish to npm
$ yarn lerna version

#
# Publish the tag change log on the Github Release
$ CONVENTIONAL_GITHUB_RELEASER_TOKEN==************ npx conventional-github-releaser -p angular

#
# You might want to add a Gif to your release to make it groovy ;)
```

## Deployment policy

All branches and tags are automatically deployed
See https://github.com/SocialGouv/emjpm/deployments

 - **Development** : https://master.emjpm.dev.fabrique.social.gouv.fr/
 - **Prod Mirror** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
 - **Pre Prod** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
 - **Prod** : https://emjpm.fabrique.social.gouv.fr

### One click tag release !

[On a successful `tag` branch pipeline click on trigger the `Put to production` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines?scope=tags&page=1)

### Auto

Trigger a custom build on [Travis](https://travis-ci.com/SocialGouv/emjpm) (in the "More options" right menu) on the tag `v*` you  with a custom config:

```yml
env:
  global:
    - PRODUCTION=true
```

### Manual

```sh
# Run the k8s files
$ kubectl apply -f ./.k8s/frontend/deployment.yml
$ kubectl apply -f ./.k8s/frontend/service.yml
$ kubectl apply -f ./.k8s/frontend/ingress.yml
```

## Branch name

You need to name your branch with the commit lint convention

branch name template:

```
type/***-***
```

### Type

Must be one of the following:

- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Circle, BrowserStack, SauceLabs)
- **docs**: Documentation only changes
- **feat**: A new feature
- **fix**: A bug fix
- **perf**: A code change that improves performance
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **test**: Adding missing tests or correcting existing tests

as a reference see https://github.com/conventional-changelog/commitlint/tree/master/@commitlint/config-angular
