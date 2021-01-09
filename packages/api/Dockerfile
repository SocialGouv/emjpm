FROM node:15-alpine as node

# DEPENDENCIES
FROM node as pre-dependencies

ENV NODE_ENV=production

WORKDIR /app

COPY package.json lerna.json yarn.lock /app/
COPY packages/api/package.json /app/packages/api/package.json
COPY packages/biz/package.json /app/packages/biz/package.json

FROM pre-dependencies as dependencies
RUN yarn --frozen-lockfile --ignore-scripts --production=false

# BUILDER
FROM dependencies as builder

COPY packages/api/ /app/packages/api/
COPY packages/biz/ /app/packages/biz/

RUN yarn workspace @emjpm/api run postinstall
RUN yarn workspace @emjpm/api build

# SERVER
FROM node as server

ENV NODE_ENV=production

# p7zip is used to unzip encrypted file from OCMI
# p7zip is required by https://github.com/quentinrossetti/node-7z#installation
RUN apk add --update --no-cache p7zip

WORKDIR /app

COPY --from=builder /app/packages/api/dist/ /app/dist/

USER node

CMD ["node","/app/dist/index.js"]
