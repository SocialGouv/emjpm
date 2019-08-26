#!/usr/bin/env sh

ROOT_DIRECTORY="/usr/share/nginx/html"

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
  find $ROOT_DIRECTORY -type f -name \*.html -exec sed -i -e "s|$match|$repl|g" {} +
done <env-vars

rm env-vars

#########################
# Step 2 : Start NGINX  #
#########################

exec nginx -g 'daemon off;'
