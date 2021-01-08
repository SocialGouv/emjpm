# eMJPM

[![Build Status](https://travis-ci.com/SocialGouv/emjpm.svg?branch=master)](https://travis-ci.com/SocialGouv/emjpm?branch=master)


## Fiche technique du projet

[Fiche technique du projet](./tech.md)

## Getting started


### Dependencies
- [docker](https://docs.docker.com/get-docker/)
- [docker-compose](https://docs.docker.com/compose/install/)
- [nodejs >= 15](https://nodejs.org/en/download/)
- [yarn](https://classic.yarnpkg.com/en/docs/install#debian-stable)
- [lerna](https://github.com/lerna/lerna)

### Install all the packages
This will trigger some build on the `postinstall` script
```sh
lerna bootstrap
```

### Development

run docker-compose services db, hasura, maildev, api
launch hasura console
run react-scripts start
```
yarn dev
```

### Logs containers

```sh
yarn dev:server:log
```

### Stop
to stop current react dev console:
press `CTRL+C` in current terminal

to stop current containers:
```sh
docker-compose down
```

### Cleaning
to remove installed packages
```sh
rm -rf node_modules
rm -rf packages/app/node_modules
rm -rf packages/api/node_modules
```

to remove db
```sh
docker volume rm emjpm_emjpm-pgdata
```

## Database

### Restaurer un dump

```bash
# stop docker-compose if necessary
docker-compose down

# start only postgres
docker-compose up db

# restore data
./scripts/local/restore_dump.sh chemin-du-dump

# restart all containers
docker-compose down
docker-compose up --build -d
```

## Test

[Fonctionnement des tests](./test/md)

## Release policy

### Semantic releases

Be carefull: New releases are deployed on production when pipeline end with success

[On a successful `master` branch pipeline click on trigger the `Release` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines)


To increase production deployment and avoid to run two pipeline,
you can trigger release locally using
```sh
yarn release
```

## Deployment policy

All branches and tags are automatically deployed
See https://github.com/SocialGouv/emjpm/deployments


- **Development** : https://master.emjpm.dev.fabrique.social.gouv.fr/
- **Prod Mirror** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
- **Pre Prod** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
- **Prod** : https://emjpm.fabrique.social.gouv.fr

New releases are deployed on production when pipeline end with success

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
