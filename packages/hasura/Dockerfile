FROM hasura/graphql-engine:v1.3.2.cli-migrations-v2

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false
ENV HASURA_GRAPHQL_MIGRATIONS_SERVER_TIMEOUT 180
ENV HASURA_GRAPHQL_SHOW_UPDATE_NOTIFICATION=false
ENV HASURA_GRAPHQL_SERVER_PORT=8080

COPY packages/hasura/docker-entrypoint.sh /bin/
RUN addgroup -g 1000 hasura \
  && adduser -u 1000 -s /bin/sh -S -G hasura hasura

USER 1000

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["graphql-engine", "serve"]

COPY packages/hasura/metadata /hasura-metadata
COPY packages/hasura/migrations /hasura-migrations
