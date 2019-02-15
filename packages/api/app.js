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

const app = express();

if (process.env.SENTRY_PUBLIC_DSN) {
  Sentry.init({
    dsn: process.env.SENTRY_PUBLIC_DSN || "https://sentry.dev"
  });
}

process.on("unhandledRejection", r => {
  // not sure this is ever reached
  Sentry.captureException(r);
  console.log("unhandledRejection", r);
});

const corsOptions = {
  credentials: true,
  origin: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use("/api/v1/inscription", inscriptionRoutes);
app.use("/api/v1", passport.authenticate("jwt", { session: false }), routes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/doc", require("./routes/doc"));

app.get("/ping", function(req, res, next) {
  if (!req.user) {
    res.status(401).json({ success: false });
  } else {
    res.json({ success: true });
  }
});

app.get("/", function(req, res, next) {
  res.json({
    title: "API eMJPM",
    version: pkg.version,
    NODE_ENV: process.env.NODE_ENV || "development"
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(`404 Not Found : ${req.url}`);
  var err = new Error(`404 Not Found : ${req.url}`);
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
    console.log(
      `Listening on http://127.0.0.1:${port} [${process.env.NODE_ENV ||
        "development"}]`
    );
  });
}

module.exports = app;
