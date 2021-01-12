ARG NODE_VERSION=15-alpine
ARG BUILD_ENV=pure
FROM node:$NODE_VERSION as node

ENV NODE_ENV=production

WORKDIR /app

# BUILD ENVIRONMENTS
FROM node as build_pure

COPY package.json yarn.lock /app/
COPY packages/app/package.ci.json  /app/packages/app/package.json
COPY packages/biz/package.ci.json /app/packages/biz/package.json

RUN yarn --frozen-lockfile --production --ignore-scripts


COPY packages/app/src /app/packages/app/src/
COPY packages/app/.eslintrc.yml  /app/packages/app/.eslintrc.yml
COPY packages/app/public /app/packages/app/public/
COPY lerna.json /app/packages/app/src/lerna.ci.json

COPY packages/biz/src /app/packages/biz/src/
COPY packages/biz/.eslintrc.yml  /app/packages/biz/.eslintrc.yml

ARG REACT_APP_SENTRY_PUBLIC_DSN
ARG REACT_APP_GRAPHQL_SERVER_URI
ARG REACT_APP_API_URL
ENV REACT_APP_SENTRY_PUBLIC_DSN=$REACT_APP_SENTRY_PUBLIC_DSN
ENV REACT_APP_GRAPHQL_SERVER_URI=$REACT_APP_GRAPHQL_SERVER_URI
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN yarn workspaces run postinstall
RUN yarn workspace @emjpm/app build

FROM dependencies as build_usecache
ONBUILD COPY packages/app/build packages/app/build/

# BUILDER
FROM build_${BUILD_ENV} as builder


# SERVER
FROM node as server

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g serve

USER node

CMD ["serve","-s","build"]

COPY --from=builder /app/packages/app/build /app/build/
