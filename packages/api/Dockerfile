ARG BUILD_ENV=pure
ARG NODE_VERSION=15-alpine
FROM node:$NODE_VERSION as node


# PRE-DEPENDENCIES
FROM node as pre-dependencies

ENV NODE_ENV=production

WORKDIR /app

RUN npm i -g lerna

COPY package.json lerna.json yarn.lock /app/
COPY packages/api/package.json /app/packages/api/package.json
COPY packages/biz/package.json /app/packages/biz/package.json

RUN npm i -g glob
COPY ./scripts/gitops/version-zero /app/scripts/gitops/version-zero
RUN NODE_PATH=$(npm root -g) /app/scripts/gitops/version-zero

RUN lerna link


# DEPENDENCIES ENVIRONMENTS
FROM pre-dependencies as dependencies_pure

FROM pre-dependencies as dependencies_usecache
ONBUILD COPY node_modules node_modules/
ONBUILD COPY packages/api/node_modules packages/api/node_modules/


# DEPENDENCIES
FROM dependencies_${BUILD_ENV} as dependencies
RUN yarn --frozen-lockfile --production --ignore-scripts


# BUILDER
FROM dependencies as builder

COPY packages/api /app/packages/api/
COPY packages/biz /app/packages/biz/

RUN yarn workspace @emjpm/api run postinstall
RUN yarn workspace @emjpm/biz run postinstall
RUN yarn workspace @emjpm/api build


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
