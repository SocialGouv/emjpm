const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const Sentry = require("@sentry/node");

const pkg = require("./package.json");
const routes = require("./routes/index");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const inscriptionRoutes = require("./routes/inscription");
const userController = require("./controllers/user");

const app = express();

if (process.env.SENTRY_PUBLIC_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_PUBLIC_DSN || "https://sentry.dev",
    environment: process.env.SENTRY_ENV
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

app.use(cors(corsOptions));

app.use(
  bodyParser.json({
    limit: "10mb"
  })
);
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.post("/login", userController.postLogin);
app.get("/webhook", userController.getWebhook);
app.get("/jwks", userController.getJwks);

app.use("/api/v1/inscription", inscriptionRoutes);
app.use("/api/v1", passport.authenticate("jwt", { session: false }), routes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/doc", require("./routes/doc"));

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
