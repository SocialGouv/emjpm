ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM node:10-alpine

WORKDIR /app

COPY --from=emjpm-base-image /app/packages/graphql-server/dist /app/dist
COPY ./package.json /app/package.json

ENTRYPOINT [ "yarn", "start" ]
