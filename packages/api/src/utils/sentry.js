const Sentry = require("@sentry/node");

Sentry.init({
  dsn: process.env.SENTRY_PUBLIC_DSN || null,
  environment: process.env.SENTRY_ENV,
});

module.exports = Sentry;
