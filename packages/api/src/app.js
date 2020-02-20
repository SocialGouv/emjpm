const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const Sentry = require("@sentry/node");

const apiLog = require("./middlewares/apiLog");
const pkg = require("../package.json");
const authV2Routes = require("./routes/auth-v2");
const oauth2Routes = require("./routes/oauth2");
const editorsRoutes = require("./routes/editors");
const configuration = require("./env");
const app = express();

if (configuration.sentryPublicDSN) {
  Sentry.init({
    dsn: configuration.sentryPublicDSN,
    environment: configuration.sentryEnv
  });
}

process.on("unhandledRejection", r => {
  Sentry.captureException(r);
  /* eslint-disable no-console */
  console.log("unhandledRejection", r);
  /* eslint-enable no-console */
});

const corsOptions = {
  credentials: true,
  origin: true
};

const bodyParserOptions = {
  limit: "10mb"
};

app.use(cors(corsOptions));
app.use(bodyParser.json(bodyParserOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v2/auth", authV2Routes);
app.use("/api/v2/oauth", oauth2Routes);
app.use(
  "/api/v2/editors",
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  /* eslint-disable no-console */
  console.log(`404 Not Found : ${req.method} ${req.url}`);
  /* eslint-enable no-console */
  var err = new Error(`404 Not Found : ${req.method} ${req.url}`);
  err.status = 404;
  next(err);
});

// error handlers

app.use(function(err, req, res, next) {
  Sentry.captureException(err);

  if (res.headersSent) {
    return next(err);
  }
  // console.error(err);

  const body = {
    code: err.code,
    message: err.message,
    name: err.name,
    status: err.status,
    type: err.type
  };
  if (process.env.NODE_ENV !== "production") body.stack = err.stack;
  res.status(err.status || 500).json(body);
});

const port = process.env.PORT || 4000;

if (require.main === module) {
  app.listen(port, "0.0.0.0", () => {
    /* eslint-disable no-console */
    console.log(
      `Listening on http://127.0.0.1:${port} [${process.env.NODE_ENV ||
        "development"}]`
    );
    /* eslint-enable no-console */
  });
}

module.exports = app;
