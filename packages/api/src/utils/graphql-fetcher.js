const fetch = require("node-fetch");

const backendAuthHeaders = {
  "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  "x-hasura-use-backend-only-permissions": true,
};

const graphqlFetch = async (variables, operation, headers = {}) => {
  const fetchResponse = await fetch(process.env.HASURA_GRAPHQL_URI, {
    body: JSON.stringify({
      query: operation,
      variables,
    }),
    headers,
    method: "POST",
  });
  return await fetchResponse.json();
};

module.exports = { backendAuthHeaders, graphqlFetch };
