FROM hasura/graphql-engine:v1.0.0-beta.8.cli-migrations

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false

COPY ./migrations /hasura-migrations

COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
