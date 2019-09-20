#!/bin/bash
set -e

POSTGRES_EMJPM_USER=${POSTGRES_EMJPM_USER:="emjpm"}
POSTGRES_EMJPM_USER_PASSWORD=${POSTGRES_EMJPM_USER_PASSWORD:="test"}
POSTGRES_METABASE_USER_NAME=${POSTGRES_METABASE_USER_NAME:="metabase"}
POSTGRES_METABASE_USER_PASSWORD=${POSTGRES_METABASE_USER_PASSWORD:="metabasePassword"}
POSTGRES_HASURA_USER_NAME=${POSTGRES_HASURA_USER_NAME:="hasura"}
POSTGRES_HASURA_USER_PASSWORD=${POSTGRES_HASURA_USER_PASSWORD:="hasuraPassword"}

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
  CREATE USER $POSTGRES_EMJPM_USER with encrypted password '$POSTGRES_EMJPM_USER_PASSWORD';
  CREATE DATABASE emjpm;
  GRANT ALL PRIVILEGES ON DATABASE emjpm TO $POSTGRES_EMJPM_USER;

  -- metabase readonly user
  CREATE USER $POSTGRES_METABASE_USER_NAME with encrypted password '$POSTGRES_METABASE_USER_PASSWORD';
  GRANT CONNECT ON DATABASE emjpm TO $POSTGRES_METABASE_USER_NAME;
  GRANT USAGE ON SCHEMA public TO $POSTGRES_METABASE_USER_NAME;
  GRANT SELECT ON ALL TABLES IN SCHEMA public TO $POSTGRES_METABASE_USER_NAME;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT ON TABLES TO $POSTGRES_METABASE_USER_NAME;

  -- hasura user
  CREATE USER ${POSTGRES_HASURA_USER_NAME} with encrypted password '${POSTGRES_HASURA_USER_PASSWORD}';
  ALTER USER ${POSTGRES_HASURA_USER_NAME} WITH SUPERUSER;
  GRANT ALL PRIVILEGES ON DATABASE emjpm TO ${POSTGRES_HASURA_USER_NAME};

  -- create pgcrypto extension, required for UUID
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  -- create the schemas required by the hasura system
  -- NOTE: If you are starting from scratch: drop the below schemas first, if they exist.
  CREATE SCHEMA IF NOT EXISTS hdb_catalog;
  CREATE SCHEMA IF NOT EXISTS hdb_views;

  -- make the user an owner of system schemas
  ALTER SCHEMA hdb_catalog OWNER TO ${POSTGRES_HASURA_USER_NAME};
  ALTER SCHEMA hdb_views OWNER TO ${POSTGRES_HASURA_USER_NAME};

  -- grant select permissions on information_schema and pg_catalog. This is
  -- required for hasura to query list of available tables
  GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO ${POSTGRES_HASURA_USER_NAME};
  GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO ${POSTGRES_HASURA_USER_NAME};

  -- Below permissions are optional. This is dependent on what access to your
  -- tables/schemas - you want give to hasura. If you want expose the public
  -- schema for GraphQL query then give permissions on public schema to the
  -- hasura user.
  -- Be careful to use these in your production db. Consult the postgres manual or
  -- your DBA and give appropriate permissions.

  -- grant all privileges on all tables in the public schema. This can be customised:
  -- For example, if you only want to use GraphQL regular queries and not mutations,
  -- then you can set: GRANT SELECT ON ALL TABLES...
  GRANT USAGE ON SCHEMA public TO ${POSTGRES_HASURA_USER_NAME};
  GRANT ALL ON ALL TABLES IN SCHEMA public TO ${POSTGRES_HASURA_USER_NAME};
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO ${POSTGRES_HASURA_USER_NAME};

EOSQL
