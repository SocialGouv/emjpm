#!/bin/bash
set -e

POSTGRES_EMJPM_USER=${POSTGRES_EMJPM_USER:="emjpm"}
POSTGRES_EMJPM_PASSWORD=${POSTGRES_EMJPM_PASSWORD:="test"}
POSTGRES_HASURA_USER=${POSTGRES_HASURA_USER:="hasura"}
POSTGRES_HASURA_PASSWORD=${POSTGRES_HASURA_PASSWORD:="hasura"}

# HACK(douglasduteil): recreate dummy users if not exist.
# As there is no `DROP *IF EXISTS* OWNED BY <role>`, I'm creating dummy users so
# `DROP OWNED BY <role>` doesn't fail on me T-T
createuser $POSTGRES_EMJPM_USER || true;
createuser $POSTGRES_HASURA_USER || true;

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
  -- hasura user
  DROP OWNED BY $POSTGRES_HASURA_USER CASCADE;
  DROP USER IF EXISTS $POSTGRES_HASURA_USER;

  CREATE USER ${POSTGRES_HASURA_USER} with encrypted password '${POSTGRES_HASURA_PASSWORD}';
  ALTER USER ${POSTGRES_HASURA_USER} WITH SUPERUSER;
  GRANT ALL PRIVILEGES ON DATABASE emjpm TO ${POSTGRES_HASURA_USER};

  -- create pgcrypto extension, required for UUID
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  -- create the schemas required by the hasura system
  -- NOTE: If you are starting from scratch: drop the below schemas first, if they exist.
  CREATE SCHEMA IF NOT EXISTS hdb_catalog;
  CREATE SCHEMA IF NOT EXISTS hdb_views;

  -- make the user an owner of system schemas
  ALTER SCHEMA hdb_catalog OWNER TO ${POSTGRES_HASURA_USER};
  ALTER SCHEMA hdb_views OWNER TO ${POSTGRES_HASURA_USER};

  -- grant select permissions on information_schema and pg_catalog. This is
  -- required for hasura to query list of available tables
  GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO ${POSTGRES_HASURA_USER};
  GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO ${POSTGRES_HASURA_USER};

  -- Below permissions are optional. This is dependent on what access to your
  -- tables/schemas - you want give to hasura. If you want expose the public
  -- schema for GraphQL query then give permissions on public schema to the
  -- hasura user.
  -- Be careful to use these in your production db. Consult the postgres manual or
  -- your DBA and give appropriate permissions.

  -- grant all privileges on all tables in the public schema. This can be customised:
  -- For example, if you only want to use GraphQL regular queries and not mutations,
  -- then you can set: GRANT SELECT ON ALL TABLES...
  GRANT USAGE ON SCHEMA public TO ${POSTGRES_HASURA_USER};
  GRANT ALL ON ALL TABLES IN SCHEMA public TO ${POSTGRES_HASURA_USER};
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${POSTGRES_HASURA_USER};

  GRANT USAGE ON SCHEMA hdb_views TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL TABLES IN SCHEMA hdb_views TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA hdb_views TO $POSTGRES_EMJPM_USER;

  GRANT USAGE ON SCHEMA hdb_catalog TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL TABLES IN SCHEMA hdb_catalog TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA hdb_catalog TO $POSTGRES_EMJPM_USER;


EOSQL
