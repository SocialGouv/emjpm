ARG API_URL
ARG SENTRY_PUBLIC_DSN

ENV API_URL $API_URL
ENV SENTRY_PUBLIC_DSN $SENTRY_PUBLIC_DSN

ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM nginx:1.16-alpine

WORKDIR /app

COPY --from=emjpm-base-image /app/packages/app/out /www

COPY nginx.conf /etc/nginx/nginx.conf
