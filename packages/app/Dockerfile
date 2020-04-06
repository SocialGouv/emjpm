FROM node:10-alpine

WORKDIR /home/app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY ./scripts /home/app/scripts
COPY ./packages/ui/package.json /home/app/packages/ui/
COPY ./packages/app/package.json /home/app/packages/app/
COPY ./package.json ./yarn.lock /home/app/

RUN set -ex \
  # The row monorepo install is more that 1Go of node_modules T-T
  # `scripts/remove_devdeps.js` will manually remove dev dependencies as
  # `--production` is not working on workspaces T-T
  # node_modules ~ 211Mo
  && node scripts/remove_devdeps.js /home/app/package.json \
  # node_modules ~ 178Mo
  && node scripts/remove_devdeps.js /home/app/packages/ui/package.json \
  # node_modules ~ 178Mo
  && node scripts/remove_devdeps.js /home/app/packages/app/package.json \
  ;

RUN yarn --frozen-lockfile --cache-folder /dev/shm/yarn

COPY ./packages/ui/dist /home/app/packages/ui/dist/
COPY ./packages/app/.next /home/app/packages/app/.next/

ENTRYPOINT ["yarn", "workspace", "@emjpm/app", "next", "start"]
