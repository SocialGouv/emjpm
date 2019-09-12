#!/bin/sh

INJECT_DATA_POSTGRES_POD_STATUS=$(kubectl get pod "${K8S_PROJECT}"-dataset-"$1" -n ${K8S_NAMESPACE})

printenv | grep -E "DATABASE_URL" | sort


# Check if emjpm-dataset pod exists
if [ ! "$INJECT_DATA_POSTGRES_POD_STATUS" ]
then
    kubectl apply -f ./pod-inject-dataset.yml -n ${K8S_NAMESPACE};
else
    kubectl delete pod "${K8S_PROJECT}"-dataset-"$1" -n ${K8S_NAMESPACE};
    kubectl apply -f ./pod-inject-dataset.yml -n ${K8S_NAMESPACE};
fi

