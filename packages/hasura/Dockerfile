FROM hasura/graphql-engine:v1.0.0-beta.4.cli-migrations

COPY ./scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
