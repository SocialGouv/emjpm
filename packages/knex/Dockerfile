FROM node:14-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json yarn.lock /app/

RUN yarn --production --frozen-lockfile --no-cache

COPY ./tis_Ile_de_France.csv /app/tis_Ile_de_France.csv
COPY ./sql /app/sql
COPY ./seeds /app/seeds
COPY ./knexfile.js /app/knexfile.js
COPY ./migrations /app/migrations
COPY ./migrations_v2 /app/migrations_v2
