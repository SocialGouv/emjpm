import * as Sentry from "@sentry/browser";
// all global css
import App, { Container } from "next/app";
import getConfig from "next/config";
import React from "react";
import { ApolloProvider } from "react-apollo";
import ReactPiwik from "react-piwik";
import { withApolloClient } from "../src/lib/apollo";
import { ThemeProvider } from "theme-ui";
import theme from "@socialgouv/emjpm-ui-theme";
import "react-tabs/style/react-tabs.css";
import "../static/css/custom.css";
import "../static/css/footer.css";
import "../static/css/hero.css";
import "../static/css/panel.css";

export const piwik = new ReactPiwik({
  url: "stats.data.gouv.fr",
  siteId: 52,
  trackErrors: true
});

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

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
    sentrySetup();
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ApolloProvider>
      </Container>
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
        dsn: SENTRY_PUBLIC_DSN,
        attachStacktrace: true,
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

// function piwikSetup() {
//   const isBrowser = typeof document !== undefined;
//   if (!isBrowser) {
//     return;
//   }

//   ReactPiwik.push(["trackContentImpressionsWithinNode", document.getElementById("__next")]);

//   ReactPiwik.push(["setCustomUrl", document.location.href]);
//   ReactPiwik.push(["setDocumentTitle", document.title]);

//   trackUser();

//   ReactPiwik.push(["trackPageView"]);
//   ReactPiwik.push(["enableLinkTracking"]);
// }
