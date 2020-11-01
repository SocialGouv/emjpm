#!/bin/bash

POSTGRES_EMJPM_USER=emjpm

EMJPM_DB=${POSTGRES_DATABASE_EMJPM}

pg_isready

echo "Restore with ${1}"

pg_restore \
  --no-owner \
  --no-acl \
  --exit-on-error \
  --format=c \
  --verbose \
  --dbname ${EMJPM_DB} \
  ${1}

psql -v ON_ERROR_STOP=1 ${EMJPM_DB}  <<-EOSQL
  -- EMJPM
  GRANT CONNECT ON DATABASE ${EMJPM_DB} TO ${POSTGRES_EMJPM_USER};
  GRANT ALL PRIVILEGES ON DATABASE ${EMJPM_DB} TO ${POSTGRES_EMJPM_USER};

  DELETE FROM hdb_catalog.event_invocation_logs;
  DELETE FROM hdb_catalog.event_log;
  DELETE FROM hdb_catalog.event_triggers ;
EOSQL

sleep 10s
