#!/bin/bash

pg_isready

echo "Restore with ${1}"

pg_restore \
  --clean \
  --data-only \
  --dbname emjpm \
  --disable-triggers \
  --exit-on-error \
  --format=c \
  --if-exists \
  --verbose \
  ${1}

psql -d emjpm -c "ALTER SCHEMA public OWNER TO emjpm"
