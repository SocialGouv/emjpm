FROM node:15-alpine as node

# BUILDER
FROM node as builder

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

## INSTALL
COPY package.json lerna.json yarn.lock /app/
COPY packages/app/package.json /app/packages/app/package.json
COPY packages/biz/package.json /app/packages/biz/package.json

RUN mkdir /.yarn-cache
RUN yarn config set cache-folder /.yarn-cache
RUN yarn --frozen-lockfile --ignore-scripts --production=false

## BUILD
COPY packages/app/ /app/packages/app/
COPY packages/biz/ /app/packages/biz/

RUN yarn workspace @emjpm/app run postinstall
RUN yarn workspace @emjpm/app build

# SERVER
FROM node as server

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /app

COPY --from=builder /app/package.json /app/lerna.json /app/
COPY --from=builder /app/node_modules /app/node_modules/
COPY --from=builder /app/packages/app/node_modules /app/packages/app/node_modules/
COPY --from=builder /app/packages/app/public /app/packages/app/public/
COPY --from=builder /app/packages/app/next.config.js /app/packages/app/next.config.js
COPY --from=builder /app/packages/app/package.json /app/packages/app/package.json
COPY --from=builder /app/packages/app/.next /app/packages/app/.next/
COPY --from=builder /app/packages/biz /app/packages/biz

USER node

CMD ["yarn", "workspace", "@emjpm/app", "start:build"]
