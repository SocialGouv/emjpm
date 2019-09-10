#!/bin/sh

INJECT_DATA_POSTGRES_POD_STATUS=$(kubectl get pod "${K8S_NAMESPACE}"-dataset-"$1" -n emjpm-feature)

printenv | grep -E "DATABASE_URL" | sort


# Check if emjpm-dataset pod exists
if [ ! "$INJECT_DATA_POSTGRES_POD_STATUS" ]
then
    kubectl apply -f ./pod-inject-dataset.yml -n emjpm-feature;
else
    kubectl delete pod "${K8S_NAMESPACE}"-dataset-"$1" -n emjpm-feature;
    kubectl apply -f ./pod-inject-dataset.yml -n emjpm-feature;
fi

