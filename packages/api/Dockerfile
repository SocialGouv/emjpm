FROM node:10-alpine

WORKDIR /app

# p7zip is used to unzip encrypted file from OCMI
# p7zip is required by https://github.com/quentinrossetti/node-7z#installation
RUN apk add --update --no-cache p7zip

ENV NODE_ENV=production

COPY package.json /app/

COPY ./dist /app/dist

ENTRYPOINT [ "yarn", "start" ]
