#!/bin/bash

EMJPM_DB=emjpm_${BRANCH_HASH}

pg_isready

echo "Restore with ${1}"

pg_restore \
  --exit-on-error \
  --format=c \
  --verbose \
  --dbname ${EMJPM_DB} \
  --schema=public \
  ${1}

# psql -d emjpm -c "ALTER SCHEMA public OWNER TO emjpm"
psql -d ${EMJPM_DB} -c "DROP SCHEMA hdb_catalog CASCADE"
psql -d ${EMJPM_DB} -c "DROP SCHEMA hdb_views CASCADE"

sleep 10s
