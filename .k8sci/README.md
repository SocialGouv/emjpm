# K8SCI
blazing fast, simple and reliable implementation of CI on kubernetes
see [k8s-ci](https://github.com/SocialGouv/k8s-ci) documentation

## local commands
```sh
yarn release
yarn prod

# or both in one shot
yarn delivery
```

## webhook
configured in github webhooks
run automatically on theses branches:
- [next](https://next-emjpm.dev2.fabrique.social.gouv.fr/)
- [prod](https://emjpm.fabrique.social.gouv.fr/) (trigger production)
- [apitest](https://apitest-emjpm.dev2.fabrique.social.gouv.fr/)

### push event
on dev (any branch other than prod):
- build (with buildkit)
- push images (to harbor registry)
- init k8s namespace
- restore anonymized db

on prod (the branch `prod`):
- build
- backup db
- deploy
- notify mattermost on [s/emjpm/notifs](https://mattermost.fabrique.social.gouv.fr/default/channels/semjpmnotifs)

### delete event
- remove k8s matching with deleted branch name
- remove db matching with deleted branch name

## triggerable manually on any branch
- from [giltab-ci](https://gitlab.factory.social.gouv.fr/SocialGouv/emjpm/-/pipelines)
- calling url `https://ci-emjpm.dev2.fabrique.social.gouv.fr/hooks/push?token=$WEBHOOKTOKEN&branch=name-of-my-branch`

