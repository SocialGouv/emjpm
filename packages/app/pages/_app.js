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
import { captureException } from "../src/util/sentry";

class MyApp extends App {
  static async getInitialProps(appContext) {
    const { Component, ctx } = appContext;

    let pageProps = {};

    if (!Component.getInitialProps) {
      return { pageProps };
    }

    try {
      pageProps = await Component.getInitialProps(ctx);
    } catch (e) {
      captureException(e, ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    initMatomo();
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    const { token } = pageProps;
    const currentUser = token ? jwtDecode(token) : null;
    const data = { currentUser: formatUserFromToken(currentUser) };
    const user = formatUserFromToken(currentUser);

    apolloClient.cache.writeData({ data });

    return (
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={presetEmjpm}>
          <UserProvider user={user}>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
