ARG NODE_VERSION=15-alpine
FROM node:$NODE_VERSION as node

ENV NODE_ENV=production

WORKDIR /app

# BUILD ENVIRONMENTS
FROM node as prepare

COPY package.json yarn.lock /app/

COPY packages/biz/package.json /app/packages/biz/package.json
RUN node -e "fs.writeFileSync('/app/packages/biz/package.json', JSON.stringify({ ...JSON.parse(fs.readFileSync('/app/packages/biz/package.json')), version: '0.0.0' }));"

COPY packages/app/package.json  /app/packages/app/package.json
RUN node -e " \
  const package = JSON.parse(fs.readFileSync('/app/packages/app/package.json')); \
  const packageZero = { ...package, version: '0.0.0', dependencies: {  \
    ...package.dependencies, \
    \"@emjpm/biz\": \"0.0.0\"  \
  } };  \
  fs.writeFileSync('/app/packages/app/package.json', JSON.stringify(packageZero));"



FROM prepare as builder
RUN yarn --frozen-lockfile --production --ignore-scripts


COPY packages/app/src /app/packages/app/src/
COPY packages/app/.eslintrc.yml  /app/packages/app/.eslintrc.yml
COPY packages/app/public /app/packages/app/public/
COPY lerna.json /app/packages/app/src/lerna.ci.json

COPY packages/biz/src /app/packages/biz/src/
COPY packages/biz/.eslintrc.yml  /app/packages/biz/.eslintrc.yml

ARG REACT_APP_SENTRY_PUBLIC_DSN
ENV REACT_APP_SENTRY_PUBLIC_DSN=$REACT_APP_SENTRY_PUBLIC_DSN

RUN yarn workspaces run postinstall
RUN yarn workspace @emjpm/app build

# SERVER
FROM node as server

ENV NODE_ENV=production
ENV PORT=3000

WORKDIR /app

RUN npm i -g serve

USER 1000

CMD ["serve","-s","build"]

COPY --from=builder /app/packages/app/build /app/build/
