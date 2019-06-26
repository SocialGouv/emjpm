#!/usr/bin/env bash

#

export BRANCH_NAME=${BRANCH_NAME:=$( printf "${CI_COMMIT_REF_NAME}" | LC_CTYPE=C sed -r "s/[^[:alpha:][:digit:]]/-/g" )}
export COMMIT_TAG=${COMMIT_TAG:=$CI_COMMIT_TAG}
export COMMIT=${COMMIT:=$CI_COMMIT_SHA}
export ENVIRONMENT=${ENVIRONMENT:="dev.factory"};
export HASH_SIZE=${HASH_SIZE:=7}
export JOB_ID=${JOB_ID:=$CI_JOB_ID}

BRANCH_NAME_HASHED=$( printf "${BRANCH_NAME}" | sha1sum | cut -c1-${HASH_SIZE} )
export BRANCH_HASH=${BRANCH_HASH:=$BRANCH_NAME_HASHED}

#

if [[ "${BRANCH_NAME}" = "master" ]]; then
  export BRANCH_HASH=master;
fi

if [[ -n "${COMMIT_TAG}" ]]; then
  export ENVIRONMENT=incubateur;
  export BRANCH_HASH=$( printf "${COMMIT_TAG}" | sed "s/\./-/g" );
fi

export FRONTEND_HOST="${BRANCH_HASH}.work-in-france.${ENVIRONMENT}.social.gouv.fr";

#

printenv | grep -E \
  "BRANCH_HASH|BRANCH_NAME|COMMIT|COMMIT_TAG|ENVIRONMENT|HASH_SIZE|JOB_ID" \
  | sort
printenv | grep -E \
  "FRONTEND_HOST" \
  | sort
