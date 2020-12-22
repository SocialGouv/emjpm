FROM node:15-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY ./scripts /app/scripts
COPY ./packages/biz/package.json /app/packages/biz/
COPY ./packages/app/package.json /app/packages/app/
COPY ./package.json ./yarn.lock /app/

RUN set -ex \
  # The row monorepo install is more that 1Go of node_modules T-T
  # `scripts/remove_devdeps.js` will manually remove dev dependencies as
  # `--production` is not working on workspaces T-T
  # node_modules ~ 211Mo
  && node scripts/remove_devdeps.js /app/package.json \
  # node_modules
  && node scripts/remove_devdeps.js /app/packages/biz/package.json \
  # node_modules ~ 178Mo
  && node scripts/remove_devdeps.js /app/packages/app/package.json \
  ;

RUN yarn --frozen-lockfile --cache-folder /dev/shm/yarn

COPY ./packages/biz /app/packages/biz/
COPY ./packages/app/public /app/packages/app/public/
COPY ./packages/app/next.config.js /app/packages/app/next.config.js
COPY ./packages/app/.next /app/packages/app/.next/

RUN mkdir -p /app/node_modules/@emjpm/biz \
  && ln -s ./packages/biz /app/node_modules/@emjpm/biz

ENTRYPOINT ["yarn", "workspace", "@emjpm/app", "start:build"]
