#!/usr/bin/env bash

### this file is embeded in webhook configmap when running create-webhook.sh

# build vars
## context
case $CONTEXT in
  app)
    export BUILD_ARGS="$BUILD_ARGS \
      --opt build-arg:REACT_APP_SENTRY_PUBLIC_DSN=${SENTRY_PUBLIC_DSN} \
      "
    ;;
  api)
    ;;
  hasura)
    ;;
esac


# deploy vars
if [ -n "$PRODUCTION" ]; then
  export ROOT_DOMAIN=emjpm.fabrique.social.gouv.fr
  export RANCHER_CLUSTER_ID="c-lfcxv"
  export RANCHER_PROJECT_ID="p-ttzld"
else
  export ROOT_DOMAIN=emjpm.dev2.fabrique.social.gouv.fr
  export RANCHER_CLUSTER_ID="c-bd7z2"
  export RANCHER_PROJECT_ID="p-57mxc"
fi
export APP_DOMAIN="${DOMAIN_SLUG}-${ROOT_DOMAIN}"
export K8S_SERVER_ROOT_URL="https://rancher.fabrique.social.gouv.fr/k8s/clusters"
export K8S_DEPLOY_SERVER="$K8S_SERVER_ROOT_URL/$RANCHER_CLUSTER_ID"
export PRE_DEPLOY_SCRIPT=".k8s/k8s-ci-hook/pre-deploy-script.sh"

## context
case $CONTEXT in
  app)
    export CONTEXT_DOMAIN=$APP_DOMAIN
    ;;
  api)
    export CONTEXT_DOMAIN="api-$APP_DOMAIN"
    export HELM_ARGS="$HELM_ARGS
      --set appURL=https://$APP_DOMAIN
      --set dbName=$DB_NAME
      "
    ;;
  hasura)
    export CONTEXT_DOMAIN="hasura-$APP_DOMAIN"
    export HELM_ARGS="$HELM_ARGS
      --set dbName=$DB_NAME
      "
    ;;
esac

## prod / dev
if [ -n "$PRODUCTION" ]; then
  export HELM_ARGS="$HELM_ARGS
    --set ingress.annotations.certmanager\.k8s\.io/cluster-issuer=letsencrypt-prod
    --set-string ingress.annotations.kubernetes\.io/tls-acme=true
    --set tlsSecretName=${CONTEXT}-certificate
    "
else
  export HELM_ARGS="${HELM_ARGS}
    --set tlsSecretName=wildcard-crt
    "
fi

## common
export HELM_ARGS="$HELM_ARGS
  --set labels.date=`date +'%s'`s
  --set host=${CONTEXT_DOMAIN}
  --set image.repository=${REGISTRY_URL}/${REGISTRY_PUSH_PATH}
  --set image.tag=${IMAGE_TAG}
  --set secretName=emjpm-secret
  "
