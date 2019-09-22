#!/bin/bash
cd /app
yarn workspace @emjpm/knex run migrate
yarn workspace @emjpm/knex run seeds
