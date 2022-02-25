import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";

import config from "~/config";

import createErrorLink from "./errorLink";

const { GRAPHQL_SERVER_URI } = config;

export default function useInitApolloClient(
  initialState,
  authStore,
  renewToken
) {
  const authMiddleware = new ApolloLink((operation, forward) => {
    const headers = operation.getContext().hasOwnProperty("headers")
      ? operation.getContext().headers
      : {};

    if (authStore?.token && headers["X-Hasura-Role"] !== "anonymous") {
      headers["Authorization"] = "Bearer " + authStore.token;
    } else {
      headers["X-Hasura-Role"] = "anonymous";
    }
    operation.setContext({ headers });
    return forward(operation);
  });

  const httpLink = new HttpLink({
    credentials: "same-origin",
    uri: GRAPHQL_SERVER_URI,
  });
  const errorLink = createErrorLink(authStore, renewToken);
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: true,
    link: from([authMiddleware, errorLink.concat(httpLink)]),
    resolvers: {},
    ssrMode: false,
  });
}
