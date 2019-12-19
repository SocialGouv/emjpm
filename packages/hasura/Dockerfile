FROM hasura/graphql-engine:v1.0.0.cli-migrations

ENV HASURA_GRAPHQL_ENABLE_TELEMETRY false

COPY ./migrations /hasura-migrations

ENTRYPOINT ["docker-entrypoint.sh"]

CMD ["graphql-engine", "serve"]
