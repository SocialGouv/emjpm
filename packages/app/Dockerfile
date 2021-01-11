ARG BUILD_ENV=local
ARG NODE_VERSION=15-alpine
FROM node:$NODE_VERSION as node


# PRE-DEPENDENCIES
FROM node as pre-dependencies

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g lerna

COPY package.json lerna.json yarn.lock /app/
COPY packages/app/package.json /app/packages/app/package.json
COPY packages/biz/package.json /app/packages/biz/package.json
COPY ./scripts/gitops/version-zero /app/scripts/gitops/version-zero
RUN /app/scripts/gitops/version-zero
RUN lerna link


# DEPENDENCIES ENVIRONMENTS
FROM pre-dependencies as dependencies_local

FROM pre-dependencies as dependencies_gitlab_ci
ONBUILD COPY node_modules node_modules/
ONBUILD COPY packages/app/node_modules packages/app/node_modules/


# DEPENDENCIES
FROM dependencies_${BUILD_ENV} as dependencies
ENV CI=true
RUN yarn --frozen-lockfile --production --ignore-scripts


# BUILDER
FROM dependencies as builder
ARG REACT_APP_SENTRY_PUBLIC_DSN
ARG REACT_APP_GRAPHQL_SERVER_URI
ARG REACT_APP_API_URL

ENV REACT_APP_SENTRY_PUBLIC_DSN=$REACT_APP_SENTRY_PUBLIC_DSN
ENV REACT_APP_GRAPHQL_SERVER_URI=$REACT_APP_GRAPHQL_SERVER_URI
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY packages/app /app/packages/app/
COPY packages/biz /app/packages/biz/

RUN yarn workspace @emjpm/app run postinstall
RUN yarn workspace @emjpm/biz run postinstall
RUN yarn workspace @emjpm/app build


# SERVER
FROM node as server

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g serve

USER node

CMD ["serve","-s","build"]

COPY --from=builder /app/packages/app/build /app/build/
