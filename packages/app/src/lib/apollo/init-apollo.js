import { ApolloClient, InMemoryCache } from "apollo-boost";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import { isBrowser } from "../../util";
import cookie from "js-cookie";
import { setContext } from "apollo-link-context";
import nextCookies from "next-cookies";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

const getToken = context => {
  let token = null;
  if (typeof document === "undefined") {
    const cookies = nextCookies(context.ctx);
    token = "Bearer " + cookies.token;
  } else {
    token = "Bearer " + cookie.get("token");
  }
  return token;
};

const {
  publicRuntimeConfig: { GRAPHQL_SERVER_URI }
} = getConfig();

function create(initialState, context) {
  const authLink = setContext(() => {
    const token = getToken(context);
    return {
      headers: {
        Authorization: token ? token : null
      }
    };
  });

  const httpLink = createHttpLink({
    uri: GRAPHQL_SERVER_URI,
    credentials: "same-origin"
  });

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser(),
    ssrMode: typeof window === "undefined",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache().restore(initialState || {}),
    resolvers: {}
  });
}

export default function initApollo(initialState, context) {
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
