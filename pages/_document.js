import Document, { Head, Main, NextScript } from "next/document";
import { injectGlobal, ServerStyleSheet } from "styled-components";

injectGlobal`
  html {
    font-size: 14px;
  }
  html,
  body,
  div#__next {
    background:white;
    height: 100%;
  }
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props => sheet.collectStyles(<App {...props} />));
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }
  render() {
    return (
      <html>
        <Head>
          <title>e-MJPM</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="/static/css/react-table.css" />
          <link rel="stylesheet" href="/static/css/leaflet/leaflet.css" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
