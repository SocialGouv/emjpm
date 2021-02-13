#!/bin/bash

source $(dirname $0)/.env-k8s

if [ -n "$K8SCI_PRODUCTION" ]; then
  export K8SCI_HELM_ARGS="$K8SCI_HELM_ARGS
    --set ingress.annotations.certmanager\.k8s\.io/cluster-issuer=letsencrypt-prod
    --set-string ingress.annotations.kubernetes\.io/tls-acme=true
    --set tlsSecretName=${K8SCI_CONTEXT}-certificate
    --set replicas=2
    "
  export K8SCI_K8S_DEPLOY_NS="${K8SCI_PROJECT}"
  export DB_NAME="${K8SCI_PROJECT}"
  export APP_DOMAIN="${ROOT_DOMAIN}"
else
  export K8SCI_HELM_ARGS="${K8SCI_HELM_ARGS}
    --set tlsSecretName=wildcard-crt
    "
  export K8SCI_K8S_DEPLOY_NS="${K8SCI_PROJECT}-$(echo $K8SCI_BRANCH | sed -e 's/[^[:alnum:]]/-/g' | cut -c1-32)"
  export DB_NAME="${K8SCI_PROJECT}_$(echo $K8SCI_BRANCH | sed -e 's/[^[:alnum:]]/_/g' | cut -c1-32)"
  DOMAIN_SLUG=$(echo $K8SCI_BRANCH | sed -e 's/[^[:alnum:]]/-/g' | cut -c1-32)
  export APP_DOMAIN="${DOMAIN_SLUG}-${ROOT_DOMAIN}"
fi

for context in $K8SCI_CONTEXT_LIST; do
  export K8SCI_CONTEXT=$context
  export IMAGE_PATH="$K8SCI_PROJECT/$K8SCI_CONTEXT"
  export K8SCI_HELM_CHART="packages/$K8SCI_CONTEXT/.k8s"
  export K8SCI_HELM_RELEASE="$K8SCI_CONTEXT"
  export K8SCI_HELM_ARGS="$K8SCI_HELM_ARGS
    --set host=${CONTEXT_DOMAIN}
    --set image.repository=${REGISTRY_URL}/${REGISTRY_PUSH_PATH}
    --set image.tag=${IMAGE_TAG}
    --set secretName=emjpm-secret
    "
  if [ -n "$K8SCI_PRODUCTION" ]; then
    export K8SCI_HELM_ARGS="$K8SCI_HELM_ARGS
      --set ingress.annotations.certmanager\.k8s\.io/cluster-issuer=letsencrypt-prod
      --set-string ingress.annotations.kubernetes\.io/tls-acme=true
      --set tlsSecretName=${K8SCI_CONTEXT}-certificate
      --set replicas=2
      "
  else
    export K8SCI_HELM_ARGS="${K8SCI_HELM_ARGS}
      --set tlsSecretName=wildcard-crt
      "
  fi
  case $K8SCI_CONTEXT in
    app)
      export CONTEXT_DOMAIN=$APP_DOMAIN
      ;;
    api)
      export CONTEXT_DOMAIN="api-$APP_DOMAIN"
      export K8SCI_HELM_ARGS="$K8SCI_HELM_ARGS
        --set appURL=https://$APP_DOMAIN
        --set dbName=$DB_NAME
        "
      ;;
    hasura)
      export CONTEXT_DOMAIN="hasura-$APP_DOMAIN"
      export K8SCI_HELM_ARGS="$K8SCI_HELM_ARGS
        --set dbName=$DB_NAME
        "
      ;;
  esac
  /opt/jobs/deploy/create.sh
done


# wait job
for context in $K8SCI_CONTEXT_LIST; do
  export K8SCI_CONTEXT=$context
  /opt/k8sci-wait-job deploy
done

# wait rollout
for context in $K8SCI_CONTEXT_LIST; do
  kubectl \
    --server=$K8SCI_K8S_SERVER --token=$K8SCI_K8S_TOKEN \
    --namespace=$K8SCI_K8S_NS \
    rollout status deployment "$context"
done
