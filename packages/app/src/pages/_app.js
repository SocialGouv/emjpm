import "~/polyfills";

import jwtDecode from "jwt-decode";
import App from "next/app";
import Head from "next/head";
import React from "react";
import { ApolloProvider } from "react-apollo";
import { ThemeProvider } from "theme-ui";

import { UserProvider } from "~/components/UserContext/index";
import { withApolloClient } from "~/lib/apollo";
import { initMatomo } from "~/matomo";
import { presetEmjpm } from "~/ui";
import { formatUserFromToken } from "~/util/formatUserFromToken";
import { initSentry } from "~/util/sentry";

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
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title key="title">e-MJPM</title>
        </Head>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={presetEmjpm}>
            <UserProvider user={user}>
              {/* Workaround for https://github.com/vercel/next.js/issues/8592 */}
              <Component {...pageProps} err={err} />
            </UserProvider>
          </ThemeProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApolloClient(MyApp);
