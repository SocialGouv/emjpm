#!/bin/sh

export GIT_BRANCH_DEFAULT=${GIT_BRANCH_DEFAULT:-"master"}
export GIT_BRANCH=${1:-"$GIT_BRANCH_DEFAULT"}

cat $(dirname $0)/job.yaml | envsubt \
  '$GIT_BRANCH' \
  '$GIT_REPOSITORY' \
  '$GITCLONE_IMAGE' \
  '$GITCLONE_TAG' \
  '$DOCKER_IMAGE' \
  '$DOCKER_TAG' \
  '$BUILDKIT_IMAGE' \
  '$BUILDKIT_TAG' \
  '$BUILD_CONTEXT' \
  '$BUILD_DOCKERFILE' \
  '$REGISTRY_URL' \
  '$REGISTRY_SECRET_NAME' \
  '$REGISTRY_USER_KEY' \
  '$REGISTRY_PASS_KEY' \
  '$REGISTRY_PUSH_PATH' \
  '$REGISTRY_PUSH_TAG' \
  '$REGISTRY_CACHE_TAG' \
    | kubectl create -f -

TRIGGER=$2
if [ -n "$TRIGGER" ] && [ -f "/opt/$TRIGGER" ]; then
  /opt/$TRIGGER
fi;