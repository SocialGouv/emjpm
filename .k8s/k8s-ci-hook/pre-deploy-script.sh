#!/usr/bin/env bash

### this file will be loaded by git clone $repo from deploy-job
### it's path is specified in PRE_DEPLOY_SCRIPT var in env.hook.sh

if [ -n "$PRODUCTION" ]; then
  export RANCHER_CLUSTER_ID="c-lfcxv"
  export RANCHER_PROJECT_ID="p-ttzld"
else
  export RANCHER_CLUSTER_ID="c-bd7z2"
  export RANCHER_PROJECT_ID="p-57mxc"
fi

# create namespace if doesn't exists
if [ -z "$(kubectl --server $K8S_SERVER --token $K8S_TOKEN get namespace $K8S_NS 2>/dev/null)" ]; then

  kubectl \
    --server $K8S_SERVER \
    --token $K8S_TOKEN \
    create -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    field.cattle.io/projectId: $RANCHER_CLUSTER_ID:$RANCHER_PROJECT_ID
  labels:
    cert: wildcard
    field.cattle.io/projectId: $RANCHER_PROJECT_ID
  name: $K8S_NS
EOF

  # copy secrets to new namespace
  SECRET_NS="${PROJECT}-secret"
  SECRET_NAME="${PROJECT}-secret"
  kubectl --server $K8S_SERVER --token $K8S_TOKEN \
    -n $SECRET_NS get secret $SECRET_NAME -o json \
    | jq 'del(.metadata["namespace","creationTimestamp","resourceVersion","selfLink","uid"])' \
    | kubectl --server $K8S_SERVER --token $K8S_TOKEN -n $K8S_NS apply -f -
fi

# create managed db if doesn't exists
DB_SECRET_NS="${PROJECT}-secret"
DB_SECRET_NAME="azure-pg-admin-user"
export PGHOST=$(kubectl --server $K8S_SERVER --token $K8S_TOKEN \
  -n $DB_SECRET_NS get secret $DB_SECRET_NAME -ojsonpath='{.data.PGHOST}' \
  | base64 --decode)
export PGUSER=$(kubectl --server $K8S_SERVER --token $K8S_TOKEN \
  -n $DB_SECRET_NS get secret $DB_SECRET_NAME -ojsonpath='{.data.PGUSER}' \
  | base64 --decode)
export PGPASSWORD=$(kubectl --server $K8S_SERVER --token $K8S_TOKEN \
  -n $DB_SECRET_NS get secret $DB_SECRET_NAME -ojsonpath='{.data.PGPASSWORD}' \
  | base64 --decode)
DEPLOYMENT_PGUSER=$PROJECT
if ! [ $(psql -lqt | cut -d \| -f 1 | grep -qw ${DB_NAME}) ]; then
  psql -v ON_ERROR_STOP=1 postgres <<EOF
    CREATE DATABASE ${DB_NAME};
    \c ${DB_NAME}

    CREATE EXTENSION IF NOT EXISTS pgcrypto;

    GRANT CONNECT ON DATABASE ${DB_NAME} TO ${DEPLOYMENT_PGUSER};
    GRANT ALL PRIVILEGES ON DATABASE ${DB_NAME} TO ${DEPLOYMENT_PGUSER};
EOF

fi