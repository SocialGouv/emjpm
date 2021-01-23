#!/usr/bin/env bash

# https://github.com/moby/buildkit/tree/master/examples/kubernetes
# https://github.com/moby/buildkit/blob/master/README.md

export KUBECONFIG="$PWD/.kubeconfig"
kubectl config set-context --current --namespace=docker-buildkit

DIR=$(dirname $0)

REGISTRY_USER=k8s
REGISTRY_PASS=$(openssl rand -base64 32)

${DIR}/create-certs.sh

kubectl create secret generic docker-creds \
  --from-literal=user=$REGISTRY_USER \
  --from-literal=pass=$REGISTRY_PASS

kubectl apply -f ${DIR}/manifests/deployment+service.rootless.yaml


HTPASSWD=$(htpasswd -Bbn $REGISTRY_USER $REGISTRY_PASS)

kubectl label namespace registry cert=wildcard
REGISTRY_HOST=registry.dev2.fabrique.social.gouv.fr
helm -n registry upgrade --install docker-registry stable/docker-registry \
  --set persistence.enabled=true \
  --set persistence.size=100Gi \
  --set ingress.enabled=true \
  --set ingress.hosts[0]=${REGISTRY_HOST} \
  --set ingress.tls[0].hosts[0]=${REGISTRY_HOST} \
  --set ingress.tls[0].secretName=wildcard-crt \
  --set secrets.htpasswd=$HTPASSWD


# kubectl create -f ${DIR}/manifests/job.rootless.yaml