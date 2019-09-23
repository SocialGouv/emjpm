#!/bin/bash

# Just in case...
sleep 10s

UNSAFE_DUMP_FILE="/mnt/data/$(cat /mnt/data/LATEST)"
OUTPUT_FILE="/mnt/anonymous/$(cat /mnt/data/LATEST)"
PGDATABASE=${PGDATABASE:="emjpm"}

while ! pg_isready;
do
  sleep 5s;
done ;

createdb ${PGDATABASE}
pg_restore --no-owner --no-privileges -e -Fc -d ${PGDATABASE} ${UNSAFE_DUMP_FILE}
psql ${PGDATABASE} < /mnt/script/anonymize.sql
pg_dump --verbose -n public -Fc ${PGDATABASE} > ${OUTPUT_FILE}

cp -f /mnt/data/LATEST /mnt/anonymous/LATEST
