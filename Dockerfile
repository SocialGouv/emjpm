FROM node:10

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./yarn.lock /app/yarn.lock

RUN yarn --frozen-lockfile && yarn cache clean

COPY ./knexfile.js /app/knexfile.js

COPY ./auth /app/auth
COPY ./config /app/config
COPY ./db /app/db
COPY ./email /app/email
COPY ./routes /app/routes

ENV NODE_ENV production

ENTRYPOINT ["yarn", "wait-migrate-and-start"]
