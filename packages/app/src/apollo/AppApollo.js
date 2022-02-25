import { ApolloProvider } from "@apollo/client";

import useInitApolloClient from "./useInitApolloClient";
import { useAuth } from "~/user/Auth";

export default function AppApollo({ children }) {
  const { authStore, renewToken } = useAuth();

  const apolloClient = useInitApolloClient({}, authStore, renewToken);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
