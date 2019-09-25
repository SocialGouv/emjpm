ARG BASE_IMAGE=socialgouv/emjpm:master

FROM ${BASE_IMAGE} as emjpm-base-image

FROM node:10-stretch
WORKDIR /app

COPY --from=emjpm-base-image /app/packages/app/.next /app/.next
COPY --from=emjpm-base-image /app/packages/app/static /app/static
COPY --from=emjpm-base-image /app/packages/app/package.json /app/package.json
COPY --from=emjpm-base-image /app/node_modules /app/node_modules

EXPOSE 80

ENTRYPOINT ["yarn", "start:build"]
