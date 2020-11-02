import "../src/polyfills";

import { presetEmjpm } from "@emjpm/ui";
import jwtDecode from "jwt-decode";
import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "theme-ui";

import { UserProvider } from "../src/components/UserContext";
import { withApolloClient } from "../src/lib/apollo";
import { initMatomo } from "../src/matomo";
import { formatUserFromToken } from "../src/util/formatUserFromToken";
import { initSentry } from "../src/util/sentry";

class MyApp extends App {
  componentDidMount() {
    initMatomo();
    initSentry();
  }

  render() {
    const { Component, pageProps, apolloClient, err } = this.props;
    const { token } = pageProps;
    const currentUser = token ? jwtDecode(token) : null;
    const data = { currentUser: formatUserFromToken(currentUser) };
    const user = formatUserFromToken(currentUser);

    apolloClient.cache.writeData({ data });

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={presetEmjpm}>
          <UserProvider user={user}>
            {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
            <Component {...pageProps} err={err} />
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
