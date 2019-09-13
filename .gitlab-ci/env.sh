#!/usr/bin/env bash

#

export BRANCH_NAME=${BRANCH_NAME:=$CI_COMMIT_REF_SLUG}
export COMMIT_TAG=${COMMIT_TAG:=$CI_COMMIT_TAG}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export ENVIRONMENT=${ENVIRONMENT:="emjpm-dev"};
export HASH_SIZE=${HASH_SIZE:=7}
export PROJECT_PATH=${PROJECT_PATH:=$CI_PROJECT_PATH}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}

BRANCH_NAME_HASHED=$( printf "${BRANCH_NAME}" | sha1sum | cut -c1-${HASH_SIZE} )
export BRANCH_HASH=${BRANCH_HASH:=$BRANCH_NAME_HASHED}

export DOMAIN="emjpm.dev.fabrique.social.gouv.fr";
export K8S_PROJECT="emjpm"

#

if [[ "${BRANCH_NAME}" = "master" ]]; then
  export BRANCH_HASH=master;
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  export BRANCH_HASH=$( printf "${COMMIT_TAG}" | sed "s/\./-/g" );
fi

export K8S_NAMESPACE="emjpm-feature-${BRANCH_HASH}"

#

if [[ -n "${PRODUCTION+x}" ]]; then
  export BRANCH_HASH=prod;
  export K8S_NAMESPACE="emjpm"
  #
  export POSTGRES_DATABASE="emjpm_prod"
  export DOMAIN="emjpm.fabrique.social.gouv.fr";
else
  export DOMAIN="${BRANCH_HASH}.${DOMAIN}";
  #
  export POSTGRES_DATABASE="emjpm_dev"
fi

export API_HOST="api.${DOMAIN}";
export CERTIFICATE_NAME="${K8S_PROJECT}-certificate-${BRANCH_HASH}";
export FRONTEND_HOST="${DOMAIN}";
export GQL_SERVER_HOST="${K8S_PROJECT}-graphql-server-${BRANCH_HASH}";
export HASURA_HOST="hasura.${DOMAIN}";
export POSTGRES_HOST="${K8S_PROJECT}-postgres-${BRANCH_HASH}"

export API_URL="https://${API_HOST}"
export FRONTEND_URL="https://${FRONTEND_HOST}"
export HASURA_URL="https://${HASURA_HOST}"

#

printenv | grep -E \
  "BRANCH_HASH|BRANCH_NAME|COMMIT|COMMIT_TAG|ENVIRONMENT|HASH_SIZE|JOB_ID" \
  | sort
printenv | grep -E \
  "API_HOST|API_URL|CERTIFICATE_NAME|FRONTEND_HOST|FRONTEND_URL|GQL_SERVER_HOST|HASURA_HOST|POSTGRES_HOST" \
  | sort
