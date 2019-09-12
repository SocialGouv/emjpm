#!/bin/sh

INIT_POSTGRES_POD_STATUS=$(kubectl get pod emjpm-init-postgres"$1")

# Check if emjpm-init-postgres pod exists
if [ ! "$INIT_POSTGRES_POD_STATUS" ]
then
    kubectl apply -f k8s/postgres/pod-init-postgres-emjpm.yml -n ${K8S_NAMESPACE};
else
    kubectl delete pod emjpm-init-postgres"$1" -n ${K8S_NAMESPACE};
    kubectl apply -f k8s/postgres/pod-init-postgres-emjpm.yml -n ${K8S_NAMESPACE};
fi

