#!/bin/bash
set -e

set -a
source $(dirname $0)/.env
set +a

export K8SCI_GID=$(uuidgen)

# BUILD
$(dirname $0)/scripts/build

# PRE-DEPLOY
if [ -n "$K8SCI_PRODUCTION" ]; then
  $(dirname $0)/scripts/db-backup
else
  $(dirname $0)/scripts/branch-init
fi

# DEPLOY
$(dirname $0)/scripts/deploy

# POST-DEPLOY
CURRENT_COMMIT_TAG=$(git tag --points-at HEAD)
if [ -n "$K8SCI_PRODUCTION" ]; then
  if [ -n "$CURRENT_COMMIT_TAG" ]; then
    echo "notify mattermost"
    NOTIF_MSG=$(./scripts/ci/get-release-note | sed -z 's/\n/\\n/g')
    echo '{"text":"'${NOTIF_MSG}'"}' \
      | curl -H 'Content-Type: application/json' ${MATTERMOST_WEBHOOK} -d @-
  fi
fi