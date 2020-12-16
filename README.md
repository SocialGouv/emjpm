# eMJPM

[![Build Status](https://travis-ci.com/SocialGouv/emjpm.svg?branch=master)](https://travis-ci.com/SocialGouv/emjpm?branch=master)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/1ca934db263e43d59cfd7be7fd78ae75)](https://www.codacy.com/app/SocialGouv/emjpm)
[![codecov](https://codecov.io/gh/SocialGouv/emjpm/branch/master/graph/badge.svg)](https://codecov.io/gh/SocialGouv/emjpm)

## Fiche technique du projet 

[Fiche technique du projet](./tech.md)

## Installation et démarrage

Make sure [lerna](https://github.com/lerna/lerna) is installed.

```sh
# Install all the packages
lerna bootstrap
# This will trigger some build on the `postinstall` script

# start app, api, hasura and postgres
docker-compose up --build -d
```

pour voir les logs

```sh
docker-compose logs -f
```

pour arrêter les containers

```sh
docker-compose down
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

### One click semantic release !

[On a successful `master` branch pipeline click on trigger the `Release` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines)

## Deployment policy

All branches and tags are automatically deployed
See https://github.com/SocialGouv/emjpm/deployments

- **Development** : https://master.emjpm.dev.fabrique.social.gouv.fr/
- **Prod Mirror** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
- **Pre Prod** : https://v24-1-0.emjpm.dev.fabrique.social.gouv.fr
- **Prod** : https://emjpm.fabrique.social.gouv.fr

### One click tag release !!

[On a successful `tag` branch pipeline click on trigger the `Put to production` job.](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/pipelines?scope=tags&page=1)

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
