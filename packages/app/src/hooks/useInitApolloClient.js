import { ApolloClient, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";

import config from "~/config";

const { GRAPHQL_SERVER_URI } = config;

export default function useInitApolloClient(initialState, token) {
  const authLink = setContext((_, { headers }) => {
    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: "Bearer " + token,
        },
      };
    }
    return {
      headers: {
        ...headers,
        "X-Hasura-Role": "anonymous",
      },
    };
  });

  const httpLink = createHttpLink({
    credentials: "same-origin",
    uri: GRAPHQL_SERVER_URI,
  });

  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: true,
    link: authLink.concat(httpLink),
    resolvers: {},
    ssrMode: false,
  });
}
