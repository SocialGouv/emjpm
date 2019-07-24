import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient, ApolloQueryResult } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { DocumentNode } from "graphql";
import fetch from "node-fetch";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch,
    uri: "http://localhost:5000/v1/graphql"
  })
});

export const query: <T>(
  query: DocumentNode
) => Promise<ApolloQueryResult<T>> = <T>(gqlQuery: DocumentNode) => {
  // a query with apollo-client
  return client.query<T>({
    context: {
      // example of setting the headers with context per operation
      headers: {
        "x-hasura-admin-secret": "secret"
      }
    },
    query: gqlQuery
  });
};
