const fetch = require("node-fetch");

const backendAuthHeaders = {
  "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  "x-hasura-use-backend-only-permissions": true
};

const execute = async (variables, operation, headers = {}) => {
  const fetchResponse = await fetch(process.env.HASURA_GRAPHQL_URI, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query: operation,
      variables
    })
  });
  return await fetchResponse.json();
};

module.exports = { execute, backendAuthHeaders };
