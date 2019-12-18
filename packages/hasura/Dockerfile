FROM hasura/graphql-engine:v1.0.0

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false

COPY ./migrations /hasura-migrations

COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
