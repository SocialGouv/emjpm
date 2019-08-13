import * as cors from "@koa/cors";
import { ApolloServer } from "apollo-server-koa";
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as Router from "koa-router";
import { logger } from "./logger";
import resolvers from "./resolvers";
import typeDefs from "./schemas";

const context = async ({ ctx }: { ctx: any }) => {
  return {
    authorisation: ctx.request.header.authorisation
  };
};

const server = new ApolloServer({
  context,
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

app.listen({ port: 4001 }, () =>
  logger.info(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);
