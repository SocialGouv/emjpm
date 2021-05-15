FROM hasura/graphql-engine:v1.3.2.cli-migrations-v2

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false
ENV HASURA_GRAPHQL_MIGRATIONS_SERVER_TIMEOUT 180

RUN chmod +x /bin/hasura-cli\
  && addgroup -g 1000 hasura \
  && adduser -u 1000 -s /bin/sh -S -G hasura hasura

USER 1000

COPY packages/hasura/metadata /hasura-metadata
COPY packages/hasura/migrations /hasura-migrations

