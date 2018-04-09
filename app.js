const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const routes = require("./routes/index");
const users = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();

const corsWhitelist = ["http://localhost:3000", "http://127.0.0.1:3000"];
if (process.env.CORS_WHITELIST) {
  corsWhitelist.push(process.env.CORS_WHITELIST);
}

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "\xa9\x93v\x8b\x0cJ\xc1\x94l\x83MY\xa4\xb1\xb2\xb1\xe5\x0e\x98m\x9ee\x1a\x16";

const corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (corsWhitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};

app.options("*", cors(corsOptions));

app.use(logger("dev"));

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", routes);
app.use("/auth", authRoutes);
app.use("/", users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

const port = process.env.PORT || 3005;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Listening on http://127.0.0.1:${port}`);
  });
}

module.exports = app;
