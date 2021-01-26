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

if [ -z "$(kubectl --server $K8S_SERVER --token $K8S_TOKEN get namespace $K8S_NS 2>/dev/null)" ]; then

  # create namespace
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
  SECRET_NAME="${PROJECT}-secret"
  SECRET_NAMESPACE="${PROJECT}-secret"
  kubectl --server $K8S_SERVER --token $K8S_TOKEN \
    -n $SECRET_NAMESPACE get secret $SECRET_NAME -o json \
    | jq 'del(.metadata["namespace","creationTimestamp","resourceVersion","selfLink","uid"])' \
    | kubectl --server $K8S_SERVER --token $K8S_TOKEN -n $K8S_NS apply -f -

fi