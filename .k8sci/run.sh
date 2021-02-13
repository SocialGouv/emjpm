#!/bin/bash
set -e

source $(dirname $0)/.env

export K8SCI_GID=$(uuidgen)

# BUILD
$(dirname $0)/scripts/build.sh

# PRE-DEPLOY
if [ -n "$K8SCI_PRODUCTION" ]; then
  echo "backup before deploy to production"
  # TODO
else
  $(dirname $0)/scripts/create-ns.sh
fi

# DEPLOY
$(dirname $0)/scripts/deploy.sh

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