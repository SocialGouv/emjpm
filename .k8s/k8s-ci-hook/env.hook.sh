#!/usr/bin/env bash

# build vars
if [ "$CONTEXT" == "app" ]; then

  export BUILD_ARGS="$BUILD_ARGS \
--opt build-arg:REACT_APP_SENTRY_PUBLIC_DSN=${SENTRY_PUBLIC_DSN} \
"

fi

# deploy vars
# export HELM_ARGS="$HELM_ARGS \
#   --set
# "
