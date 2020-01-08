#!/bin/bash

pg_isready

echo "Restore with ${1}"

pg_restore \
  --clean \
  --if-exists \
  --exit-on-error \
  --format=c \
  --verbose \
  --dbname emjpm \
  ${1}

psql -d emjpm -c "ALTER SCHEMA public OWNER TO emjpm"
