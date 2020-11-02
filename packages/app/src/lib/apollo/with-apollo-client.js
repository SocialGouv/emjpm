import Head from "next/head";
import React from "react";
import { getDataFromTree } from "react-apollo";

import initApollo from "./init-apollo";

const WithApolloClient = (App) => {
  return class Apollo extends React.Component {
    static displayName = "withApollo(App)";
    static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }
      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({}, ctx);
      // Use me with a real server not an export
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          await getDataFromTree(
            <App
              {...appProps}
              Component={Component}
              router={router}
              apolloClient={apollo}
            />
          );
        } catch (error) {
          // Prevent Apollo Client GraphQL errors from crashing SSR.
          // Handle them in components via the data.error prop:
          // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
          console.error("Error while running `getDataFromTree`", error);
          console.error(
            `Error while running "getDataFromTree" on ${
              Component.displayName
            } with appProps ${
              appProps ? safeStringify(appProps) : ""
            } and context ${ctx ? safeStringify(ctx) : ""}`,
            error
          );
        }

        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      const apolloState = apollo.cache.extract();

      return {
        ...appProps,
        apolloState,
      };
    }

    constructor(props) {
      super(props);
      this.apolloClient = initApollo(props.apolloState);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};

export default WithApolloClient;

function safeStringify(obj) {
  // https://stackoverflow.com/questions/11616630/how-can-i-print-a-circular-structure-in-a-json-like-format
  const cache = [];
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      // Duplicate reference found, discard key
      if (cache.includes(value)) return;

      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
}
