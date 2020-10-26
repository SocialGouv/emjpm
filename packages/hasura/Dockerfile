FROM hasura/graphql-engine:v1.3.2.cli-migrations-v2

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false

COPY ./metadata /hasura-metadata
COPY ./migrations /hasura-migrations
