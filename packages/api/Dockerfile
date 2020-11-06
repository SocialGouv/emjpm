FROM node:10-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app/

COPY ./config/private.pem /app/config/private.pem
COPY ./config/public.pem /app/config/public.pem

COPY ./dist /app/dist

ENTRYPOINT [ "yarn", "start" ]
