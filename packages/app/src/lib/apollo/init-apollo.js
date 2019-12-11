import { ApolloClient, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import cookie from "js-cookie";
import nextCookies from "next-cookies";
import getConfig from "next/config";

import { isBrowser } from "../../util";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

const getToken = context => {
  let token = null;
  if (typeof document === "undefined") {
    const cookies = nextCookies(context.ctx);
    token = cookies.token;
  } else {
    token = cookie.get("token");
  }
  if (!token) {
    return null;
  }
  return "Bearer " + token;
};

const {
  publicRuntimeConfig: { GRAPHQL_SERVER_URI }
} = getConfig();

function create(initialState, context) {
  const authLink = setContext((_, { headers }) => {
    const token = getToken(context);
    if (token) {
      return {
        headers: {
          ...headers,
          Authorization: token ? token : null
        }
      };
    }
    return {
      headers: {
        ...headers,
        "X-Hasura-Role": "anonymous"
      }
    };
  });

  const httpLink = createHttpLink({
    credentials: "same-origin",
    uri: GRAPHQL_SERVER_URI
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    connectToDevTools: isBrowser(),
    link: authLink.concat(httpLink),
    resolvers: {},
    ssrMode: typeof window === "undefined"
  });
}

export default function initApolloClient(initialState, context) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState, context);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
}
