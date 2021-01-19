#!/usr/bin/env bash

if [ -z "$ADMIN_PASSWORD" ]; then
  echo "missing ADMIN_PASSWORD"
  exit 1
fi

kubectl label namespace emjpm-phppgadmin cert=wildcard

# envsubst < $(dirname $0)/phppgadmin.yaml | cat
envsubst < $(dirname $0)/phppgadmin.yaml | kubectl -n emjpm-phppgadmin apply -f -

kubectl -n emjpm-phppgadmin rollout status deployment phppgadmin
kubectl -n emjpm-phppgadmin rollout status deployment phppgadmin-proxy
