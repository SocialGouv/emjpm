FROM node:10-alpine

WORKDIR /app

RUN apk add --update --no-cache p7zip

ENV NODE_ENV=production

COPY package.json /app/

COPY ./private.pem /app/private.pem
COPY ./public.pem /app/public.pem

COPY ./dist /app/dist

ENTRYPOINT [ "yarn", "start" ]
