export const getConfiguration = (env: typeof process.env) => {
  return {
    HASURA_GRAPHQL_ADMIN_SECRET: env.HASURA_GRAPHQL_ADMIN_SECRET || "",
    HASURA_GRAPHQL_URI:
      env.HASURA_GRAPHQL_URI || "http://localhost:5000/v1/graphql",
    PORT: env.PORT || 4001
  };
};
