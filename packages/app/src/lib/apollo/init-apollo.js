import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import { isBrowser } from "../../util";
import cookie from "js-cookie";
import { ApolloLink, concat } from "apollo-link";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

const getToken = () => {
  let token = null;
  if (typeof document !== "undefined") {
    token = "Bearer " + cookie.get("token");
  }
  return token;
};

const {
  publicRuntimeConfig: { GRAPHQL_SERVER_URI }
} = getConfig();

function create(initialState) {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: getToken()
      }
    });

    return forward(operation);
  });

  const httpLink = createHttpLink({
    uri: GRAPHQL_SERVER_URI,
    credentials: "same-origin"
  });

  const cache = new InMemoryCache().restore(initialState || {});

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser(),
    ssrMode: false,
    link: concat(authMiddleware, httpLink),
    cache: cache,
    resolvers: {}
  });
}

export default function initApollo(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
