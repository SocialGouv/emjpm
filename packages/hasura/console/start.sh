#!/bin/bash

wait-for ${HASURA_INTERNAL_HOSTNAME}:8080

# temporal fix to workaround: https://github.com/hasura/graphql-engine/issues/2824#issuecomment-801293056
socat TCP-LISTEN:${HASURA_EXPOSE_PORT},fork TCP:${HASURA_INTERNAL_HOSTNAME}:8080 &
socat TCP-LISTEN:${HASURA_CONSOLE_PORT},fork,reuseaddr,bind=${HASURA_CONSOLE_INTERNAL_HOSTNAME} TCP:127.0.0.1:${HASURA_CONSOLE_PORT} &
socat TCP-LISTEN:${HASURA_CONSOLE_API_PORT},fork,reuseaddr,bind=${HASURA_CONSOLE_INTERNAL_HOSTNAME} TCP:127.0.0.1:${HASURA_CONSOLE_API_PORT} &

echo "Starting console..."
exec hasura console \
  --log-level DEBUG \
  --address "127.0.0.1" \
  --console-port ${HASURA_CONSOLE_PORT} \
  --api-port ${HASURA_CONSOLE_API_PORT} \
  --no-browser \
  --skip-update-check \
  $@