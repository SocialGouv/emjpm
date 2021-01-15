# syntax = docker/dockerfile:experimental

ARG NODE_VERSION=15-alpine
ARG BUILD_ENV=pure
FROM node:$NODE_VERSION as node

ENV NODE_ENV=production

WORKDIR /app

# BUILD ENVIRONMENTS
FROM node as build_pure

COPY package.json yarn.lock /app/
COPY packages/api/package.ci.json  /app/packages/api/package.json
COPY packages/biz/package.ci.json /app/packages/biz/package.json

RUN yarn --frozen-lockfile --production --ignore-scripts

COPY packages/api/src /app/packages/api/src/
COPY packages/api/.eslintrc.yml  /app/packages/api/.eslintrc.yml
COPY packages/api/knexfile.js  /app/packages/api/knexfile.js
COPY lerna.json /app/packages/api/src/lerna.ci.json

COPY packages/biz/src /app/packages/biz/src/
COPY packages/biz/.eslintrc.yml  /app/packages/biz/.eslintrc.yml

RUN yarn workspaces run postinstall
RUN yarn workspace @emjpm/api build

FROM node as build_usecache
ONBUILD COPY packages/api/dist packages/api/dist/

# BUILDER
FROM build_${BUILD_ENV} as builder


# SERVER
FROM node as server

ENV NODE_ENV=production

# p7zip is used to unzip encrypted file from OCMI
# p7zip is required by https://github.com/quentinrossetti/node-7z#installation
RUN apk add --update --no-cache p7zip

WORKDIR /app

USER node

CMD ["node","/app/dist/index.js"]

COPY --from=builder /app/packages/api/dist/ /app/dist/
