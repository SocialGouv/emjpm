FROM node:15-alpine as node

# DEPENDENCIES
FROM node as dependencies

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN apk add --update --no-cache curl bash
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /app
COPY package.json lerna.json yarn.lock ./
COPY packages/app/package.json ./packages/app/package.json
COPY packages/biz/package.json ./packages/biz/package.json

RUN yarn --frozen-lockfile --ignore-scripts --production=false --cache-folder /dev/shm/yarn_cache

# BUILDER
FROM dependencies as builder
COPY packages/app/ /app/packages/app/
COPY packages/biz/ /app/packages/biz/

RUN yarn workspace @emjpm/app run postinstall
RUN yarn workspace @emjpm/app build

RUN node-prune

# SERVER
FROM node as server

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/package.json /app/lerna.json /app/
COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/packages/app/node_modules /app/packages/app/node_modules/
COPY --from=builder /app/packages/app/public /app/packages/app/public/
COPY --from=builder /app/packages/app/package.json /app/packages/app/package.json
COPY --from=builder /app/packages/app/build /app/packages/app/build/
COPY --from=builder /app/packages/biz /app/packages/biz

USER node

CMD ["yarn", "workspace", "@emjpm/app", "start:build"]
