ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

#

FROM cypress/base:10.16.0

# Installing cypress
COPY ./package.json /app/e2e/package.json
COPY ./yarn.lock /app/e2e/yarn.lock

WORKDIR /app/e2e
RUN yarn --frozen-lockfile && yarn cache clean

#

# Installing partial monorepo with knex in it
COPY --from=emjpm-base-image /app/lerna.json /lerna.json
COPY --from=emjpm-base-image /app/package.json /package.json
COPY --from=emjpm-base-image /app/packages/knex /packages/knex
COPY --from=emjpm-base-image /app/yarn.lock /yarn.lock

WORKDIR /
RUN yarn --production --ignore-scripts && yarn cache clean

#

WORKDIR /app/e2e
COPY ./cypress /app/e2e/cypress
COPY ./cypress.json /app/e2e/cypress.json
