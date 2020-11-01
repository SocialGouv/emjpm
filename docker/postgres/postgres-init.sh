#!/bin/bash
set -e

POSTGRES_EMJPM_USER=${POSTGRES_EMJPM_USER:="emjpm"}
POSTGRES_EMJPM_PASSWORD=${POSTGRES_EMJPM_PASSWORD:="test"}

psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL

  -- Create the emjpm database and the default public schema
  CREATE DATABASE emjpm;

  \c emjpm;

  -- emjpm user
  CREATE USER $POSTGRES_EMJPM_USER with encrypted password '$POSTGRES_EMJPM_PASSWORD';
  alter role $POSTGRES_EMJPM_USER superuser;

EOSQL
