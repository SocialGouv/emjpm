FROM hasura/graphql-engine:v1.3.2.cli-migrations-v2

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false
ENV HASURA_GRAPHQL_MIGRATIONS_SERVER_TIMEOUT 180
ENV HASURA_GRAPHQL_CLI_ENVIRONMENT=server-on-docker
ENV HASURA_GRAPHQL_SHOW_UPDATE_NOTIFICATION=false

COPY packages/hasura/docker-entrypoint.sh /bin/
RUN chmod +x /bin/hasura-cli\
  && addgroup -g 1000 hasura \
  && adduser -u 1000 -s /bin/sh -S -G hasura hasura

USER 1000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["graphql-engine", "serve", "-p", "8080"]

COPY packages/hasura/metadata /hasura-metadata
COPY packages/hasura/migrations /hasura-migrations
