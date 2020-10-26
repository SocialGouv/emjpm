export PGUSER=postgres
export PGPASSWORD=test

DB=emjpm
NEW_OWNER=hasura
SCHEMA=public

DUMP_FILE=$1

cat <<EOF > reset-database.sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = 'emjpm';
DROP DATABASE IF EXISTS emjpm;
CREATE DATABASE emjpm WITH OWNER = hasura;
EOF

# drop / create database emjpm
cat reset-database.sql | psql -h localhost -p 5434 -U $PGUSER

# restore production dump
pg_restore -h localhost -p 5434 --if-exists --clean --no-owner --no-acl -e -Fc -d emjpm $DUMP_FILE

# changement de propriétaire pour les tables
for tbl in `psql -h localhost -p 5434 -U $PGUSER -qAt -c "select tablename from pg_tables where schemaname = '$SCHEMA';" $DB` ; do  psql -h localhost -p 5434 -U $PGUSER -c "alter table \"$tbl\" owner to $NEW_OWNER" $DB ; done
# changement de propriétaire pour les sequences
for tbl in `psql -h localhost -p 5434 -U $PGUSER -qAt -c "select sequence_name from information_schema.sequences where sequence_schema = '$SCHEMA';" $DB` ; do  psql -h localhost -p 5434 -U $PGUSER -c "alter table \"$tbl\" owner to $NEW_OWNER" $DB ; done
# changement de propriétaire pour les views
for tbl in `psql -h localhost -p 5434 -U $PGUSER -qAt -c "select table_name from information_schema.views where table_schema = '$SCHEMA';" $DB` ; do  psql -h localhost -p 5434 -U $PGUSER -c "alter table \"$tbl\" owner to $NEW_OWNER" $DB ; done

psql -h localhost -p 5434 -d emjpm <<-EOSQL
   -- HASURA
  ALTER SCHEMA hdb_catalog OWNER TO hasura;
  ALTER SCHEMA hdb_views OWNER TO hasura;

  GRANT ALL PRIVILEGES ON DATABASE emjpm TO hasura;
  GRANT SELECT ON ALL TABLES IN SCHEMA information_schema TO hasura;
  GRANT SELECT ON ALL TABLES IN SCHEMA pg_catalog TO hasura;

  GRANT USAGE ON SCHEMA public TO hasura;
  GRANT ALL ON ALL TABLES IN SCHEMA public TO hasura;
  GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO hasura;
  ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES  ON TABLES TO hasura;
EOSQL

rm reset-database.sql
