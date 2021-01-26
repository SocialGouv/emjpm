#!/usr/bien/env bash

### this file will be loaded by git clone $repo from deploy-job
### it's path is specified in PRE_DEPLOY_SCRIPT var in env.hook.sh

if [ -z "$(kubectl get namespace $K8S_NS 2>/dev/null)" ]; then

  # create namespace
  kubectl \
    --server $K8S_SERVER \
    create -f - <<EOF
apiVersion: v1
kind: Namespace
metadata:
  annotations:
    field.cattle.io/projectId: $RANCHER_CLUSTER_ID:$RANCHER_PROJECT_ID
  labels:
    cert: wildcard
  name: $K8S_NS
EOF

  # copy secrets to new namespace
  SECRET_NAME="${PROJECT}-secret"
  SECRET_NAMESPACE="${PROJECT}-secret"
  kubectl -n $SECRET_NAMESPACE get secret $SECRET_NAME -oyaml \
    | kubectl -n $K8S_NS apply -f -

fi