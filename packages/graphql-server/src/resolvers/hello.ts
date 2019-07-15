import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from "apollo-link-http";
import { gql } from 'apollo-server-koa';
import fetch from "node-fetch"
import { Resolvers } from "../types/resolvers-types";
import { logger } from '../util';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({
    fetch,
    uri: "http://localhost:5000/v1/graphql"
  })
});

const MESURES = gql`
  {
    mesures {
      annee
      cabinet
      civilite
    }
  }
`;

// a query with apollo-client
const test = client.query({
  context: {
    // example of setting the headers with context per operation
    headers: {
      "x-hasura-admin-secret": "secret"
    }
  },
  query: MESURES
});

export const resolvers: Resolvers = {
  Query: {
    hello: () => {
      test.then((result) => {
        const mesures = result.data.mesures;
        // tslint:disable-next-line no-console
        logger.info(mesures.length);
      })
      return "hello world";
    }
  }
};

export default resolvers;
