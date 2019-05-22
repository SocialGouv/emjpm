# eMJPM

[![Build Status](https://travis-ci.com/SocialGouv/emjpm.svg?branch=master)](https://travis-ci.com/SocialGouv/emjpm)
[![codecov](https://codecov.io/gh/SocialGouv/emjpm/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/emjpm)

## Installation

Make sure you're using NodeJS 10.15

```sh
# Install all the packages
$ yarn
# This will trigger some build on the `postinstall` script
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

## FAQ

- *If you have the `Can't take lock to run migrations: Migration table is already locked` error*

```sh
$ docker-compose exec db psql -U postgres -d emjpm_test -c 'UPDATE knex_migrations_lock set is_locked=0;'
UPDATE 1
```

- *If you have migration error*

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
