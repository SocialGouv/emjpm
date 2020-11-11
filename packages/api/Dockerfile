FROM node:10-alpine

WORKDIR /app

RUN apk update && \
    apk add p7zip && \
    rm -rf /var/lib/apt/lists/* && \
    7z -h

ENV NODE_ENV=production

COPY package.json /app/

COPY ./private.pem /app/private.pem
COPY ./public.pem /app/public.pem

COPY ./dist /app/dist

ENTRYPOINT [ "yarn", "start" ]
