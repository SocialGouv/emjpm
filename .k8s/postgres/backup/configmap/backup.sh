#!/bin/bash

export TIMESTAMP=$(date '+%Y-%m-%d_%H-%M-%S')

pg_dump --version

pg_dump --verbose -Fc ${PGDATABASE} > ${DUMP_DIR}/backup_emjpm_${TIMESTAMP}.dump

echo "backup_emjpm_${TIMESTAMP}.dump" > ${DUMP_DIR}/LATEST

cp ${DUMP_DIR}/backup_emjpm_${TIMESTAMP}.dump ${DUMP_DEV_DIR}/backup_emjpm_${TIMESTAMP}.dump

echo "backup_emjpm_${TIMESTAMP}.dump" > ${DUMP_DEV_DIR}/LATEST
