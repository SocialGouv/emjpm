const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const pino = require("pino");
const expressPino = require("express-pino-logger");

const Sentry = require("./utils/sentry");
const apiLog = require("./middlewares/apiLog");
const pkg = require("../package.json");
const authRoutes = require("./routes/auth");
const oauth2Routes = require("./routes/oauth2");
const editorsRoutes = require("./routes/editors");

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";
const port = process.env.PORT || 4000;
const host = "0.0.0.0";

const corsOptions = {
  credentials: true,
  origin: true
};

const bodyParserOptions = {
  limit: "10mb"
};

const loggerOptions = {
  prettyPrint: !isProduction
};

const logger = pino(loggerOptions);
const expressLogger = expressPino({ logger });
const app = express();

app.use(expressLogger);
app.use(cors(corsOptions));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/oauth", oauth2Routes);
app.use(
  "/api/editors",
  [apiLog, passport.authenticate("bearer", { session: false })],
  editorsRoutes
);

app.use("/webhook", require("./routes/webhook"));

app.get("/ping", function(req, res) {
  if (!req.user) {
    res.status(401).json({ success: false });
  } else {
    res.json({ success: true });
  }
});

app.get("/", function(req, res) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: env
  });
});

app.get("/json/version", function(req, res) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: env
  });
});

app.get("/json", function(req, res) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: env
  });
});

app.use(function(req, res, next) {
  logger.info(`404 Not Found : ${req.method} ${req.url}`);
  const err = new Error(`404 Not Found : ${req.method} ${req.url}`);
  err.status = 404;

  next(err);
});

// error handlers
app.use(function(error, req, res, next) {
  if (res.headersSent) {
    return next(error);
  }

  const body = {
    code: error.code,
    message: error.message,
    name: error.name,
    status: error.status,
    type: error.type
  };

  if (!isProduction) {
    body.stack = error.stack;
  }

  Sentry.captureException(error);

  res.status(error.status || 500).json(body);
});

app.listen(port, host, () => {
  logger.info(`[${env}] Listening on http://${host}:${port}`);
});

process.on("unhandledRejection", error => {
  Sentry.captureException(error);
  logger.error(error);
});

module.exports = app;
