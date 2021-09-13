ARG HASURA_VERSION=v2.0.8
ARG NODE_VERSION=16-alpine
FROM node:$NODE_VERSION as node

ENV HASURA_VERSION=$HASURA_VERSION
ENV HASURA_GRAPHQL_ENABLE_TELEMETRY=false
ENV HASURA_GRAPHQL_CONSOLE_ASSETS_DIR=/srv/console-assets

RUN apk add --update --no-cache socat bash

RUN npm i -g hasura-cli@${HASURA_VERSION}

COPY packages/hasura/console/start.sh /hasura/
COPY packages/hasura/console/entrypoint.sh /bin/
COPY packages/hasura/console/config.yaml /hasura/
COPY packages/hasura/bin/wait-for /bin/

RUN mkdir -p /hasura && chown node:node /hasura
WORKDIR /hasura
USER node
ENTRYPOINT ["/bin/entrypoint.sh"]
CMD [ "/hasura/start.sh" ]

EXPOSE 9695