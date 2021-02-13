#!/bin/bash

export K8SCI_REGISTRY_SECRET_NAME="harbor-creds"
export K8SCI_REGISTRY_CACHE_SECRET_NAME="registry-creds"
for context in $K8SCI_CONTEXT_LIST; do
  export K8SCI_CONTEXT=$context
  case $K8SCI_CONTEXT in
    app)
      SENTRY_PUBLIC_DSN="https://d9ba9b75ff784cba87abd847b6162b02@sentry.fabrique.social.gouv.fr/3"
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