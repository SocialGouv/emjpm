#!/usr/bin/env sh

ROOT_DIRECTORY="/www"

##############################################################
# Step 1 : replace default environment values in .html files #
##############################################################

# Save env variable in file
printenv >> env-vars

while IFS='=' read -r KEY VALUE

do
    match="%%$KEY%%"
    repl="$VALUE"

    # replace default environment variables value
    sed -i -e "s|$match|$repl|g" $ROOT_DIRECTORY/*.html
    sed -i -e "s|$match|$repl|g" $ROOT_DIRECTORY/**/index.html
done <env-vars

rm env-vars

#########################
# Step 2 : Start NGINX  #
#########################

exec nginx -g 'daemon off;'
