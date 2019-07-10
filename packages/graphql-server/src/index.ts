import * as cors from "@koa/cors";
import { ApolloServer, gql } from "apollo-server-koa";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";

// import * as resolvers from "./resolvers";
// import * as typeDefs from "./schemas";

// console.log(resolvers);
// console.log(typeDefs);

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!",
  },
};

const server = new ApolloServer({ resolvers, typeDefs });
const app = new Koa();

app.use(bodyParser());
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`),
);
