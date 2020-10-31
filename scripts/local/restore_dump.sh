export PGUSER=postgres
export PGPASSWORD=test

DB=emjpm
NEW_OWNER=emjpm
DUMP_FILE=$1

# drop / create database emjpm
cat <<EOF > reset-database.sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = 'emjpm';
DROP DATABASE IF EXISTS emjpm;
CREATE DATABASE emjpm WITH OWNER = $NEW_OWNER;
EOF

cat reset-database.sql | psql -h localhost -p 5434 -U $PGUSER
rm reset-database.sql

export PGUSER=emjpm
export PGPASSWORD=test

# restore production dump
pg_restore -h localhost -p 5434 --if-exists --clean --no-owner --no-acl -e -Fc -d emjpm $DUMP_FILE

# clear hasura
cat <<EOF > clean-hasura.sql
DELETE FROM hdb_catalog.event_invocation_logs;
DELETE FROM hdb_catalog.event_log;
DELETE FROM hdb_catalog.event_triggers ;
EOF

cat reset-database.sql | psql -h localhost -p 5434 -U $PGUSER
rm reset-database.sql
