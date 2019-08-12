ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM node:10-alpine

WORKDIR /app

COPY --from=emjpm-base-image /app/packages/graphql-server/dist /app/dist

EXPOSE 4001

ENTRYPOINT [ "yarn", "start" ]
