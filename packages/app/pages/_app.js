import "../src/polyfills";

import theme from "@socialgouv/emjpm-ui-theme";
import jwtDecode from "jwt-decode";
import App from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactPiwik from "react-piwik";
import { ThemeProvider } from "theme-ui";

import { UserProvider } from "../src/components/UserContext";
import { withApolloClient } from "../src/lib/apollo";
import { piwikSetup } from "../src/piwik";
import Sentry from "../src/sentry";
import { formatUserFromToken } from "../src/util/formatUserFromToken";

new ReactPiwik({
  siteId: 13,
  trackErrors: true,
  url: "matomo.fabrique.social.gouv.fr"
});

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
      Sentry.captureException(e, ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    piwikSetup();
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
        <ThemeProvider theme={theme}>
          <UserProvider user={user}>
            <Component {...pageProps} />
          </UserProvider>
        </ThemeProvider>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
