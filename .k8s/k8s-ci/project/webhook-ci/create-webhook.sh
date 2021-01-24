#!/bin/sh

PROJECT=emjpm
DEPLOY_ENV=${DEPLOY_ENV:-"dev"}
RELEASE="$PROJECT-$DEPLOY_ENV"

GIT_REPOSITORY=https://github.com/SocialGouv/emjpm
WEBHOOK_TOKEN=1234

WEBHOOK_HOST="$RELEASE.webhook-ci.dev2.fabrique.social.gouv.fr"

BUILD_CONTEXT=${CONTEXT:-"hasura"}

helm template $RELEASE \
  --set webhook.token=$WEBHOOK_TOKEN \
  --set git.repository=$GIT_REPOSITORY \
  --set registry.pushPath=emjpm/$BUILD_CONTEXT \
  --set build.dockerfile=packages/$BUILD_CONTEXT/ \
  --set kubectl.tokenSecretName=supersecretRef \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=${WEBHOOK_HOST} \
  --set ingress.tls[0].hosts[0]=${WEBHOOK_HOST} \
  --set ingress.tls[0].secretName=wildcard-crt \
  .
  # . | kubectl apply -f -