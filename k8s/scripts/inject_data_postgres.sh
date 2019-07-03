#!/bin/sh

INJECT_DATA_POSTGRES_POD_STATUS=$(kubectl get pod emjpm-dataset"$1")

# Check if emjpm-dataset pod exists
if [ ! "$INJECT_DATA_POSTGRES_POD_STATUS" ]
then
    kubectl apply -f k8s/postgres/pod-inject-dataset-emjpm.yml
else
    kubectl delete pod emjpm-dataset"$1"
    kubectl apply -f k8s/postgres/pod-inject-dataset-emjpm.yml
fi

