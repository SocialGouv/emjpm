#!/bin/sh

set -e

ROOT_DIRECTORY="/hasura-migrations"

##############################################################
# Step 1 : replace default environment values in .json files #
##############################################################

# Save env variable in file
printenv >> env-vars

while IFS='=' read -r KEY VALUE
do
    match="%%$KEY%%"
    repl="$VALUE"

    # replace default environment variables value
    sed -i -e "s|$match|$repl|g" $ROOT_DIRECTORY/*.yaml
done <env-vars

rm env-vars

#################################
# Step 2 : Start Graphql Engine #
#################################

docker-entrypoint.sh

exec graphql-engine serve
