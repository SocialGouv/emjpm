import * as cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import { Server } from "http";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import { AddressInfo } from "net";
import { configuration } from "./config";
import dataSources from "./datasource";
import { logger } from "./logger";
import resolvers from "./resolvers";
import typeDefs from "./schemas";

const context = async ({ ctx }: { ctx: any }) => {
  return {
    token: ctx.request.header.authorization
  };
};

const server = new ApolloServer({
  context,
  dataSources,
  introspection: true,
  resolvers,
  typeDefs
});
const app = new Koa();

app.use(bodyParser());
app.use(cors());
server.applyMiddleware({ app });

const router = new Router();

router.get(`/health-check`, (ctx: Koa.Context) => {
  ctx.status = 200;
  ctx.body = "health-check ok!!";
});

app.use(router.routes());

app.listen({ port: configuration.PORT }, function(this: Server) {
  const { address, port } = this.address() as AddressInfo;
  logger.info(
    `Listening on http://${address === "::" ? "localhost" : address}:${port}${
      server.graphqlPath
    }`
  );
});
