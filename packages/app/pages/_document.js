import { GlobalStyle } from "@emjpm/ui";
import { css, Global } from "@emotion/core";
import Document, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* TODO : Remove me in favor of self hosted */}
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700|Quicksand:400,700&display=swap"
            rel="stylesheet"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="description" content="" />
          <meta name="author" content="" />
          <style>{`
          html {
            font-size: 14px;
          }
          html,
          body,
          div#__next {
            background:white;
            height: 100%;
          }
          `}</style>
          <link rel="shortcut icon" href="/static/favicon.ico" />
          <link
            href="https://api.tiles.mapbox.com/mapbox-gl-js/v1.4.1/mapbox-gl.css"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/css/font.css" />
          <link rel="stylesheet" href="/static/css/pagination.css" />
          {this.props.styleTags}
          <script type="text/javascript" src="/static/tarteaucitron/tarteaucitron.js" />
          <script type="text/javascript" src="/static/tarteaucitron/initTarteaucitron.js" />
        </Head>
        <body>
          {/* @socialgouv global style */}
          <GlobalStyle />
          {/* custom global style */}
          <Global
            styles={css`
              body,
              html,
              div#__next {
                font-size: 14px;
                font-family: "Open Sans", sans-serif;
                background: #f2f5f9;
                -webkit-font-smoothing: antialiased;
              }
            `}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
