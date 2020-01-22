#!/bin/bash

cat <<EOF > reset-database.sql
SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE pid <> pg_backend_pid() AND datname = 'emjpm';
DROP DATABASE IF EXISTS emjpm;
CREATE DATABASE emjpm WITH OWNER = emjpm;
EOF

cat reset-database.sql | psql postgres


