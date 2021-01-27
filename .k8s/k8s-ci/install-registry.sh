#!/usr/bin/env bash

REGISTRY_NS="registry2"
REGISTRY_HOST="registry2.dev2.fabrique.social.gouv.fr"
K8S_JOBS_NS="k8s-jobs"

CREDS_SECRET_NAME="docker-creds"

REGISTRY_USER=$(kubectl -n $REGISTRY_NS get secret $CREDS_SECRET_NAME -ojsonpath='{.data.user}' 2>/dev/null | base64 --decode)
REGISTRY_PASS=$(kubectl -n $REGISTRY_NS get secret $CREDS_SECRET_NAME -ojsonpath='{.data.pass}' 2>/dev/null | base64 --decode)
if [ -z "$REGISTRY_PASS" ]; then
  REGISTRY_USER=k8s
  REGISTRY_PASS=$(openssl rand -base64 32)
  kubectl -n $REGISTRY_NS create secret generic $CREDS_SECRET_NAME \
    --from-literal=user=$REGISTRY_USER --from-literal=pass=$REGISTRY_PASS
  kubectl -n $K8S_JOBS_NS create secret generic $CREDS_SECRET_NAME \
    --from-literal=user=$REGISTRY_USER --from-literal=pass=$REGISTRY_PASS
fi

HTPASSWD=$(htpasswd -Bbn $REGISTRY_USER $REGISTRY_PASS)
HTPASSWD_PASSWORD=$(echo $HTPASSWD | cut -d ':' -f 2)

kubectl label namespace $REGISTRY_NS cert=wildcard

# DOCKER REGISTRY SIMPLE
# helm -n $REGISTRY_NS upgrade --install docker-registry stable/docker-registry \
#   --set persistence.enabled=true \
#   --set persistence.size=100Gi \
#   --set ingress.enabled=true \
#   --set ingress.hosts[0]=${REGISTRY_HOST} \
#   --set ingress.tls[0].hosts[0]=${REGISTRY_HOST} \
#   --set ingress.tls[0].secretName=wildcard-crt \
#   --set secrets.htpasswd=$HTPASSWD

# DOCKER REGISTRY AUTH (with public pull)
# see https://github.com/cesanta/docker_auth/tree/master/chart/docker-auth
# helm repo add cesanta-charts https://cesanta.github.io/docker_auth/
# helm repo update
helm -n $REGISTRY_NS upgrade --install docker-registry cesanta-charts/docker-auth -f - <<EOF
  secret:
    secretName: wildcard-crt
  ingress:
    enabled: true
    hosts:
      - ${REGISTRY_HOST}
    tls:
      - hosts:
        - ${REGISTRY_HOST}
        secretName: wildcard-crt
  configmap:
    data:
      users:
        "$REGISTRY_USER":
          password: "$HTPASSWD_PASSWORD"
        "": {}  # Allow anonymous (no "docker login") access.
      acl:
      - match: { account: "$REGISTRY_USER" }
        actions: ["*"]
        comment: "$REGISTRY_USER has full access to everything."
      - match: { account: "" }
        actions: ["pull"]
        comment: "Anonymous users can pull"
EOF

# then see: https://gitlab.factory.social.gouv.fr/devthejo/webhook-k8s-ci/-/blob/master/opt/build-job.yaml