#!/usr/bin/env bash

export BRANCH_NAME=${BRANCH_NAME:=$CI_COMMIT_REF_SLUG}
export COMMIT_TAG=${COMMIT_TAG:=$CI_COMMIT_TAG}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export ENVIRONMENT=${ENVIRONMENT:="staging"};
export HASH_SIZE=${HASH_SIZE:=7}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}
export NODE_ENV=${NODE_ENV:="development"}
export PROJECT_PATH=${PROJECT_PATH:=$CI_PROJECT_PATH}
export VERSION=${VERSION:=$CI_COMMIT_REF_NAME}
export HELM_POSTGRES_CHART_VERSION=6.4.0

BRANCH_NAME_HASHED=$( printf "${BRANCH_NAME}" | sha1sum | cut -c1-${HASH_SIZE} )
export BRANCH_HASH=${BRANCH_HASH:="$BRANCH_NAME_HASHED"}

export DOMAIN="emjpm.dev2.fabrique.social.gouv.fr";

export K8S_PROJECT="emjpm"
export K8S_NAMESPACE="emjpm-feature-${BRANCH_HASH}"


if [[ "${BRANCH_NAME}" = "master" ]]; then
  export ENVIRONMENT="dev"
  export BRANCH_HASH=master;
  export K8S_NAMESPACE="emjpm-${BRANCH_HASH}"
fi

if [[ "${BRANCH_NAME}" = "apitest" ]]; then
  export ENVIRONMENT="dev"
  export BRANCH_HASH=apitest;
  export K8S_NAMESPACE="emjpm-${BRANCH_HASH}"
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  export ENVIRONMENT="preproduction"
  export NODE_ENV="production"
  export BRANCH_HASH=$( printf "${COMMIT_TAG}" | sed "s/\./-/g" );
  export K8S_NAMESPACE="emjpm-${BRANCH_HASH}"
fi

#

if [[ -n "${PRODUCTION+x}" ]]; then
  export ENVIRONMENT="production"
  export BRANCH_HASH=prod;
  export K8S_NAMESPACE="emjpm"
  #
  export DOMAIN="emjpm.fabrique.social.gouv.fr";
  export POSTGRES_DATABASE_EMJPM="emjpm"
else
  export DOMAIN="${BRANCH_HASH}-${DOMAIN}";
  export POSTGRES_DATABASE_EMJPM="emjpm_$( printf "${BRANCH_HASH}" | sed "s/\-//g" )"
  #
fi

export API_HOST="api-${DOMAIN}";
export APP_HOST="${DOMAIN}";
export HASURA_HOST="hasura-${DOMAIN}";
