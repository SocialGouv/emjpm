import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
  from,
} from "@apollo/client";

import config from "~/config";

import errorLink from "./errorLink";

const { GRAPHQL_SERVER_URI } = config;

import creds from "~/user/creds";

export default function useInitApolloClient(initialState) {
  const authMiddleware = new ApolloLink((operation, forward) => {
    const headers = operation.getContext().hasOwnProperty("headers")
      ? operation.getContext().headers
      : {};

    if (creds.token && headers["X-Hasura-Role"] !== "anonymous") {
      headers["Authorization"] = "Bearer " + creds.token;
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
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: true,
    link: from([authMiddleware, errorLink.concat(httpLink)]),
    resolvers: {},
    ssrMode: false,
  });
}
