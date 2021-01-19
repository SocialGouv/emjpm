#!/usr/bin/env bash

# see https://gitlab.com/aztek-io/oss/containers/pgbouncer-container/

if [ -z "$PGHOST" ]; then
  echo "missing PGHOST"
  exit 1
fi
if [ -z "$PGUSER" ]; then
  echo "missing PGUSER"
  exit 1
fi
if [ -z "$PGPASSWORD" ]; then
  echo "missing PGPASSWORD"
  exit 1
fi
if [ -z "$DB_CONNECTION_NAME" ]; then
  echo "missing DB_CONNECTION_NAME"
  exit 1
fi

envsubst < $(dirname $0)/pgbouncer.yaml | kubectl -n emjpm-pgbouncer apply -f -

kubectl -n emjpm-pgbouncer rollout status deployment "pgbouncer-${DB_CONNECTION_NAME}"
