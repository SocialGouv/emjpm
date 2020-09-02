const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressPinoLogger = require("express-pino-logger");

const logger = require("./utils/logger");
const Sentry = require("./utils/sentry");
const apiLog = require("./middlewares/apiLog");
const errorHandler = require("./middlewares/error-handler");
const pkg = require("../package.json");
const authRoutes = require("./routes/api/auth");
const oauth2Routes = require("./routes/api/oauth2");
const editorsRoutes = require("./routes/api/editors");
const rateLimit = require("express-rate-limit");

const corsOptions = {
  credentials: true,
  origin: true,
};
const bodyParserOptions = {
  limit: "10mb",
};

const app = express();

// TODO: rate limiter use inmemory-store.
// EMJPM uses k8s, so we must replace it by a redis or postgre table store.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

// middlewares
app.use(expressPinoLogger({ logger }));
app.use(cors(corsOptions));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauth2Routes);
app.use(
  "/api/editors",
  [apiLimiter, apiLog, passport.authenticate("editor-jwt", { session: false })],
  editorsRoutes
);

app.use(
  "/hasura/events",
  [passport.authenticate("hasura-webhook-header-secret")],
  require("./routes/hasura-events/hasura-events.routes.js")
);

app.use(
  "/hasura/actions",
  [passport.authenticate("hasura-webhook-header-secret")],
  require("./routes/hasura-actions/hasura-actions.routes.js")
);

app.get("/", function (req, res) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: process.env.NODE_ENV || "development",
  });
});

// error handler
app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  logger.error("unhandledRejection", error.message);
  Sentry.captureException(error);
});

process.on("uncaughtException", async (error) => {
  logger.error("uncaughtException", error.message);
  Sentry.captureException(error);
  process.exit(1);
});

module.exports = app;
