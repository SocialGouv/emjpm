ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

#

FROM cypress/base:10.15.3

COPY ./package.json /app/e2e/package.json
COPY ./yarn.lock /app/e2e/yarn.lock

WORKDIR /app/e2e
RUN yarn --frozen-lockfile && yarn cache clean

COPY ./cypress /app/e2e/cypress
COPY ./cypress.json /app/e2e/cypress.json

#

COPY --from=emjpm-base-image /app/lerna.json /lerna.json
COPY --from=emjpm-base-image /app/package.json /package.json
COPY --from=emjpm-base-image /app/node_modules /node_modules

COPY --from=emjpm-base-image /app/packages/knex /packages/knex
