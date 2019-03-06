FROM node:10-alpine as builder

RUN apk add -U tzdata
RUN cp /usr/share/zoneinfo/Europe/Paris /etc/localtime

WORKDIR /app

COPY ./package.json .
#COPY ./yarn.lock /app/yarn.lock

RUN yarn --frozen-lockfile && yarn cache clean

COPY ./next.config.js .
COPY ./pages ./pages
COPY ./src ./src
COPY ./static ./static

#
# atm this app is built statically so we cannot inject env vars at runtime
# we use args to expose them as env var *during the build phase*, inside the container*
#

ARG API_URL
ARG SENTRY_PUBLIC_DSN

ENV API_URL $API_URL
ENV SENTRY_PUBLIC_DSN $SENTRY_PUBLIC_DSN

RUN yarn build

FROM nginx:1.13-alpine

COPY --from=builder /app/out /www

COPY nginx.conf /etc/nginx/nginx.conf
