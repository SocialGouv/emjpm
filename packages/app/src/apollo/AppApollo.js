import { ApolloProvider } from "@apollo/client";

import useInitApolloClient from "./useInitApolloClient";
import { useAuth } from "~/user/Auth";

export default function AppApollo({ children }) {
  const { authStore } = useAuth();
  const apolloClient = useInitApolloClient({}, authStore.token);
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
