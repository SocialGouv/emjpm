import * as Sentry from "@sentry/browser";
import theme from "@socialgouv/emjpm-ui-theme";
import jwtDecode from "jwt-decode";
// all global css
import App from "next/app";
import getConfig from "next/config";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactPiwik from "react-piwik";
import { ThemeProvider } from "theme-ui";

import { UserProvider } from "../src/components-v2/UserContext";
import { withApolloClient } from "../src/lib/apollo";
import { piwikSetup } from "../src/piwik";
import { formatUserFromToken } from "../src/util/formatUserFromToken";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

new ReactPiwik({
  siteId: 13,
  trackErrors: true,
  url: "matomo.tools.factory.social.gouv.fr"
});

class MyApp extends App {
  static async getInitialProps(appContext) {
    const { Component, ctx } = appContext;

    let pageProps = {};

    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (e) {
      Sentry.captureException(e, ctx);
      //throw e; // you can also skip re-throwing and set property on pageProps
    }

    return {
      pageProps
    };
  }

  componentDidMount() {
    piwikSetup();
    sentrySetup();
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

//

function sentrySetup() {
  const isBrowser = typeof document !== undefined;
  if (!isBrowser) {
    return;
  }
  if (SENTRY_PUBLIC_DSN) {
    try {
      Sentry.init({
        attachStacktrace: true,
        dsn: SENTRY_PUBLIC_DSN,
        integrations: integrations => {
          // remove dedupe plugin
          return integrations.filter(integration => integration.name !== "Dedupe");
        }
        //tags: { git_commit: "c0deb10c4" }
      });
    } catch (error) {
      /* eslint-disable no-console */
      console.log(error);
      /* eslint-enable no-console */
    }
  }
}
