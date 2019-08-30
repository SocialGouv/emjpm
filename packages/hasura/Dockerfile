FROM hasura/graphql-engine:v1.0.0-beta.6.cli-migrations

COPY ./migrations /hasura-migrations

COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
