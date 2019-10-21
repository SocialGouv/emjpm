#!/bin/bash

DUMP_FILE="$(cat ${UNSAFE_DUMP_DIR}/LATEST)"
UNSAFE_DUMP_FILE="${DUMP_FILE}"
SAFE_DUMP_FILE="ano_${DUMP_FILE}"

while ! pg_isready;
do
  sleep 5s;
done ;

#

pg_restore \
  --clean \
  --dbname=${PGDATABASE} \
  --exit-on-error \
  --format=c \
  --if-exists \
  --verbose \
  ${UNSAFE_DUMP_DIR}/${UNSAFE_DUMP_FILE}

psql \
  --file /mnt/script/anonymize.sql \
  ${PGDATABASE}

pg_dump \
  --format=c \
  --file ${SAFE_DUMP_DIR}/${SAFE_DUMP_FILE} \
  --verbose \
  ${PGDATABASE}

#

echo "${SAFE_DUMP_FILE}" > ${SAFE_DUMP_DIR}/LATEST
