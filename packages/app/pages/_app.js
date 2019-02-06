import App, { Container } from "next/app";
import React from "react";
import piwik from "react-piwik";

import { trackUser } from "../src/piwik";

// all global css
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "../static/css/hero.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../static/css/panel.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
  componentDidMount() {
    piwikSetup();
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
