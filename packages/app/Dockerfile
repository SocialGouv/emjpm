FROM node:10-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

COPY package.json yarn.lock /app/

RUN yarn --production --frozen-lockfile --no-cache

COPY ./next.config.js /app/
COPY ./static/ /app/static
COPY .next /app/.next

ENTRYPOINT ["yarn", "start:build"]
