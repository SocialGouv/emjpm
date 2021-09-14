ARG HASURA_VERSION=v2.0.8
ARG NODE_VERSION=16-alpine
FROM node:$NODE_VERSION as node

ENV HASURA_VERSION=$HASURA_VERSION
ENV HASURA_GRAPHQL_ENABLE_TELEMETRY=false
ENV HASURA_GRAPHQL_CONSOLE_ASSETS_DIR=/srv/console-assets

RUN apk add --update --no-cache socat bash

# https://github.com/hasura/graphql-engine/issues/4105#issuecomment-672083278
# Fetch additional tools and libraries
RUN apk add --update --no-cache go postgresql-client curl gcc libc-dev libstdc++6 && \
    # install glibc for hasura-cli
    # https://github.com/hasura/graphql-engine/issues/4105#issuecomment-609639030
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.32-r0/glibc-2.32-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.32-r0/glibc-bin-2.32-r0.apk && \
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.32-r0/glibc-i18n-2.32-r0.apk && \
    apk add --no-cache glibc-2.32-r0.apk && \
    # handle glibc trigger error
    # https://github.com/sgerrand/alpine-pkg-glibc/issues/119#issuecomment-626627458
    rm -f /usr/glibc-compat/lib/ld-linux-x86-64.so.2 && \
    ln -s /usr/glibc-compat/lib/ld-2.32.so /usr/glibc-compat/lib/ld-linux-x86-64.so.2 && \
    apk add --no-cache glibc-bin-2.32-r0.apk glibc-i18n-2.32-r0.apk && \
    /usr/glibc-compat/bin/localedef -i en_US -f UTF-8 en_US.UTF-8

RUN npm i -g hasura-cli@${HASURA_VERSION}

COPY packages/hasura/console/start.sh /bin/
COPY packages/hasura/console/entrypoint.sh /bin/
COPY packages/hasura/bin/wait-for /bin/

RUN mkdir -p /hasura && chown node:node /hasura
WORKDIR /hasura
USER node
ENTRYPOINT ["/bin/entrypoint.sh"]
CMD [ "/bin/start.sh" ]

EXPOSE 9695
