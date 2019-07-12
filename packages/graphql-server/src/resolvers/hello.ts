import { Resolvers } from "../types/resolvers-types";

// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: createHttpLink({
//     fetch,
//     uri: "http://localhost:5000/v1/graphql"
//   })
// });

// const MESURES = gql`
//   {
//     mesures {
//       annee
//       cabinet
//       civilite
//     }
//   }
// `;

// // a query with apollo-client
// const test = client.query({
//   context: {
//     // example of setting the headers with context per operation
//     headers: {
//       "x-hasura-admin-secret": "secret"
//     }
//   },
//   query: MESURES
// });

export const resolvers: Resolvers = {
  Query: {
    hello: () => {
      return "hello world";
    }
  }
};

export default resolvers;
