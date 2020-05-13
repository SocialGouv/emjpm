FROM node:14-alpine

COPY ./package.json /app/
COPY ./dist /app/dist

WORKDIR /app

ENTRYPOINT [ "yarn", "start" ]
