import { ApolloClient, InMemoryCache } from "apollo-boost";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-unfetch";
import getConfig from "next/config";
import { isBrowser } from "../../util";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser()) {
  global.fetch = fetch;
}

const {
  publicRuntimeConfig: { GRAPHQL_SERVER_URI }
} = getConfig();

function create(initialState, { getToken, fetchOptions }) {
  const httpLink = createHttpLink({
    uri: GRAPHQL_SERVER_URI,
    credentials: "same-origin",
    fetchOptions
  });

  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ""
      }
    };
  });

  const cache = new InMemoryCache().restore(initialState || {});
  console.log(cache);
  cache.writeData({
    data: {
      currentId: initialState.currentId
    }
  });
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: isBrowser(),
    ssrMode: false,
    link: authLink.concat(httpLink),
    cache: cache
  });
}

export default function initApollo(initialState, options) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser()) {
    const fetchOptions = {};
    // If you are using a https_proxy, add fetchOptions with 'https-proxy-agent' agent instance
    // 'https-proxy-agent' is required here because it's a sever-side only module
    // if (process.env.https_proxy) {
    //   fetchOptions = {
    //     agent: new (require("https-proxy-agent"))(process.env.https_proxy)
    //   };
    // }
    return create(initialState, {
      ...options,
      fetchOptions
    });
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}
