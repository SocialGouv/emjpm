#!/bin/bash

EMJPM_DB=${POSTGRES_DATABASE_EMJPM}

psql \
  --file /mnt/script/anonymize.sql \
  ${EMJPM_DB}

