#!/usr/bin/env bash

# https://github.com/moby/buildkit/tree/master/examples/kubernetes
# https://github.com/moby/buildkit/blob/master/README.md

export KUBECONFIG="$PWD/.kubeconfig"
kubectl config set-context --current --namespace=docker-buildkit
DIR=$(dirname $0)
${DIR}/create-certs.sh
kubectl apply -f ${DIR}/manifests/deployment+service.rootless.yaml
helm -n registry upgrade --install docker-registry stable/docker-registry
# kubectl apply -f manifests/