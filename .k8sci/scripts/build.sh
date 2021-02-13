#!/bin/bash

source $(dirname $0)/.env-build

export K8SCI_REGISTRY_SECRET_NAME="harbor-creds"
export K8SCI_REGISTRY_CACHE_SECRET_NAME="registry-creds"
for context in $K8SCI_CONTEXT_LIST; do
  export K8SCI_CONTEXT=$context
  case $K8SCI_CONTEXT in
    app)
      export K8SCI_BUILD_ARGS="$K8SCI_BUILD_ARGS \
        --opt build-arg:REACT_APP_SENTRY_PUBLIC_DSN=${SENTRY_PUBLIC_DSN} \
        "
      ;;
    api)
      ;;
    hasura)
      ;;
  esac
  /opt/jobs/build/create.sh
done

# wait
for context in $K8SCI_CONTEXT_LIST; do
  export K8SCI_CONTEXT=$context
  /opt/k8sci-wait-job build
done
