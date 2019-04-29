FROM node:10-stretch

COPY ./package.json /app/package.json
COPY ./packages/jest-environment-knex/package.json /app/packages/jest-environment-knex/package
COPY ./packages/api/package.json /app/packages/api/package.json
COPY ./packages/app/package.json /app/packages/app/package.json
COPY ./packages/knex/package.json /app/packages/knex/package.json

COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn --frozen-lockfile && yarn cache clean

#

COPY ./lerna.json /app/lerna.json
COPY ./packages/knex /app/packages/knex
COPY ./packages/api /app/packages/api
COPY ./packages/app /app/packages/app

RUN yarn build
