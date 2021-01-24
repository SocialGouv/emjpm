#!/usr/bin/env bash
set -e

PROJECT=emjpm
DEPLOY_ENV=${DEPLOY_ENV:-"dev"}

GIT_REPOSITORY=https://github.com/SocialGouv/$PROJECT
RELEASE="$PROJECT-$DEPLOY_ENV"

WEBHOOKCI_NS="webhook-ci"
K8S_JOBS_NS="k8s-jobs"

WEBHOOK_HOST="${RELEASE}-${WEBHOOKCI_NS}.dev2.fabrique.social.gouv.fr"
WEBHOOK_TOKEN_SECRET_NAME="${WEBHOOKCI_NS}-${RELEASE}"

WEBHOOK_TOKEN=$(kubectl -n $WEBHOOKCI_NS get secret $WEBHOOK_TOKEN_SECRET_NAME -ojsonpath='{.data.token}' 2>/dev/null | base64 --decode)
if [ -z "$WEBHOOK_TOKEN" ]; then
  WEBHOOK_TOKEN=$(cat /dev/urandom | base64 | head -n 1 |tr -dc '[:alnum:]' |cut -c -32)
  kubectl -n $WEBHOOKCI_NS create secret generic $WEBHOOK_TOKEN_SECRET_NAME \
    --from-literal=token=$WEBHOOK_TOKEN
fi

CHART_DIR=$(dirname $0)/webhook-ci

helm -n $WEBHOOKCI_NS template $RELEASE \
  --set project=$PROJECT \
  --set webhook.tokenSecretName=$WEBHOOK_TOKEN_SECRET_NAME \
  --set git.repository=$GIT_REPOSITORY \
  --set kubectl.serverSecretName=k8s \
  --set kubectl.serverSecretKey=server \
  --set kubectl.tokenSecretName=k8s \
  --set kubectl.tokenSecretKey=token \
  --set k8sJobsNamespace=$K8S_JOBS_NS \
  --set ingress.enabled=true \
  --set ingress.hosts[0].host=${WEBHOOK_HOST} \
  --set ingress.hosts[0].paths[0]=/ \
  --set ingress.tls[0].hosts[0]=${WEBHOOK_HOST} \
  --set ingress.tls[0].secretName=wildcard-crt \
  $CHART_DIR | kubectl -n $WEBHOOKCI_NS apply -f -


echo "
webhook deployed at: https://$WEBHOOK_HOST/hooks/

# to get token run these command:
WEBHOOK_TOKEN="'$'"(kubectl -n $WEBHOOKCI_NS get secret $WEBHOOK_TOKEN_SECRET_NAME -ojsonpath='{.data.token}' 2>/dev/null | base64 --decode)
WEBHOOK_TOKEN_URLENCODED="'$'"(printf %s "'$'"WEBHOOK_TOKEN|jq -sRr @uri)
echo "'$'"WEBHOOK_TOKEN_URLENCODED
"