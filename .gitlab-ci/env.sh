#!/usr/bin/env bash

#

export BRANCH_NAME=${BRANCH_NAME:=$CI_COMMIT_REF_SLUG}
export COMMIT_TAG=${COMMIT_TAG:=$CI_COMMIT_TAG}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export ENVIRONMENT=${ENVIRONMENT:="dev.factory"};
export HASH_SIZE=${HASH_SIZE:=7}
export PROJECT_PATH=${PROJECT_PATH:=$CI_PROJECT_PATH}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}

BRANCH_NAME_HASHED=$( printf "${BRANCH_NAME}" | sha1sum | cut -c1-${HASH_SIZE} )
export BRANCH_HASH=${BRANCH_HASH:=$BRANCH_NAME_HASHED}

export DOMAIN="emjpm.${ENVIRONMENT}.social.gouv.fr";

#

if [[ "${BRANCH_NAME}" = "master" ]]; then
  export BRANCH_HASH=master;
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  export BRANCH_HASH=$( printf "${COMMIT_TAG}" | sed "s/\./-/g" );
fi

if [[ -n "${PRODUCTION+x}" ]]; then
  export BRANCH_HASH=prod;
  #
  export POSTGRES_DATABASE="emjpm_prod"
else
  export DOMAIN="${BRANCH_HASH}.${DOMAIN}";
  #
  export POSTGRES_DATABASE="emjpm_dev"
fi

export API_HOST="api.${DOMAIN}";
export FRONTEND_HOST="${DOMAIN}";
export GQL_SERVER_HOST="${K8S_NAMESPACE}-graphql-server-${BRANCH_HASH}";
export HASURA_HOST="hasura.${DOMAIN}";
export POSTGRES_HOST="${K8S_NAMESPACE}-postgres-${BRANCH_HASH}"

if [[ -n "${PRODUCTION+x}" ]]; then
  export API_URL="https://${API_HOST}"
  export FRONTEND_URL="https://${FRONTEND_HOST}"
else
  export API_URL="http://${API_HOST}"
  export FRONTEND_URL="http://${FRONTEND_HOST}"
fi

#

printenv | grep -E \
  "BRANCH_HASH|BRANCH_NAME|COMMIT|COMMIT_TAG|ENVIRONMENT|HASH_SIZE|JOB_ID" \
  | sort
printenv | grep -E \
  "API_HOST|API_URL|FRONTEND_HOST|FRONTEND_URL|GQL_SERVER_HOST|HASURA_HOST|POSTGRES_HOST" \
  | sort
