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
$ docker-compose up graphql-engine
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

### Database

**restore production dump on local**

```bash
./scripts/local/restore_dump.sh chemin-du-dump
```

**création d'une base de données de test**

```bash
export PGUSER=emjpm
export PGPASSWORD=test
psql -h localhost -p 5434 < ./scripts/local/before_seeds_creation.sql
psql -h localhost -p 5434 < ./.k8s/postgres/restore/configmap/anonymize.sql
pg_dump -h localhost -p 5434 -Fc > ./packages/api/__test__/database/test-seed.dump
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

### One click tag release !!

[On a successful `tag` branch pipeline click on trigger the `Put to production` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines?scope=tags&page=1)

### Auto

Trigger a custom build on [Travis](https://travis-ci.com/SocialGouv/emjpm) (in the "More options" right menu) on the tag `v*` you with a custom config:

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
