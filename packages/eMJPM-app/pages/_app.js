import * as Sentry from "@sentry/browser";
import App, { Container } from "next/app";
import getConfig from "next/config";
import React from "react";
import piwik, { trackUser } from "../src/piwik";

const {
  publicRuntimeConfig: { SENTRY_PUBLIC_DSN }
} = getConfig();

// all global css
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "../static/css/hero.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../static/css/panel.css";

export default class MyApp extends App {
  static async getInitialProps(appContext) {
    const { Component, ctx } = appContext;

    let pageProps = {};

    try {
      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }
    } catch (e) {
      Sentry.captureException(e, ctx);
      throw e; // you can also skip re-throwing and set property on pageProps
    }

    return {
      pageProps
    };
  }

  componentDidMount() {
    piwikSetup();
    Sentry.init({
      dsn: SENTRY_PUBLIC_DSN,
      attachStacktrace: true,
      integrations: integrations => {
        // remove dedupe plugin
        return integrations.filter(integration => integration.name !== "Dedupe");
      }
      //tags: { git_commit: "c0deb10c4" }
    });
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

//

function piwikSetup() {
  const isBrowser = typeof document !== undefined;
  if (!isBrowser) {
    return;
  }

  piwik.push(["trackContentImpressionsWithinNode", document.getElementById("__next")]);

  piwik.push(["setCustomUrl", document.location.href]);
  piwik.push(["setDocumentTitle", document.title]);

  trackUser();

  piwik.push(["trackPageView"]);
  piwik.push(["enableLinkTracking"]);
}
