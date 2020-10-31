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

  -- create pgcrypto extension, required for UUID
  CREATE EXTENSION IF NOT EXISTS pgcrypto;

  -- create the schemas required by the hasura system
  -- NOTE: If you are starting from scratch: drop the below schemas first, if they exist.
  CREATE SCHEMA IF NOT EXISTS hdb_catalog;
  CREATE SCHEMA IF NOT EXISTS hdb_views;

  -- make the user an owner of system schemas
  ALTER SCHEMA hdb_catalog OWNER TO $POSTGRES_EMJPM_USER;
  ALTER SCHEMA hdb_views OWNER TO $POSTGRES_EMJPM_USER;

  -- grant select permissions on information_schema and pg_catalog. This is
  -- required for hasura to query the list of available tables.
  -- NOTE: these permissions are usually available by default to all users via PUBLIC grant
  GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO $POSTGRES_EMJPM_USER;
  GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO $POSTGRES_EMJPM_USER;

  -- The below permissions are optional. This is dependent on what access to your
  -- tables/schemas you want give to hasura. If you want expose the public
  -- schema for GraphQL query then give permissions on public schema to the
  -- hasura user.
  -- Be careful to use these in your production db. Consult the postgres manual or
  -- your DBA and give appropriate permissions.

  -- grant all privileges on all tables in the public schema. This can be customised:
  -- For example, if you only want to use GraphQL regular queries and not mutations,
  -- then you can set: GRANT SELECT ON ALL TABLES...
  GRANT USAGE ON SCHEMA public TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL TABLES IN SCHEMA public TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO $POSTGRES_EMJPM_USER;
  GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO $POSTGRES_EMJPM_USER;

EOSQL
