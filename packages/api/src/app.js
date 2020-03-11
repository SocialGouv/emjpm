const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const expressPinoLogger = require("express-pino-logger");

const logger = require("./utils/logger");
const Sentry = require("./utils/sentry");
const apiLog = require("./middlewares/apiLog");
const pkg = require("../package.json");
const authRoutes = require("./routes/auth");
const oauth2Routes = require("./routes/oauth2");
const editorsRoutes = require("./routes/editors");

const env = process.env.NODE_ENV || "development";
const isProduction = env === "production";
const host = "0.0.0.0";
const port = process.env.PORT || 4000;
const corsOptions = {
  credentials: true,
  origin: true
};
const bodyParserOptions = {
  limit: "10mb"
};

const app = express();

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
    NODE_ENV: process.env.NODE_ENV || "development"
  });
});

app.get("/json/version", function(req, res) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: process.env.NODE_ENV || "development"
  });
});

app.get("/json", function(req, res) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: process.env.NODE_ENV || "development"
  });
});

// error handlers
app.use(function(err, req, res, next) {
  Sentry.captureException(err);

  if (res.headersSent) {
    return next(err);
  }

  const body = {
    code: err.code,
    message: err.message,
    name: err.name,
    status: err.status,
    type: err.type
  };

  if (isProduction) {
    body.stack = err.stack;
  }

  res.status(err.status || 500).json(body);
});

app.listen(port, host, () => {
  logger.info(`Starting ${env} server on http://${host}:${port}`);
});

process.on("unhandledRejection", r => {
  Sentry.captureException(r);
  logger.info("unhandledRejection", r);
});

module.exports = app;
