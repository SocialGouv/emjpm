#!/bin/bash
set -e

POSTGRES_EMJPM_USER=${POSTGRES_EMJPM_USER:="emjpm"}
POSTGRES_EMJPM_PASSWORD=${POSTGRES_EMJPM_PASSWORD:="test"}

# HACK(douglasduteil): recreate dummy users if not exist.
# As there is no `DROP *IF EXISTS* OWNED BY <role>`, I'm creating dummy users so
# `DROP OWNED BY <role>` doesn't fail on me T-T
createuser $POSTGRES_EMJPM_USER || true;

psql -v ON_ERROR_STOP=1 --username postgres <<-EOSQL
  -- Ensure that no one is connected to the database
  SELECT pg_terminate_backend(pid)
    FROM pg_stat_activity
    WHERE pid <> pg_backend_pid() AND datname in ('emjpm');

  -- Ensure that the emjpm database and schema is not
  DROP DATABASE IF EXISTS emjpm;

  -- Create the emjpm database and the default public schema
  CREATE DATABASE emjpm;

  -- emjpm user
  DROP OWNED BY $POSTGRES_EMJPM_USER;
  DROP USER IF EXISTS $POSTGRES_EMJPM_USER;
  CREATE USER $POSTGRES_EMJPM_USER with encrypted password '$POSTGRES_EMJPM_PASSWORD';
  GRANT ALL PRIVILEGES ON DATABASE emjpm TO $POSTGRES_EMJPM_USER;
  ALTER USER $POSTGRES_EMJPM_USER CREATEDB;

  -- create pgcrypto extension, required for UUID
  CREATE EXTENSION IF NOT EXISTS pgcrypto;


EOSQL
