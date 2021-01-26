#!/usr/bin/env bash

REGISTRY_NS="registry"
REGISTRY_HOST="registry.dev2.fabrique.social.gouv.fr"
K8S_JOBS_NS="k8s-jobs"

DIR=$(dirname $0)

REGISTRY_USER=k8s
REGISTRY_PASS=$(openssl rand -base64 32)

kubectl -n $K8S_JOBS_NS create secret generic docker-creds \
  --from-literal=user=$REGISTRY_USER \
  --from-literal=pass=$REGISTRY_PASS

HTPASSWD=$(htpasswd -Bbn $REGISTRY_USER $REGISTRY_PASS)

kubectl label namespace $REGISTRY_NS cert=wildcard

helm -n $REGISTRY_NS upgrade --install docker-registry stable/docker-registry \
  --set persistence.enabled=true \
  --set persistence.size=100Gi \
  --set ingress.enabled=true \
  --set ingress.hosts[0]=${REGISTRY_HOST} \
  --set ingress.tls[0].hosts[0]=${REGISTRY_HOST} \
  --set ingress.tls[0].secretName=wildcard-crt \
  --set secrets.htpasswd=$HTPASSWD

# then see: https://gitlab.factory.social.gouv.fr/devthejo/webhook-k8s-ci/-/blob/master/opt/build-job.yaml