exports.getConfiguration = env => ({
  sentryPublicDSN: env.SENTRY_PUBLIC_DSN,
  sentryEnvironment: process.env.SENTRY_ENV,
  smtpHost: process.env.SMTP_HOST || "127.0.0.1",
  smtpPort: process.env.SMTP_PORT || "25",
  smtpUser: process.env.SMTP_USER,
  smtpPass: process.env.SMTP_PASS,
  smtpFrom: process.env.SMTP_FROM
});
