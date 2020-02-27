#!/bin/bash

EMJPM_DB=${POSTGRES_DATABASE_EMJPM}

cat <<EOF > reset-database.sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = '${EMJPM_DB}';
DROP DATABASE IF EXISTS ${EMJPM_DB};
CREATE DATABASE ${EMJPM_DB} WITH OWNER = emjpm;
EOF

psql postgres -f reset-database.sql


