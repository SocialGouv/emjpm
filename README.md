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
```

## E2E tests


```sh
#
# Ensure to have a clean new postgres volume
$ docker-compose rm -sfv
$ docker volume rm -f emjpm_emjpm-pgdata 
#

# Start the app, api, etc...
#
$ docker build --cache-from socialgouv/emjpm:master -t socialgouv/emjpm:master . 
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.test.yaml up --build
# or
$ docker-compose -f ./docker-compose.yaml -f ./docker-compose.test.yaml up db 
$ NODE_ENV=test yarn dev

# Initialize the db
#
$ yarn workspace @emjpm/knex run migrate --env test
$ yarn workspace @emjpm/knex run seeds --env test

# Instantiate the initial seed
#
$ PGPASSWORD=test pg_dump --host localhost --port 5434 --username=postgres -Fc emjpm_test > optional/e3e/test-seed.dump
```

```sh
# The e2e script will retore the db before each scenario with 
$ PGPASSWORD=test pg_restore --host localhost --port 5434 --username=postgres --clean --dbname=emjpm_test optional/e3e/test-seed.dump
```

```sh
# Install the e2e runner env
$ yarn e2e yarn
# short for
$ yarn run -- lerna --scope @optional/e2e.runner.puppetteer exec yarn

# Run the test 
$ yarn e2e test
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

All branches and tags are automaticly deployed
See https://github.com/SocialGouv/work-in-france/deployments

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
