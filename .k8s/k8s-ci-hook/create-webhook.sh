#!/usr/bin/env bash
set -e

# project and env
## project global config
PROJECT=emjpm
CONTEXT_LIST="hasura,api,app"
## project repo for build sources and deployment config
GIT_REPOSITORY=https://github.com/SocialGouv/$PROJECT
RELEASE="$PROJECT"

# project build
## build args
SENTRY_PUBLIC_DSN=https://d9ba9b75ff784cba87abd847b6162b02@sentry.fabrique.social.gouv.fr/3

# webhook deployment
## global webhook-ci config
WEBHOOK_RANCHER_CLUSTER_ID="c-bd7z2"
WEBHOOK_K8S_SERVER="https://rancher.fabrique.social.gouv.fr/k8s/clusters/$WEBHOOK_RANCHER_CLUSTER_ID"
WEBHOOKCI_NS="webhook-ci"
K8S_JOBS_NS="k8s-jobs"
CHART_DIR=".k8s/k8s-ci/webhook-ci"
## project webhook-ci instance
WEBHOOK_HOST="${RELEASE}-${WEBHOOKCI_NS}.dev2.fabrique.social.gouv.fr"
WEBHOOK_TOKEN_SECRET_NAME="${WEBHOOKCI_NS}-${RELEASE}"
WEBHOOK_TOKEN=$(kubectl -n $WEBHOOKCI_NS get secret $WEBHOOK_TOKEN_SECRET_NAME -ojsonpath='{.data.token}' 2>/dev/null | base64 --decode)
if [ -z "$WEBHOOK_TOKEN" ]; then
  WEBHOOK_TOKEN=$(cat /dev/urandom | base64 | head -n 1 |tr -dc '[:alnum:]' |cut -c -32)
  kubectl -n $WEBHOOKCI_NS create secret generic $WEBHOOK_TOKEN_SECRET_NAME \
    --from-literal=token=$WEBHOOK_TOKEN
fi

# let's deploy the project webhook instance
helm -n $WEBHOOKCI_NS template $RELEASE \
  --set project=$PROJECT \
  --set contextList="$(echo $CONTEXT_LIST | sed 's/,/\\,/g')" \
  --set webhook.tokenSecretName=$WEBHOOK_TOKEN_SECRET_NAME \
  --set git.repository=$GIT_REPOSITORY \
  --set kubectl.server=$WEBHOOK_K8S_SERVER \
  --set kubectl.tokenSecretName=k8s \
  --set kubectl.tokenSecretKey=token \
  --set k8sJobsNamespace=$K8S_JOBS_NS \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=${WEBHOOK_HOST} \
  --set ingress.hosts[0].paths[0]=/ \
  --set ingress.tls[0].hosts[0]=${WEBHOOK_HOST} \
  --set ingress.tls[0].secretName=wildcard-crt \
  --set-file envHookFile=.k8s/k8s-ci-hook/env.hook.sh \
  --set env.SENTRY_PUBLIC_DSN=$SENTRY_PUBLIC_DSN \
  --set labels.date=`date +'%s'`s \
  $CHART_DIR \
    | kubectl -n $WEBHOOKCI_NS apply -f -

# display infos
echo "
webhook deployed at: https://$WEBHOOK_HOST/hooks/

# to get token run these command:
WEBHOOK_TOKEN="'$'"(kubectl -n $WEBHOOKCI_NS get secret $WEBHOOK_TOKEN_SECRET_NAME -ojsonpath='{.data.token}' 2>/dev/null | base64 --decode)
WEBHOOK_TOKEN_URLENCODED="'$'"(printf %s "'$'"WEBHOOK_TOKEN|jq -sRr @uri)
echo "'$'"WEBHOOK_TOKEN_URLENCODED
"