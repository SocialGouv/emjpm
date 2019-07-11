import * as cors from "@koa/cors";
import { ApolloServer, gql } from "apollo-server-koa";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import resolvers from "./resolvers";
import typeDefs from "./schemas";

const server = new ApolloServer({ resolvers, typeDefs });
const app = new Koa();

app.use(bodyParser());
app.use(cors());
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  // tslint:disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`),
);
