#!/usr/bin/env bash

if [ -z "$ADMIN_PASSWORD" ]; then
  echo "missing ADMIN_PASSWORD"
  exit 1
fi

## base manifest generated using
# helm repo add cetic https://cetic.github.io/helm-charts
# helm repo update
# helm template adminer cetic/adminer>.k8s/admin-tools/adminer.yaml`

kubectl label namespace emjpm-adminer cert=wildcard

# envsubst < $(dirname $0)/adminer.yaml | cat
envsubst < $(dirname $0)/adminer.yaml | kubectl -n emjpm-adminer apply -f -

kubectl -n emjpm-adminer rollout status deployment adminer
kubectl -n emjpm-adminer rollout status deployment adminer-proxy
