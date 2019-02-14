#!/bin/bash
set -xe

sleep 10

rm -rf /tmp/emjpm-db
mkdir -p /tmp/emjpm-db

cp ./knexfile.js /tmp/emjpm-db/knexfile.js
cp -r ./db /tmp/emjpm-db/db

cd /tmp/emjpm-db

yarn init --yes
yarn add knex pg
yarn knex migrate:latest

cd -

node dist/index.js
