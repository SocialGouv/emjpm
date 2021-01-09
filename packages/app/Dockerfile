FROM node:15-alpine as node

# DEPENDENCIES
FROM node as dependencies

ENV NODE_ENV=production

RUN apk add --update --no-cache curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /app
COPY package.json lerna.json yarn.lock ./
COPY packages/app/package.json ./packages/app/package.json
COPY packages/biz/package.json ./packages/biz/package.json

RUN yarn --frozen-lockfile --ignore-scripts --production=false --cache-folder /dev/shm/yarn_cache

# BUILDER
FROM dependencies as builder
ARG REACT_APP_SENTRY_PUBLIC_DSN=https://d9ba9b75ff784cba87abd847b6162b02@sentry.fabrique.social.gouv.fr/3
ARG REACT_APP_GRAPHQL_SERVER_URI=//hasura-emjpm.fabrique.social.gouv.fr/v1/graphql
ARG REACT_APP_API_URL=//api-emjpm.fabrique.social.gouv.fr

ENV REACT_APP_SENTRY_PUBLIC_DSN=$REACT_APP_SENTRY_PUBLIC_DSN
ENV REACT_APP_GRAPHQL_SERVER_URI=$REACT_APP_GRAPHQL_SERVER_URI
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY packages/app/ /app/packages/app/
COPY packages/biz/ /app/packages/biz/

RUN yarn workspace @emjpm/app run postinstall
RUN yarn workspace @emjpm/app build

# SERVER
FROM node as server

ENV NODE_ENV=production

WORKDIR /app

RUN yarn global add serve

COPY --from=builder /app/packages/app/build /app/build/

USER node

CMD ["serve","-s","build"]
