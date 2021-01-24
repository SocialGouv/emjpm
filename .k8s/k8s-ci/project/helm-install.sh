#!/usr/bin/env bash


helm repo add geek-cookbook https://geek-cookbook.github.io/charts
helm repo update

WEBHOOK_CHART_VERSION=1.0.9
DIR=$(dirname 0)

GIT_REPO_URL=https://github.com/SocialGouv/emjpm
GIT_BRANCH=master
WEBHOOK_TOKEN_BUILD_AND_DEPLOY=$(openssl rand -base64 32)

cat $DIR/webhook.yaml | envsubst | \
  helm upgrade --install webhooks funkypenguin/webhook-receiver \
    --version $WEBHOOK_CHART_VERSION \
    -f -