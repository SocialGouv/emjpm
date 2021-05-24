FROM hasura/graphql-engine:v1.3.2.cli-migrations-v2

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY=false
ENV HASURA_GRAPHQL_MIGRATIONS_SERVER_TIMEOUT=180
ENV HASURA_GRAPHQL_SHOW_UPDATE_NOTIFICATION=false
ENV HASURA_GRAPHQL_SERVER_PORT=8080
ENV HASURA_GRAPHQL_CLI_ENVIRONMENT=default

# COPY packages/hasura/docker-entrypoint.sh /bin/
# RUN addgroup -g 1000 hasura \
#  && adduser -u 1000 -s /bin/sh -S -G hasura hasura
# RUN mkdir /tmp/plugins-downloads/cli-ext
# RUN chown hasura:hasura -R /tmp/plugins-downloads/cli-ext
# USER hasura

COPY packages/hasura/bin/ /bin/

ENTRYPOINT ["wait-for", "api:4000", "--", "docker-entrypoint.sh"]

CMD ["graphql-engine", "serve"]

COPY packages/hasura/metadata /hasura-metadata
COPY packages/hasura/migrations /hasura-migrations
