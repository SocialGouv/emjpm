#!/usr/bin/env bash

REGISTRY_NS="registry"
AUTH_HOST="registry-auth.dev2.fabrique.social.gouv.fr"
K8S_JOBS_NS="k8s-jobs"
CREDS_SECRET_NAME="registry-creds"

REGISTRY_USER=$(kubectl -n $K8S_JOBS_NS get secret $CREDS_SECRET_NAME -ojsonpath='{.data.user}' 2>/dev/null | base64 --decode)
REGISTRY_PASS=$(kubectl -n $K8S_JOBS_NS get secret $CREDS_SECRET_NAME -ojsonpath='{.data.pass}' 2>/dev/null | base64 --decode)
if [ -z "$REGISTRY_PASS" ]; then
  REGISTRY_USER=k8s
  REGISTRY_PASS=$(openssl rand -base64 32)
  kubectl -n $K8S_JOBS_NS create secret generic $CREDS_SECRET_NAME \
    --from-literal=user=$REGISTRY_USER --from-literal=pass=$REGISTRY_PASS
fi

HTPASSWD=$(htpasswd -Bbn $REGISTRY_USER $REGISTRY_PASS)

kubectl label namespace $REGISTRY_NS cert=wildcard

# DOCKER REGISTRY SIMPLE
helm -n $REGISTRY_NS upgrade --install docker-registry stable/docker-registry \
  --set persistence.enabled=true \
  --set persistence.size=100Gi \
  --set ingress.enabled=true \
  --set ingress.hosts[0]=${REGISTRY_HOST} \
  --set ingress.tls[0].hosts[0]=${REGISTRY_HOST} \
  --set ingress.tls[0].secretName=wildcard-crt \
  --set secrets.htpasswd=$HTPASSWD

# DOCKER REGISTRY AUTH (with public pull) not ended
# see https://github.com/cesanta/docker_auth/tree/master/chart/docker-auth
# helm repo add cesanta-charts https://cesanta.github.io/docker_auth/
# helm repo update
# internal certs
# openssl req -new -newkey rsa:4096 -days 5000 -nodes -x509 \
#         -subj "/C=DE/ST=BW/L=Mannheim/O=DHBW/CN=docker-auth" \
#         -keyout /tmp/generated-docker-auth-server.key  \
#         -out /tmp/generated-docker-auth-server.pem
#
# HTPASSWD_PASSWORD=$(echo $HTPASSWD | cut -d ':' -f 2)
# REGISTRY_NS="registry2"
# REGISTRY_HOST="registry2.dev2.fabrique.social.gouv.fr"
# AUTH_HOST="registry2-auth.dev2.fabrique.social.gouv.fr"
# CREDS_SECRET_NAME="registry2-creds"
#
# CERT_PEM=`cat /tmp/generated-docker-auth-server.pem`
# CERT_KEY=`cat /tmp/generated-docker-auth-server.key`
# CERT_PEM_BASE64=`echo $CERT_PEM | base64`
# CERT_KEY_BASE64=`echo $CERT_KEY | base64`
# rm /tmp/generated-docker-auth-server.pem
#
# CERTS_SECRET_NAME="registry2-auth-certs"
# kubectl -n $REGISTRY_NS create secret generic "$CERTS_SECRET_NAME" \
#   --from-literal=tokenAuthRootCertBundle="$CERT_PEM"
#
# helm -n $REGISTRY_NS upgrade --install docker-registry cesanta-charts/docker-auth -f - <<EOF
# cat <<EOF
# secret:
#   data:
#     server:
#       certificate: |
# `echo $CERT_PEM_BASE64 |sed 's/\(.*\)/        \1/g'`
#       key: |
# `echo $CERT_KEY_BASE64 |sed 's/\(.*\)/        \1/g'`
# ingress:
#   enabled: true
#   hosts:
#     - ${AUTH_HOST}
#   annotations:
#     external-dns.alpha.kubernetes.io/hostname: $AUTH_HOST
#     kubernetes.io/ingress.class: "nginx"
#     nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
#   tls:
#     - hosts:
#       - ${AUTH_HOST}
#       secretName: wildcard-crt
# configmap:
#   data:
#     users:
#       "$REGISTRY_USER":
#         password: "$HTPASSWD_PASSWORD"
#       "": {}  # Allow anonymous (no "docker login") access.
#     acl:
#     - match: { account: "$REGISTRY_USER" }
#       actions: ["*"]
#       comment: "$REGISTRY_USER has full access to everything."
#     - match: { account: "" }
#       actions: ["pull"]
#       comment: "Anonymous users can pull"
#
#   docker-registry:
#     configData:
#       log:
#         level: debug
#         accesslog:
#           disabled: false
#       auth:
#         token:
#           autoredirect: false
#           issuer: "docker-auth"
#           realm: "https://$AUTH_HOST/auth"
#           service: "token-service"
#
#     ingress:
#       enabled: true
#       hosts:
#         - $REGISTRY_HOST
#       annotations:
#         external-dns.alpha.kubernetes.io/hostname: $REGISTRY_HOST
#         kubernetes.io/ingress.class: "nginx"
#         nginx.ingress.kubernetes.io/force-ssl-redirect: "true"
#         nginx.ingress.kubernetes.io/proxy-body-size: "0"
#       tls:
#         - hosts:
#           - $REGISTRY_HOST
#           secretName: wildcard-crt
#
#     extraVolumeMounts:
#       - name: token-auth-root-cert-bundle
#         mountPath: /tokenAuthRootCertBundle
#         readOnly: true
#
#     extraVolumes:
#       - name: token-auth-root-cert-bundle
#         secret:
#           secretName: $CERTS_SECRET_NAME
#           items:
#             - key: tokenAuthRootCertBundle
#               path: cert.pem
# EOF

# then see: https://gitlab.factory.social.gouv.fr/devthejo/webhook-k8s-ci/-/blob/master/opt/build-job.yaml