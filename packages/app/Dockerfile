ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM nginx:1.13-alpine

WORKDIR /app

COPY --from=emjpm-base-image /app/packages/app/out /www

COPY nginx.conf /etc/nginx/nginx.conf
