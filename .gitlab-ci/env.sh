#!/usr/bin/env bash

#

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

export DOMAIN="emjpm.dev.fabrique.social.gouv.fr";

export K8S_PROJECT="emjpm"
export K8S_NAMESPACE="emjpm-feature-${BRANCH_HASH}"


if [[ "${BRANCH_NAME}" = "master" ]]; then
  export ENVIRONMENT="dev"
  export BRANCH_HASH=master;
  export K8S_NAMESPACE="emjpm-${BRANCH_HASH}"
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  export ENVIRONMENT="preproduction"
  export NODE_ENV="production"
  export IMAGE_TAG=$(printf "${COMMIT_TAG}" | sed "s/^v//")
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
  export POSTGRES_HOSTNAME="emjpmprodserver"
  export POSTGRES_DATABASE_EMJPM="emjpm"
  export POSTGRES_DATABASE_METABASE="metabase"
else
  export DOMAIN="${BRANCH_HASH}-${DOMAIN}";
  export POSTGRES_HOSTNAME="emjpmdevserver"
  export POSTGRES_DATABASE_EMJPM="emjpm_${BRANCH_HASH}"
  export POSTGRES_DATABASE_METABASE="metabase_${BRANCH_HASH}"
  #
fi

export POSTGRES_SRV_HOST="${POSTGRES_HOSTNAME}.postgres.database.azure.com"

export API_HOST="api-${DOMAIN}";
export API_SRV_HOST="api-nodejs";
export FRONTEND_HOST="${DOMAIN}";
export GQL_SERVER_SRV_HOST="graphql-server-nodejs";
export HASURA_HOST="hasura-${DOMAIN}";
export HASURA_SRV_HOST="hasura-nodejs";
export METABASE_HOST="metabase-${DOMAIN}";


export API_URL="https://${API_HOST}"
export FRONTEND_URL="https://${FRONTEND_HOST}"
export HASURA_URL="https://${HASURA_HOST}"
export METABASE_URL="https://${METABASE_HOST}"

#

printenv | grep \
  -e BRANCH_HASH \
  -e BRANCH_NAME \
  -e COMMIT \
  -e COMMIT_TAG \
  -e DOMAIN \
  -e ENVIRONMENT \
  -e HASH_SIZE \
  -e IMAGE_TAG \
  -e JOB_ID \
  -e K8S_NAMESPACE \
  -e K8S_PROJECT \
  -e NODE_ENV \
  -e PROJECT_PATH \
  -e REGISTRY \
  -e REGISTRY \
  \
  -e API_HOST \
  -e API_SRV_HOST \
  -e API_URL \
  -e CERTIFICATE_NAME \
  -e FRONTEND_HOST \
  -e FRONTEND_URL \
  -e GQL_SERVER_SRV_HOST \
  -e HASURA_HOST \
  -e HASURA_SRV_HOST \
  -e METABASE_HOST \
  -e METABASE_URL \
  -e POSTGRES_SRV_HOST \
  \
  -e CONTEXT \
  -e PORT \
  -e IMAGE_NAME \
  | sort
