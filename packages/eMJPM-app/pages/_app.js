import App, { Container } from "next/app";
import React from "react";

// all global css
import "bootstrap/dist/css/bootstrap.css";
import "react-tabs/style/react-tabs.css";
import "../static/css/hero.css";
import "../static/css/footer.css";
import "../static/css/custom.css";
import "../static/css/panel.css";

export default class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
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
}
