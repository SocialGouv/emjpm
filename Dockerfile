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

RUN yarn --frozen-lockfile --cache-folder /dev/shm/yarn

COPY ./packages/api /app/packages/api
COPY ./packages/app /app/packages/app
COPY ./packages/graphql-server /app/packages/graphql-server
COPY ./packages/knex /app/packages/knex

# NOTE(douglasduteil): manual node_modules transpilation
RUN sh ./packages/app/scripts/transpile_modules.sh

# NOTE(douglasduteil): add frontend app environment variables
# The frontend app needs to be built with %%ENV_VALUE%% so we can switch endpoint at runtime
ARG API_URL=${API_URL:-%%API_URL%%}
ARG SENTRY_PUBLIC_DSN=${SENTRY_PUBLIC_DSN:-%%SENTRY_PUBLIC_DSN%%}
ARG GRAPHQL_SERVER_URI=${GRAPHQL_SERVER_URI:-%%GRAPHQL_SERVER_URI%%}

RUN yarn build --stream

# Optional packages not required
COPY ./optional/e2e /app/optional/e2e
