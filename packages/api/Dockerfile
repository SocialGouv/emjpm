FROM node:10-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package.json /app/

COPY ./dist /app/dist

ENTRYPOINT [ "yarn", "start" ]
