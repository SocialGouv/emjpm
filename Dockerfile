FROM node:10-stretch

# NOTE(douglasduteil): change the default timezone to Paris, Europe
# see https://w3blog.fr/2015/03/04/proxy-et-timezone-pour-votre-dockerfile/
ENV TZ Europe/Paris
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

COPY ./lerna.json /app/lerna.json
COPY ./package.json /app/package.json
COPY ./packages/api/package.json /app/packages/api/package.json
COPY ./packages/app/package.json /app/packages/app/package.json
COPY ./packages/graphql-server/package.json /app/packages/graphql-server/package.json
COPY ./packages/knex/package.json /app/packages/knex/package.json

COPY ./yarn.lock /app/yarn.lock

WORKDIR /app

RUN yarn --frozen-lockfile

COPY ./packages/api /app/packages/api
COPY ./packages/app /app/packages/app
COPY ./packages/graphql-server /app/packages/graphql-server
COPY ./packages/knex /app/packages/knex

# NOTE(douglasduteil): manual node_modules transpilation
RUN sh ./packages/app/scripts/transpile_modules.sh

RUN yarn build --stream

# Optional packages not required
COPY ./optional/e2e /app/optional/e2e
