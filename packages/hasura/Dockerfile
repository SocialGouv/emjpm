FROM hasura/graphql-engine:v2.0.0-alpha.11.cli-migrations-v3

ENV HASURA_GRAPHQL_V1_BOOLEAN_NULL_COLLAPSE=true

#ENV HASURA_GRAPHQL_CONSOLE_ASSETS_DIR=/srv/console-assets
#ENV HASURA_GRAPHQL_ENABLE_TELEMETRY=false
ENV HASURA_GRAPHQL_MIGRATIONS_SERVER_TIMEOUT=180
#ENV HASURA_GRAPHQL_SHOW_UPDATE_NOTIFICATION=false
#ENV HASURA_GRAPHQL_SERVER_PORT=8080
#ENV HASURA_GRAPHQL_CLI_ENVIRONMENT=default

#ENV HASURA_GRAPHQL_DEV_MODE=true
#ENV HASURA_GRAPHQL_ADMIN_INTERNAL_ERRORS=true

#COPY packages/hasura/bin/ /bin/
#ENTRYPOINT ["wait-for", "api:4000", "--", "docker-entrypoint.sh"]
#CMD ["graphql-engine", "serve"]

COPY packages/hasura/metadata /hasura-metadata
COPY packages/hasura/migrations /hasura-migrations
