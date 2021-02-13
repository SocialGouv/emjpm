#!/bin/bash
set -e

set -x
env


# PROJECT
export K8SCI_PROJECT="emjpm"
export K8SCI_CONTEXT_LIST="hasura api app"

# COMMON
export DEV_ROOT_DOMAIN="${K8SCI_PROJECT}.dev2.fabrique.social.gouv.fr"
export PROD_ROOT_DOMAIN="${K8SCI_PROJECT}.fabrique.social.gouv.fr"
export K8SCI_REGISTRY_URL="harbor.fabrique.social.gouv.fr"
export K8SCI_REGISTRY_CACHE_URL="registry.dev2.fabrique.social.gouv.fr"
export K8SCI_PRODUCTION=$([ "$K8SCI_BRANCH" = "prod" ] && echo "1")
export K8SCI_IMAGE_TAG=$(echo $K8SCI_BRANCH | sed -e 's/[^[:alnum:].]/-/g' | cut -c1-32)
export K8SCI_GID=${K8SCI_GID:-"$(uuidgen)"}

# BUILD
$(dirname $0)/scripts/build.sh

# WAIT BUILT
for context in $K8SCI_CONTEXT_LIST; do
  export K8SCI_CONTEXT=$context
  /opt/k8sci-wait-job build
done

# DEPLOY
$(dirname $0)/scripts/deploy.sh
