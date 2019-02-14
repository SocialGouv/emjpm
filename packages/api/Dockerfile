FROM node:10

COPY ./package.json /app/package.json
COPY ./scripts /app/scripts
COPY ./db /app/db
COPY ./knexfile.js /app/knexfile.js

COPY ./dist /app/dist

WORKDIR /app

ENV NODE_ENV production

ENTRYPOINT ["/app/scripts/docker-entrypoint.sh"]
