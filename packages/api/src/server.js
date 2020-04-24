const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const passport = require("passport");
const fs = require("fs");
const expressPinoLogger = require("express-pino-logger");
const tmp = require("tmp");

const logger = require("./utils/logger");
const Sentry = require("./utils/sentry");
const apiLog = require("./middlewares/apiLog");
const errorHandler = require("./middlewares/error-handler");
const pkg = require("../package.json");
const authRoutes = require("./routes/auth");
const oauth2Routes = require("./routes/oauth2");
const editorsRoutes = require("./routes/editors");
const { convertExcelFileToJson } = require("./services/enquetes");

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

app.post("/api/fileUpload", (req, res) => {
  const { name, type, base64str } = req.body.input;

  const tmpobj = tmp.dirSync();
  const fileBuffer = Buffer.from(base64str, "base64");
  const path = tmpobj.name + "/" + name;

  fs.writeFileSync(path, fileBuffer, "base64");
  const data = convertExcelFileToJson(path);

  tmpobj.removeCallback();
  res.status(200).json(data);
});

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

// error handler
app.use(errorHandler);

process.on("unhandledRejection", error => {
  logger.error("unhandledRejection", error.message);
  Sentry.captureException(error);
});

process.on("uncaughtException", async error => {
  logger.error("uncaughtException", error.message);
  Sentry.captureException(error);
  process.exit(1);
});

module.exports = app;
