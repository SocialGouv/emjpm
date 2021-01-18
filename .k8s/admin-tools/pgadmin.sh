#!/usr/bin/env bash

# require helm 3
# more details at https://github.com/rowanruseler/helm-charts/tree/master/charts/pgadmin4

if [ -z "$ADMIN_PASSWORD" ]; then
  echo "missing ADMIN_PASSWORD"
  exit 1
fi

helm repo add runix https://helm.runix.net
helm repo update

kubectl label namespace emjpm-pgadmin cert=wildcard

helm -n emjpm-pgadmin upgrade --install pgadmin runix/pgadmin4 -f - <<EOF
image:
  repository: dpage/pgadmin4
  pullPolicy: Always
env:
  email: pgadmin@emjpm.fabrique.social.gouv.fr
  password: ${ADMIN_PASSWORD}

ingress:
  enabled: true
  hosts:
    - host: pgadmin-emjpm.dev2.fabrique.social.gouv.fr
      paths:
        - /
  tls:
    - secretName: wildcard-crt
      hosts:
        - pgadmin-emjpm.dev2.fabrique.social.gouv.fr
EOF
kubectl -n emjpm-pgadmin rollout status deployment pgadmin-pgadmin4
