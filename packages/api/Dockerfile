ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM node:10-alpine

WORKDIR /app

COPY --from=emjpm-base-image /app/packages/api/dist /app/dist
COPY ./package.json /app/package.json
COPY ./private.pem /app/private.pem
COPY ./public.pem /app/public.pem

ENTRYPOINT [ "yarn", "start" ]
