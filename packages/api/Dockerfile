ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM node:10-alpine

WORKDIR /app

COPY --from=emjpm-base-image /app/packages/api/dist /app/dist
COPY --from=emjpm-base-image /app/packages/api/package.json /app/package.json

EXPOSE 4000

ENTRYPOINT [ "yarn", "start" ]
