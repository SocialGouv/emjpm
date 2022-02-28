import { ApolloProvider } from "@apollo/client";

import useInitApolloClient from "./useInitApolloClient";

const initialState = {};

export default function AppApollo({ children }) {
  const apolloClient = useInitApolloClient(initialState);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
