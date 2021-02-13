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
  echo "backup before deploy to production"
  # TODO
else
  $(dirname $0)/scripts/create-ns
fi

# DEPLOY
$(dirname $0)/scripts/deploy

# POST-DEPLOY
if [ -n "$K8SCI_PRODUCTION" ]; then
  echo "notify mattermost"
  NOTIF_MSG=$(./scripts/ci/get-release-note | sed -z 's/\n/\\n/g')
  echo '{"text":"'${NOTIF_MSG}'"}' \
    | curl -H 'Content-Type: application/json' ${MATTERMOST_WEBHOOK} -d @-
else
  echo "restore anonymised db"
  # TODO restore db
fi