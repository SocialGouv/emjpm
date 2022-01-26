ARG NODE_VERSION=15-alpine
FROM node:$NODE_VERSION as node

ENV NODE_ENV=production

WORKDIR /app

# BUILD ENVIRONMENTS
FROM node as prepare

COPY package.json yarn.lock /app/

COPY packages/biz/package.json /app/packages/biz/package.json
RUN node -e "fs.writeFileSync('/app/packages/biz/package.json', JSON.stringify({ ...JSON.parse(fs.readFileSync('/app/packages/biz/package.json')), version: '0.0.0' }));"

COPY packages/api/package.json  /app/packages/api/package.json
RUN node -e " \
  const package = JSON.parse(fs.readFileSync('/app/packages/api/package.json')); \
  const packageZero = { ...package, version: '0.0.0', dependencies: {  \
    ...package.dependencies, \
    \"@emjpm/biz\": \"0.0.0\"  \
  } };  \
  fs.writeFileSync('/app/packages/api/package.json', JSON.stringify(packageZero));"

FROM prepare as builder
RUN yarn --frozen-lockfile --production --ignore-scripts

COPY packages/api/src /app/packages/api/src/
COPY packages/api/.eslintrc.yml  /app/packages/api/.eslintrc.yml
COPY packages/api/knexfile.js  /app/packages/api/knexfile.js
COPY lerna.json /app/packages/api/src/lerna.ci.json

COPY packages/biz/src /app/packages/biz/src/
COPY packages/biz/.eslintrc.yml  /app/packages/biz/.eslintrc.yml

RUN yarn workspaces run postinstall
RUN yarn workspace @emjpm/api build

# SERVER
FROM node as server

ENV NODE_ENV=production

# p7zip is used to unzip encrypted file from OCMI
# p7zip is required by https://github.com/quentinrossetti/node-7z#installation
RUN apk add --update --no-cache p7zip

WORKDIR /app

USER 1000

CMD ["node","/app/dist/index.js"]

COPY --from=builder /app/packages/api/dist/ /app/dist/
